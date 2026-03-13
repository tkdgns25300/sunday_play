import { Game } from "@/types/game";

const colorFlipBingo: Game = {
  id: "color-flip-bingo",
  title: "색판 뒤집기 빙고",
  summary: "릴레이로 색판을 뒤집어 팀의 빙고를 먼저 완성하는 에너지 넘치는 게임",
  description:
    "한 명씩 달려 나가 준비된 색판을 뒤집거나 깔아 빙고를 만드는 전략 릴레이 게임입니다.",
  thumbnailUrl: "/images/games/color-flip-bingo.png",
  ageGroups: ["초등부", "중고등부", "청년부"],
  energyLevel: 4,
  environments: ["실내강당", "야외"],
  prepTime: "quick",
  groupSizes: ["md", "lg"],
  biblicalThemes: ["협동", "한 몸"],
  durationMinutes: 15,
  difficulty: 2,
  requiredStaff: { min: 1, recommended: 2 },
  steps: [
    {
      title: "준비",
      content:
        "팀별로 출발선에 서고 목표 지점에 색판을 배치합니다.",
    },
    {
      title: "릴레이",
      content:
        "한 명씩 나와 색판을 뒤집거나 깐 뒤 다음 사람과 하이파이브를 합니다.",
    },
    {
      title: "빙고 완성",
      content:
        "가로, 세로, 대각선 중 먼저 한 줄의 빙고를 완성하는 팀이 승리합니다.",
    },
  ],
  materials: [
    { name: "양면 색판", quantity: "팀당 9~16개", isOptional: false },
  ],
  bibleConnections: [
    {
      verseReference: "고린도전서 12:27",
      verseText: "너희는 그리스도의 몸이요 지체의 각 부분이라",
      messageSummary:
        "우리 모두가 각자의 역할에 최선을 다할 때 주님의 몸 된 교회가 아름답게 세워져요.",
    },
  ],
  variations: [
    {
      condition: "인원이 적을 때",
      suggestion: "빙고판 크기를 줄이거나 왕복 횟수를 늘려 진행합니다.",
    },
    {
      condition: "공간이 좁을 때",
      suggestion:
        "뛰는 대신 코끼리 코 돌기 등 미션을 수행하며 이동합니다.",
    },
  ],
  assets: [],
};

export default colorFlipBingo;
