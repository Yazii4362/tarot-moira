/**
 * 와와 보이스 — 같은 카드를 두 시선으로 본다.
 *
 *  😇 angel (천사와와)  : 가능성을 봄. 톤 가이드는 ./angel.ts 참조.
 *  😈 demon (악마와와)  : 리스크를 봄. 톤 가이드는 ./demon.ts 참조.
 *
 *  ── 톤 가이드 (양쪽 공통) ──
 *  ❌ 독설/비꼬기/훈계 ("넌 망했어", "그만 좀 집착해")
 *  ⭕ 통찰/해석 ("기대가 더 크게 보여", "놓지 못하는 이유가 사랑인지 미련인지")
 *
 *  데이터 부재 시 fallback으로 카드 기본 meaning을 사용한다.
 */

import type { TarotCard } from "../tarotCards";
import { angelVoice } from "./angel";
import { demonVoice } from "./demon";

export type WawaMode = "angel" | "demon";

export interface CardVoice {
  angel: string;
  angelRev: string;
  demon: string;
  demonRev: string;
}

/**
 * 천사/악마 두 데이터를 카드 ID 기준으로 합쳐 단일 voiceTexts 맵으로 노출.
 * 한쪽 데이터만 있는 카드는 (정합성을 위해) 결과 맵에 포함하지 않는다.
 */
function buildVoiceTexts(): Record<string, CardVoice> {
  const ids = new Set([
    ...Object.keys(angelVoice),
    ...Object.keys(demonVoice),
  ]);
  const out: Record<string, CardVoice> = {};
  for (const id of ids) {
    const a = angelVoice[id];
    const d = demonVoice[id];
    if (!a || !d) continue;
    out[id] = {
      angel: a.up,
      angelRev: a.rev,
      demon: d.up,
      demonRev: d.rev,
    };
  }
  return out;
}

export const voiceTexts: Record<string, CardVoice> = buildVoiceTexts();

export function getVoice(
  card: TarotCard,
  mode: WawaMode,
  reversed: boolean
): string {
  const v = voiceTexts[card.id];
  if (v) {
    if (mode === "angel") return reversed ? v.angelRev : v.angel;
    return reversed ? v.demonRev : v.demon;
  }
  return reversed ? card.meaningRev : card.meaning;
}

export function hasVoice(cardId: string): boolean {
  return cardId in voiceTexts;
}
