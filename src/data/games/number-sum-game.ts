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
      title: "준비",
      content:
        "팀별로 숫자 카드를 나누어 갖고 원 모양으로 섭니다.",
    },
    {
      title: "미션 부여",
      content:
        '진행자가 목표 숫자와 필요한 인원수를 외칩니다. (예: "3사람 합해서 15")',
    },
    {
      title: "결합",
      content:
        "해당 숫자를 가진 팀원들이 빠르게 모여 카드를 머리 위로 들어 올리며 확인받습니다.",
    },
  ],
  materials: [
    { name: "숫자 카드", quantity: "개인당 1매", isOptional: false },
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
  assets: [],
};

export default numberSumGame;
