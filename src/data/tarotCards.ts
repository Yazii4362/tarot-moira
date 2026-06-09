export type Arcana = "major" | "minor";
export type Suit = "wands" | "cups" | "swords" | "pentacles";

export interface TarotCard {
  id: string;
  name: string;
  nameEn: string;
  arcana: Arcana;
  suit?: Suit;
  number: number;
  image: string;
  keywords: string[];
  keywordsRev: string[];
  meaning: string;
  meaningRev: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

type MajorText = Pick<
  TarotCard,
  "name" | "nameEn" | "keywords" | "keywordsRev" | "meaning" | "meaningRev"
>;

type MinorText = MajorText;

const majorTexts: MajorText[] = [
  {
    name: "바보",
    nameEn: "The Fool",
    keywords: ["새로운 시작", "순수", "모험", "자유"],
    keywordsRev: ["무모함", "경솔함", "방황", "준비 부족"],
    meaning:
      "백지처럼 순수한 상태에서 새로운 여정을 시작합니다. 두려움 없이 미지의 세계로 발을 내딛는 용기를 의미합니다.",
    meaningRev:
      "충분한 준비 없이 무모하게 행동할 위험이 있습니다. 잠시 멈춰 발 밑을 살필 때입니다.",
  },
  {
    name: "마법사",
    nameEn: "The Magician",
    keywords: ["의지", "창조", "재능", "실행력"],
    keywordsRev: ["조작", "기만", "재능 낭비", "자만"],
    meaning:
      "원하는 것을 현실로 만들어낼 능력과 자원이 모두 갖춰져 있습니다. 의지를 행동으로 옮길 시기입니다.",
    meaningRev:
      "재능을 잘못된 방향으로 쓰거나 자신을 과대평가하고 있을 수 있습니다.",
  },
  {
    name: "여사제",
    nameEn: "The High Priestess",
    keywords: ["직관", "신비", "내면의 지혜", "잠재의식"],
    keywordsRev: ["감춰진 진실", "혼란", "직관 무시", "비밀"],
    meaning:
      "겉으로 보이지 않는 흐름과 내면의 목소리에 귀 기울일 때입니다. 성급한 판단보다 침묵 속의 통찰이 더 큰 답을 줍니다.",
    meaningRev:
      "직감을 무시하거나 표면적 정보에 흔들리고 있습니다. 가려진 진실이 있을 수 있습니다.",
  },
  {
    name: "여황제",
    nameEn: "The Empress",
    keywords: ["풍요", "창조성", "모성", "감수성"],
    keywordsRev: ["과보호", "정체", "창의성 막힘", "의존"],
    meaning:
      "감정과 창의성, 풍요로움이 무르익는 시기입니다. 사랑과 돌봄이 결실로 이어집니다.",
    meaningRev:
      "지나친 보호나 의존이 성장을 막고 있습니다. 자기 자신부터 돌아볼 필요가 있습니다.",
  },
  {
    name: "황제",
    nameEn: "The Emperor",
    keywords: ["권위", "안정", "리더십", "체계"],
    keywordsRev: ["독단", "경직", "통제 욕구", "권력 남용"],
    meaning:
      "원칙과 구조 위에서 단단히 자리잡는 시기입니다. 명확한 기준과 책임이 성과를 만듭니다.",
    meaningRev:
      "지나친 통제와 고집이 주변과 갈등을 일으킬 수 있습니다. 유연함이 필요합니다.",
  },
  {
    name: "교황",
    nameEn: "The Hierophant",
    keywords: ["전통", "가르침", "신념", "관습"],
    keywordsRev: ["저항", "독선", "낡은 규범", "비순응"],
    meaning:
      "전통과 가르침이 길잡이가 됩니다. 멘토나 신뢰할 만한 조언자를 만날 수 있습니다.",
    meaningRev:
      "기존의 규범이 자신과 맞지 않을 수 있습니다. 자기만의 길을 모색할 시점입니다.",
  },
  {
    name: "연인",
    nameEn: "The Lovers",
    keywords: ["사랑", "결합", "선택", "조화"],
    keywordsRev: ["갈등", "잘못된 선택", "관계 불균형", "유혹"],
    meaning:
      "마음이 깊이 끌리는 만남이나 중요한 선택의 순간입니다. 진심을 따를 때 관계와 결정 모두 빛납니다.",
    meaningRev:
      "감정이 흔들려 잘못된 선택을 할 수 있습니다. 관계 안의 균열을 살펴야 합니다.",
  },
  {
    name: "전차",
    nameEn: "The Chariot",
    keywords: ["의지", "추진력", "승리", "통제"],
    keywordsRev: ["통제력 상실", "방향 상실", "공격성", "정체"],
    meaning:
      "강한 의지로 장애를 돌파하는 시기입니다. 목표를 향한 일관된 추진이 승리를 가져옵니다.",
    meaningRev:
      "방향을 잃거나 감정에 휘둘리고 있습니다. 고삐를 다시 잡아야 합니다.",
  },
  {
    name: "힘",
    nameEn: "Strength",
    keywords: ["내면의 힘", "용기", "인내", "부드러움"],
    keywordsRev: ["자기 의심", "두려움", "조급함", "자제력 부족"],
    meaning:
      "거친 힘이 아닌 부드러운 용기로 상황을 다스립니다. 인내가 가장 큰 무기가 됩니다.",
    meaningRev:
      "자신감이 흔들리거나 두려움에 잠식될 수 있습니다. 내면을 다독일 시간이 필요합니다.",
  },
  {
    name: "은둔자",
    nameEn: "The Hermit",
    keywords: ["성찰", "고독", "지혜", "내면 탐구"],
    keywordsRev: ["고립", "외로움", "자기 회피", "방향 상실"],
    meaning:
      "잠시 물러나 자신의 내면을 들여다볼 시기입니다. 조용한 성찰이 다음 길을 비춥니다.",
    meaningRev:
      "고독이 단절로 변하고 있을 수 있습니다. 마음을 열고 조언을 받을 필요가 있습니다.",
  },
  {
    name: "운명의 수레바퀴",
    nameEn: "Wheel of Fortune",
    keywords: ["전환점", "운명", "기회", "변화"],
    keywordsRev: ["악순환", "통제 불가", "지연", "운의 하강"],
    meaning:
      "큰 흐름이 움직이는 전환점입니다. 흐름을 받아들이고 기회를 잡을 때입니다.",
    meaningRev:
      "예상치 못한 어려움이나 정체가 찾아옵니다. 사이클의 끝을 받아들일 필요가 있습니다.",
  },
  {
    name: "정의",
    nameEn: "Justice",
    keywords: ["균형", "공정", "책임", "진실"],
    keywordsRev: ["불공정", "회피", "편향", "후회"],
    meaning:
      "원인과 결과가 명확히 드러나는 시기입니다. 정직하고 공정한 선택이 좋은 결과를 만듭니다.",
    meaningRev:
      "책임을 미루거나 편향된 시각으로 판단할 위험이 있습니다.",
  },
  {
    name: "행맨",
    nameEn: "The Hanged Man",
    keywords: ["관점 전환", "내려놓음", "기다림", "희생"],
    keywordsRev: ["정체", "고집", "무의미한 희생", "지연"],
    meaning:
      "잠시 멈추고 시야를 바꾸면 새로운 답이 보입니다. 흘려보내는 용기가 필요한 때입니다.",
    meaningRev:
      "변화를 거부하며 같은 자리에 머물고 있습니다. 놓아주는 결단이 필요합니다.",
  },
  {
    name: "죽음",
    nameEn: "Death",
    keywords: ["끝과 시작", "변화", "전환", "재생"],
    keywordsRev: ["변화 거부", "집착", "정체", "두려움"],
    meaning:
      "한 챕터가 끝나고 새로운 챕터가 열립니다. 끝을 받아들일 때 진짜 시작이 가능합니다.",
    meaningRev:
      "끝나야 할 것을 붙잡고 있어 다음 단계로 나아가지 못하고 있습니다.",
  },
  {
    name: "절제",
    nameEn: "Temperance",
    keywords: ["조화", "균형", "절제", "치유"],
    keywordsRev: ["불균형", "과잉", "충돌", "조급함"],
    meaning:
      "서로 다른 것을 잘 섞어내는 시기입니다. 차분한 흐름 속에서 치유와 회복이 일어납니다.",
    meaningRev:
      "감정과 행동의 균형이 무너져 있습니다. 속도를 늦추고 정돈할 시간이 필요합니다.",
  },
  {
    name: "악마",
    nameEn: "The Devil",
    keywords: ["속박", "집착", "유혹", "물질주의"],
    keywordsRev: ["해방", "자각", "끊어냄", "회복"],
    meaning:
      "스스로 만든 사슬에 묶여 있는 상태입니다. 무엇이 자신을 붙잡고 있는지 직시할 때입니다.",
    meaningRev:
      "오래된 집착에서 벗어나는 신호입니다. 자유를 향한 첫걸음이 시작됩니다.",
  },
  {
    name: "타워",
    nameEn: "The Tower",
    keywords: ["급격한 변화", "붕괴", "각성", "해체"],
    keywordsRev: ["변화 회피", "지연된 붕괴", "충격 완화", "두려움"],
    meaning:
      "거짓된 토대가 무너지는 시기입니다. 충격적이지만 결국 더 단단한 진실 위에 다시 서게 됩니다.",
    meaningRev:
      "피할 수 없는 변화를 미루고 있습니다. 무너짐의 충격이 더 길어질 수 있습니다.",
  },
  {
    name: "별",
    nameEn: "The Star",
    keywords: ["희망", "영감", "치유", "신뢰"],
    keywordsRev: ["회의", "낙심", "방향 상실", "신뢰 상실"],
    meaning:
      "어둠을 지나 빛을 다시 만나는 시기입니다. 조용한 희망이 마음을 채워 줍니다.",
    meaningRev:
      "기대가 사라져 의욕이 떨어진 상태입니다. 자신에 대한 신뢰부터 회복할 때입니다.",
  },
  {
    name: "달",
    nameEn: "The Moon",
    keywords: ["불안", "환상", "직감", "혼란"],
    keywordsRev: ["진실 드러남", "불안 해소", "명료함", "각성"],
    meaning:
      "보이는 것이 전부가 아닐 수 있습니다. 두려움과 환상 속에서도 직감을 등불 삼아 나아갑니다.",
    meaningRev:
      "흐릿했던 진실이 드러나고 마음의 안개가 걷힙니다.",
  },
  {
    name: "태양",
    nameEn: "The Sun",
    keywords: ["기쁨", "성공", "활력", "긍정"],
    keywordsRev: ["일시적 침체", "낙관 부족", "에너지 저하"],
    meaning:
      "햇살처럼 분명한 성공과 행복이 찾아옵니다. 자신감 있게 자신을 드러낼 때입니다.",
    meaningRev:
      "잠깐의 흐림이 있을 뿐 본질은 밝습니다. 마음을 다시 펴면 빛이 돌아옵니다.",
  },
  {
    name: "심판",
    nameEn: "Judgement",
    keywords: ["부활", "각성", "결단", "용서"],
    keywordsRev: ["미루기", "자책", "후회", "결정 회피"],
    meaning:
      "지난 일을 정리하고 새로운 차원으로 도약하는 시기입니다. 깊은 자각이 변화를 부릅니다.",
    meaningRev:
      "스스로를 너무 가혹하게 평가하거나 결단을 미루고 있습니다.",
  },
  {
    name: "세계",
    nameEn: "The World",
    keywords: ["완성", "성취", "통합", "여정의 끝"],
    keywordsRev: ["미완성", "지연", "결말 없는 마무리", "공허"],
    meaning:
      "오랜 여정 끝에 마침내 완성을 맞이합니다. 한 사이클이 마무리되며 새로운 단계가 열립니다.",
    meaningRev:
      "거의 다 왔지만 마지막 한 걸음이 남아 있습니다. 마무리에 집중할 때입니다.",
  },
];

const minorTexts: Record<Suit, MinorText[]> = {
  wands: [
    {
      name: "완드 에이스",
      nameEn: "Ace of Wands",
      keywords: ["영감", "열정", "새로운 기회", "창작"],
      keywordsRev: ["의욕 상실", "지연", "기회 놓침", "방향 상실"],
      meaning:
        "가슴을 뛰게 하는 새로운 영감이나 기회가 찾아옵니다. 행동으로 옮기는 첫 불꽃입니다.",
      meaningRev:
        "열정이 식거나 새로운 시도에 차질이 생길 수 있습니다.",
    },
    {
      name: "완드 2",
      nameEn: "Two of Wands",
      keywords: ["계획", "선택", "미래 구상", "확장"],
      keywordsRev: ["망설임", "두려움", "좁은 시야", "결정 미루기"],
      meaning:
        "한 단계 위에서 세상을 바라보며 다음 행보를 설계하는 시기입니다.",
      meaningRev:
        "결정을 미루며 익숙한 자리에 머물고 있을 수 있습니다.",
    },
    {
      name: "완드 3",
      nameEn: "Three of Wands",
      keywords: ["기다림", "확장", "비전", "전망"],
      keywordsRev: ["지연", "기대 어긋남", "협력 부족"],
      meaning:
        "뿌린 씨앗이 결실을 향해 자라고 있습니다. 멀리 내다보며 흐름을 신뢰할 때입니다.",
      meaningRev:
        "예상보다 진행이 더디거나 협력에 균열이 생길 수 있습니다.",
    },
    {
      name: "완드 4",
      nameEn: "Four of Wands",
      keywords: ["축하", "안정", "공동체", "성취"],
      keywordsRev: ["불안정", "갈등", "축하의 부재"],
      meaning:
        "노력의 결실을 함께 나누고 축하하는 시기입니다. 가정과 공동체에 따뜻한 빛이 듭니다.",
      meaningRev:
        "관계나 공간 안의 작은 균열이 흐름을 흔들 수 있습니다.",
    },
    {
      name: "완드 5",
      nameEn: "Five of Wands",
      keywords: ["경쟁", "갈등", "의견 충돌", "도전"],
      keywordsRev: ["갈등 해소", "회피", "내적 분열"],
      meaning:
        "여러 의견이 부딪히며 마찰이 생기는 시기입니다. 부딪힘 속에서 더 나은 답이 나오기도 합니다.",
      meaningRev:
        "충돌을 피하느라 진짜 문제가 가려져 있을 수 있습니다.",
    },
    {
      name: "완드 6",
      nameEn: "Six of Wands",
      keywords: ["승리", "인정", "자부심", "성과"],
      keywordsRev: ["자만", "인정 부족", "허영"],
      meaning:
        "노력에 대한 인정과 박수를 받는 시기입니다. 당당하게 성과를 누려도 좋습니다.",
      meaningRev:
        "성과에 비해 인정이 따라오지 않거나 자만이 발목을 잡을 수 있습니다.",
    },
    {
      name: "완드 7",
      nameEn: "Seven of Wands",
      keywords: ["방어", "도전 직면", "신념", "버티기"],
      keywordsRev: ["압박", "포기", "자신감 상실"],
      meaning:
        "사방에서 들어오는 도전 앞에서도 자기 자리를 지킬 때입니다. 신념이 곧 무기가 됩니다.",
      meaningRev:
        "버티는 힘이 떨어지고 있습니다. 잠시 숨을 고를 필요가 있습니다.",
    },
    {
      name: "완드 8",
      nameEn: "Eight of Wands",
      keywords: ["빠른 진전", "메시지", "추진력", "흐름"],
      keywordsRev: ["지연", "혼선", "성급함"],
      meaning:
        "정체되어 있던 일이 단숨에 풀리는 시기입니다. 흐름을 타고 빠르게 움직이세요.",
      meaningRev:
        "전달이나 진행에 혼선이 생길 수 있습니다. 속도보다 정확함이 우선입니다.",
    },
    {
      name: "완드 9",
      nameEn: "Nine of Wands",
      keywords: ["끈기", "마지막 도전", "경계", "방어"],
      keywordsRev: ["탈진", "포기", "과한 경계"],
      meaning:
        "거의 다 왔습니다. 마지막 고비에서도 자기를 믿고 한 걸음 더 내딛는 시기입니다.",
      meaningRev:
        "지나친 경계와 피로가 스스로를 더 힘들게 하고 있습니다.",
    },
    {
      name: "완드 10",
      nameEn: "Ten of Wands",
      keywords: ["부담", "책임", "과로", "끝맺음"],
      keywordsRev: ["내려놓음", "위임", "탈진", "회피"],
      meaning:
        "많은 책임을 짊어지고 마무리를 향해 가는 시기입니다. 끝이 보이니 조금만 더 힘을 내세요.",
      meaningRev:
        "혼자 다 짊어지고 있다면 일부는 내려놓고 나눌 때입니다.",
    },
    {
      name: "완드 페이지",
      nameEn: "Page of Wands",
      keywords: ["호기심", "새 모험", "열정의 시작", "탐색"],
      keywordsRev: ["산만함", "지속력 부족", "조급함"],
      meaning:
        "새로운 관심사가 생기고 모험심이 깨어나는 시기입니다. 가볍게 첫 발을 내딛어 보세요.",
      meaningRev:
        "흥미가 너무 빨리 식거나 여기저기 흩어져 집중이 어려울 수 있습니다.",
    },
    {
      name: "완드 나이트",
      nameEn: "Knight of Wands",
      keywords: ["행동력", "추진", "모험", "정열"],
      keywordsRev: ["충동", "성급함", "무모함"],
      meaning:
        "강한 에너지로 거침없이 나아가는 시기입니다. 망설이기보다 일단 움직일 때입니다.",
      meaningRev:
        "감정에 휩쓸려 충동적으로 결정할 위험이 있습니다.",
    },
    {
      name: "완드 퀸",
      nameEn: "Queen of Wands",
      keywords: ["자신감", "카리스마", "따뜻함", "활력"],
      keywordsRev: ["질투", "독선", "에너지 소진"],
      meaning:
        "자기다움이 가장 매력적으로 빛나는 시기입니다. 따뜻한 카리스마로 사람들을 이끕니다.",
      meaningRev:
        "비교나 질투에 흔들려 본래의 빛을 잃을 수 있습니다.",
    },
    {
      name: "완드 킹",
      nameEn: "King of Wands",
      keywords: ["비전", "리더십", "결단", "영향력"],
      keywordsRev: ["독재", "오만", "조급한 결정"],
      meaning:
        "큰 그림을 그리고 사람들을 이끄는 시기입니다. 비전과 결단이 가장 큰 힘이 됩니다.",
      meaningRev:
        "권위가 독선으로 변하지 않도록 주변의 목소리에 귀를 기울이세요.",
    },
  ],
  cups: [
    {
      name: "컵 에이스",
      nameEn: "Ace of Cups",
      keywords: ["새로운 사랑", "감정의 시작", "치유", "충만"],
      keywordsRev: ["감정 메마름", "막힘", "거절", "닫힌 마음"],
      meaning:
        "마음이 새롭게 열리고 사랑·창의·치유의 흐름이 시작됩니다.",
      meaningRev:
        "감정이 닫혀 있거나 표현되지 못한 채 막혀 있을 수 있습니다.",
    },
    {
      name: "컵 2",
      nameEn: "Two of Cups",
      keywords: ["결합", "파트너십", "교감", "상호 끌림"],
      keywordsRev: ["불화", "오해", "균형 상실"],
      meaning:
        "마음과 마음이 마주 보며 깊게 연결되는 시기입니다. 관계의 첫 토대가 만들어집니다.",
      meaningRev:
        "관계의 균형이 흔들리거나 작은 오해가 생길 수 있습니다.",
    },
    {
      name: "컵 3",
      nameEn: "Three of Cups",
      keywords: ["우정", "축하", "공동체", "기쁨"],
      keywordsRev: ["과음", "관계 피로", "삼각관계"],
      meaning:
        "함께 웃고 축하할 일이 생기는 시기입니다. 가까운 사람들과의 시간이 큰 위로가 됩니다.",
      meaningRev:
        "지나친 들뜸이 일상을 흔들거나 관계 안에 미묘한 긴장이 생길 수 있습니다.",
    },
    {
      name: "컵 4",
      nameEn: "Four of Cups",
      keywords: ["권태", "무관심", "내면 침잠", "재고"],
      keywordsRev: ["새 자각", "기회 포착", "에너지 회복"],
      meaning:
        "익숙한 것에 흥미가 시들해지는 시기입니다. 당연하게 여겼던 것을 다시 들여다볼 때입니다.",
      meaningRev:
        "닫혀 있던 마음이 다시 열리며 눈앞의 기회가 보이기 시작합니다.",
    },
    {
      name: "컵 5",
      nameEn: "Five of Cups",
      keywords: ["상실", "후회", "슬픔", "실망"],
      keywordsRev: ["회복", "수용", "남은 것 발견", "용서"],
      meaning:
        "잃은 것에 마음이 머물러 있는 시기입니다. 그러나 아직 내 곁에 남은 것들이 있습니다.",
      meaningRev:
        "슬픔에서 한 걸음 벗어나 남아 있는 것들에 다시 시선을 두기 시작합니다.",
    },
    {
      name: "컵 6",
      nameEn: "Six of Cups",
      keywords: ["추억", "향수", "순수함", "재회"],
      keywordsRev: ["과거 집착", "현재 회피", "이상화"],
      meaning:
        "따뜻했던 기억이 떠오르거나 옛 인연이 닿는 시기입니다. 순수한 마음을 회복하세요.",
      meaningRev:
        "과거를 미화하느라 지금의 가능성을 놓치고 있을 수 있습니다.",
    },
    {
      name: "컵 7",
      nameEn: "Seven of Cups",
      keywords: ["환상", "선택지", "상상", "혼란"],
      keywordsRev: ["명료함", "결단", "현실 직시"],
      meaning:
        "꿈과 가능성이 많지만 그만큼 헷갈리는 시기입니다. 무엇이 진짜 원하는 것인지 가려야 합니다.",
      meaningRev:
        "안개가 걷히고 무엇을 선택할지 명확해집니다.",
    },
    {
      name: "컵 8",
      nameEn: "Eight of Cups",
      keywords: ["떠남", "새로운 추구", "단념", "성장"],
      keywordsRev: ["미련", "정체", "떠남에 대한 두려움"],
      meaning:
        "이미 채워진 잔을 두고 더 깊은 의미를 찾아 떠나는 시기입니다.",
      meaningRev:
        "떠나야 할 때를 알면서도 발이 떨어지지 않는 상태일 수 있습니다.",
    },
    {
      name: "컵 9",
      nameEn: "Nine of Cups",
      keywords: ["만족", "소원 성취", "감사", "여유"],
      keywordsRev: ["허영", "공허", "겉만의 만족"],
      meaning:
        "바라던 것이 이루어지고 마음이 든든해지는 시기입니다. 누리고 감사할 때입니다.",
      meaningRev:
        "겉으로는 풍족해도 마음 한구석이 비어 있을 수 있습니다.",
    },
    {
      name: "컵 10",
      nameEn: "Ten of Cups",
      keywords: ["가족 행복", "화합", "정서적 충만", "사랑"],
      keywordsRev: ["관계 균열", "기대 어긋남", "이상과 현실의 차이"],
      meaning:
        "사랑하는 사람들과의 깊은 화합이 이루어지는 시기입니다. 마음이 가장 풍요로운 자리에 있습니다.",
      meaningRev:
        "이상적인 그림과 현실의 차이가 마음을 흔들 수 있습니다.",
    },
    {
      name: "컵 페이지",
      nameEn: "Page of Cups",
      keywords: ["감수성", "직관", "달콤한 메시지", "창의"],
      keywordsRev: ["감정 기복", "유치함", "현실 도피"],
      meaning:
        "예상치 못한 감정의 메시지나 창의적 영감이 찾아옵니다. 마음을 열고 받아들여 보세요.",
      meaningRev:
        "감정이 출렁이며 일상이 흔들릴 수 있습니다. 균형이 필요합니다.",
    },
    {
      name: "컵 나이트",
      nameEn: "Knight of Cups",
      keywords: ["로맨틱", "제안", "이상주의", "감성"],
      keywordsRev: ["변덕", "환상", "행동 부족"],
      meaning:
        "마음을 움직이는 제안이나 로맨틱한 흐름이 다가옵니다.",
      meaningRev:
        "말과 마음이 따로 가거나 환상에 머무는 모습일 수 있습니다.",
    },
    {
      name: "컵 퀸",
      nameEn: "Queen of Cups",
      keywords: ["공감", "직관", "감정의 깊이", "포용"],
      keywordsRev: ["감정 과잉", "의존", "경계 부족"],
      meaning:
        "타인의 마음을 깊이 헤아리며 따뜻한 안식처가 되어주는 시기입니다.",
      meaningRev:
        "타인의 감정에 너무 몰입해 자신을 잃지 않도록 주의하세요.",
    },
    {
      name: "컵 킹",
      nameEn: "King of Cups",
      keywords: ["정서적 균형", "지혜", "관용", "배려"],
      keywordsRev: ["감정 억압", "변덕", "통제 잃음"],
      meaning:
        "감정을 다스리며 주변을 따뜻하게 품어내는 시기입니다.",
      meaningRev:
        "감정을 누르고만 있다면 어딘가에서 터져나올 수 있습니다.",
    },
  ],
  swords: [
    {
      name: "소드 에이스",
      nameEn: "Ace of Swords",
      keywords: ["통찰", "진실", "명료함", "결단"],
      keywordsRev: ["혼란", "왜곡된 판단", "잘못된 선택"],
      meaning:
        "안개가 걷히듯 진실이 또렷이 드러나는 시기입니다. 명료한 결단이 길을 엽니다.",
      meaningRev:
        "생각이 흐려져 잘못된 결정을 내릴 위험이 있습니다.",
    },
    {
      name: "소드 2",
      nameEn: "Two of Swords",
      keywords: ["결정 회피", "균형", "갈등", "보류"],
      keywordsRev: ["결정", "혼란 해소", "진실 직면"],
      meaning:
        "두 갈래 사이에서 눈을 가린 채 멈춰 있는 시기입니다. 결국에는 한쪽을 선택해야 합니다.",
      meaningRev:
        "외면해 왔던 진실을 마주하고 결정을 내리는 시점이 옵니다.",
    },
    {
      name: "소드 3",
      nameEn: "Three of Swords",
      keywords: ["슬픔", "상심", "이별", "아픔"],
      keywordsRev: ["회복", "용서", "고통의 끝"],
      meaning:
        "마음을 깊게 찌르는 슬픔의 시기입니다. 그러나 이 아픔은 진실을 마주하기 위한 통과 의례이기도 합니다.",
      meaningRev:
        "오래된 상처가 서서히 아물기 시작합니다.",
    },
    {
      name: "소드 4",
      nameEn: "Four of Swords",
      keywords: ["휴식", "회복", "성찰", "잠시 멈춤"],
      keywordsRev: ["재개", "초조함", "휴식 부족"],
      meaning:
        "전투를 잠시 내려놓고 회복할 시간입니다. 멈춤이 다음을 위한 가장 큰 준비입니다.",
      meaningRev:
        "충분히 쉬지 못한 채 다시 움직이려 하고 있습니다.",
    },
    {
      name: "소드 5",
      nameEn: "Five of Swords",
      keywords: ["갈등", "이긴 후의 공허", "패배", "긴장"],
      keywordsRev: ["화해", "내려놓기", "관계 회복"],
      meaning:
        "이겼지만 마음이 가벼워지지 않는 싸움입니다. 이긴 게 정말 이긴 것인지 돌아볼 필요가 있습니다.",
      meaningRev:
        "지난 갈등을 풀고 화해의 손을 내밀 수 있는 시점입니다.",
    },
    {
      name: "소드 6",
      nameEn: "Six of Swords",
      keywords: ["이행", "조용한 변화", "치유의 여정", "이동"],
      keywordsRev: ["정체", "과거에 머묾", "떠나지 못함"],
      meaning:
        "거센 폭풍을 지나 잔잔한 물결을 따라 새로운 곳으로 이동하는 시기입니다.",
      meaningRev:
        "떠나야 할 곳에 마음이 묶여 있어 흐름이 막혀 있습니다.",
    },
    {
      name: "소드 7",
      nameEn: "Seven of Swords",
      keywords: ["전략", "은밀함", "속임수", "회피"],
      keywordsRev: ["진실 드러남", "양심", "정직"],
      meaning:
        "정면 돌파보다 우회와 전략이 필요한 시기입니다. 다만 자기 자신은 속이지 마세요.",
      meaningRev:
        "감춰져 있던 일이 드러나며 정직해질 기회가 주어집니다.",
    },
    {
      name: "소드 8",
      nameEn: "Eight of Swords",
      keywords: ["속박", "자기 제한", "두려움", "갇힘"],
      keywordsRev: ["해방", "자각", "벗어남"],
      meaning:
        "스스로 만든 두려움에 갇힌 시기입니다. 사실 묶여 있는 줄은 생각보다 약합니다.",
      meaningRev:
        "두려움의 정체를 알아차리고 한 걸음 밖으로 나갑니다.",
    },
    {
      name: "소드 9",
      nameEn: "Nine of Swords",
      keywords: ["불안", "걱정", "악몽", "자책"],
      keywordsRev: ["불안 완화", "현실 직시", "도움 받기"],
      meaning:
        "밤마다 떠오르는 걱정에 잠 못 이루는 시기입니다. 머릿속의 두려움이 실제보다 크게 느껴질 수 있습니다.",
      meaningRev:
        "불안이 서서히 가라앉으며 마음에 다시 빛이 들어옵니다.",
    },
    {
      name: "소드 10",
      nameEn: "Ten of Swords",
      keywords: ["끝", "배신", "한계", "전환의 바닥"],
      keywordsRev: ["회복의 시작", "재기", "끝 이후의 새벽"],
      meaning:
        "더 이상 내려갈 수 없는 바닥에 닿은 시기입니다. 그러나 바닥은 동시에 오를 수 있는 시작점입니다.",
      meaningRev:
        "최악을 지나 다시 일어서기 시작합니다.",
    },
    {
      name: "소드 페이지",
      nameEn: "Page of Swords",
      keywords: ["호기심", "정보 수집", "관찰", "신중한 시작"],
      keywordsRev: ["험담", "오해", "조급한 판단"],
      meaning:
        "새로운 사실을 알아보고 배우려는 의욕이 솟는 시기입니다. 빠른 판단보다 관찰이 먼저입니다.",
      meaningRev:
        "성급한 말이 오해를 부를 수 있습니다.",
    },
    {
      name: "소드 나이트",
      nameEn: "Knight of Swords",
      keywords: ["돌진", "신속한 행동", "결단", "추진"],
      keywordsRev: ["성급함", "충돌", "독선"],
      meaning:
        "망설일 시간 없이 빠르게 움직이는 시기입니다. 명확한 목표가 곧 추진력이 됩니다.",
      meaningRev:
        "속도에 휩쓸려 주변을 살피지 못하면 충돌이 생길 수 있습니다.",
    },
    {
      name: "소드 퀸",
      nameEn: "Queen of Swords",
      keywords: ["명료함", "객관성", "독립성", "이성"],
      keywordsRev: ["냉정함", "비판적", "감정 차단"],
      meaning:
        "감정에 휘둘리지 않고 사실에 근거해 판단하는 시기입니다.",
      meaningRev:
        "지나치게 차가워 보이지 않도록 따뜻함도 함께 표현해 보세요.",
    },
    {
      name: "소드 킹",
      nameEn: "King of Swords",
      keywords: ["권위", "지적 통제", "원칙", "공정함"],
      keywordsRev: ["독선", "냉혹함", "권력 남용"],
      meaning:
        "원칙과 논리에 따라 판단을 내리는 시기입니다. 명확한 기준이 신뢰를 만듭니다.",
      meaningRev:
        "엄격함이 지나쳐 사람을 멀어지게 하지 않도록 주의하세요.",
    },
  ],
  pentacles: [
    {
      name: "펜타클 에이스",
      nameEn: "Ace of Pentacles",
      keywords: ["새로운 기회", "물질적 시작", "안정", "번영의 씨앗"],
      keywordsRev: ["기회 손실", "재정 불안", "토대 부실"],
      meaning:
        "새로운 일·재정·건강의 씨앗이 심어지는 시기입니다. 꾸준히 가꿀 가치가 있습니다.",
      meaningRev:
        "기회를 놓치거나 토대가 부실해 결실을 맺기 어렵습니다.",
    },
    {
      name: "펜타클 2",
      nameEn: "Two of Pentacles",
      keywords: ["균형", "유연함", "적응", "저글링"],
      keywordsRev: ["과부하", "우선순위 혼란", "불균형"],
      meaning:
        "여러 일을 능숙하게 굴려가며 유연하게 대응하는 시기입니다.",
      meaningRev:
        "동시에 너무 많은 것을 하다 어느 하나도 제대로 하지 못할 수 있습니다.",
    },
    {
      name: "펜타클 3",
      nameEn: "Three of Pentacles",
      keywords: ["협력", "숙련", "팀워크", "성장"],
      keywordsRev: ["불협화음", "역할 모호", "기술 부족"],
      meaning:
        "각자의 전문성이 모여 좋은 결과를 만드는 시기입니다. 함께할 때 더 빛납니다.",
      meaningRev:
        "역할이 분명하지 않아 협업이 삐걱일 수 있습니다.",
    },
    {
      name: "펜타클 4",
      nameEn: "Four of Pentacles",
      keywords: ["안정", "보수", "절약", "지킴"],
      keywordsRev: ["인색함", "집착", "통제"],
      meaning:
        "가진 것을 단단히 지키며 안정을 다지는 시기입니다.",
      meaningRev:
        "지킴이 지나쳐 인색해지거나 변화에 닫혀 있을 수 있습니다.",
    },
    {
      name: "펜타클 5",
      nameEn: "Five of Pentacles",
      keywords: ["결핍", "어려움", "고립", "건강 문제"],
      keywordsRev: ["회복", "도움받기", "위기 극복"],
      meaning:
        "물질적·정서적 어려움을 겪는 시기입니다. 그러나 가까이에 도움의 손길이 있습니다.",
      meaningRev:
        "긴 어려움을 지나 회복의 흐름이 시작됩니다.",
    },
    {
      name: "펜타클 6",
      nameEn: "Six of Pentacles",
      keywords: ["나눔", "베풂", "공정한 거래", "균형"],
      keywordsRev: ["불공정", "조건부 호의", "의존"],
      meaning:
        "주고받는 흐름이 순조로운 시기입니다. 받는 만큼 나누고, 나눈 만큼 돌아옵니다.",
      meaningRev:
        "관계나 거래에 불균형이 있을 수 있습니다.",
    },
    {
      name: "펜타클 7",
      nameEn: "Seven of Pentacles",
      keywords: ["인내", "결실 기다림", "점검", "장기 투자"],
      keywordsRev: ["조급함", "결실 부족", "방향 재검토"],
      meaning:
        "심은 것을 곧장 거둘 수는 없지만, 자라고 있는 모습을 살피며 기다릴 시기입니다.",
      meaningRev:
        "조급함이 앞서거나 들인 노력에 비해 결실이 부족하다 느껴질 수 있습니다.",
    },
    {
      name: "펜타클 8",
      nameEn: "Eight of Pentacles",
      keywords: ["숙련", "집중", "성실", "장인 정신"],
      keywordsRev: ["권태", "주의 산만", "디테일 부족"],
      meaning:
        "한 가지 일에 깊이 몰두하며 실력을 갈고닦는 시기입니다.",
      meaningRev:
        "익숙해진 만큼 매너리즘에 빠질 수 있으니 정성을 잃지 마세요.",
    },
    {
      name: "펜타클 9",
      nameEn: "Nine of Pentacles",
      keywords: ["풍요", "자립", "자기 보상", "여유"],
      keywordsRev: ["과시", "외로운 풍요", "절제 부족"],
      meaning:
        "스스로 일군 풍요 속에서 여유를 누리는 시기입니다.",
      meaningRev:
        "물질적 풍요 뒤에 정서적 공허가 자리하지 않는지 살펴보세요.",
    },
    {
      name: "펜타클 10",
      nameEn: "Ten of Pentacles",
      keywords: ["유산", "가족 부", "장기적 안정", "전통"],
      keywordsRev: ["가족 갈등", "재정 불안정", "단절"],
      meaning:
        "오래 쌓아온 것이 가족과 후대에까지 이어지는 시기입니다.",
      meaningRev:
        "가족·재정·구조에 균열이 보일 수 있습니다.",
    },
    {
      name: "펜타클 페이지",
      nameEn: "Page of Pentacles",
      keywords: ["학습", "새 기회", "성실한 시작", "구체적 계획"],
      keywordsRev: ["미루기", "비현실적 계획", "동기 부족"],
      meaning:
        "새로운 일이나 공부를 차근차근 시작하는 시기입니다. 작은 한 걸음이 큰 변화를 만듭니다.",
      meaningRev:
        "계획만 세우고 실행으로 옮기지 못하고 있을 수 있습니다.",
    },
    {
      name: "펜타클 나이트",
      nameEn: "Knight of Pentacles",
      keywords: ["성실", "꾸준함", "책임감", "신뢰"],
      keywordsRev: ["정체", "지루함", "지나친 신중함"],
      meaning:
        "느리지만 확실하게, 흔들림 없이 나아가는 시기입니다.",
      meaningRev:
        "속도가 너무 느려 기회가 지나갈 수 있으니 조금 가속이 필요합니다.",
    },
    {
      name: "펜타클 퀸",
      nameEn: "Queen of Pentacles",
      keywords: ["풍요", "양육", "현실 감각", "포용"],
      keywordsRev: ["과로", "자기 돌봄 부족", "물질주의"],
      meaning:
        "주변을 따뜻하게 돌보면서도 현실을 단단히 챙기는 시기입니다.",
      meaningRev:
        "남을 챙기느라 정작 자신을 돌보지 못하고 있을 수 있습니다.",
    },
    {
      name: "펜타클 킹",
      nameEn: "King of Pentacles",
      keywords: ["풍요", "사업 성공", "안정", "관대함"],
      keywordsRev: ["탐욕", "물질 집착", "보수성"],
      meaning:
        "오랜 노력으로 안정과 풍요를 누리는 시기입니다. 주변에 너그럽게 베풀 여유도 있습니다.",
      meaningRev:
        "물질에 지나치게 집착해 다른 가치가 가려질 수 있습니다.",
    },
  ],
};

const SUITS: Suit[] = ["wands", "cups", "swords", "pentacles"];

const majorPngNumbers = new Set([0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

const majorCards: TarotCard[] = majorTexts.map((t, i) => {
  const ext = majorPngNumbers.has(i) ? "png" : "jpg";
  return {
    ...t,
    id: `major_${pad(i)}`,
    arcana: "major" as const,
    number: i,
    image: `/images/major/major_${pad(i)}.${ext}`,
  };
});

const minorCards: TarotCard[] = SUITS.flatMap((suit) =>
  minorTexts[suit].map((t, i) => {
    const num = i + 1;
    return {
      ...t,
      id: `${suit}_${pad(num)}`,
      arcana: "minor",
      suit,
      number: num,
      image: `/images/minor/${suit}_${pad(num)}.jpg`,
    };
  })
);

export const tarotCards: TarotCard[] = [...majorCards, ...minorCards];

export const majorArcana: TarotCard[] = majorCards;
export const minorArcana: TarotCard[] = minorCards;

export const getCardById = (id: string): TarotCard | undefined =>
  tarotCards.find((c) => c.id === id);
