import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const wawaDir = path.join(__dirname, '../public/images/wawa');

const pngFiles = [
  'card-back.png',
  'wawa-angel.png',
  'wawa-demon.png',
  'wawa-pair.png'
];

(async () => {
  try {
    for (const file of pngFiles) {
      const sourceImage = path.join(wawaDir, file);
      const outputImage = path.join(wawaDir, file.replace('.png', '.webp'));
      
      if (!fs.existsSync(sourceImage)) {
        console.log(`⊘ Skipped (not found): ${file}`);
        continue;
      }
      
      console.log(`Converting ${file} to WebP...`);
      await sharp(sourceImage)
        .webp({ quality: 95 })
        .toFile(outputImage);
      console.log(`✓ Successfully converted to ${path.basename(outputImage)}`);
    }
    console.log('\n✅ All conversions completed!');
  } catch (error) {
    console.error('Conversion failed:', error);
    process.exit(1);
  }
})();
