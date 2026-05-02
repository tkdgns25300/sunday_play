import { Game } from "@/types/game";

const foolGame: Game = {
  id: "fool-game",
  title: "바보 게임",
  summary: "숫자를 외치면서 손가락은 다른 숫자를 펼치는 두뇌 혼란 게임",
  description:
    "차례대로 돌아가며 1초 안에 1~5 중 숫자를 외치면서 동시에 손가락으로는 다른 숫자를 펼칩니다. 입과 손이 같은 숫자면 탈락! 앞 사람이 말한 숫자도 사용할 수 없어서 머리가 점점 복잡해집니다.",
  thumbnailUrl: "/images/games/fool-game.png",
  ageGroups: ["초등부", "중고등부", "청년부", "장년부"],
  energyLevel: 1,
  environments: ["실내교실", "실내강당"],
  prepTime: "none",
  groupSizes: ["sm", "md"],
  characterQualities: ["경각심", "과단성", "절제"],
  durationMinutes: 10,
  difficulty: 3,
  requiredStaff: { min: 1, recommended: 1 },
  steps: [
    {
      title: "준비",
      content:
        "참가자들이 원형으로 앉아 순서를 정합니다.",
    },
    {
      title: "게임 진행",
      content:
        "차례대로 1초 안에 1~5 중 숫자를 외치면서 동시에 손가락으로 다른 숫자를 펼칩니다.\n입으로 말한 숫자와 손가락 숫자가 같으면 탈락입니다.\n앞 사람이 말한 숫자는 사용할 수 없습니다.",
    },
    {
      title: "우승",
      content:
        "탈락자는 원에서 빠지고 계속 진행합니다.\n최후까지 살아남은 사람이 우승합니다.",
    },
  ],
  materials: [],
  bibleConnections: [
    {
      verseReference: "빌립보서 4:13",
      verseText: "내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라",
      messageSummary:
        "입과 손이 따로 노는 게 어려웠지만 연습하면 할 수 있듯이, 어려운 일도 하나님이 주시는 힘으로 해낼 수 있어요.",
    },
  ],
  variations: [
    {
      condition: "제한 시간 완화",
      suggestion:
        "1초가 어려우면 2~3초로 늘려서 진행합니다. 익숙해지면 다시 1초로 줄이세요.",
    },
    {
      condition: "숫자 범위 조절",
      suggestion:
        "인원이나 연령에 따라 범위를 다양하게 조절할 수 있습니다. (1~3, 1~5, 1~10)",
    },
    {
      condition: "양손 모드",
      suggestion:
        "양손으로 각각 다른 숫자를 펼치면서 입으로는 또 다른 숫자를 말합니다. 극한 난이도!",
    },
    {
      condition: "성경 특화",
      suggestion:
        "숫자 대신 성경 인물(예: 모세, 다윗, 요셉, 바울, 에스더)을 사용합니다. 이름을 말하면서 손가락으로 다른 인물의 번호를 펼칩니다.",
    },
  ],
  safetyNotes: [
    "흥분해서 옆 사람을 치지 않도록 적절한 간격을 유지하세요.",
    "탈락에 스트레스받지 않도록 가벼운 분위기로 진행하세요.",
  ],
  tips: [
    "첫 라운드는 연습으로 진행하면 규칙을 빠르게 이해할 수 있습니다.",
    "진행자가 '빨리 빨리!'를 외치며 템포를 조절하면 분위기가 살아납니다.",
  ],
  assets: [
    {
      fileName: "진행 자료",
      fileType: "pptx",
      storagePath: "/downloads/games/fool-game/rules.pptx",
    },
    {
      fileName: "진행 자료",
      fileType: "pdf",
      storagePath: "/downloads/games/fool-game/rules.pdf",
    },
    {
      fileName: "진행 자료",
      fileType: "zip",
      storagePath: "/downloads/games/fool-game/slides.zip",
    },
  ],
  recommendScore: 2,
  creditPrice: 500,
};

export default foolGame;
