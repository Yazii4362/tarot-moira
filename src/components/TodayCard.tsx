import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buildDailyCard, formatStars } from "../utils/dailyCard";
import { TarotCardView } from "./TarotCardView";
import { getVoice } from "../data/voiceTexts";

export function TodayCard() {
  const today = useMemo(() => buildDailyCard(), []);
  const [expanded, setExpanded] = useState(false);
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");

  const stars = formatStars(today.stars);
  const dateLabel = today.dateKey.replace(
    /^(\d{4})-(\d{2})-(\d{2})$/,
    "$1.$2.$3"
  );

  const handleShare = async () => {
    const text = `🐕 오늘의 와와 — ${today.card.name}${
      today.reversed ? " (역방향)" : ""
    }\n${stars}\n\n${today.message}\n\n#와와타로`;

    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: "오늘의 와와", text });
        return;
      } catch {
        // user cancelled / permission
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setShareState("copied");
        window.setTimeout(() => setShareState("idle"), 1800);
      } catch {
        // ignore
      }
    }
  };

  return (
    <motion.section
      className="today-card"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      aria-labelledby="today-card-title"
    >
      <div className="today-card__inner">
        <motion.div
          className="today-card__visual"
          initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          <TarotCardView
            drawn={{ card: today.card, reversed: today.reversed }}
            revealed={true}
            size="md"
          />
        </motion.div>

        <div className="today-card__text">
          <div className="today-card__eyebrow">
            <span className="today-card__date">{dateLabel}</span>
            <span className="today-card__sep">·</span>
            <span className="today-card__label">오늘의 와와</span>
          </div>

          <div
            className="today-card__stars"
            aria-label={`별점 ${today.stars} / 5`}
            title={`별점 ${today.stars} / 5`}
          >
            {stars}
          </div>

          <h2 id="today-card-title" className="today-card__title">
            {today.card.name}
            {today.reversed && (
              <span className="today-card__rev"> · 역방향</span>
            )}
          </h2>

          <p className="today-card__message">{today.message}</p>

          <div className="today-card__actions">
            <button
              type="button"
              className="today-card__btn today-card__btn--ghost"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {expanded ? "접기" : "카드 의미 보기"}
            </button>
            <button
              type="button"
              className="today-card__btn today-card__btn--primary"
              onClick={handleShare}
            >
              {shareState === "copied" ? "복사됨!" : "공유하기"}
            </button>
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="detail"
                className="today-card__detail"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              >
                <div className="today-card__voice today-card__voice--angel">
                  <span className="today-card__voice-label">
                    <span aria-hidden="true">😇</span> 천사와와
                  </span>
                  <p>{getVoice(today.card, "angel", today.reversed)}</p>
                </div>
                <div className="today-card__voice today-card__voice--demon">
                  <span className="today-card__voice-label">
                    <span aria-hidden="true">😈</span> 악마와와
                  </span>
                  <p>{getVoice(today.card, "demon", today.reversed)}</p>
                </div>
                <div className="today-card__keywords">
                  {today.card.keywords.slice(0, 5).map((k) => (
                    <span key={k} className="today-card__kw">
                      #{k}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
