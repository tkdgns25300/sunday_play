import { Game } from "@/types/game";

const bibleCharacterQuiz: Game = {
  id: "bible-character-quiz",
  title: "성경 인물 퀴즈",
  summary: "힌트를 듣고 성경 인물을 맞추는 퀴즈 게임",
  description:
    "진행자가 성경 인물에 대한 힌트를 하나씩 제공하고, 참가자들이 누구인지 맞추는 게임입니다. 성경 지식을 자연스럽게 복습하면서 즐길 수 있습니다.",
  thumbnailUrl: "/images/games/bible-character-quiz.jpg",
  ageGroups: ["초등부", "중고등부", "청년부"],
  energyLevel: 1,
  environments: ["실내교실", "실내강당", "온라인"],
  prepTime: "advance",
  groupSizes: ["xs", "sm", "md", "lg"],
  biblicalThemes: ["믿음", "순종"],
  durationMinutes: 20,
  difficulty: 3,
  steps: [
    {
      title: "퀴즈 준비",
      content:
        "미리 준비한 성경 인물 카드(또는 PPT)를 준비합니다. 인물당 힌트 3~5개를 단계별로 준비합니다. 쉬운 힌트에서 어려운 힌트 순서로 배치합니다.",
      scriptKo: "오늘은 성경 인물 퀴즈를 할 거예요! 힌트를 잘 듣고 누구인지 맞춰보세요!",
      scriptEn:
        "Today we're going to play a Bible character quiz! Listen carefully to the hints and guess who it is!",
    },
    {
      title: "규칙 설명",
      content:
        "힌트는 총 5개가 주어집니다. 1번 힌트에 맞추면 5점, 2번 힌트에 맞추면 4점 식으로 점수가 줄어듭니다. 개인전 또는 팀전으로 진행합니다.",
      scriptKo:
        "힌트는 5개가 나와요. 빨리 맞출수록 점수가 높아요! 1번 힌트에 맞추면 5점, 마지막 힌트에 맞추면 1점!",
      scriptEn:
        "There will be 5 hints. The faster you guess, the more points you get! 5 points for the first hint, 1 point for the last!",
    },
    {
      title: "퀴즈 진행",
      content:
        "인물별로 힌트를 하나씩 공개합니다. 참가자가 손을 들거나 벨을 눌러 답합니다. 정답자에게 해당 점수를 부여합니다. 5~10명의 인물을 진행합니다.",
    },
    {
      title: "마무리",
      content:
        "최종 점수를 합산하여 우승자/우승팀을 발표합니다. 퀴즈에 나온 인물들의 공통된 믿음에 대해 이야기합니다.",
    },
  ],
  materials: [
    { name: "성경 인물 힌트 카드 또는 PPT", quantity: "10세트", isOptional: false },
    { name: "점수판(화이트보드 등)", quantity: "1개", isOptional: false },
    { name: "벨 또는 손 들기용 깃발", quantity: "팀당 1개", isOptional: true },
  ],
  bibleConnections: [
    {
      verseReference: "히브리서 11:1",
      verseText: "믿음은 바라는 것들의 실상이요 보이지 않는 것들의 증거니",
      messageSummary:
        "오늘 퀴즈에 나온 인물들은 모두 하나님을 믿었던 사람들이에요. 우리도 그들처럼 하나님을 믿고 따라가요.",
    },
  ],
  variations: [
    {
      condition: "유년부와 함께할 때",
      suggestion:
        "힌트를 그림으로 제공하거나, 보기 3개 중에서 고르는 객관식으로 변경.",
    },
    {
      condition: "온라인으로 진행할 때",
      suggestion: "PPT 화면 공유로 힌트를 보여주고, 채팅으로 답을 받는 방식.",
    },
    {
      condition: "대그룹(30명 이상)일 때",
      suggestion: "팀별로 상의 후 대표가 답하는 방식으로 진행.",
    },
  ],
  assets: [],
};

export default bibleCharacterQuiz;
