import { readdir, readFile, writeFile, mkdir, unlink, stat, copyFile } from 'fs/promises';
import { join, basename } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Simple JPEG dimension reader
function getJPEGDimensions(buffer) {
  let i = 0;
  if (buffer[i] !== 0xFF || buffer[i + 1] !== 0xD8) {
    throw new Error('Not a JPEG file');
  }

  i += 2;
  while (i < buffer.length) {
    if (buffer[i] !== 0xFF) {
      throw new Error('Invalid JPEG');
    }

    const marker = buffer[i + 1];
    i += 2;

    // SOF markers
    if (marker >= 0xC0 && marker <= 0xCF && marker !== 0xC4 && marker !== 0xC8 && marker !== 0xCC) {
      i += 3; // Skip length and precision
      const height = (buffer[i] << 8) | buffer[i + 1];
      const width = (buffer[i + 2] << 8) | buffer[i + 3];
      return { width, height };
    } else {
      const length = (buffer[i] << 8) | buffer[i + 1];
      i += length;
    }
  }

  throw new Error('Could not find SOF marker');
}

// Simple PNG dimension reader
function getPNGDimensions(buffer) {
  // PNG signature: 89 50 4E 47 0D 0A 1A 0A
  if (buffer[0] !== 0x89 || buffer[1] !== 0x50 || buffer[2] !== 0x4E || buffer[3] !== 0x47) {
    throw new Error('Not a PNG file');
  }

  // IHDR chunk starts at byte 16 (after signature and chunk length/type)
  // Width is at bytes 16-19, height at bytes 20-23 (big-endian)
  const width = (buffer[16] << 24) | (buffer[17] << 16) | (buffer[18] << 8) | buffer[19];
  const height = (buffer[20] << 24) | (buffer[21] << 16) | (buffer[22] << 8) | buffer[23];

  return { width, height };
}

// Detect actual image format from file signature
function detectImageFormat(buffer) {
  // PNG signature: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
    return 'png';
  }
  // JPEG signature: FF D8
  if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
    return 'jpeg';
  }
  // WebP signature: RIFF ... WEBP
  if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
      buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) {
    return 'webp';
  }
  return null;
}

// Simple WebP dimension reader
function getWebPDimensions(buffer) {
  // WebP signature: RIFF ... WEBP
  if (buffer[0] !== 0x52 || buffer[1] !== 0x49 || buffer[2] !== 0x46 || buffer[3] !== 0x46 ||
      buffer[8] !== 0x57 || buffer[9] !== 0x45 || buffer[10] !== 0x42 || buffer[11] !== 0x50) {
    throw new Error('Not a WebP file');
  }

  // VP8 lossy format
  if (buffer[12] === 0x56 && buffer[13] === 0x50 && buffer[14] === 0x38 && buffer[15] === 0x20) {
    const width = buffer[26] | (buffer[27] << 8);
    const height = buffer[28] | (buffer[29] << 8);
    return { width: width & 0x3fff, height: height & 0x3fff };
  }

  // VP8L lossless format
  if (buffer[12] === 0x56 && buffer[13] === 0x50 && buffer[14] === 0x38 && buffer[15] === 0x4C) {
    const bits = (buffer[21] << 24) | (buffer[22] << 16) | (buffer[23] << 8) | buffer[24];
    const width = (bits & 0x3FFF) + 1;
    const height = ((bits >> 14) & 0x3FFF) + 1;
    return { width, height };
  }

  // VP8X extended format
  if (buffer[12] === 0x56 && buffer[13] === 0x50 && buffer[14] === 0x38 && buffer[15] === 0x58) {
    const width = (buffer[24] | (buffer[25] << 8) | (buffer[26] << 16)) + 1;
    const height = (buffer[27] | (buffer[28] << 8) | (buffer[29] << 16)) + 1;
    return { width, height };
  }

  throw new Error('Unsupported WebP format');
}

// Get dimensions from any supported image format
function getImageDimensions(buffer, filename) {
  // Auto-detect format from file signature instead of extension
  const actualFormat = detectImageFormat(buffer);

  if (!actualFormat) {
    throw new Error(`Could not detect image format for: ${filename}`);
  }

  if (actualFormat === 'png') {
    return getPNGDimensions(buffer);
  } else if (actualFormat === 'jpeg') {
    return getJPEGDimensions(buffer);
  } else if (actualFormat === 'webp') {
    return getWebPDimensions(buffer);
  } else {
    throw new Error(`Unsupported image format: ${actualFormat}`);
  }
}

// Convert filename to slug (kebab-case)
function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Convert JPG to WebP
async function convertImage(sourcePath, destPath) {
  try {
    // Use ffmpeg for conversion (widely available, fast)
    await execAsync(`ffmpeg -i "${sourcePath}" -q:v 85 "${destPath}" -y`);
    return true;
  } catch (err) {
    console.error(`FFmpeg conversion failed: ${err.message}`);

    // Fallback: Try cwebp if available
    try {
      await execAsync(`cwebp -q 85 "${sourcePath}" -o "${destPath}"`);
      return true;
    } catch (err2) {
      console.error(`cwebp conversion also failed: ${err2.message}`);
      return false;
    }
  }
}

// Check if artist profile exists
async function artistProfileExists(artistSlug) {
  try {
    await stat(join('src/content/artists', `${artistSlug}.md`));
    return true;
  } catch {
    return false;
  }
}

// Create artist profile
async function createArtistProfile(artistName, artistSlug) {
  const artistDir = 'src/content/artists';
  const artistFile = join(artistDir, `${artistSlug}.md`);

  // Ensure artists directory exists
  await mkdir(artistDir, { recursive: true });

  const content = `---
name: "${artistName}"
slug: "${artistSlug}"
---

AI character art created by ${artistName}.
`;

  await writeFile(artistFile, content);
  console.log(`✓ Created artist profile: ${artistSlug}.md`);
}

// Process all images in artist subfolders
async function processArtistFolders() {
  const sourceDir = 'SOURCE IMAGES';

  // Read all subdirectories in SOURCE IMAGES
  const entries = await readdir(sourceDir, { withFileTypes: true });
  const artistFolders = entries.filter(entry => entry.isDirectory());

  if (artistFolders.length === 0) {
    console.log('No artist subfolders found in SOURCE IMAGES/');
    return;
  }

  console.log(`Found ${artistFolders.length} artist folder(s) to process\n`);

  for (const folder of artistFolders) {
    const artistName = folder.name;
    const artistSlug = toSlug(artistName);
    const artistSourceDir = join(sourceDir, artistName);

    console.log(`\n📁 Processing artist: ${artistName} (${artistSlug})`);

    // Check if artist profile exists, create if not
    if (!(await artistProfileExists(artistSlug))) {
      console.log(`   Artist profile not found, creating...`);
      await createArtistProfile(artistName, artistSlug);
    } else {
      console.log(`   Artist profile already exists`);
    }

    // Read all image files (JPG, PNG, and WebP) in artist folder
    const files = await readdir(artistSourceDir);
    const imageFiles = files.filter(f => /\.(jpe?g|png|webp)$/i.test(f));

    if (imageFiles.length === 0) {
      console.log(`   No image files found in this folder`);
      continue;
    }

    console.log(`   Found ${imageFiles.length} image(s) to convert\n`);

    // Create destination directories
    const destImageDir = join('public/images', artistSlug);
    const destContentDir = 'src/content/images';
    await mkdir(destImageDir, { recursive: true });
    await mkdir(destContentDir, { recursive: true });

    // Get already processed images
    const existingContent = await readdir(destContentDir).catch(() => []);
    const existingSlugs = new Set(existingContent.map(f => f.replace(/\\.md$/, '')));

    let convertedCount = 0;
    let skippedCount = 0;
    let failedCount = 0;

    for (const filename of imageFiles) {
      const sourcePath = join(artistSourceDir, filename);
      const imageSlug = toSlug(filename.replace(/\.(jpe?g|png|webp)$/i, ''));
      const webpFilename = `${imageSlug}.webp`;
      const destImagePath = join(destImageDir, webpFilename);
      const destContentPath = join(destContentDir, `${imageSlug}.md`);

      // Skip if already processed
      if (existingSlugs.has(imageSlug)) {
        console.log(`   ⏭️  Skipped: ${filename} (already processed)`);
        skippedCount++;
        continue;
      }

      try {
        // Read original image to get dimensions and detect format
        const buffer = await readFile(sourcePath);
        const actualFormat = detectImageFormat(buffer);
        const { width, height } = getImageDimensions(buffer, filename);

        if (actualFormat === 'webp') {
          // Already WebP - just copy it
          console.log(`   Copying: ${filename} → ${webpFilename} (already WebP)`);
          await copyFile(sourcePath, destImagePath);
        } else {
          // Convert JPG/PNG to WebP
          console.log(`   Converting: ${filename} (${actualFormat.toUpperCase()}) → ${webpFilename}`);
          const success = await convertImage(sourcePath, destImagePath);

          if (!success) {
            console.error(`   ❌ Failed to convert ${filename}`);
            failedCount++;
            continue;
          }
        }

        // Create content entry
        const content = `---
artist: "${artistSlug}"
src: "/theGildedPixel/images/${artistSlug}/${webpFilename}"
width: ${width}
height: ${height}
---
`;

        await writeFile(destContentPath, content);
        console.log(`   ✓ Created ${imageSlug}.md (${width}x${height})`);

        // Delete source image file
        await unlink(sourcePath);
        console.log(`   🗑️  Deleted source: ${filename}`);

        convertedCount++;

      } catch (err) {
        console.error(`   ❌ Error processing ${filename}: ${err.message}`);
        failedCount++;
      }
    }

    console.log(`\n   Summary for ${artistName}:`);
    console.log(`   - Converted: ${convertedCount}`);
    console.log(`   - Skipped: ${skippedCount}`);
    console.log(`   - Failed: ${failedCount}`);
    console.log(`   - Folder ready for new images`);
  }

  console.log(`\n✅ All artist folders processed!`);
}

// Run the script
processArtistFolders().catch(console.error);
