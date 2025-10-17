import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, basename, extname } from 'path';
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

// Convert filename to slug (kebab-case)
function toSlug(filename) {
  return filename
    .replace(/\.[^.]+$/, '') // Remove extension
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

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

async function processImages(count = 10) {
  const sourceDir = 'SOURCE IMAGES';
  const destImageDir = 'src/images/originals';
  const destContentDir = 'src/content/images';

  // Ensure destination directories exist
  await mkdir(destImageDir, { recursive: true });
  await mkdir(destContentDir, { recursive: true });

  // Read source images
  const files = await readdir(sourceDir);
  const jpgFiles = files.filter(f => /\.jpe?g$/i.test(f)).slice(0, count);

  console.log(`Converting ${jpgFiles.length} images from JPG to WebP...\n`);

  for (const filename of jpgFiles) {
    const sourcePath = join(sourceDir, filename);
    const slug = toSlug(filename);
    const webpFilename = `${slug}.webp`;
    const destImagePath = join(destImageDir, webpFilename);
    const destContentPath = join(destContentDir, `${slug}.md`);

    try {
      // Read original JPG to get dimensions
      const buffer = await readFile(sourcePath);
      const { width, height } = getJPEGDimensions(buffer);

      // Convert to WebP
      console.log(`Converting: ${filename} → ${webpFilename}`);
      const success = await convertImage(sourcePath, destImagePath);

      if (!success) {
        console.error(`❌ Failed to convert ${filename}`);
        continue;
      }

      // Create minimal content entry
      const content = `---
src: "/src/images/originals/${webpFilename}"
width: ${width}
height: ${height}
---
`;

      await writeFile(destContentPath, content);
      console.log(`✓ Created ${slug}.md (${width}x${height})`);

    } catch (err) {
      console.error(`❌ Error processing ${filename}: ${err.message}`);
    }
  }

  console.log(`\n✓ Completed! Processed ${jpgFiles.length} images.`);
}

// Get count from command line argument
const count = parseInt(process.argv[2]) || 10;
processImages(count).catch(console.error);
