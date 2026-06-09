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
      whileHover={interactive ? { y: -6 } : undefined}
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow:
              "0 18px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(196,167,230,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <CardBack />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: `rotateY(180deg) ${reversed ? "rotate(180deg)" : ""}`,
            borderRadius: 14,
            overflow: "hidden",
            background: "#0a0420",
            border: "1px solid rgba(233, 196, 106, 0.45)",
            boxShadow:
              "0 18px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(196,167,230,0.12), 0 0 22px rgba(233, 196, 106, 0.18)",
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
