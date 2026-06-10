import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceImage = path.join(__dirname, '../public/images/wawa/card-back.png');
const outputImage = path.join(__dirname, '../public/images/wawa/card-back.webp');

(async () => {
  try {
    console.log(`Converting ${sourceImage} to WebP...`);
    await sharp(sourceImage)
      .webp({ quality: 95 })
      .toFile(outputImage);
    console.log(`✓ Successfully converted to ${outputImage}`);
  } catch (error) {
    console.error('Conversion failed:', error);
    process.exit(1);
  }
})();
