/**
 * One-shot conversion: public/images/wawa/{angel,devil}.png → .webp
 * Usage: node scripts/convert-wawa.mjs
 */
import sharp from "sharp";
import { readFileSync, writeFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const FILES = ["angel", "devil"];
const SRC_DIR = "public/images/wawa";

for (const name of FILES) {
  const src = resolve(`${SRC_DIR}/${name}.png`);
  const dst = resolve(`${SRC_DIR}/${name}.webp`);
  // 투명 가장자리를 자동 잘라내 캐릭터가 프레임을 꽉 채우게 한다.
  const buf = await sharp(readFileSync(src))
    .trim()
    .webp({ quality: 90, effort: 6, alphaQuality: 100 })
    .toBuffer();
  writeFileSync(dst, buf);
  const before = statSync(src).size;
  const after = statSync(dst).size;
  const pct = (((before - after) / before) * 100).toFixed(1);
  console.log(
    `${name}.png → ${name}.webp  (${(before / 1024).toFixed(1)} KB → ${(after / 1024).toFixed(1)} KB, -${pct}%)`
  );
}
