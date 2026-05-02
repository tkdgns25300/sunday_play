import { Game } from "@/types/game";

const bottleFlip: Game = {
  id: "bottle-flip",
  title: "물병 세우기",
  summary: "물병을 공중에 던져 바닥에 똑바로 세우는 집중력·인내 게임",
  description:
    "물이 1/3 채워진 페트병을 공중으로 한 바퀴 돌려 던져 바닥에 세우는 게임입니다. 단순한 규칙이지만 성공률이 낮아 끈기와 집중력이 요구되며, 성공 순간의 짜릿함 덕분에 분위기를 금방 달아오르게 합니다.",
  thumbnailUrl: "/images/games/bottle-flip.png",
  ageGroups: ["유치부", "유년부", "초등부", "중고등부", "청년부"],
  energyLevel: 2,
  environments: ["실내교실", "실내강당"],
  prepTime: "quick",
  groupSizes: ["sm", "md"],
  characterQualities: ["인내", "끈기", "절제"],
  durationMinutes: 10,
  difficulty: 2,
  requiredStaff: { min: 1, recommended: 1 },
  steps: [
    {
      title: "물병 준비",
      content:
        "500ml 페트병에 물을 1/3 정도 채우고 뚜껑을 단단히 닫습니다.\n물이 너무 많거나 적으면 성공률이 크게 떨어지므로 1/3이 핵심입니다.\n팀을 나누고 각 팀에 물병 1개씩 배분합니다.",
    },
    {
      title: "도전",
      content:
        "팀원이 차례대로 나와 물병을 한 바퀴 돌려 던집니다.\n물병 위쪽(뚜껑 근처)을 가볍게 잡고, 손목 스냅을 이용해 앞으로 던집니다.\n각자 1번씩 시도하고, 물병이 바닥에 똑바로 서면 팀에 1점을 줍니다.",
    },
    {
      title: "우승",
      content:
        "전원이 한 번씩 도전한 것을 1라운드로 합니다.\n총 3라운드를 진행하여 누적 점수가 높은 팀이 우승합니다.",
    },
  ],
  materials: [
    {
      name: "500ml 생수 페트병",
      quantity: "팀당 1개",
      isOptional: false,
      purchaseUrl:
        "https://www.coupang.com/vp/products/7689270513?itemId=20972233691&vendorItemId=88037469667&q=%EB%AC%BC500ml&searchId=1f7f9c2f5797037&sourceType=search&itemsCount=35&searchRank=1&rank=1&traceId=mn8w9u91",
    },
  ],
  bibleConnections: [
    {
      verseReference: "빌립보서 4:13",
      verseText: "내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라",
      messageSummary:
        "몇 번을 실패해도 다시 도전할 수 있는 힘은 어디서 올까요? 내 실력이 아니라 능력 주시는 하나님께 의지할 때, 포기하지 않고 끝까지 나아갈 수 있어요.",
    },
  ],
  variations: [
    {
      condition: "소규모 (5~10명)",
      suggestion:
        "팀 대결 없이 개인전으로 진행합니다. 3라운드 합산 점수로 순위를 매기면 더 긴장감 있게 즐길 수 있습니다.",
    },
    {
      condition: "저학년 (유년부)",
      suggestion:
        "책상 위에서 굴리듯 짧게 던지는 방식으로 난이도를 낮춥니다. 성공 기준도 완전히 서지 않아도 기울지만 않으면 인정하는 등 유연하게 적용하세요.",
    },
    {
      condition: "고난이도",
      suggestion:
        "던지는 거리를 늘리거나, 두 바퀴 돌리기, 뒤로 던지기 등 미션을 추가합니다. 성공 시 보너스 점수를 부여해 역전 기회를 만들 수 있습니다.",
    },
    {
      condition: "개인 집중 버전",
      suggestion:
        "팀전 없이 제한 시간(3분) 안에 개인이 최대한 많이 세우는 방식으로 진행합니다. 자기 페이스로 반복 도전하며 집중력과 끈기를 키우는 데 효과적입니다.",
    },
  ],
  safetyNotes: [
    "물병이 튀어 주변 사람에게 맞을 수 있으므로 던지는 방향 앞에 사람이 없는지 확인하세요.",
    "뚜껑을 단단히 닫지 않으면 물이 쏟아져 바닥이 미끄러워질 수 있습니다. 시작 전 반드시 점검하세요.",
    "딱딱한 바닥(타일, 마루)에서 진행할 경우 물병이 세게 튈 수 있으므로 주변 간격을 충분히 확보하세요.",
  ],
  assets: [
    {
      fileName: "진행 자료",
      fileType: "pptx",
      storagePath: "/downloads/games/bottle-flip/rules.pptx",
    },
    {
      fileName: "진행 자료",
      fileType: "pdf",
      storagePath: "/downloads/games/bottle-flip/rules.pdf",
    },
    {
      fileName: "진행 자료",
      fileType: "zip",
      storagePath: "/downloads/games/bottle-flip/slides.zip",
    },
  ],
  recommendScore: 2,
  creditPrice: 500,
};

export default bottleFlip;
