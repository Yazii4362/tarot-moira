export function About() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <section className="hero">
        <span className="eyebrow">About</span>
        <h1>
          Moira에 대하여
        </h1>
      </section>

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          color: "var(--text-soft)",
          lineHeight: 1.8,
        }}
      >
        <p>
          <strong style={{ color: "var(--text-h)" }}>Moira</strong>는 그리스 신화 속
          운명을 짜는 세 여신의 이름입니다. 우리는 매일 수많은 선택과 우연을 짜 넣으며
          자신만의 이야기를 만들어 가고 있죠.
        </p>
        <p>
          이 앱은 78장의 라이더 웨이트 타로 카드 위에서, 당신이 떠올린 질문을 향해
          카드를 펼쳐 보여드립니다. 카드는 당신을 단정 짓지 않습니다. 다만, 마음의 어떤
          결을 비춰주는 거울 역할을 합니다.
        </p>
        <p>
          결과를 두려워하지 마세요. 정방향이든 역방향이든, 모든 카드는 당신을 위한
          따뜻한 메시지를 가지고 있습니다.
        </p>
      </div>
    </div>
  );
}
