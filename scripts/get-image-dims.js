import { readFile } from 'fs/promises';
import { join } from 'path';

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

async function main() {
  const images = [
    'Adorna.jpg',
    'Aelin.jpg',
    'Aerith Gainsborough.jpg',
    'Aeromancer.jpg',
    'Akira Hiiragi.jpg',
    'Alice Zuberg.jpg',
    'Asuna Yuuki.jpg',
    'Bayonetta.jpg',
    'Byleth.jpg',
    'Ellen Joe.jpg'
  ];

  for (const img of images) {
    try {
      const buffer = await readFile(join('src/images/originals', img));
      const dims = getJPEGDimensions(buffer);
      console.log(`${img}: ${dims.width}x${dims.height}`);
    } catch (err) {
      console.error(`${img}: Error - ${err.message}`);
    }
  }
}

main();
