import { Game } from "@/types/game";

const bottleCapFlick: Game = {
  id: "bottle-cap-flick",
  title: "병뚜껑 날리기",
  summary: "병뚜껑을 튕겨 성경 이름이 붙은 점수 선에 가장 가깝게 보내는 집중력 게임",
  description:
    "책상 위 성경 이름 선(믿음·소망·사랑·예수)을 향해 병뚜껑을 튕기는 집중력 게임입니다. 정확한 힘 조절이 관건이며, 예수선에 가까울수록 높은 점수를 얻습니다.",
  thumbnailUrl: "/images/games/bottle-cap-flick.png",
  ageGroups: ["유년부", "초등부", "중고등부", "청년부"],
  energyLevel: 2,
  environments: ["실내교실", "실내강당"],
  prepTime: "quick",
  groupSizes: ["sm", "md"],
  characterQualities: ["신중", "절제", "조심성"],
  durationMinutes: 15,
  difficulty: 2,
  requiredStaff: { min: 1, recommended: 1 },
  steps: [
    {
      title: "준비",
      content:
        "책상 위에 마스킹 테이프로 4개의 선을 긋고 이름을 붙입니다.\n출발선에서 가까운 순서로: 믿음선(1점) → 소망선(3점) → 사랑선(5점) → 예수선(10점).\n팀을 나누고 각자 병뚜껑을 1개씩 준비합니다.",
    },
    {
      title: "도전",
      content:
        "출발선 뒤에 서서 병뚜껑을 손가락으로 튕겨 선을 향해 보냅니다.\n병뚜껑이 멈춘 위치에서 가장 가까운 선의 점수를 얻습니다.\n선을 넘어가거나 책상 밖으로 나가면 0점입니다.",
    },
    {
      title: "우승",
      content:
        "팀원 전원이 한 번씩 도전하면 1라운드가 끝납니다.\n총 3라운드를 반복하여 누적 점수가 높은 팀이 우승합니다.",
    },
  ],
  materials: [
    {
      name: "병뚜껑",
      quantity: "1인당 1개",
      isOptional: false,
    },
    {
      name: "마스킹 테이프",
      quantity: "1롤",
      isOptional: false,
      purchaseUrl:
        "https://www.coupang.com/vp/products/162098333?itemId=465611915&vendorItemId=93503824867&q=%EB%B0%94%EB%8B%A5%EC%84%A0+%ED%85%8C%EC%9D%B4%ED%94%84&searchId=1931593c767484&sourceType=search&itemsCount=36&searchRank=12&rank=12&traceId=mn8vplxf",
    },
    {
      name: "책상",
      quantity: "팀당 1개",
      isOptional: false,
    },
  ],
  bibleConnections: [
    {
      verseReference: "히브리서 12:2",
      verseText:
        "믿음의 주요 또 온전하게 하시는 이인 예수를 바라보자",
      messageSummary:
        "믿음선, 소망선, 사랑선을 지나 예수선을 향해 집중하듯, 우리의 삶도 예수님을 바라보며 나아가야 해요. 믿음과 소망과 사랑, 그 끝에 언제나 예수님이 계십니다.",
    },
  ],
  variations: [
    {
      condition: "끝선 방식 (선 없이)",
      suggestion:
        "선 없이 책상 끝에 가장 가깝게 보내는 사람이 이기는 단순 방식으로 진행합니다. 준비 시간이 없고 규칙이 더 직관적이어서 짧은 시간에 빠르게 진행할 수 있습니다.",
    },
    {
      condition: "소규모 (5~10명)",
      suggestion:
        "팀전 없이 개인전으로 진행합니다. 3라운드 합산 점수로 순위를 매기면 집중력 대결로 긴장감이 높아집니다.",
    },
    {
      condition: "저학년 (유년부)",
      suggestion:
        "선 간격을 좁혀 점수 구역을 크게 만들고, 출발선과 첫 번째 선 사이 거리도 줄입니다. 성공 경험을 충분히 주는 것이 중요합니다.",
    },
    {
      condition: "고난이도",
      suggestion:
        "약손(비주력손) 사용, 눈 감고 튕기기 등 미션을 추가합니다. 성공 시 보너스 점수를 부여해 역전 기회를 만들 수 있습니다.",
    },
  ],
  safetyNotes: [
    "병뚜껑이 튀어 눈에 맞을 수 있으므로 옆 사람과 충분한 간격을 확보하세요.",
    "책상 위에 물건이 없는지 확인하고 진행하세요.",
    "병뚜껑이 바닥에 떨어지면 미끄러질 수 있으니 즉시 치우도록 안내하세요.",
  ],
  assets: [],
};

export default bottleCapFlick;
