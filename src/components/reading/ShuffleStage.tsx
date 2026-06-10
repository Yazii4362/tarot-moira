import { useMemo } from "react";
import { motion } from "framer-motion";
import { CardBack } from "../CardBack";

/**
 * 'shuffling' phase 화면.
 * 7장 카드가 부채꼴로 흩어지고 모이는 무한 루프 + 랜덤 힌트 한 줄.
 */
const SHUFFLE_HINTS = [
  "🐕 와와가 카드 냄새 맡는 중...",
  "🐕 카드 섞는 중...",
  "🐕 악마력 충전 중...",
  "🐕 너무 좋은 결과는 의심하는 중...",
  "🐕 카드와 협상 중...",
  "🐕 듣기 좋은 말은 한 번 걸러내는 중...",
];

export function ShuffleStage() {
  const cards = [0, 1, 2, 3, 4, 5, 6];
  const hint = useMemo(
    () => SHUFFLE_HINTS[Math.floor(Math.random() * SHUFFLE_HINTS.length)],
    []
  );
  return (
    <div className="deck-stage">
      <div className="shuffle-fan" aria-hidden="true">
        {cards.map((i) => (
          <motion.div
            key={i}
            className="shuffle-card"
            initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
            animate={{
              opacity: 1,
              y: [0, -20, 0],
              x: [(i - 3) * 6, (i - 3) * 28, (i - 3) * 6],
              rotate: [(i - 3) * 3, (i - 3) * 15, (i - 3) * 3],
            }}
            transition={{
              opacity: { duration: 0.3, delay: i * 0.04 },
              duration: 1.6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: i * 0.04,
            }}
            style={{ zIndex: i }}
          >
            <CardBack />
          </motion.div>
        ))}
      </div>
      <motion.p
        className="deck-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        {hint}
      </motion.p>
    </div>
  );
}
