import { Game } from "@/types/game";

const wordSpeedQuiz: Game = {
  id: "word-speed-quiz",
  title: "단어 스피드 퀴즈",
  summary:
    "매 라운드 다양한 주제로 단어를 빠르게 적어내는 팀 대결 게임",
  description:
    "진행자가 제시하는 주제에 맞는 단어를 제한 시간 내에 팀별로 최대한 많이 적는 게임입니다. 단어를 적은 후 공개되는 플러스/마이너스 단어로 점수가 뒤집힐 수 있는 서프라이즈 요소가 특징입니다.",
  thumbnailUrl: "/images/games/word-speed-quiz.png",
  ageGroups: ["유년부", "초등부", "중고등부"],
  energyLevel: 2,
  environments: ["실내교실"],
  prepTime: "quick",
  groupSizes: ["md"],
  characterQualities: ["지혜", "경각심", "분별력"],
  durationMinutes: 15,
  difficulty: 3,
  requiredStaff: { min: 1, recommended: 2 },
  steps: [
    {
      title: "준비",
      content:
        "팀을 나누고 각 팀에 화이트보드와 보드마카를 배분합니다.\n팀원들이 함께 볼 수 있도록 화이트보드를 팀 중앙에 위치시킵니다.",
    },
    {
      title: "주제 발표 및 단어 적기",
      content:
        '진행자가 라운드 주제만 발표합니다.\n예: "G로 시작하는 단어", "색깔 단어", "교회에서 하는 행동"\n제한 시간(1분) 내에 팀원들과 상의하여 화이트보드에 단어를 최대한 많이 적습니다.\n다른 팀에게 보이지 않도록 화이트보드를 가립니다.',
    },
    {
      title: "플러스/마이너스 공개",
      content:
        "시간이 끝나면 진행자가 플러스 단어(+5점)와 마이너스 단어(-3점)를 공개합니다.\n예: 플러스 — God, Good, Gift / 마이너스 — Give, Great, Garden\n각 팀이 화이트보드를 공개하고 점수를 계산합니다.",
    },
    {
      title: "점수 및 우승",
      content:
        "일반 단어 1개당 1점, 플러스 단어는 +5점, 마이너스 단어는 -3점입니다.\n여러 라운드를 반복하여 최다 점수 팀이 우승합니다.",
    },
  ],
  materials: [
    {
      name: "화이트보드 + 보드마카 세트",
      quantity: "팀당 1세트",
      isOptional: false,
      purchaseUrl:
        "https://www.coupang.com/vp/products/108161475?itemId=327387477&vendorItemId=3802387954",
    },
  ],
  bibleConnections: [
    {
      verseReference: "잠언 16:24",
      verseText:
        "선한 말은 꿀송이 같아서 마음에 달고 뼈에 양약이 되느니라",
      messageSummary:
        "우리가 알고 있는 수많은 단어 중에서 가장 소중한 말은 서로를 세워주는 선한 말이에요. 오늘 배운 단어들처럼, 좋은 말을 많이 나누는 친구들이 되어요.",
    },
  ],
  variations: [
    {
      condition: "저학년 (유년부)",
      suggestion:
        '쉬운 주제 위주로 출제하고("동물 이름", "색깔"), 제한 시간을 2분으로 늘립니다.',
    },
    {
      condition: "대규모 (20명 이상)",
      suggestion:
        "릴레이 형태로 팀원이 한 명씩 돌아가며 단어를 하나씩 적는 방식으로 진행합니다.",
    },
    {
      condition: "성경 특화",
      suggestion:
        '모든 라운드를 성경 관련 주제로만 진행합니다. 예: "성경 인물", "예수님의 기적", "성경 속 장소"',
    },
    {
      condition: "겹치기 방지 룰",
      suggestion:
        "플러스/마이너스 없이, 다른 팀과 겹치지 않는 단어만 1점으로 인정하는 방식으로 진행합니다.",
    },
  ],
  safetyNotes: [
    "보드마카 뚜껑을 잘 닫도록 안내하세요. 옷에 묻으면 잘 지워지지 않습니다.",
    "흥분하여 소리가 커질 수 있으므로 시작 전 볼륨 규칙을 정하세요.",
  ],
  assets: [
    {
      fileName: "진행 자료",
      fileType: "pptx",
      storagePath: "/downloads/games/word-speed-quiz/rules.pptx",
    },
    {
      fileName: "진행 자료",
      fileType: "pdf",
      storagePath: "/downloads/games/word-speed-quiz/rules.pdf",
    },
  ],
};

export default wordSpeedQuiz;
