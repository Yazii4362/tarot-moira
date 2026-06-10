import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { SpreadDefinition } from "../../data/spreads";

/**
 * 'ask' phase에서 노출되는 질문 입력 패널.
 * - 자유 질문 input
 * - 스프레드별 추천 칩
 * - 시작 버튼 → onStart()
 */
export function AskPanel({
  spread,
  question,
  onChangeQuestion,
  onStart,
}: {
  spread: SpreadDefinition;
  question: string;
  onChangeQuestion: (v: string) => void;
  onStart: () => void;
}) {
  return (
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
        onChange={(e) => onChangeQuestion(e.target.value)}
        maxLength={120}
      />

      <div className="suggestions">
        <span className="suggestions__label">추천</span>
        {spread.suggestions.map((s) => (
          <button
            key={s}
            type="button"
            className="chip"
            onClick={() => onChangeQuestion(s)}
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
        <button type="button" className="btn btn-primary" onClick={onStart}>
          <span>🐕</span> 와와에게 카드 받기
        </button>
      </div>
    </motion.div>
  );
}
