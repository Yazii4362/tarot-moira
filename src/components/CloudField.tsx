import { useMemo } from "react";
import { motion } from "framer-motion";

interface Cloud {
  id: number;
  topPct: number;
  size: number;
  delay: number;
  duration: number;
  startXVw: number;
  variant: 0 | 1 | 2;
  opacity: number;
}

function makeClouds(count: number, seed = 7): Cloud[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    topPct: 4 + rand() * 78,
    size: 90 + rand() * 160,
    delay: rand() * -55,
    duration: 42 + rand() * 38,
    startXVw: -25 - rand() * 20,
    variant: (Math.floor(rand() * 3) % 3) as 0 | 1 | 2,
    opacity: 0.7 + rand() * 0.3,
  }));
}

/**
 * 로우폴리 3D 구름 — 외곽선 없이 부드러운 라디얼 그라디언트로 입체감 표현
 * 위쪽 흰색, 아래쪽 옅은 청회색 그림자, 살짝 dropshadow
 */
function CloudShape({ variant, size }: { variant: 0 | 1 | 2; size: number }) {
  const dropShadow = "drop-shadow(0 8px 6px rgba(40, 90, 130, 0.15))";

  if (variant === 0) {
    // 통통한 가로 구름 (3덩어리)
    return (
      <svg
        viewBox="0 0 220 120"
        width={size}
        height={size * 0.55}
        style={{ filter: dropShadow, display: "block" }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="cf0" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#f3f8fb" />
            <stop offset="100%" stopColor="#cad7e0" />
          </radialGradient>
        </defs>
        <g fill="url(#cf0)">
          <ellipse cx="60" cy="70" rx="42" ry="32" />
          <ellipse cx="115" cy="58" rx="55" ry="42" />
          <ellipse cx="170" cy="72" rx="38" ry="30" />
          {/* 추가 작은 봉우리들 — 로우폴리 면 흉내 */}
          <ellipse cx="90" cy="46" rx="22" ry="18" />
          <ellipse cx="140" cy="40" rx="20" ry="16" />
        </g>
      </svg>
    );
  }
  if (variant === 1) {
    // 길고 납작한 구름
    return (
      <svg
        viewBox="0 0 240 110"
        width={size}
        height={size * 0.5}
        style={{ filter: dropShadow, display: "block" }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="cf1" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#f3f8fb" />
            <stop offset="100%" stopColor="#bbcad6" />
          </radialGradient>
        </defs>
        <g fill="url(#cf1)">
          <ellipse cx="50" cy="68" rx="38" ry="28" />
          <ellipse cx="100" cy="56" rx="48" ry="36" />
          <ellipse cx="150" cy="58" rx="42" ry="32" />
          <ellipse cx="200" cy="70" rx="32" ry="26" />
          <ellipse cx="125" cy="40" rx="22" ry="16" />
          <ellipse cx="80" cy="44" rx="18" ry="14" />
        </g>
      </svg>
    );
  }
  // 작고 둥근 구름
  return (
    <svg
      viewBox="0 0 180 110"
      width={size * 0.85}
      height={size * 0.6}
      style={{ filter: dropShadow, display: "block" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="cf2" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f3f8fb" />
          <stop offset="100%" stopColor="#c2d0db" />
        </radialGradient>
      </defs>
      <g fill="url(#cf2)">
        <ellipse cx="55" cy="65" rx="35" ry="26" />
        <ellipse cx="100" cy="55" rx="44" ry="34" />
        <ellipse cx="135" cy="68" rx="32" ry="24" />
        <ellipse cx="85" cy="38" rx="20" ry="15" />
      </g>
    </svg>
  );
}

export function CloudField({ count = 7 }: { count?: number }) {
  const clouds = useMemo(() => makeClouds(count), [count]);

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
      {clouds.map((c) => (
        <motion.div
          key={c.id}
          initial={{ x: `${c.startXVw}vw` }}
          animate={{ x: "120vw" }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${c.topPct}%`,
            left: 0,
            opacity: c.opacity,
            willChange: "transform",
          }}
        >
          <CloudShape variant={c.variant} size={c.size} />
        </motion.div>
      ))}
    </div>
  );
}
