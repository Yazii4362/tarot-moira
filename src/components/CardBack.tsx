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
      aria-label="타로 카드 뒷면"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id="cb-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a1758" />
          <stop offset="60%" stopColor="#170a35" />
          <stop offset="100%" stopColor="#0a0420" />
        </linearGradient>
        <radialGradient id="cb-glow" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor="rgba(233, 196, 106, 0.45)" />
          <stop offset="100%" stopColor="rgba(233, 196, 106, 0)" />
        </radialGradient>
      </defs>
      <rect width="200" height="320" rx="14" ry="14" fill="url(#cb-bg)" />
      <rect
        x="6"
        y="6"
        width="188"
        height="308"
        rx="10"
        ry="10"
        fill="none"
        stroke="rgba(233, 196, 106, 0.55)"
        strokeWidth="1"
      />
      <rect
        x="14"
        y="14"
        width="172"
        height="292"
        rx="8"
        ry="8"
        fill="none"
        stroke="rgba(233, 196, 106, 0.25)"
        strokeWidth="0.7"
      />
      <rect width="200" height="320" rx="14" ry="14" fill="url(#cb-glow)" />
      <g transform="translate(100 160)" stroke="rgba(233, 196, 106, 0.85)" fill="none" strokeWidth="1">
        <circle r="44" />
        <circle r="34" />
        <circle r="24" opacity="0.7" />
        <g strokeWidth="0.8">
          <line x1="0" y1="-50" x2="0" y2="50" />
          <line x1="-50" y1="0" x2="50" y2="0" />
          <line x1="-35" y1="-35" x2="35" y2="35" />
          <line x1="-35" y1="35" x2="35" y2="-35" />
        </g>
        <circle r="6" fill="rgba(233, 196, 106, 0.85)" stroke="none" />
        <g fill="rgba(233, 196, 106, 0.95)" stroke="none">
          <circle cx="0" cy="-50" r="2" />
          <circle cx="0" cy="50" r="2" />
          <circle cx="-50" cy="0" r="2" />
          <circle cx="50" cy="0" r="2" />
          <circle cx="-35" cy="-35" r="1.5" />
          <circle cx="35" cy="35" r="1.5" />
          <circle cx="-35" cy="35" r="1.5" />
          <circle cx="35" cy="-35" r="1.5" />
        </g>
      </g>
      <g fill="rgba(255,255,255,0.65)">
        <circle cx="40" cy="60" r="0.8" />
        <circle cx="160" cy="80" r="0.6" />
        <circle cx="55" cy="240" r="0.7" />
        <circle cx="150" cy="260" r="0.9" />
        <circle cx="100" cy="40" r="0.6" />
        <circle cx="100" cy="280" r="0.6" />
        <circle cx="30" cy="160" r="0.5" />
        <circle cx="170" cy="160" r="0.5" />
      </g>
    </svg>
  );
}
