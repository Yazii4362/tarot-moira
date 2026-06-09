interface WawaMascotProps {
  className?: string;
}

/**
 * 와와 마스코트 — 핑크/보라 튜투 입은 황토색 치와와
 * 큰 눈 + 단호한 한 일자 입 (단호박 직언 캐릭터)
 * 발치엔 보라 공.
 */
export function WawaMascot({ className }: WawaMascotProps) {
  return (
    <svg
      viewBox="0 0 240 300"
      className={className}
      role="img"
      aria-label="와와 — 까칠한 동네 치와와 철학자"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        {/* 털 그라디언트 (밝은 황토 → 짙은 황토) */}
        <linearGradient id="wm-fur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ecca94" />
          <stop offset="60%" stopColor="#d4a268" />
          <stop offset="100%" stopColor="#b8884a" />
        </linearGradient>
        <linearGradient id="wm-fur-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fae0b8" />
          <stop offset="100%" stopColor="#e8c388" />
        </linearGradient>
        {/* 흰 무늬 (가슴/입가) */}
        <radialGradient id="wm-white" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fffaf0" />
          <stop offset="100%" stopColor="#f5e8d0" />
        </radialGradient>
        {/* 튜투: 진한 보라 → 마젠타 → 핫핑크 → 페일 핑크 */}
        <linearGradient id="wm-tutu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="35%" stopColor="#a855f7" />
          <stop offset="65%" stopColor="#db2777" />
          <stop offset="100%" stopColor="#f9a8d4" />
        </linearGradient>
        {/* 보라 공 */}
        <radialGradient id="wm-ball" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#d4a8f0" />
          <stop offset="50%" stopColor="#9d5bc8" />
          <stop offset="100%" stopColor="#5b21b6" />
        </radialGradient>
        {/* 발 그림자 */}
        <radialGradient id="wm-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(40, 90, 130, 0.32)" />
          <stop offset="100%" stopColor="rgba(40, 90, 130, 0)" />
        </radialGradient>
      </defs>

      {/* 발치 그림자 */}
      <ellipse cx="120" cy="285" rx="78" ry="9" fill="url(#wm-shadow)" />

      {/* === 뒷다리 (살짝 가려짐) === */}
      <ellipse cx="92" cy="252" rx="11" ry="22" fill="url(#wm-fur)" />
      <ellipse cx="92" cy="270" rx="11" ry="10" fill="url(#wm-white)" />

      <ellipse cx="148" cy="252" rx="11" ry="22" fill="url(#wm-fur)" />
      <ellipse cx="148" cy="270" rx="11" ry="10" fill="url(#wm-white)" />

      {/* === 몸통 === */}
      <ellipse cx="120" cy="200" rx="38" ry="38" fill="url(#wm-fur)" />
      {/* 가슴 흰무늬 */}
      <ellipse cx="120" cy="210" rx="20" ry="26" fill="url(#wm-white)" />

      {/* === 튜투 === */}
      {/* 허리 위쪽 진한 보라 밴드 */}
      <ellipse cx="120" cy="208" rx="42" ry="7" fill="#6d28d9" />
      <ellipse cx="120" cy="206" rx="42" ry="3" fill="#a855f7" />

      {/* 펼쳐진 튜투 스커트 (지그재그 끝) */}
      <path
        d="M 78 208
           Q 65 235 56 248
           L 70 244 L 64 256
           L 84 250 L 80 262
           L 100 256 L 98 268
           L 120 264 L 142 268
           L 140 256 L 160 262
           L 156 250 L 176 256
           L 170 244 L 184 248
           Q 175 235 162 208
           Z"
        fill="url(#wm-tutu)"
      />
      {/* 튜투 광택 라인 */}
      <path
        d="M 86 215 Q 95 230 92 248"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 154 215 Q 145 230 148 248"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* === 보라 공 (캐릭터 앞) === */}
      <circle cx="138" cy="246" r="13" fill="url(#wm-ball)" />
      <ellipse
        cx="134"
        cy="241"
        rx="4"
        ry="3"
        fill="rgba(255,255,255,0.65)"
      />

      {/* === 앞발 (튜투 아래로 약간 보임) === */}
      <ellipse cx="100" cy="278" rx="11" ry="8" fill="url(#wm-white)" />
      <ellipse cx="140" cy="278" rx="11" ry="8" fill="url(#wm-white)" />

      {/* === 머리 === */}
      {/* 머리 본체 */}
      <ellipse cx="120" cy="125" rx="44" ry="46" fill="url(#wm-fur)" />
      {/* 머리 하이라이트 (위쪽) */}
      <ellipse
        cx="115"
        cy="100"
        rx="24"
        ry="14"
        fill="url(#wm-fur-light)"
        opacity="0.7"
      />

      {/* === 귀 === */}
      {/* 좌 귀 */}
      <path
        d="M 82 95 L 60 35 L 100 78 Z"
        fill="url(#wm-fur)"
      />
      <path
        d="M 86 88 L 73 55 L 96 78 Z"
        fill="#f4a8c4"
        opacity="0.85"
      />
      {/* 우 귀 */}
      <path
        d="M 158 95 L 180 35 L 140 78 Z"
        fill="url(#wm-fur)"
      />
      <path
        d="M 154 88 L 167 55 L 144 78 Z"
        fill="#f4a8c4"
        opacity="0.85"
      />

      {/* 입주변 흰 마스크 (M자) */}
      <path
        d="M 96 142
           Q 105 165 120 158
           Q 135 165 144 142
           Q 130 152 120 152
           Q 110 152 96 142 Z"
        fill="url(#wm-white)"
      />

      {/* === 눈 === */}
      {/* 좌 */}
      <ellipse cx="100" cy="128" rx="8.5" ry="9" fill="#1a1a2e" />
      <circle cx="100" cy="128" r="6.5" fill="#0a0a1f" />
      <circle cx="98" cy="125" r="2.4" fill="#ffffff" />
      <circle cx="102" cy="131" r="1.1" fill="rgba(255,255,255,0.6)" />
      {/* 우 */}
      <ellipse cx="140" cy="128" rx="8.5" ry="9" fill="#1a1a2e" />
      <circle cx="140" cy="128" r="6.5" fill="#0a0a1f" />
      <circle cx="138" cy="125" r="2.4" fill="#ffffff" />
      <circle cx="142" cy="131" r="1.1" fill="rgba(255,255,255,0.6)" />

      {/* === 코 === */}
      <ellipse cx="120" cy="148" rx="4.5" ry="3.2" fill="#1a1a2e" />
      <ellipse
        cx="119"
        cy="146.5"
        rx="1.5"
        ry="1"
        fill="rgba(255,255,255,0.5)"
      />

      {/* === 입 (단호한 한 일자) === */}
      <path
        d="M 108 162 L 132 162"
        stroke="#1a1a2e"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* 입 양 끝 살짝 처짐 — 단호 표현 */}
      <path
        d="M 108 162 L 105 165"
        stroke="#1a1a2e"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 132 162 L 135 165"
        stroke="#1a1a2e"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* === 볼 홍조 (살짝 핑크) === */}
      <ellipse
        cx="86"
        cy="148"
        rx="6"
        ry="4"
        fill="rgba(255, 133, 194, 0.4)"
      />
      <ellipse
        cx="154"
        cy="148"
        rx="6"
        ry="4"
        fill="rgba(255, 133, 194, 0.4)"
      />
    </svg>
  );
}
