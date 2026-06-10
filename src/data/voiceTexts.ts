/**
 * Backward-compatible shim.
 *
 * 실제 데이터는 ./voice/{angel,demon}.ts 로 분리되어 있고,
 * 합치는 로직과 헬퍼는 ./voice/index.ts 에 있다.
 *
 * 기존 import 경로 ("../data/voiceTexts") 를 깨지 않기 위해 re-export 만 유지한다.
 * 새 코드에서는 가능하면 "../data/voice" 를 직접 사용한다.
 */
export type { WawaMode, CardVoice } from "./voice";
export { voiceTexts, getVoice, hasVoice } from "./voice";
