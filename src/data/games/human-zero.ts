import { Game } from "@/types/game";

const humanZero: Game = {
  id: "human-zero",
  title: "인간 제로",
  summary: "상대팀에서 일어날 사람 수를 맞추는 심리 대결 게임",
  description:
    "공격팀이 0부터 상대팀 인원수까지 숫자를 외치면, 수비팀은 서로 상의 없이 각자 일어날지 앉아 있을지 결정합니다. 일어난 사람 수가 공격팀이 부른 숫자와 같으면 공격 성공! 상대의 심리를 읽는 것이 핵심인 팀 대결 게임입니다.",
  thumbnailUrl: "/images/games/human-zero.png",
  ageGroups: ["초등부", "중고등부", "청년부"],
  energyLevel: 2,
  environments: ["실내교실", "실내강당"],
  prepTime: "none",
  groupSizes: ["sm"],
  characterQualities: ["신중", "담대함", "분별력"],
  durationMinutes: 15,
  difficulty: 2,
  requiredStaff: { min: 1, recommended: 1 },
  steps: [
    {
      title: "준비",
      content:
        "2팀으로 나눕니다 (팀당 4~5명).\n팀별로 앉습니다.",
    },
    {
      title: "게임 진행",
      content:
        "공격팀이 0부터 상대팀 인원수 사이의 숫자를 하나 외칩니다.\n수비팀은 서로 상의 없이 동시에 일어나거나 앉아 있습니다.\n일어난 사람 수가 공격팀이 부른 숫자와 같으면 공격 성공이며, 한 번 더 공격합니다.\n공격 실패 시 공수가 교대됩니다.",
    },
    {
      title: "우승",
      content:
        "먼저 정해진 횟수(예: 3회)만큼 공격에 성공한 팀이 우승합니다.",
    },
  ],
  materials: [],
  bibleConnections: [
    {
      verseReference: "로마서 12:16",
      verseText: "서로 마음을 같이하며",
      messageSummary:
        "팀원들이 말 없이도 마음을 맞춰야 했듯이, 함께하는 사람들과 마음을 하나로 모으는 것이 얼마나 중요한지 느꼈을 거예요.",
    },
  ],
  variations: [
    {
      condition: "다팀 토너먼트",
      suggestion:
        "3~4팀으로 나눠 대진표를 짜서 토너먼트로 진행합니다. 1:1 대결로 승자끼리 결승까지 올라가는 방식입니다.",
    },
    {
      condition: "제로 보너스",
      suggestion:
        "공격팀이 '0'을 외쳤는데 실제로 아무도 안 일어나면 즉시 승리합니다. 가장 어려운 공격인 만큼 최고의 보상!",
    },
    {
      condition: "성경 특화",
      suggestion:
        "공격 성공 시 성경 퀴즈를 추가로 맞혀야 점수를 획득합니다. 심리전 + 성경 지식이 결합됩니다.",
    },
  ],
  safetyNotes: [
    "일어설 때 주변 사람이나 물건에 부딪히지 않도록 충분한 공간을 확보하세요.",
    "수비팀이 상의하지 못하도록 공격 직전까지 조용히 유지해 주세요.",
  ],
  tips: [
    "팀당 4~5명이 가장 적당합니다. 인원이 많으면 확률이 너무 낮아져 공격이 잘 안 됩니다.",
    "공격팀 전원이 상의해서 숫자를 정하고 대표가 외치게 하면 전략적 재미가 올라갑니다.",
  ],
  assets: [
    {
      fileName: "진행 자료",
      fileType: "pptx",
      storagePath: "/downloads/games/human-zero/rules.pptx",
    },
    {
      fileName: "진행 자료",
      fileType: "pdf",
      storagePath: "/downloads/games/human-zero/rules.pdf",
    },
  ],
};

export default humanZero;
