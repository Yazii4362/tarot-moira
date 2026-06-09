import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { spreads } from "../data/spreads";
import { CardBack } from "../components/CardBack";

export function Home() {
  return (
    <div>
      <HeroSection />
      <SpreadSection />
      <CtaBanner />
    </div>
  );
}

function CtaBanner() {
  return (
    <motion.section
      className="cta-banner"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <span className="cta-banner__symbol">✦ 🐕 ✦</span>
      <h2>
        와와는 <em>편들지 않습니다</em>
      </h2>
      <p>
        원하는 답보다 필요한 해석을. 카드는 거짓말을 못해요.
        <br />한 장만 뽑아도 충분히 솔직한 이야기를 들을 수 있습니다.
      </p>
      <Link to="/reading/one" className="btn btn-primary">
        🐕 와와에게 카드 한 장 받기
      </Link>
    </motion.section>
  );
}

function HeroSection() {
  return (
    <section className="hero hero--showcase">
      <div className="hero__orbs" aria-hidden="true">
        <span className="hero__orb hero__orb--a" />
        <span className="hero__orb hero__orb--b" />
        <span className="hero__orb hero__orb--c" />
      </div>

      <div className="hero__floating" aria-hidden="true">
        <motion.div
          className="hero__floating-card hero__floating-card--left"
          initial={{ opacity: 0, x: -40, rotate: -28 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -10, 0],
            rotate: [-18, -22, -18],
          }}
          transition={{
            opacity: { duration: 1, ease: "easeOut" },
            x: { duration: 1, ease: "easeOut" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <CardBack />
        </motion.div>
        <motion.div
          className="hero__floating-card hero__floating-card--center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: [0, -14, 0] }}
          transition={{
            opacity: { duration: 1, delay: 0.15, ease: "easeOut" },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <CardBack />
        </motion.div>
        <motion.div
          className="hero__floating-card hero__floating-card--right"
          initial={{ opacity: 0, x: 40, rotate: 28 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -8, 0],
            rotate: [18, 22, 18],
          }}
          transition={{
            opacity: { duration: 1, delay: 0.3, ease: "easeOut" },
            x: { duration: 1, delay: 0.3, ease: "easeOut" },
            y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <CardBack />
        </motion.div>
      </div>

      <span className="eyebrow">🐕 WAWATAROT · 까칠한 동네 치와와 철학자</span>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        카드가 <em>보여준 만큼만</em> 말하겠습니다.
      </motion.h1>

      <motion.p
        className="lead"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
      >
        희망사항 말고 가능성을 봅니다. 듣기 좋은 말은 전문이 아닙니다.
        <br />
        78장의 카드가 조용히 기다리고 있어요. 질문 하나만 마음에 담아보세요.
      </motion.p>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        aria-hidden="true"
      >
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text">Scroll</span>
      </motion.div>
    </section>
  );
}

function SpreadSection() {
  return (
    <section className="spread-section">
      <div className="section-eyebrow">Spreads</div>
      <h2 className="section-title">
        오늘 와와에게 묻고 싶은 <span>스프레드</span>
      </h2>

      <div className="spread-grid">
        {spreads.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          >
            <Link to={`/reading/${s.id}`} className="spread-card">
              <span className="spread-card__index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <SpreadMiniCards count={s.count} />

              <div className="spread-card__body">
                <span className="count">
                  {s.count} CARD{s.count > 1 ? "S" : ""} · {s.subtitle}
                </span>
                <h2>{s.name}</h2>
                <p className="desc">{s.description}</p>
                <span className="cta">시작하기 →</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SpreadMiniCards({ count }: { count: number }) {
  const cards = Array.from({ length: count });
  return (
    <div className={`spread-card__mini cols-${count}`} aria-hidden="true">
      {cards.map((_, i) => (
        <span
          key={i}
          className="mini-card"
          style={{
            animationDelay: `${i * 0.18}s`,
          }}
        >
          <span className="mini-card__inner" />
        </span>
      ))}
    </div>
  );
}
