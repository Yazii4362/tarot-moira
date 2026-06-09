interface CardBackProps {
  className?: string;
}

export function CardBack({ className }: CardBackProps) {
  return (
    <svg
      viewBox="0 0 200 320"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="와와타로 카드 뒷면"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        {/* 와와 톤: 살구→코랄→다크 와인 */}
        <linearGradient id="cb-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fecdd3" />
          <stop offset="55%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#4a1023" />
        </linearGradient>
        <radialGradient id="cb-glow" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="rgba(253, 230, 138, 0.55)" />
          <stop offset="60%" stopColor="rgba(254, 205, 211, 0.18)" />
          <stop offset="100%" stopColor="rgba(254, 205, 211, 0)" />
        </radialGradient>
        <radialGradient id="cb-mark" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255, 247, 237, 0.95)" />
          <stop offset="100%" stopColor="rgba(253, 230, 138, 0.9)" />
        </radialGradient>
      </defs>

      <rect width="200" height="320" rx="24" ry="24" fill="url(#cb-bg)" />

      {/* 외곽 골드 라인 */}
      <rect
        x="6"
        y="6"
        width="188"
        height="308"
        rx="20"
        ry="20"
        fill="none"
        stroke="rgba(253, 230, 138, 0.7)"
        strokeWidth="1"
      />
      <rect
        x="14"
        y="14"
        width="172"
        height="292"
        rx="16"
        ry="16"
        fill="none"
        stroke="rgba(255, 247, 237, 0.5)"
        strokeWidth="0.7"
      />

      {/* 중앙 글로우 */}
      <rect width="200" height="320" rx="24" ry="24" fill="url(#cb-glow)" />

      {/* 점성 모티프 — 와와 양각 (별 + 동심원) */}
      <g
        transform="translate(100 150)"
        stroke="rgba(255, 247, 237, 0.78)"
        fill="none"
        strokeWidth="1"
      >
        <circle r="46" />
        <circle r="34" opacity="0.7" />
        <circle r="22" opacity="0.5" />
        <g strokeWidth="0.8" opacity="0.85">
          <line x1="0" y1="-52" x2="0" y2="52" />
          <line x1="-52" y1="0" x2="52" y2="0" />
          <line x1="-37" y1="-37" x2="37" y2="37" />
          <line x1="-37" y1="37" x2="37" y2="-37" />
        </g>
        <circle r="7" fill="url(#cb-mark)" stroke="none" />
        <g fill="rgba(253, 230, 138, 0.95)" stroke="none">
          <circle cx="0" cy="-52" r="2.2" />
          <circle cx="0" cy="52" r="2.2" />
          <circle cx="-52" cy="0" r="2.2" />
          <circle cx="52" cy="0" r="2.2" />
          <circle cx="-37" cy="-37" r="1.5" />
          <circle cx="37" cy="37" r="1.5" />
          <circle cx="-37" cy="37" r="1.5" />
          <circle cx="37" cy="-37" r="1.5" />
        </g>
      </g>

      {/* 와와 마스코트 — 작은 악마 치와와 실루엣 (중앙 하단) */}
      <g transform="translate(100 232)" opacity="0.92">
        {/* 작은 뿔 */}
        <path
          d="M -10 -20 L -7 -28 L -3 -22 Z"
          fill="rgba(253, 230, 138, 0.95)"
        />
        <path
          d="M 10 -20 L 7 -28 L 3 -22 Z"
          fill="rgba(253, 230, 138, 0.95)"
        />
        {/* 머리 */}
        <ellipse
          cx="0"
          cy="-10"
          rx="13"
          ry="12"
          fill="rgba(255, 247, 237, 0.95)"
        />
        {/* 귀 */}
        <path
          d="M -13 -16 L -19 -8 L -10 -6 Z"
          fill="rgba(255, 247, 237, 0.92)"
        />
        <path
          d="M 13 -16 L 19 -8 L 10 -6 Z"
          fill="rgba(255, 247, 237, 0.92)"
        />
        {/* 눈 */}
        <circle cx="-4.5" cy="-11" r="1.6" fill="#1f0710" />
        <circle cx="4.5" cy="-11" r="1.6" fill="#1f0710" />
        <circle cx="-4.5" cy="-11.5" r="0.5" fill="rgba(255,247,237,0.9)" />
        <circle cx="4.5" cy="-11.5" r="0.5" fill="rgba(255,247,237,0.9)" />
        {/* 코 */}
        <ellipse cx="0" cy="-6" rx="1.4" ry="1" fill="#1f0710" />
        {/* 미소 */}
        <path
          d="M -3 -3 Q 0 -1 3 -3"
          fill="none"
          stroke="#1f0710"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </g>

      {/* 별빛 */}
      <g fill="rgba(255, 247, 237, 0.9)">
        <circle cx="40" cy="60" r="0.9" />
        <circle cx="160" cy="80" r="0.7" />
        <circle cx="55" cy="240" r="0.8" />
        <circle cx="150" cy="260" r="1" />
        <circle cx="100" cy="38" r="0.6" />
        <circle cx="100" cy="282" r="0.6" />
        <circle cx="30" cy="160" r="0.5" />
        <circle cx="170" cy="160" r="0.5" />
        <circle cx="78" cy="100" r="0.45" />
        <circle cx="124" cy="120" r="0.5" />
        <circle cx="68" cy="220" r="0.55" />
        <circle cx="138" cy="210" r="0.45" />
      </g>

      {/* 하단 브랜드 마크 */}
      <text
        x="100"
        y="298"
        textAnchor="middle"
        fontFamily="'SacheonUniverse', serif"
        fontSize="9"
        letterSpacing="3"
        fill="rgba(255, 247, 237, 0.78)"
      >
        WAWATAROT
      </text>
    </svg>
  );
}
