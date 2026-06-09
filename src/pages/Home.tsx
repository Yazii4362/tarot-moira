import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { spreads } from "../data/spreads";

export function Home() {
  return (
    <div>
      <section className="hero">
        <span className="eyebrow">Moira · 운명의 여신</span>
        <h1>
          오늘의 카드를 펼쳐, <em>당신만의 이야기</em>를 들어보세요
        </h1>
        <p className="lead">
          78장의 타로 카드가 조용히 당신을 기다리고 있습니다. 마음속 질문 하나를 떠올리고,
          원하는 스프레드를 선택해 주세요. 카드는 진심에 가장 가까운 답을 들려줄 거예요.
        </p>
      </section>

      <section>
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>스프레드 선택</h2>
        <div className="spread-grid">
          {spreads.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link to={`/reading/${s.id}`} className="spread-card">
                <span className="count">
                  {s.count} CARD{s.count > 1 ? "S" : ""} · {s.subtitle}
                </span>
                <h2>{s.name}</h2>
                <p className="desc">{s.description}</p>
                <span className="cta">시작하기 →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
