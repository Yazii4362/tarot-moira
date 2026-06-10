export type WawaMascotMode = "pair" | "angel" | "demon";

interface WawaMascotProps {
  className?: string;
  mode?: WawaMascotMode;
  /** 그림자 표시 여부 (기본 true) */
  shadow?: boolean;
}

const SRC: Record<WawaMascotMode, string> = {
  pair: "/images/wawa/wawa-pair.webp",
  angel: "/images/wawa/wawa-angel.webp",
  demon: "/images/wawa/wawa-demon.webp",
};

const ALT: Record<WawaMascotMode, string> = {
  pair: "와와 — 천사와와와 악마와와가 함께 있는 모습",
  angel: "천사와와 — 가능성을 보는 시선",
  demon: "악마와와 — 리스크를 보는 시선",
};

/**
 * 와와 마스코트
 * mode 에 따라 천사+악마 페어 / 천사 단독 / 악마 단독을 렌더링.
 */
export function WawaMascot({
  className,
  mode = "pair",
  shadow = true,
}: WawaMascotProps) {
  return (
    <img
      className={className}
      src={SRC[mode]}
      alt={ALT[mode]}
      draggable={false}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        display: "block",
        filter: shadow
          ? "drop-shadow(0 18px 22px rgba(26, 58, 92, 0.28)) drop-shadow(0 4px 8px rgba(26, 58, 92, 0.18))"
          : undefined,
        userSelect: "none",
      }}
    />
  );
}
