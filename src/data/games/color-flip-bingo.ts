import { Game } from "@/types/game";

const colorFlipBingo: Game = {
  id: "color-flip-bingo",
  title: "색판 뒤집기 빙고",
  summary: "릴레이로 색판을 뒤집어 팀의 빙고를 먼저 완성하는 에너지 넘치는 게임",
  description:
    "양면 색판을 4×4로 펼쳐놓고, 두 팀이 동시에 릴레이로 달려나가 자기 팀 색으로 뒤집는 전략 게임입니다. 상대 팀이 만들어놓은 색판도 뒤집을 수 있어 끝까지 승부를 알 수 없습니다.",
  thumbnailUrl: "/images/games/color-flip-bingo.png",
  ageGroups: ["초등부", "중고등부", "청년부"],
  energyLevel: 4,
  environments: ["실내강당", "야외"],
  prepTime: "quick",
  groupSizes: ["md", "lg"],
  characterQualities: ["책임감", "솔선", "충성"],
  durationMinutes: 15,
  difficulty: 2,
  requiredStaff: { min: 1, recommended: 2 },
  steps: [
    {
      title: "준비",
      content:
        "팀을 2팀으로 나누고 각 팀의 색상을 지정합니다 (예: 빨강 팀 vs 파랑 팀).\n양면 색판 16개를 4×4 격자로 바닥에 배치합니다. 처음에는 모두 같은 면(중립)으로 놓습니다.\n각 팀은 색판으로부터 3~5m 떨어진 출발선에 일렬로 줄을 섭니다.",
    },
    {
      title: "릴레이 시작",
      content:
        '"시작" 신호와 함께 양팀의 첫 번째 주자가 동시에 출발합니다.\n색판 구역에 도착하면 어느 판이든 1장을 골라 자기 팀 색이 위로 오도록 뒤집습니다.\n뒤집은 후 출발선으로 달려 돌아와 줄 맨 앞의 다음 사람과 하이파이브를 합니다.\n하이파이브를 받은 다음 주자가 즉시 출발합니다.',
    },
    {
      title: "전략 포인트",
      content:
        "상대 팀이 자기 색으로 뒤집어 놓은 색판도 뒤집을 수 있습니다.\n빙고에 필요한 칸을 채울지, 상대 팀의 빙고를 방해할지 순간적으로 판단해야 합니다.\n진행자는 색판 전체가 잘 보이는 위치에 서서 빙고 완성을 신속하게 확인합니다.",
    },
    {
      title: "빙고 완성 및 우승",
      content:
        "가로, 세로, 대각선 중 한 줄이 모두 자기 팀 색으로 채워지는 순간 \"빙고!\"를 외칩니다.\n먼저 빙고를 완성한 팀이 해당 라운드를 가져갑니다.\n전원이 한 번씩 뛴 후에도 빙고가 나오지 않으면 자기 팀 색 판이 더 많은 팀이 이깁니다.\n여러 라운드로 나누어 진행하고 최다 승 팀이 최종 우승합니다.",
    },
  ],
  materials: [
    { name: "양면 색판 (2색)", quantity: "16개 (4×4 기준)", isOptional: false },
    { name: "출발선 표시용 테이프", quantity: "2줄", isOptional: true },
  ],
  bibleConnections: [
    {
      verseReference: "고린도전서 12:27",
      verseText: "너희는 그리스도의 몸이요 지체의 각 부분이라",
      messageSummary:
        "한 사람 한 사람이 자기 차례에 최선을 다할 때 팀 전체가 빙고를 완성할 수 있듯이, 우리도 각자의 자리에서 맡은 역할을 충실히 감당할 때 그리스도의 몸 된 교회가 세워져요.",
    },
  ],
  variations: [
    {
      condition: "소규모 (10명 이하)",
      suggestion:
        "3×3 빙고판(9개)으로 줄여서 진행합니다. 인원이 적을수록 1인당 뛰는 횟수가 늘어나 더 역동적으로 즐길 수 있습니다.",
    },
    {
      condition: "대규모 (30명 이상)",
      suggestion:
        "팀을 3~4팀으로 나누어 토너먼트 방식으로 진행합니다. 대기 팀은 응원단이 되어 분위기를 띄웁니다.",
    },
    {
      condition: "공간이 좁을 때",
      suggestion:
        "뛰는 대신 코끼리 코 돌기, 게걸음, 한 발 뛰기 등 이동 미션을 추가합니다. 속도보다 미션 수행 재미가 부각됩니다.",
    },
    {
      condition: "영적 메시지 강조",
      suggestion:
        "빙고 한 줄을 완성할 때마다 해당 줄의 색판에 미리 적어둔 성경 구절 조각을 모아 한 절을 완성하는 방식으로 진행합니다.",
    },
  ],
  safetyNotes: [
    "실내에서는 뛰기 전 바닥이 미끄럽지 않은지 반드시 확인하세요. 양말 착용 시 미끄럼 방지 양말을 권장합니다.",
    "두 팀이 같은 색판을 동시에 잡으려다 손이 부딪힐 수 있습니다. 색판 1개에 한 명만 손을 댈 수 있다는 규칙을 사전에 안내하세요.",
    "출발선과 색판 사이 거리를 연령에 맞게 조절하세요. 초등 저학년은 2~3m, 중고등부는 4~5m가 적당합니다.",
    "색판이 날아가거나 뒤집히지 않도록 격자 모서리에 테이프로 가이드를 표시해 두면 색판 배치가 무너지는 것을 방지할 수 있습니다.",
  ],
  assets: [
    {
      fileName: "진행 자료",
      fileType: "pptx",
      storagePath: "/downloads/games/color-flip-bingo/rules.pptx",
    },
    {
      fileName: "진행 자료",
      fileType: "pdf",
      storagePath: "/downloads/games/color-flip-bingo/rules.pdf",
    },
  ],
};

export default colorFlipBingo;
