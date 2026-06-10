/**
 * Convert public/images/ui/btn-*.png → .webp
 *  - btn-agian.png (오타 원본) → btn-again.webp (정상 이름)
 *  - btn-share.png             → btn-share.webp
 *
 * Usage: node scripts/convert-buttons.mjs
 */
import sharp from "sharp";
import { resolve } from "node:path";
import { statSync } from "node:fs";

const DIR = "public/images/ui";

const TARGETS = [
  { src: "btn-agian.png", out: "btn-again.webp" },
  { src: "btn-share.png", out: "btn-share.webp" },
];

for (const { src, out } of TARGETS) {
  const srcPath = resolve(`${DIR}/${src}`);
  const dstPath = resolve(`${DIR}/${out}`);
  await sharp(srcPath)
    .trim()
    .webp({ quality: 90, effort: 6, alphaQuality: 100 })
    .toFile(dstPath);
  const before = statSync(srcPath).size;
  const after = statSync(dstPath).size;
  const pct = (((before - after) / before) * 100).toFixed(1);
  console.log(
    `${src} → ${out}  (${(before / 1024).toFixed(1)} KB → ${(after / 1024).toFixed(1)} KB, -${pct}%)`
  );
}
