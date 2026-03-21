import { Game } from "@/types/game";

const numberSumGame: Game = {
  id: "number-sum-game",
  title: "계산합시다",
  summary: "숫자 카드를 조합하여 진행자가 부른 합계 숫자를 만드는 순발력 게임",
  description:
    "각자 가진 숫자 카드를 팀원들과 합쳐 제시된 숫자를 빠르게 만드는 연합 활동입니다.",
  thumbnailUrl: "/images/games/number-sum-game.png",
  ageGroups: ["초등부", "중고등부", "청년부"],
  energyLevel: 4,
  environments: ["실내강당", "야외"],
  prepTime: "quick",
  groupSizes: ["md", "lg"],
  characterQualities: ["경청", "유연성", "베풂"],
  durationMinutes: 15,
  difficulty: 3,
  requiredStaff: { min: 1, recommended: 1 },
  steps: [
    {
      title: "카드 배분",
      content:
        "모든 참가자에게 숫자 카드를 1장씩 나눠줍니다.\n각자 자기 카드의 숫자를 확인하고 기억하도록 안내합니다.",
    },
    {
      title: "숫자 맞추기",
      content:
        '진행자가 인원수와 목표 숫자를 부릅니다.\n예: "3명이서 합쳐서 15!"\n참가자들은 자기 카드 숫자를 합쳐 목표 숫자가 되는 조합을 찾아 빠르게 모입니다.',
    },
    {
      title: "확인 및 득점",
      content:
        "모인 팀은 카드를 높이 들어 진행자에게 보여줍니다.\n가장 먼저 정확히 맞춘 팀이 1점을 획득합니다.\n틀린 팀은 점수 없이 다음 라운드로 넘어갑니다.",
    },
    {
      title: "반복 및 우승",
      content:
        "여러 라운드를 반복 진행합니다.\n라운드마다 인원수와 목표 숫자를 바꿔가며 난이도를 조절합니다.\n모든 라운드가 끝난 후 가장 많은 점수를 얻은 팀이 우승합니다.",
    },
  ],
  materials: [
    {
      name: "숫자 카드",
      quantity: "개인당 1장",
      isOptional: false,
    },
  ],
  bibleConnections: [
    {
      verseReference: "전도서 4:12",
      verseText: "세 겹 줄은 쉽게 끊어지지 아니하느니라",
      messageSummary:
        "우리가 서로의 부족함을 숫자로 채워주듯, 교회 공동체도 서로 도울 때 더욱 단단해져요.",
    },
  ],
  variations: [
    {
      condition: "난이도 향상",
      suggestion:
        "인원수와 목표 숫자를 점점 늘려가며 암산과 협동심을 요구합니다.",
    },
  ],
  safetyNotes: [
    "숫자를 맞추기 위해 급하게 뛰어다닐 수 있으므로 이동 범위를 지정하세요.",
    "어린 아이들은 숫자 범위를 작게 설정하세요.",
  ],
  assets: [
    {
      fileName: "진행 PPT",
      fileType: "pptx",
      storagePath: "/downloads/games/number-sum-game/rules.pptx",
    },
    {
      fileName: "숫자 카드",
      fileType: "pdf",
      storagePath: "/downloads/games/number-sum-game/number-cards.pdf",
    },
    {
      fileName: "숫자 카드",
      fileType: "hwpx",
      storagePath: "/downloads/games/number-sum-game/number-cards.hwpx",
    },
  ],
};

export default numberSumGame;
