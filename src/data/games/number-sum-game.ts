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
        "모든 참가자에게 숫자 카드를 1장씩 나눠줍니다.\n각자 숫자를 확인하고 기억한 뒤, 팀별로 원형으로 둘러앉습니다.",
    },
    {
      title: "숫자 조합",
      content:
        '진행자가 인원수와 목표 숫자를 부릅니다.\n예: "3명이서 합쳐서 15!"\n해당되는 사람들이 일어나 원 중앙으로 모입니다.',
    },
    {
      title: "득점",
      content:
        "중앙에 모인 사람들은 카드를 높이 들어 진행자에게 보여줍니다.\n가장 먼저 정확히 맞춘 팀이 1점을 획득합니다.",
    },
    {
      title: "우승",
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
      verseReference: "로마서 12:5",
      verseText:
        "우리 많은 사람이 그리스도 안에서 한 몸이 되어 서로 지체가 되었느니라",
      messageSummary:
        "각자 다른 숫자를 가지고 있지만 함께 모여야 목표를 이룰 수 있듯이, 우리도 서로 다른 은사를 가지고 한 몸을 이루어요.",
    },
  ],
  variations: [
    {
      condition: "소규모 (10명 이하)",
      suggestion:
        "카드를 2장씩 배분하여 선택의 폭을 넓히고, 선생님도 함께 참여합니다.",
    },
    {
      condition: "저학년 (초등부)",
      suggestion:
        "1~5 범위의 숫자만 사용하고, 2명씩 모이는 문제만 출제합니다.",
    },
    {
      condition: "공간이 좁을 때",
      suggestion:
        "자리에서 일어나 손을 들어 짝을 찾는 방식으로 진행합니다.",
    },
  ],
  safetyNotes: [
    "급하게 모이다 부딪힐 수 있으므로 팀 간 간격을 충분히 확보하세요.",
    "저학년은 1~5 범위의 작은 숫자 카드를 사용하세요.",
    "매 라운드 시작 전 참가자들이 제자리에 있는지 확인하세요.",
  ],
  assets: [
    {
      fileName: "진행 자료",
      fileType: "pptx",
      storagePath: "/downloads/games/number-sum-game/rules.pptx",
    },
    {
      fileName: "진행 자료",
      fileType: "pdf",
      storagePath: "/downloads/games/number-sum-game/rules.pdf",
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
