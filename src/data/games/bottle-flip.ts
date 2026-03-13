import { Game } from "@/types/game";

const bottleFlip: Game = {
  id: "bottle-flip",
  title: "물병 세우기",
  summary: "물병을 던져 바닥에 똑바로 세우는 집중력 게임",
  description:
    "각 팀별로 준비된 물병을 공중으로 한 바퀴 돌려 던져서 바닥에 똑바로 세우는 게임입니다.",
  thumbnailUrl: "/images/games/bottle-flip.jpg",
  ageGroups: ["유치부", "유년부", "초등부", "중고등부", "청년부"],
  energyLevel: 3,
  environments: ["실내교실", "실내강당"],
  prepTime: "quick",
  groupSizes: ["sm", "md"],
  biblicalThemes: ["인내", "집중력"],
  durationMinutes: 10,
  difficulty: 2,
  steps: [
    {
      title: "준비",
      content:
        "각 팀별로 물이 적당히 들어있는 페트병 8개를 준비합니다.",
    },
    {
      title: "도전",
      content: "물병을 한 바퀴 돌려 바닥에 똑바로 세우는 도전을 합니다.",
    },
    {
      title: "횟수",
      content:
        "개인당 총 3번의 기회가 주어지며, 총 3바퀴(라운드)를 진행합니다.",
    },
    {
      title: "승리",
      content: "가장 많이 물병을 세운 팀이 승리합니다.",
    },
  ],
  materials: [
    {
      name: "물이 들어있는 페트병",
      quantity: "팀당 8개",
      isOptional: false,
    },
  ],
  bibleConnections: [
    {
      verseReference: "히브리서 12:1",
      verseText: "인내로써 우리 앞에 당한 경주를 하며",
      messageSummary:
        "물병을 세우기 위해 집중하고 인내하듯, 우리도 끝까지 믿음의 경주를 달려가야 해요.",
    },
  ],
  variations: [],
  assets: [],
};

export default bottleFlip;
