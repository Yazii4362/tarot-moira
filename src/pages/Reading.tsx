import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getSpread } from "../data/spreads";
import type { DrawnCard } from "../utils/tarot";
import { buildPickPool } from "../utils/tarot";
import { ReadingHeader } from "../components/reading/ReadingHeader";
import { AskPanel } from "../components/reading/AskPanel";
import { ShuffleStage } from "../components/reading/ShuffleStage";
import { PickStage } from "../components/reading/PickStage";
import { SpreadBoard } from "../components/reading/SpreadBoard";
import { ReadingResult } from "../components/reading/ReadingResult";
import type { Phase } from "../components/reading/types";

/**
 * Reading 페이지 — phase 머신 기반의 단일 흐름 오케스트레이터.
 *
 *  ask → shuffling → picking → revealing → done
 *
 * 각 단계의 UI는 components/reading/ 아래 분리된 모듈이 담당하고,
 * 이 컴포넌트는 상태와 전이만 담당한다.
 */
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
  };

  const reshuffle = () => {
    setCards([]);
    setRevealed([]);
    setPool([]);
    setPickedIdx([]);
    setPhase("shuffling");
    const drawn = buildPickPool(spread.count);
    setTimeout(() => {
      setPool(drawn);
      setPhase("picking");
    }, 1700);
  };

  return (
    <div className="reading">
      <ReadingHeader spread={spread} />

      {phase === "ask" && (
        <AskPanel
          spread={spread}
          question={question}
          onChangeQuestion={setQuestion}
          onStart={startDraw}
        />
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
