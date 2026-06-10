/**
 * Reading 페이지 공용 타입.
 *
 * Phase: 카드 뽑기 흐름의 단계 머신.
 *   ask → shuffling → picking → revealing → done
 */
export type Phase = "ask" | "shuffling" | "picking" | "revealing" | "done";
