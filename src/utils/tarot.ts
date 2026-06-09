import type { TarotCard } from "../data/tarotCards";
import { tarotCards } from "../data/tarotCards";

export interface DrawnCard {
  card: TarotCard;
  reversed: boolean;
}

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function drawCards(
  count: number,
  options?: { allowReversed?: boolean }
): DrawnCard[] {
  const allowReversed = options?.allowReversed ?? true;
  const deck = shuffle(tarotCards).slice(0, count);
  return deck.map((card) => ({
    card,
    reversed: allowReversed ? Math.random() < 0.5 : false,
  }));
}

export function buildPickPool(
  spreadCount: number,
  options?: { poolSize?: number; allowReversed?: boolean }
): DrawnCard[] {
  const poolSize =
    options?.poolSize ?? Math.max(spreadCount + 4, Math.min(9, 78));
  return drawCards(poolSize, { allowReversed: options?.allowReversed });
}
