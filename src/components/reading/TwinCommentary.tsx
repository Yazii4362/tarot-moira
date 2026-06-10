import { motion } from "framer-motion";
import type { SpreadDefinition } from "../../data/spreads";
import type { DrawnCard } from "../../utils/tarot";
import { getVoice } from "../../data/voiceTexts";

/**
 * 결과 페이지 본체 — 천사/악마 두 시선을 좌우로 나란히 보여주는 트윈 패널.
 *
 *  ┌────────────────┐  ┌────────────────┐
 *  │ 😇 천사와와    │  │ 😈 악마와와    │
 *  │  3장 voice     │  │  3장 voice     │
 *  │  하이라이트 인용│  │  하이라이트 인용│
 *  │  픽셀 메터 ×3  │  │  픽셀 메터 ×3  │
 *  └────────────────┘  └────────────────┘
 *
 * - 카드 갯수에 상관 없이(1/3/5) 카드별 voice 를 한 줄씩 풀어 보여준다.
 * - 메터 점수는 카드 정/역 비율 + 슈트 분포로 결정 (deterministic).
 * - 데스크톱: 좌우 2컬럼 / 모바일: 천사 위, 악마 아래로 스택.
 */
export function TwinCommentary({
  spread,
  cards,
}: {
  spread: SpreadDefinition;
  cards: DrawnCard[];
}) {
  const focalIdx = Math.floor(cards.length / 2);
  const focal = cards[focalIdx];
  const focalAngel = focal ? getVoice(focal.card, "angel", focal.reversed) : "";
  const focalDemon = focal ? getVoice(focal.card, "demon", focal.reversed) : "";

  const scores = buildTwinScores(cards);
  const labels = getMetricLabels(spread.id);

  return (
    <div className="twin-commentary">
      <CommentaryPanel
        side="angel"
        title="천사와와의 해석"
        tagline="희망과 가능성을 이야기해줄게!"
        spread={spread}
        cards={cards}
        focalQuote={focalAngel}
        meters={[
          { label: labels.angel[0], value: scores.angel.a },
          { label: labels.angel[1], value: scores.angel.b },
          { label: labels.angel[2], value: scores.angel.c },
        ]}
        delay={0.05}
      />

      <CommentaryPanel
        side="demon"
        title="악마와와의 현실 조언"
        tagline="현실을 직시하게 도와줄게!"
        spread={spread}
        cards={cards}
        focalQuote={focalDemon}
        meters={[
          { label: labels.demon[0], value: scores.demon.a },
          { label: labels.demon[1], value: scores.demon.b },
          { label: labels.demon[2], value: scores.demon.c },
        ]}
        delay={0.18}
      />
    </div>
  );
}

/* ───────── Panel ───────── */

interface PanelMeter {
  label: string;
  value: number;
}

function CommentaryPanel({
  side,
  title,
  tagline,
  spread,
  cards,
  focalQuote,
  meters,
  delay,
}: {
  side: "angel" | "demon";
  title: string;
  tagline: string;
  spread: SpreadDefinition;
  cards: DrawnCard[];
  focalQuote: string;
  meters: PanelMeter[];
  delay: number;
}) {
  return (
    <motion.article
      className={`commentary commentary--${side}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <header className="commentary__head">
        <WawaAvatar side={side} />
        <div className="commentary__head-text">
          <h3 className="commentary__title">{title}</h3>
          <p className="commentary__tagline">{tagline}</p>
        </div>
      </header>

      <div className="commentary__body">
        {cards.map(({ card, reversed }, i) => {
          const text = getVoice(card, side, reversed);
          const pos = spread.positions[i];
          return (
            <p key={card.id + i} className="commentary__line">
              <span className="commentary__line-label">
                {pos?.label ?? `카드 ${i + 1}`} · {card.name}
                {reversed && <span className="commentary__line-rev">역</span>}
              </span>
              <span className="commentary__line-text">{text}</span>
            </p>
          );
        })}
      </div>

      <blockquote className={`commentary__quote commentary__quote--${side}`}>
        "{focalQuote}"
      </blockquote>

      <div className="commentary__meters" role="list">
        {meters.map((m) => (
          <PixelMeter
            key={m.label}
            label={m.label}
            value={m.value}
            side={side}
          />
        ))}
      </div>
    </motion.article>
  );
}

/* ───────── Avatar ───────── */

const AVATAR_SRC: Record<"angel" | "demon", string> = {
  angel: "/images/wawa/angel.webp",
  demon: "/images/wawa/devil.webp",
};

const AVATAR_ALT: Record<"angel" | "demon", string> = {
  angel: "천사와와",
  demon: "악마와와",
};

function WawaAvatar({ side }: { side: "angel" | "demon" }) {
  return (
    <div className={`wawa-avatar wawa-avatar--${side}`}>
      <img
        className="wawa-avatar__img"
        src={AVATAR_SRC[side]}
        alt={AVATAR_ALT[side]}
        draggable={false}
      />
    </div>
  );
}

/* ───────── Pixel Meter ───────── */

function PixelMeter({
  label,
  value,
  side,
}: {
  label: string;
  value: number;
  side: "angel" | "demon";
}) {
  const filled = Math.max(0, Math.min(5, value));
  return (
    <div className={`pixel-meter pixel-meter--${side}`} role="listitem">
      <span className="pixel-meter__label">{label}</span>
      <div className="pixel-meter__cells" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`pixel-meter__cell ${i < filled ? "is-filled" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ───────── Metric labels ───────── */

function getMetricLabels(spreadId: string): {
  angel: [string, string, string];
  demon: [string, string, string];
} {
  if (spreadId === "love") {
    return {
      angel: ["성공 가능성", "상대방 마음", "타이밍"],
      demon: ["리스크 수준", "감정 소모", "현실 가능성"],
    };
  }
  if (spreadId === "five") {
    return {
      angel: ["가능성", "지원세", "타이밍"],
      demon: ["리스크", "에너지 소모", "변수"],
    };
  }
  return {
    angel: ["가능성", "흐름", "타이밍"],
    demon: ["리스크", "감정 소모", "현실 부담"],
  };
}

/* ───────── Score derivation ─────────
 *
 * 카드 정/역 비율 + 메이저/슈트 분포로 1~5 사이 스코어를 결정.
 * deterministic 하므로 같은 카드 셋이면 항상 같은 메터.
 */

interface TwinScores {
  angel: { a: number; b: number; c: number };
  demon: { a: number; b: number; c: number };
}

function buildTwinScores(cards: DrawnCard[]): TwinScores {
  const total = Math.max(1, cards.length);
  const upright = cards.filter((c) => !c.reversed).length;
  const ratio = upright / total;

  const cnt = (prefix: string) =>
    cards.filter((c) => c.card.id.startsWith(prefix)).length;
  const major = cnt("major_");
  const cups = cnt("cups_");
  const wands = cnt("wands_");
  const swords = cnt("swords_");
  const pentacles = cnt("pentacles_");

  const clamp = (v: number) => Math.max(1, Math.min(5, Math.round(v)));

  // Angel
  const possibility = clamp(2 + ratio * 3 + (major > 0 ? 0.5 : 0));
  const flow = clamp(2 + cups * 0.8 + (major > 0 ? 0.6 : 0) + ratio * 1.4);
  const timing = clamp(
    2 + wands * 0.7 + (swords > 0 ? 0.4 : 0) + ratio * 1.2
  );

  // Demon
  const reversedRatio = 1 - ratio;
  const risk = clamp(2 + reversedRatio * 2.5 + swords * 0.6);
  const emotionalCost = clamp(
    2 + swords * 0.6 + reversedRatio * 1.8 + cups * 0.4
  );
  const reality = clamp(
    2 + pentacles * 0.7 + (major === 0 ? 0.6 : 0) + reversedRatio * 1.4
  );

  return {
    angel: { a: possibility, b: flow, c: timing },
    demon: { a: risk, b: emotionalCost, c: reality },
  };
}
