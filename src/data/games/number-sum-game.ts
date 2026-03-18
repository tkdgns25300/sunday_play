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
      content: "팀별로 숫자 카드를 나누어 갖고 원 모양으로 섭니다.",
      scriptKo:
        "여러분 안녕하세요! 지금부터 '계산합시다' 게임을 시작하겠습니다.\n먼저 각자 숫자 카드를 한 장씩 받으세요. 카드를 받으셨으면 팀별로 원 모양으로 서주세요.\n자기 카드의 숫자를 잘 기억해두세요! (약 2분)",
    },
    {
      title: "미션 부여",
      content:
        '진행자가 목표 숫자와 필요한 인원수를 외칩니다. (예: "3사람 합해서 15")',
      scriptKo:
        "자, 이제 제가 숫자를 부르겠습니다.\n예를 들어 '3명이서 합해서 15!'라고 하면, 숫자를 합쳐 15가 되는 3명이 빠르게 모여야 합니다.\n준비됐나요? 시작합니다! (약 10분)\n\n'2명이서 합해서 10!'\n'3명이서 합해서 20!'\n'4명이서 합해서 25!'",
    },
    {
      title: "결합",
      content:
        "해당 숫자를 가진 팀원들이 빠르게 모여 카드를 머리 위로 들어 올리며 확인받습니다.",
      scriptKo:
        "숫자가 맞는 팀원들끼리 빠르게 모여주세요!\n모였으면 카드를 머리 위로 높이 들어올려 주세요.\n제가 확인하겠습니다. 가장 빨리 정확하게 모인 팀이 점수를 획득합니다! (약 3분)\n\n수고하셨습니다! 가장 많은 점수를 획득한 팀이 우승입니다!",
    },
  ],
  materials: [
    {
      name: "숫자 카드",
      quantity: "개인당 1매",
      isOptional: false,
      downloadPath: "/downloads/games/number-sum-game/number-cards.pdf",
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
      fileType: "ppt",
      storagePath: "/downloads/games/number-sum-game/rules.pptx",
    },
    {
      fileName: "대본 스크립트",
      fileType: "pdf",
      storagePath: "/downloads/games/number-sum-game/script.pdf",
    },
  ],
};

export default numberSumGame;
