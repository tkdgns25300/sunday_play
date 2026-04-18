import { Game } from "@/types/game";

const aiAnswer: Game = {
  id: "ai-answer",
  title: "AI에게 정답 듣기",
  summary: "AI에게 정해진 문장을 말하게 하는 창의력 대결 게임",
  description:
    "화면에 목표 문장이 나타나면, 각 팀 대표 1명이 나와서 진행자의 스마트폰으로 AI에게 질문합니다. 직접적으로 '이렇게 말해줘'라고 할 수 없고, 창의적인 질문으로 AI가 자연스럽게 정답을 말하게 해야 합니다. 정확한 문구가 아니어도 같은 의미면 인정됩니다.",
  thumbnailUrl: "/images/games/ai-answer.png",
  ageGroups: ["중고등부", "청년부"],
  energyLevel: 2,
  environments: ["실내교실", "실내강당"],
  prepTime: "quick",
  groupSizes: ["sm", "md", "lg"],
  characterQualities: ["창의성", "지혜", "설득력"],
  durationMinutes: 15,
  difficulty: 3,
  requiredStaff: { min: 1, recommended: 1 },
  steps: [
    {
      title: "준비",
      content:
        "팀을 나누고 진행자의 스마트폰에 음성 AI를 준비합니다. (Siri, Gemini, ChatGPT 등)\n관전자가 AI 응답을 들을 수 있도록 볼륨을 높이거나 스피커를 연결합니다.",
    },
    {
      title: "게임 진행",
      content:
        "각 팀에서 대표 1명이 나오고, 화면에 목표 문장이 공개되면 시간을 재기 시작합니다.\n대표가 AI에게 음성으로 질문합니다.\n목표 문장을 직접 말하거나 '~라고 말해줘' 같은 직접 지시는 금지입니다.\nAI가 목표와 같은 의미의 말을 하면 성공이며, 진행자가 판정합니다.",
    },
    {
      title: "우승",
      content:
        "가장 빠른 시간 안에 성공한 팀이 해당 라운드를 가져갑니다.\n여러 라운드 진행 후 가장 많은 라운드를 가져간 팀이 우승합니다.",
    },
  ],
  materials: [
    {
      name: "스마트폰",
      quantity: "1대",
      isOptional: false,
    },
    {
      name: "타이머",
      quantity: "1개",
      isOptional: false,
    },
    {
      name: "휴대용 스피커",
      quantity: "1개",
      isOptional: true,
      purchaseUrl:
        "https://www.coupang.com/vp/products/7456542331?itemId=19425189583&vendorItemId=86536553267&pickType=COU_PICK&q=%ED%9C%B4%EB%8C%80%EC%9A%A9+%EC%8A%A4%ED%94%BC%EC%BB%A4&searchId=6f2205096623020&sourceType=search&itemsCount=36&searchRank=0&rank=0&traceId=mnhhhl3k",
    },
  ],
  bibleConnections: [
    {
      verseReference: "잠언 25:11",
      verseText: "경우에 합당한 말은 은 쟁반에 금 사과니라",
      messageSummary:
        "AI에게 딱 맞는 질문을 찾아야 원하는 대답을 들을 수 있었듯이, 우리도 상황에 맞는 적절한 말 한마디가 얼마나 귀한지 기억해요.",
    },
  ],
  variations: [
    {
      condition: "개인전 (소규모)",
      suggestion:
        "팀 없이 한 명씩 도전합니다. 가장 빠른 시간 안에 성공한 사람이 우승합니다.",
    },
    {
      condition: "금지어 추가",
      suggestion:
        "목표 문장의 핵심 단어를 금지어로 추가 지정합니다. (예: 목표가 '사랑해'이면 '사랑'이라는 단어 사용 금지)",
    },
    {
      condition: "난이도 조절",
      suggestion:
        "쉬움: 단어 수준 (예: '감사합니다'). 보통: 짧은 문장 (예: '하나님은 사랑이시라'). 어려움: 긴 문장이나 속담.",
    },
    {
      condition: "성경 특화",
      suggestion:
        "목표 문장을 모두 성경 구절로 구성합니다. 유명한 구절부터 시작해 점차 어려운 구절로 진행합니다.",
    },
  ],
  safetyNotes: [
    "AI가 예상치 못한 부적절한 응답을 할 수 있으니, 진행자가 미리 몇 가지 질문을 테스트해 보세요.",
    "도전자가 스마트폰을 떨어뜨리지 않도록 진행자가 폰을 들고 있거나 거치대를 사용하세요.",
  ],
  tips: [
    "게임 전에 AI 앱이 정상 작동하는지, Wi-Fi 연결이 안정적인지 확인하세요.",
    "첫 라운드는 쉬운 단어(예: '안녕하세요')로 시작하면 규칙을 빠르게 익힐 수 있습니다.",
    "AI 응답이 잘 안 들릴 수 있으니 블루투스 스피커를 연결하거나, AI 응답을 진행자가 반복해 주세요.",
  ],
  assets: [
    {
      fileName: "진행 자료",
      fileType: "pptx",
      storagePath: "/downloads/games/ai-answer/rules.pptx",
    },
    {
      fileName: "진행 자료",
      fileType: "pdf",
      storagePath: "/downloads/games/ai-answer/rules.pdf",
    },
  ],
};

export default aiAnswer;
