import { motion } from "framer-motion";
import type { DrawnCard } from "../utils/tarot";
import { CardBack } from "./CardBack";

interface TarotCardViewProps {
  drawn?: DrawnCard;
  revealed: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  delay?: number;
  ariaLabel?: string;
}

const SIZES: Record<NonNullable<TarotCardViewProps["size"]>, { w: number; h: number }> = {
  sm: { w: 110, h: 175 },
  md: { w: 160, h: 256 },
  lg: { w: 200, h: 320 },
};

export function TarotCardView({
  drawn,
  revealed,
  onClick,
  size = "md",
  delay = 0,
  ariaLabel,
}: TarotCardViewProps) {
  const dim = SIZES[size];
  const showFront = revealed && !!drawn;
  const reversed = drawn?.reversed ?? false;

  const interactive = !!onClick;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={!interactive}
      aria-label={
        ariaLabel ??
        (showFront ? `${drawn!.card.name}${reversed ? " (역방향)" : ""}` : "뒤집힌 타로 카드")
      }
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
      whileHover={
        interactive
          ? {
              y: -8,
              filter: "drop-shadow(0 0 24px rgba(245, 211, 106, 0.55))",
            }
          : undefined
      }
      whileTap={interactive ? { scale: 0.97 } : undefined}
      style={{
        width: dim.w,
        height: dim.h,
        perspective: 1400,
        background: "transparent",
        padding: 0,
        border: "none",
        cursor: interactive ? "pointer" : "default",
      }}
    >
      <motion.div
        animate={{ rotateY: showFront ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
        }}
      >
        {/* 뒷면 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: 18,
            overflow: "hidden",
            boxShadow:
              "0 14px 36px rgba(33, 80, 130, 0.32), 0 0 0 1px rgba(217, 169, 58, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
          }}
        >
          <CardBack />
        </div>
        {/* 앞면 — 사용자 카드 일러스트 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: `rotateY(180deg) ${reversed ? "rotate(180deg)" : ""}`,
            borderRadius: 18,
            overflow: "hidden",
            background: "#fcf2da",
            boxShadow:
              "0 18px 44px rgba(33, 80, 130, 0.32), 0 0 0 1.5px rgba(217, 169, 58, 0.55), inset 0 0 0 1px rgba(255, 230, 150, 0.6)",
          }}
        >
          {drawn && (
            <img
              src={drawn.card.image}
              alt={drawn.card.name}
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                userSelect: "none",
              }}
            />
          )}
        </div>
      </motion.div>
    </motion.button>
  );
}
