export interface SpreadPosition {
  index: number;
  label: string;
  hint: string;
}

export interface SpreadDefinition {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  count: number;
  rows: number[];
  positions: SpreadPosition[];
  suggestions: string[];
}

export const spreads: SpreadDefinition[] = [
  {
    id: "one-card",
    name: "원 카드",
    subtitle: "One Card",
    description:
      "오늘 하루 또는 지금 이 순간에 필요한 한 마디. 짧지만 깊은 한 장의 메시지를 받아 봅니다.",
    count: 1,
    rows: [1],
    positions: [
      { index: 0, label: "오늘의 메시지", hint: "지금 당신에게 필요한 통찰" },
    ],
    suggestions: [
      "오늘 하루 어떤 마음으로 지내면 좋을까?",
      "지금 내게 가장 필요한 건 뭘까?",
      "오늘 내가 놓치고 있는 게 있다면?",
    ],
  },
  {
    id: "three-card",
    name: "쓰리 카드",
    subtitle: "Past · Present · Future",
    description:
      "과거의 흐름과 현재의 상태, 그리고 다가올 가능성을 세 장의 카드로 비추어 봅니다.",
    count: 3,
    rows: [3],
    positions: [
      { index: 0, label: "과거", hint: "지금에 영향을 준 흐름" },
      { index: 1, label: "현재", hint: "지금 마주하고 있는 상태" },
      { index: 2, label: "미래", hint: "이어질 가능성과 방향" },
    ],
    suggestions: [
      "지금 고민 중인 일은 어떤 흐름으로 풀릴까?",
      "준비 중인 시험, 결과는 어떻게 될까?",
      "이직을 고민 중인데, 지금 결정해도 될까?",
    ],
  },
  {
    id: "love",
    name: "러브 스프레드",
    subtitle: "You · Them · Us",
    description:
      "두 사람의 마음과 관계의 흐름을 살피는 세 장의 리딩. 관계의 결을 부드럽게 들여다봅니다.",
    count: 3,
    rows: [3],
    positions: [
      { index: 0, label: "당신의 마음", hint: "지금 당신이 품고 있는 감정" },
      { index: 1, label: "상대의 마음", hint: "그 사람의 시선과 감정" },
      { index: 2, label: "관계의 흐름", hint: "두 사람 사이의 방향" },
    ],
    suggestions: [
      "그 사람도 나를 신경 쓰고 있을까?",
      "지금 이 관계, 계속해도 될까?",
      "썸 타는 우리, 연애로 발전할 수 있을까?",
    ],
  },
  {
    id: "five-card",
    name: "파이브 카드",
    subtitle: "Cross of Insight",
    description:
      "문제의 뿌리부터 가능한 결말까지, 다섯 가지 관점에서 상황을 입체적으로 풀어봅니다.",
    count: 5,
    rows: [5],
    positions: [
      { index: 0, label: "현재 상황", hint: "지금 놓여 있는 자리" },
      { index: 1, label: "원인", hint: "이 흐름이 시작된 까닭" },
      { index: 2, label: "조언", hint: "지금 가져야 할 태도" },
      { index: 3, label: "주의할 점", hint: "마음에 새겨둘 경고" },
      { index: 4, label: "가능한 결과", hint: "이대로 갔을 때의 결말" },
    ],
    suggestions: [
      "지금 진행 중인 프로젝트, 어떻게 풀어가면 좋을까?",
      "오랫동안 결정 못 하고 있는 이 문제의 답은?",
      "내 인생의 다음 챕터를 위해 알아야 할 것은?",
    ],
  },
];

export const getSpread = (id: string): SpreadDefinition | undefined =>
  spreads.find((s) => s.id === id);
