export function About() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <section className="hero">
        <span className="eyebrow">About 🐕 와와</span>
        <h1>
          희망고문도 절망팔이도 <em>안 합니다</em>
        </h1>
        <p
          className="lead"
          style={{ marginTop: "var(--sp-4)", maxWidth: 560 }}
        >
          겉모습은 악마 치와와, 말투는 까칠. 실제 역할은 — 현실적인 상담가.
        </p>
      </section>

      <div className="about-card">
        <p>
          <strong style={{ color: "var(--c-text)" }}>와와타로</strong>는 동네에
          한 마리쯤 있을 법한, 까칠하지만 통찰력 있는 치와와 철학자입니다.
          듣기 좋은 말이 전문이 아니에요. 카드가 보여준 만큼만, 정확히 그만큼만
          이야기합니다.
        </p>
        <p>
          78장의 라이더 웨이트 타로 위에서 와와는 당신의 질문에 답을
          대신해주지 않습니다. 다만 카드가 가리키는 가능성과 결, 지금 당신이
          놓치고 있는 시선 한 줄을 짚어줄 뿐이에요.
        </p>
        <p style={{ color: "var(--c-coral)" }}>
          "넌 망했어"가 아니라 "카드는 가능성을 보여줄 뿐 결론은 아니야."
          <br />
          "걔는 널 안 좋아함"이 아니라 "지금은 상대보다 네 기대가 더 크게
          나타나고 있어."
          <br />
          "포기해"가 아니라 "한 걸음 물러날 때 보이는 것도 있어."
        </p>
        <p
          style={{
            color: "var(--c-text-muted)",
            fontSize: "var(--fs-sm)",
            marginTop: "var(--sp-6)",
          }}
        >
          ※ 와와는 점쟁이가 아닙니다. 카드를 읽을 뿐이에요. 결과가 마음에 안
          들면 카드 탓입니다.
        </p>
      </div>
    </div>
  );
}
