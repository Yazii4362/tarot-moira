import { useMemo } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  symbol: string;
  color: string;
}

const SYMBOLS = ["✦", "✧", "·", "◦", "✦", "★", "✺"];
const COLORS = [
  "rgba(253, 164, 175, 0.6)",
  "rgba(254, 205, 211, 0.55)",
  "rgba(253, 230, 138, 0.6)",
  "rgba(251, 113, 133, 0.45)",
  "rgba(255, 247, 237, 0.55)",
];

function makeStars(count: number, seed = 1): Star[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100,
    size: 6 + rand() * 14,
    delay: rand() * 8,
    duration: 6 + rand() * 8,
    symbol: SYMBOLS[Math.floor(rand() * SYMBOLS.length)],
    color: COLORS[Math.floor(rand() * COLORS.length)],
  }));
}

export function StarField({ count = 26 }: { count?: number }) {
  const stars = useMemo(() => makeStars(count), [count]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {stars.map((star) => (
        <motion.span
          key={star.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: [0, 0.9, 0],
            y: [0, -22, -44],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            fontSize: star.size,
            color: star.color,
            lineHeight: 1,
            userSelect: "none",
            textShadow: "0 0 12px currentColor",
          }}
        >
          {star.symbol}
        </motion.span>
      ))}
    </div>
  );
}
