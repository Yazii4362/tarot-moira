import type { SpreadDefinition } from "../../data/spreads";

/**
 * Reading 페이지 상단 메타 헤더.
 * 스프레드 부제목 + 이름 + 설명 한 블록.
 */
export function ReadingHeader({ spread }: { spread: SpreadDefinition }) {
  return (
    <section
      className="hero"
      style={{ paddingBottom: 0, paddingTop: "var(--sp-6)" }}
    >
      <span className="eyebrow">{spread.subtitle}</span>
      <h1>{spread.name}</h1>
      <p className="lead">{spread.description}</p>
    </section>
  );
}
