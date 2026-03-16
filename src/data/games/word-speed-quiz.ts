import { Game } from "@/types/game";

const wordSpeedQuiz: Game = {
  id: "word-speed-quiz",
  title: "단어 스피드 퀴즈",
  summary: "특정 알파벳으로 시작하는 단어와 성경 퀴즈를 맞히는 지혜 대결",
  description:
    "제시된 알파벳으로 시작하는 영어 단어를 많이 적고 성경 관련 추가 문제를 해결하는 게임입니다.",
  thumbnailUrl: "/images/games/word-speed-quiz.png",
  ageGroups: ["유년부", "초등부", "중고등부"],
  energyLevel: 2,
  environments: ["실내교실"],
  prepTime: "none",
  groupSizes: ["sm", "md"],
  characterQualities: ["지혜", "경각심", "분별력"],
  durationMinutes: 15,
  difficulty: 3,
  requiredStaff: { min: 1, recommended: 2 },
  steps: [
    {
      title: "알파벳 퀴즈",
      content:
        "제시된 알파벳으로 시작하는 영어 단어를 제한 시간(1분) 내에 최대한 많이 적습니다.",
    },
    {
      title: "점수 계산",
      content:
        "단어 1개당 10점이며, 플러스/마이너스 단어에 따라 추가 점수나 감점이 적용됩니다.",
    },
    {
      title: "성경 보너스",
      content:
        "예수님의 기적이나 성경 인물과 관련된 퀴즈를 통해 보너스 점수를 획득합니다.",
    },
  ],
  materials: [
    { name: "화이트보드", quantity: "1개", isOptional: false },
    { name: "보드마카", quantity: "1개", isOptional: false },
  ],
  bibleConnections: [
    {
      verseReference: "잠언 16:24",
      verseText:
        "선한 말은 꿀송이 같아서 마음에 달고 뼈에 양약이 되느니라",
      messageSummary:
        "하나님이 주신 지혜로 아름다운 믿음의 고백을 나누는 친구들이 되어요.",
    },
  ],
  variations: [],
  assets: [],
};

export default wordSpeedQuiz;
