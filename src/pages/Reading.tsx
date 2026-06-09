import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getSpread } from "../data/spreads";
import type { DrawnCard } from "../utils/tarot";
import { drawCards } from "../utils/tarot";
import { TarotCardView } from "../components/TarotCardView";

type Phase = "ask" | "drawing" | "revealing" | "done";

export function Reading() {
  const { spreadId } = useParams<{ spreadId: string }>();
  const spread = useMemo(() => (spreadId ? getSpread(spreadId) : undefined), [spreadId]);

  const [phase, setPhase] = useState<Phase>("ask");
  const [question, setQuestion] = useState("");
  const [cards, setCards] = useState<DrawnCard[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>([]);

  if (!spread) {
    return (
      <div className="center-text" style={{ padding: 60 }}>
        <p>존재하지 않는 스프레드입니다.</p>
        <Link to="/" className="btn btn-ghost" style={{ marginTop: 16 }}>
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  const startDraw = () => {
    setPhase("drawing");
    const drawn = drawCards(spread.count);
    setCards(drawn);
    setRevealed(new Array(spread.count).fill(false));
    setTimeout(() => setPhase("revealing"), 900);
  };

  const revealAt = (i: number) => {
    setRevealed((prev) => {
      if (prev[i]) return prev;
      const next = [...prev];
      next[i] = true;
      const allRevealed = next.every(Boolean);
      if (allRevealed) {
        setTimeout(() => setPhase("done"), 700);
      }
      return next;
    });
  };

  const revealAll = () => {
    setRevealed(new Array(spread.count).fill(true));
    setTimeout(() => setPhase("done"), 700);
  };

  const reset = () => {
    setPhase("ask");
    setCards([]);
    setRevealed([]);
  };

  const reshuffle = () => {
    const drawn = drawCards(spread.count);
    setCards(drawn);
    setRevealed(new Array(spread.count).fill(false));
    setPhase("revealing");
  };

  return (
    <div className="reading">
      <section className="hero" style={{ paddingBottom: 0 }}>
        <span className="eyebrow">{spread.subtitle}</span>
        <h1>{spread.name}</h1>
        <p className="lead">{spread.description}</p>
      </section>

      {phase === "ask" && (
        <motion.div
          className="question-bar"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <label htmlFor="q">마음속 질문 (선택)</label>
          <input
            id="q"
            type="text"
            placeholder="예) 지금의 관계에서 내가 놓치고 있는 건 무엇일까?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={120}
          />
          <div className="row">
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
              질문 없이도 카드를 뽑을 수 있어요
            </span>
            <span className="spacer" />
            <Link to="/" className="btn btn-ghost">
              취소
            </Link>
            <button type="button" className="btn btn-primary" onClick={startDraw}>
              카드 뽑기
            </button>
          </div>
        </motion.div>
      )}

      {phase === "drawing" && (
        <div className="deck-stage">
          <div className="deck">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="deck-card"
                initial={{ y: 0, x: 0, rotate: 0 }}
                animate={{
                  y: [-1 * i, -2 * i],
                  x: [i, -i],
                  rotate: [-i, i],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.05,
                }}
                style={{ transform: `translateY(${i * 2}px)` }}
              />
            ))}
          </div>
          <p className="deck-hint">카드를 섞고 있어요…</p>
        </div>
      )}

      {(phase === "revealing" || phase === "done") && (
        <AnimatePresence mode="wait">
          <motion.div
            key="stage"
            className="spread-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SpreadBoard
              spread={spread}
              cards={cards}
              revealed={revealed}
              onClickCard={revealAt}
            />

            {phase === "revealing" && (
              <div className="actions-row">
                <p className="center-text" style={{ width: "100%", marginBottom: 4 }}>
                  카드를 클릭해 한 장씩 뒤집어 보세요
                </p>
                <button type="button" className="btn btn-ghost" onClick={revealAll}>
                  모두 뒤집기
                </button>
              </div>
            )}

            {phase === "done" && (
              <ReadingResult
                spread={spread}
                cards={cards}
                question={question}
                onReshuffle={reshuffle}
                onReset={reset}
              />
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

function SpreadBoard({
  spread,
  cards,
  revealed,
  onClickCard,
}: {
  spread: ReturnType<typeof getSpread> & object;
  cards: DrawnCard[];
  revealed: boolean[];
  onClickCard: (i: number) => void;
}) {
  if (cards.length === 0) return null;
  const colsClass =
    spread.count === 1 ? "cols-1" : spread.count === 3 ? "cols-3" : "cols-5";
  const size = spread.count >= 5 ? "sm" : spread.count >= 3 ? "md" : "lg";

  return (
    <div className={`spread-row ${colsClass}`}>
      {cards.map((c, i) => (
        <div className="slot" key={i}>
          <span className="position-label">{spread.positions[i]?.label}</span>
          <TarotCardView
            drawn={c}
            revealed={revealed[i] ?? false}
            onClick={() => onClickCard(i)}
            size={size}
            delay={i * 0.08}
          />
        </div>
      ))}
    </div>
  );
}

function ReadingResult({
  spread,
  cards,
  question,
  onReshuffle,
  onReset,
}: {
  spread: ReturnType<typeof getSpread> & object;
  cards: DrawnCard[];
  question: string;
  onReshuffle: () => void;
  onReset: () => void;
}) {
  return (
    <motion.section
      className="reading-summary"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header>
        <span className="meta">{spread.name} · {spread.subtitle}</span>
        {question && <p className="question">"{question}"</p>}
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {cards.map(({ card, reversed }, i) => {
          const keywords = reversed ? card.keywordsRev : card.keywords;
          const meaning = reversed ? card.meaningRev : card.meaning;
          const pos = spread.positions[i];
          return (
            <motion.article
              key={card.id + i}
              className="reading-card-detail"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <div className="thumb">
                <img
                  src={card.image}
                  alt={card.name}
                  style={{ transform: reversed ? "rotate(180deg)" : undefined }}
                />
              </div>
              <div>
                <p className="position">{pos?.label} · {pos?.hint}</p>
                <h3>
                  {card.name}
                  {reversed && <span className="reversed-tag">Reversed</span>}
                </h3>
                <p className="name-en">{card.nameEn}</p>
                <div className="keywords">
                  {keywords.map((k) => (
                    <span key={k}>{k}</span>
                  ))}
                </div>
                <p className="meaning">{meaning}</p>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="actions-row">
        <button type="button" className="btn btn-ghost" onClick={onReshuffle}>
          다시 뽑기
        </button>
        <button type="button" className="btn btn-primary" onClick={onReset}>
          질문 바꾸기
        </button>
        <Link to="/" className="btn btn-ghost">
          홈으로
        </Link>
      </div>
    </motion.section>
  );
}
