import { Game } from "@/types/game";

const oxSurvival: Game = {
  id: "ox-survival",
  title: "O/X 서바이벌",
  summary: "O/X 퀴즈로 틀리면 탈락! 최후의 1인이 살아남는 서바이벌 게임",
  description:
    "전원이 일어선 상태에서 PPT에 O/X 문제가 나타나면, 참가자들이 O 또는 X 쪽으로 이동합니다. 정답 공개 후 틀린 사람은 탈락하고, 맞힌 사람만 다음 문제로 진행합니다. 후반으로 갈수록 어려운 문제가 나오며, 최후까지 살아남은 사람이 우승합니다.",
  thumbnailUrl: "/images/games/ox-survival.png",
  ageGroups: ["초등부", "중고등부", "청년부", "장년부"],
  energyLevel: 2,
  environments: ["실내", "야외"],
  prepTime: "none",
  groupSizes: ["md", "lg"],
  characterQualities: ["지혜", "담대함", "분별력"],
  durationMinutes: 15,
  difficulty: 2,
  requiredStaff: { min: 1, recommended: 1 },
  steps: [
    {
      title: "준비",
      content:
        "바닥이나 테이프로 O 구역과 X 구역을 나눕니다.\n참가자 전원이 중앙에 일어섭니다.",
    },
    {
      title: "게임 진행",
      content:
        "화면에 O/X 문제가 나타나면 참가자들이 O 또는 X 구역으로 이동합니다.\n이동 시간이 끝나면 정답을 공개하고, 틀린 구역에 있는 사람은 탈락합니다.\n맞힌 사람들은 다시 중앙으로 모여 다음 문제를 진행합니다.",
    },
    {
      title: "우승",
      content:
        "최후까지 살아남은 사람이 우승합니다.\n마지막 2~3명이 남으면 결승 문제로 승부를 가립니다.",
    },
  ],
  materials: [
    {
      name: "구역 표시용 테이프",
      quantity: "1개",
      isOptional: true,
      purchaseUrl:
        "https://www.coupang.com/vp/products/8511069704?itemId=24636154242&vendorItemId=91647093392&pickType=COU_PICK&q=%EB%A7%88%EC%8A%A4%ED%82%B9+%ED%85%8C%EC%9D%B4%ED%94%84&searchId=76a56cd56656897&sourceType=search&itemsCount=36&searchRank=0&rank=0&traceId=mn8yhv3h",
    },
  ],
  bibleConnections: [
    {
      verseReference: "요한복음 8:32",
      verseText: "진리를 알지니 진리가 너희를 자유롭게 하리라",
      messageSummary:
        "O와 X 사이에서 진실을 찾아야 살아남았듯이, 진리를 아는 것이 우리 삶에서도 가장 중요해요. 하나님의 말씀이 바로 그 진리입니다.",
    },
  ],
  variations: [
    {
      condition: "부활전",
      suggestion:
        "중간에 '부활 라운드'를 넣어 탈락자 전원이 한 문제에 도전할 수 있게 합니다. 맞히면 부활!",
    },
    {
      condition: "머리 위 O/X",
      suggestion:
        "공간이 좁으면 이동 대신 양팔로 O(머리 위 동그라미) 또는 X(팔 교차)를 만들어 표시합니다.",
    },
    {
      condition: "난이도 점진",
      suggestion:
        "초반은 쉬운 상식, 중반은 트릭 문제, 후반은 어려운 지식 문제로 구성하면 자연스럽게 인원이 줄어듭니다.",
    },
    {
      condition: "성경 특화",
      suggestion:
        "문제를 모두 성경 퀴즈로 구성합니다. (예: '모세가 홍해를 갈랐다 → O', '다윗이 골리앗을 활로 이겼다 → X')",
    },
  ],
  safetyNotes: [
    "O/X 구역으로 이동할 때 서로 부딪히지 않도록 충분한 공간을 확보하세요.",
    "이동 시간을 충분히 주고, 뛰지 말고 걸어서 이동하도록 안내하세요.",
  ],
  tips: [
    "이동 제한 시간(예: 10초)을 주면 고민할 틈이 줄어 긴박감이 올라갑니다.",
  ],
  previewPages: [1, 2, 10, 11],
  assets: [
    {
      fileName: "진행 자료",
      fileType: "pptx",
      storagePath: "/downloads/games/ox-survival/rules.pptx",
    },
    {
      fileName: "진행 자료",
      fileType: "pdf",
      storagePath: "/downloads/games/ox-survival/rules.pdf",
    },
    {
      fileName: "진행 자료",
      fileType: "zip",
      storagePath: "/downloads/games/ox-survival/slides.zip",
    },
  ],
  recommendScore: 4,
  creditPrice: 2000,
};

export default oxSurvival;
