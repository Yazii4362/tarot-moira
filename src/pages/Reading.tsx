import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getSpread } from "../data/spreads";
import type { DrawnCard } from "../utils/tarot";
import { buildPickPool } from "../utils/tarot";
import { TarotCardView } from "../components/TarotCardView";
import { CardBack } from "../components/CardBack";
import { buildIntensity, buildLucky } from "../utils/fortuneFlavors";
import type { WawaMode } from "../data/voiceTexts";
import { getVoice } from "../data/voiceTexts";

type ResultView = WawaMode | "both";

type Phase = "ask" | "shuffling" | "picking" | "revealing" | "done";

export function Reading() {
  const { spreadId } = useParams<{ spreadId: string }>();
  const spread = useMemo(
    () => (spreadId ? getSpread(spreadId) : undefined),
    [spreadId]
  );

  const [phase, setPhase] = useState<Phase>("ask");
  const [question, setQuestion] = useState("");
  const [pool, setPool] = useState<DrawnCard[]>([]);
  const [pickedIdx, setPickedIdx] = useState<number[]>([]);
  const [cards, setCards] = useState<DrawnCard[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>([]);
  // null = 모드 선택 전, 그 외 = 선택된 결과 시점
  const [resultView, setResultView] = useState<ResultView | null>(null);

  if (!spread) {
    return (
      <div className="center-text" style={{ padding: 60 }}>
        <p>🐕 와와가 카드 한 장 먹어버린 것 같아요. 그런 스프레드는 없어요.</p>
        <Link to="/" className="btn btn-ghost" style={{ marginTop: 16 }}>
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  const startDraw = () => {
    setPhase("shuffling");
    const drawn = buildPickPool(spread.count);
    setPool(drawn);
    setPickedIdx([]);
    setCards([]);
    setRevealed([]);
    setTimeout(() => setPhase("picking"), 1700);
  };

  const pickAt = (idx: number) => {
    if (pickedIdx.includes(idx)) return;
    if (pickedIdx.length >= spread.count) return;
    const next = [...pickedIdx, idx];
    setPickedIdx(next);

    if (next.length === spread.count) {
      const finalCards = next.map((i) => pool[i]);
      setTimeout(() => {
        setCards(finalCards);
        setRevealed(new Array(spread.count).fill(false));
        setPhase("revealing");
      }, 650);
    }
  };

  const revealAt = (i: number) => {
    setRevealed((prev) => {
      if (prev[i]) return prev;
      const next = [...prev];
      next[i] = true;
      const allRevealed = next.every(Boolean);
      if (allRevealed) {
        setTimeout(() => setPhase("done"), 800);
      }
      return next;
    });
  };

  const revealAll = () => {
    setRevealed(new Array(spread.count).fill(true));
    setTimeout(() => setPhase("done"), 800);
  };

  const reset = () => {
    setPhase("ask");
    setCards([]);
    setRevealed([]);
    setPool([]);
    setPickedIdx([]);
    setResultView(null);
  };

  const reshuffle = () => {
    setCards([]);
    setRevealed([]);
    setPool([]);
    setPickedIdx([]);
    setResultView(null);
    setPhase("shuffling");
    const drawn = buildPickPool(spread.count);
    setTimeout(() => {
      setPool(drawn);
      setPhase("picking");
    }, 1700);
  };

  return (
    <div className="reading">
      <section
        className="hero"
        style={{ paddingBottom: 0, paddingTop: "var(--sp-6)" }}
      >
        <span className="eyebrow">{spread.subtitle}</span>
        <h1>{spread.name}</h1>
        <p className="lead">{spread.description}</p>
      </section>

      {phase === "ask" && (
        <motion.div
          className="question-bar"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <label htmlFor="q">
            <span>🐕 와와에게 묻고 싶은 것</span>
            <span className="optional">선택사항</span>
          </label>
          <input
            id="q"
            type="text"
            placeholder="예) 지금 그 사람과 나, 어떤 단계에 있는 걸까?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={120}
          />

          <div className="suggestions">
            <span className="suggestions__label">추천</span>
            {spread.suggestions.map((s) => (
              <button
                key={s}
                type="button"
                className="chip"
                onClick={() => setQuestion(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="row">
            <span
              style={{
                color: "var(--c-text-muted)",
                fontSize: "var(--fs-xs)",
                letterSpacing: "0.08em",
              }}
            >
              질문이 없어도 와와는 일단 카드를 펼쳐요
            </span>
            <span className="spacer" />
            <Link to="/" className="btn btn-ghost">
              취소
            </Link>
            <button
              type="button"
              className="btn btn-primary"
              onClick={startDraw}
            >
              <span>🐕</span> 와와에게 카드 받기
            </button>
          </div>
        </motion.div>
      )}

      {phase === "shuffling" && <ShuffleStage />}

      {phase === "picking" && (
        <PickStage
          pool={pool}
          pickedIdx={pickedIdx}
          targetCount={spread.count}
          onPick={pickAt}
        />
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
              <div
                className="actions-row"
                style={{ flexDirection: "column", alignItems: "center" }}
              >
                <p
                  className="center-text"
                  style={{ marginBottom: 4, fontSize: "var(--fs-sm)" }}
                >
                  🐕 카드를 한 장씩 천천히 뒤집어 보세요
                </p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={revealAll}
                >
                  한 번에 보기
                </button>
              </div>
            )}

            {phase === "done" && resultView === null && (
              <ModeSelect onPick={(m) => setResultView(m)} />
            )}

            {phase === "done" && resultView !== null && (
              <ReadingResult
                spread={spread}
                cards={cards}
                question={question}
                view={resultView}
                onChangeView={setResultView}
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

const SHUFFLE_HINTS = [
  "🐕 와와가 카드 냄새 맡는 중...",
  "🐕 카드 섞는 중...",
  "🐕 악마력 충전 중...",
  "🐕 너무 좋은 결과는 의심하는 중...",
  "🐕 카드와 협상 중...",
  "🐕 듣기 좋은 말은 한 번 걸러내는 중...",
];

function ShuffleStage() {
  const cards = [0, 1, 2, 3, 4, 5, 6];
  const hint = useMemo(
    () => SHUFFLE_HINTS[Math.floor(Math.random() * SHUFFLE_HINTS.length)],
    []
  );
  return (
    <div className="deck-stage">
      <div className="shuffle-fan" aria-hidden="true">
        {cards.map((i) => (
          <motion.div
            key={i}
            className="shuffle-card"
            initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
            animate={{
              opacity: 1,
              y: [0, -20, 0],
              x: [(i - 3) * 6, (i - 3) * 28, (i - 3) * 6],
              rotate: [(i - 3) * 3, (i - 3) * 15, (i - 3) * 3],
            }}
            transition={{
              opacity: { duration: 0.3, delay: i * 0.04 },
              duration: 1.6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: i * 0.04,
            }}
            style={{ zIndex: i }}
          >
            <CardBack />
          </motion.div>
        ))}
      </div>
      <motion.p
        className="deck-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        {hint}
      </motion.p>
    </div>
  );
}

function PickStage({
  pool,
  pickedIdx,
  targetCount,
  onPick,
}: {
  pool: DrawnCard[];
  pickedIdx: number[];
  targetCount: number;
  onPick: (i: number) => void;
}) {
  const total = pool.length;
  const angleStep = total > 1 ? Math.min(8, 60 / (total - 1)) : 0;
  const startAngle = -((total - 1) * angleStep) / 2;
  const allPicked = pickedIdx.length >= targetCount;

  return (
    <motion.div
      className="pick-stage"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="pick-stage__head">
        <h2 className="pick-stage__title">
          🐕 마음 가는 카드를 골라보세요
        </h2>
        <p
          className="pick-stage__counter"
          style={{ color: "var(--c-text-muted)" }}
        >
          <strong>{pickedIdx.length}</strong>
          <span>/</span>
          <strong>{targetCount}</strong>
          <span style={{ marginLeft: 6 }}>장 — 와와는 재촉하지 않아요</span>
        </p>
      </div>

      <div className="pick-fan">
        {pool.map((_, i) => {
          const angle = startAngle + i * angleStep;
          const baseTransform = `rotate(${angle.toFixed(2)}deg)`;
          const isPicked = pickedIdx.includes(i);
          const dim = allPicked && !isPicked;
          return (
            <motion.div
              key={i}
              className={[
                "pick-card",
                isPicked ? "is-picked" : "",
                dim ? "is-dimmed" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                {
                  zIndex: i,
                  ["--pick-base-transform" as string]: baseTransform,
                } as React.CSSProperties
              }
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: "easeOut",
              }}
              onClick={() => !isPicked && !allPicked && onPick(i)}
              role="button"
              tabIndex={isPicked || dim ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (!isPicked && !allPicked) onPick(i);
                }
              }}
              aria-label={`카드 ${i + 1}`}
            >
              <div className="pick-card__inner">
                <CardBack />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
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
        <motion.div
          className="slot"
          key={i}
          initial={{ opacity: 0, y: -40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: i * 0.12,
            ease: [0.2, 0.7, 0.2, 1],
          }}
        >
          <span className="position-label">{spread.positions[i]?.label}</span>
          <div className={`card-wrap ${revealed[i] ? "is-revealed" : ""}`}>
            <TarotCardView
              drawn={c}
              revealed={revealed[i] ?? false}
              onClick={() => onClickCard(i)}
              size={size}
              delay={0}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ModeSelect({ onPick }: { onPick: (m: ResultView) => void }) {
  return (
    <motion.section
      className="mode-select"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <header className="mode-select__head">
        <span className="eyebrow">어떤 와와에게 물어볼까요?</span>
        <h2>같은 카드, 다른 시선</h2>
        <p>
          😇 <strong>천사와와</strong>는 가능성을 봅니다 ·
          <br />
          😈 <strong>악마와와</strong>는 리스크를 봅니다 ·
          <br />둘 다 진실의 한 조각이에요.
        </p>
      </header>

      <div className="mode-select__grid">
        <motion.button
          type="button"
          className="mode-card mode-card--angel"
          onClick={() => onPick("angel")}
          whileHover={{ y: -6, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="mode-card__emoji">😇</span>
          <span className="mode-card__name">천사와와</span>
          <span className="mode-card__motto">가능성을 봄</span>
          <span className="mode-card__hint">
            "기회는 보여. 어떻게 쓰는지는 너에게 달렸어."
          </span>
        </motion.button>

        <motion.button
          type="button"
          className="mode-card mode-card--demon"
          onClick={() => onPick("demon")}
          whileHover={{ y: -6, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="mode-card__emoji">😈</span>
          <span className="mode-card__name">악마와와</span>
          <span className="mode-card__motto">리스크를 봄</span>
          <span className="mode-card__hint">
            "가능해. 같은 이유로 멀어질 수도 있어."
          </span>
        </motion.button>
      </div>

      <button
        type="button"
        className="mode-select__both"
        onClick={() => onPick("both")}
      >
        ✨ 둘 다 보기
      </button>
    </motion.section>
  );
}

function ReadingResult({
  spread,
  cards,
  question,
  view,
  onChangeView,
  onReshuffle,
  onReset,
}: {
  spread: ReturnType<typeof getSpread> & object;
  cards: DrawnCard[];
  question: string;
  view: ResultView;
  onChangeView: (v: ResultView) => void;
  onReshuffle: () => void;
  onReset: () => void;
}) {
  const intensity = useMemo(
    () => buildIntensity(cards, spread.id),
    [cards, spread.id]
  );
  const lucky = useMemo(() => buildLucky(cards), [cards]);

  return (
    <motion.section
      className="reading-summary"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <header>
        <span className="meta">
          {spread.name} · {spread.subtitle}
        </span>
        {question && <p className="question">"{question}"</p>}
      </header>

      <ViewToggle view={view} onChange={onChangeView} />

      <IntensityGauge intensity={intensity} />

      <div className="reading-card-list">
        {cards.map(({ card, reversed }, i) => {
          const keywords = reversed ? card.keywordsRev : card.keywords;
          const angelText = getVoice(card, "angel", reversed);
          const demonText = getVoice(card, "demon", reversed);
          const pos = spread.positions[i];
          return (
            <motion.article
              key={card.id + i}
              className={`reading-card-detail ${reversed ? "is-reversed" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.4 + i * 0.18,
                ease: "easeOut",
              }}
            >
              <div className="thumb">
                <img
                  src={card.image}
                  alt={card.name}
                  style={{ transform: reversed ? "rotate(180deg)" : undefined }}
                />
              </div>
              <div>
                <p className="position">
                  {pos?.label} · {pos?.hint}
                </p>
                <h3>
                  {card.name}
                  {reversed && <span className="reversed-tag">Reversed</span>}
                </h3>
                <p className="name-en">{card.nameEn}</p>
                <motion.div
                  className="keywords"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.5 + i * 0.18,
                      },
                    },
                  }}
                >
                  {keywords.map((k) => (
                    <motion.span
                      key={k}
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        show: { opacity: 1, y: 0 },
                      }}
                    >
                      {k}
                    </motion.span>
                  ))}
                </motion.div>
                <CardVoiceBlock
                  view={view}
                  angel={angelText}
                  demon={demonText}
                />
              </div>
            </motion.article>
          );
        })}
      </div>

      <LuckyGrid lucky={lucky} />

      <motion.p
        className="wawa-disclaimer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95 }}
      >
        ※ 와와는 점쟁이가 아닙니다. 카드를 읽을 뿐이에요. <br />
        결정은 결국 당신의 몫이고, 와와는 그걸 존중합니다.
      </motion.p>

      <div className="actions-row">
        <button type="button" className="btn btn-ghost" onClick={onReshuffle}>
          다시 뽑기
        </button>
        <button type="button" className="btn btn-primary" onClick={onReset}>
          다른 질문 하기
        </button>
        <Link to="/" className="btn btn-ghost">
          홈으로
        </Link>
      </div>
    </motion.section>
  );
}

function IntensityGauge({
  intensity,
}: {
  intensity: ReturnType<typeof buildIntensity>;
}) {
  return (
    <motion.div
      className="gauge"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35 }}
    >
      <div className="gauge__head">
        <span className="gauge__label">{intensity.label}</span>
        <span className="gauge__value">{intensity.value}%</span>
      </div>
      <div className="gauge__track">
        <motion.div
          className={`gauge__fill gauge__fill--${intensity.category}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: intensity.value / 100 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          style={{ width: "100%" }}
        />
      </div>
    </motion.div>
  );
}

function ViewToggle({
  view,
  onChange,
}: {
  view: ResultView;
  onChange: (v: ResultView) => void;
}) {
  const items: { value: ResultView; emoji: string; label: string }[] = [
    { value: "angel", emoji: "😇", label: "천사와와" },
    { value: "demon", emoji: "😈", label: "악마와와" },
    { value: "both", emoji: "✨", label: "둘 다" },
  ];

  return (
    <div className="view-toggle" role="tablist" aria-label="해석 시선 선택">
      {items.map((it) => {
        const active = view === it.value;
        return (
          <button
            key={it.value}
            type="button"
            role="tab"
            aria-selected={active}
            className={`view-toggle__btn ${active ? "is-active" : ""} view-toggle__btn--${it.value}`}
            onClick={() => onChange(it.value)}
          >
            <span className="view-toggle__emoji">{it.emoji}</span>
            <span>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function CardVoiceBlock({
  view,
  angel,
  demon,
}: {
  view: ResultView;
  angel: string;
  demon: string;
}) {
  if (view === "angel") {
    return (
      <p className="voice voice--angel">
        <span className="voice__tag">😇 천사와와</span>
        <span className="voice__text">{angel}</span>
      </p>
    );
  }
  if (view === "demon") {
    return (
      <p className="voice voice--demon">
        <span className="voice__tag">😈 악마와와</span>
        <span className="voice__text">{demon}</span>
      </p>
    );
  }
  return (
    <div className="voice-pair">
      <p className="voice voice--angel">
        <span className="voice__tag">😇 천사와와</span>
        <span className="voice__text">{angel}</span>
      </p>
      <p className="voice voice--demon">
        <span className="voice__tag">😈 악마와와</span>
        <span className="voice__text">{demon}</span>
      </p>
    </div>
  );
}

function LuckyGrid({ lucky }: { lucky: ReturnType<typeof buildLucky> }) {
  const items = [
    {
      label: "Lucky Color",
      value: (
        <>
          <span
            className="lucky__color-dot"
            style={{ background: lucky.color.hex, color: lucky.color.hex }}
          />
          <span>{lucky.color.name}</span>
        </>
      ),
    },
    { label: "Lucky Number", value: <span>{lucky.number}</span> },
    { label: "Lucky Time", value: <span>{lucky.time}</span> },
    { label: "Lucky Direction", value: <span>{lucky.direction}</span> },
    ...lucky.extras.map((e) => ({
      label: e.label,
      value: <span>{e.value}</span>,
    })),
  ];

  return (
    <motion.div
      className="lucky"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="lucky__head">오늘의 행운</div>
      <div className="lucky__grid">
        {items.map((it, i) => (
          <motion.div
            key={i}
            className="lucky__item"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 + i * 0.06 }}
          >
            <span className="lucky__item-label">{it.label}</span>
            <span className="lucky__item-value">{it.value}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
