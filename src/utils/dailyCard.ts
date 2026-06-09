import { tarotCards, type TarotCard } from "../data/tarotCards";
import { getVoice } from "../data/voiceTexts";

export interface DailyCard {
  dateKey: string;
  card: TarotCard;
  reversed: boolean;
  stars: number;
  message: string;
}

/**
 * KST(UTC+9) 기준 YYYY-MM-DD 키
 * 같은 날에는 어떤 디바이스에서 접속해도 동일한 카드가 나오도록 한국 표준시로 고정.
 */
function getKstDateKey(d: Date = new Date()): string {
  const kst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  const y = kst.getUTCFullYear();
  const m = String(kst.getUTCMonth() + 1).padStart(2, "0");
  const day = String(kst.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** 32-bit FNV-1a 해시 */
function fnv1a(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/** seed -> [0,1) */
function seedRand(seed: number): number {
  const x = Math.imul(seed ^ 0x9e3779b1, 0x85ebca6b) >>> 0;
  return ((x ^ (x >>> 13)) >>> 0) / 0xffffffff;
}

/**
 * 별점 분포 (편향 없는 1~5)
 * 1★: 5%, 2★: 20%, 3★: 40%, 4★: 25%, 5★: 10%
 * 역방향이면 -1 (최소 1)
 */
function rollStars(seed: number, reversed: boolean): number {
  const r = seedRand(seed);
  let stars: number;
  if (r < 0.05) stars = 1;
  else if (r < 0.25) stars = 2;
  else if (r < 0.65) stars = 3;
  else if (r < 0.9) stars = 4;
  else stars = 5;
  if (reversed) stars = Math.max(1, stars - 1);
  return stars;
}

/**
 * 오늘 자(KST) 카드 1장 + 정/역 + 별점 + 와와 메시지 (천사와와 톤)
 * 날짜가 같으면 결과는 동일.
 */
export function buildDailyCard(date: Date = new Date()): DailyCard {
  const dateKey = getKstDateKey(date);
  const seed = fnv1a(`wawa-daily::${dateKey}`);

  const cardIdx = seed % tarotCards.length;
  const card = tarotCards[cardIdx];
  const reversed = ((seed >>> 7) & 1) === 1;
  const stars = rollStars(seed ^ 0xc0ffee, reversed);
  const message = getVoice(card, "angel", reversed);

  return { dateKey, card, reversed, stars, message };
}

/** 별점 표시 ("★★★☆☆") */
export function formatStars(n: number): string {
  const s = Math.max(0, Math.min(5, Math.round(n)));
  return "★".repeat(s) + "☆".repeat(5 - s);
}
