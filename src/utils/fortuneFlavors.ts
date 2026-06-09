import type { DrawnCard } from "./tarot";

const COLORS = [
  { name: "라벤더", hex: "#D8B4FE" },
  { name: "로즈 핑크", hex: "#F472B6" },
  { name: "민트", hex: "#BFFCF9" },
  { name: "허니 골드", hex: "#FDE68A" },
  { name: "딥 바이올렛", hex: "#7C3AED" },
  { name: "코랄", hex: "#FB7185" },
  { name: "스카이", hex: "#A5F3FC" },
  { name: "샴페인", hex: "#FDF6E3" },
];

const TIMES = [
  "이른 새벽",
  "아침 햇살이 비칠 때",
  "정오 무렵",
  "노을이 질 때",
  "달이 뜬 직후",
  "고요한 밤",
];

const DIRECTIONS = ["북쪽", "북동쪽", "동쪽", "남동쪽", "남쪽", "남서쪽", "서쪽", "북서쪽"];

const KEYS = ["향", "음악", "행동", "장소"];
const VALUES = [
  ["라벤더 향", "장미 오일", "재스민", "바닐라", "백단", "시트러스"],
  ["잔잔한 피아노", "재즈 발라드", "어쿠스틱 기타", "클래식 현악", "로파이"],
  ["짧은 산책", "따뜻한 차 한 잔", "감사 일기 쓰기", "10분 명상", "스트레칭"],
  ["창가 자리", "조용한 카페", "동네 공원", "서점", "물가"],
];

function seedFromCards(cards: DrawnCard[]): number {
  let h = 0;
  for (const c of cards) {
    for (const ch of c.card.id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    h = (h * 17 + (c.reversed ? 7 : 3)) >>> 0;
  }
  return h || 1;
}

function lcg(state: { v: number }): number {
  state.v = (state.v * 1664525 + 1013904223) >>> 0;
  return state.v / 0xffffffff;
}

function pick<T>(arr: readonly T[], state: { v: number }): T {
  return arr[Math.floor(lcg(state) * arr.length) % arr.length];
}

export interface LuckyFlavor {
  color: { name: string; hex: string };
  number: number;
  time: string;
  direction: string;
  extras: { label: string; value: string }[];
}

export function buildLucky(cards: DrawnCard[]): LuckyFlavor {
  const state = { v: seedFromCards(cards) };
  const color = pick(COLORS, state);
  const number = 1 + Math.floor(lcg(state) * 45);
  const time = pick(TIMES, state);
  const direction = pick(DIRECTIONS, state);
  const extras = KEYS.slice(0, 2).map((label, i) => ({
    label,
    value: pick(VALUES[i], state),
  }));
  return { color, number, time, direction, extras };
}

export interface IntensityScore {
  category: "love" | "money" | "career" | "default";
  label: string;
  value: number;
}

export function buildIntensity(
  cards: DrawnCard[],
  spreadId: string
): IntensityScore {
  const upright = cards.filter((c) => !c.reversed).length;
  const ratio = cards.length === 0 ? 0.5 : upright / cards.length;
  const value = Math.round((0.55 + ratio * 0.4) * 100);

  if (spreadId === "love") {
    return { category: "love", label: "오늘의 연애 운세 강도", value };
  }
  if (spreadId === "five") {
    return { category: "career", label: "오늘의 진로/관계 흐름", value };
  }
  return { category: "default", label: "오늘의 운세 강도", value };
}
