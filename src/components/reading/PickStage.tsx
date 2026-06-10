import { motion } from "framer-motion";
import type { DrawnCard } from "../../utils/tarot";
import { CardBack } from "../CardBack";

/**
 * 'picking' phase 화면.
 * 부채꼴로 펼쳐진 카드 풀에서 사용자가 직접 N장을 선택.
 * 선택이 모두 끝나면 부모에서 phase를 'revealing'으로 전환.
 */
export function PickStage({
  pool,
  pickedIdx,
  targetCount,
  onPick,
}: {
  pool: DrawnCard[];
  pickedIdx: number[];
  targetCount: number;
  onPick: (i: number) => void;
}) {
  const total = pool.length;
  const angleStep = total > 1 ? Math.min(8, 60 / (total - 1)) : 0;
  const startAngle = -((total - 1) * angleStep) / 2;
  const allPicked = pickedIdx.length >= targetCount;

  return (
    <motion.div
      className="pick-stage"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="pick-stage__head">
        <h2 className="pick-stage__title">
          🐕 마음 가는 카드를 골라보세요
        </h2>
        <p
          className="pick-stage__counter"
          style={{ color: "var(--c-text-muted)" }}
        >
          <strong>{pickedIdx.length}</strong>
          <span>/</span>
          <strong>{targetCount}</strong>
          <span style={{ marginLeft: 6 }}>장 — 와와는 재촉하지 않아요</span>
        </p>
      </div>

      <div className="pick-fan">
        {pool.map((_, i) => {
          const angle = startAngle + i * angleStep;
          const baseTransform = `rotate(${angle.toFixed(2)}deg)`;
          const isPicked = pickedIdx.includes(i);
          const dim = allPicked && !isPicked;
          return (
            <motion.div
              key={i}
              className={[
                "pick-card",
                isPicked ? "is-picked" : "",
                dim ? "is-dimmed" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                {
                  zIndex: i,
                  ["--pick-base-transform" as string]: baseTransform,
                } as React.CSSProperties
              }
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: "easeOut",
              }}
              onClick={() => !isPicked && !allPicked && onPick(i)}
              role="button"
              tabIndex={isPicked || dim ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (!isPicked && !allPicked) onPick(i);
                }
              }}
              aria-label={`카드 ${i + 1}`}
            >
              <div className="pick-card__inner">
                <CardBack />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
