import { motion } from "framer-motion";
import type { SpreadDefinition } from "../../data/spreads";
import type { DrawnCard } from "../../utils/tarot";
import { TarotCardView } from "../TarotCardView";

/**
 * 'revealing' / 'done' phase에서 노출되는 보드.
 * 선택한 카드들을 스프레드 모양에 맞춰 줄세우고,
 * 클릭 시 한 장씩 뒤집을 수 있게 한다.
 */
export function SpreadBoard({
  spread,
  cards,
  revealed,
  onClickCard,
}: {
  spread: SpreadDefinition;
  cards: DrawnCard[];
  revealed: boolean[];
  onClickCard: (i: number) => void;
}) {
  if (cards.length === 0) return null;
  const colsClass =
    spread.count === 1 ? "cols-1" : spread.count === 3 ? "cols-3" : "cols-5";
  const size = spread.count >= 5 ? "sm" : spread.count >= 3 ? "md" : "lg";

  return (
    <div className={`spread-row ${colsClass}`}>
      {cards.map((c, i) => (
        <motion.div
          className="slot"
          key={i}
          initial={{ opacity: 0, y: -40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: i * 0.12,
            ease: [0.2, 0.7, 0.2, 1],
          }}
        >
          <span className="position-label">{spread.positions[i]?.label}</span>
          <div className={`card-wrap ${revealed[i] ? "is-revealed" : ""}`}>
            <TarotCardView
              drawn={c}
              revealed={revealed[i] ?? false}
              onClick={() => onClickCard(i)}
              size={size}
              delay={0}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
