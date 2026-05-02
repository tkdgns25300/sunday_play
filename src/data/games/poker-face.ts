import { Game } from "@/types/game";

const pokerFace: Game = {
  id: "poker-face",
  title: "포커페이스",
  summary: "동전을 숨긴 손을 표정과 직감으로 찾아내는 추리 게임",
  description:
    "참가자들이 원형으로 앉아 양 주먹을 내밀고, 그중 1명이 한쪽 손에 동전을 쥡니다. 탐정이 특정 사람의 왼손 또는 오른손을 지목해 펴게 하며, 동전을 찾으면 +50점! 하지만 빈 손이면 -10점입니다. '스톱'을 외치면 현재 점수를 확정하고 라운드를 끝낼 수 있어, 계속 찾을지 멈출지의 심리전이 핵심입니다.",
  thumbnailUrl: "/images/games/poker-face.png",
  ageGroups: ["초등부", "중고등부", "청년부", "장년부"],
  energyLevel: 2,
  environments: ["실내교실", "실내강당"],
  prepTime: "quick",
  groupSizes: ["sm"],
  characterQualities: ["분별력", "신중", "담대함"],
  durationMinutes: 15,
  difficulty: 2,
  requiredStaff: { min: 1, recommended: 1 },
  steps: [
    {
      title: "준비",
      content:
        "참가자들이 원형으로 앉고, 탐정 1명을 정합니다.\n탐정이 눈을 감거나 뒤돌아 있는 동안 진행자가 한 사람에게 동전을 줍니다.\n동전을 받은 사람은 한쪽 손에 쥐고, 모든 참가자는 양 주먹을 쥐고 앞으로 내밉니다.",
    },
    {
      title: "게임 진행",
      content:
        "탐정이 표정을 살피며 특정 사람의 왼손 또는 오른손을 지목합니다.\n동전이 있으면 +50점, 라운드 종료!\n동전이 없으면(빈 손) -10점, 계속 진행합니다.\n탐정은 언제든 '스톱'을 외쳐 현재 점수를 확정하고 라운드를 끝낼 수 있습니다.",
    },
    {
      title: "우승",
      content:
        "탐정을 돌아가며 교대하고, 모든 사람이 한 번씩 탐정을 한 뒤 누적 점수가 가장 높은 사람이 우승합니다.",
    },
  ],
  materials: [
    {
      name: "동전",
      quantity: "1개",
      isOptional: false,
    },
    {
      name: "안대",
      quantity: "1개",
      isOptional: true,
      purchaseUrl:
        "https://www.coupang.com/np/search?component=&q=%EC%95%88%EB%8C%80&traceId=mo4i2ggb&channel=user",
    },
  ],
  bibleConnections: [
    {
      verseReference: "잠언 2:6",
      verseText: "여호와는 지혜를 주시며 그 입에서 지식과 명철이 나오며",
      messageSummary:
        "표정 하나하나를 읽으며 진실을 찾아냈듯이, 하나님께서 주시는 지혜와 분별력으로 매일의 선택 속에서 올바른 길을 찾아가요.",
    },
  ],
  variations: [
    {
      condition: "팀전",
      suggestion:
        "두 팀으로 나눠 한 팀이 동전을 숨기고, 다른 팀이 함께 상의하며 지목합니다. 공수 교대 후 점수를 비교합니다.",
    },
    {
      condition: "주먹 만지기 허용",
      suggestion:
        "탐정이 지목 전에 참가자의 주먹을 만져볼 수 있습니다. 손의 떨림이나 긴장감으로 단서를 얻을 수 있습니다.",
    },
    {
      condition: "블러핑 허용",
      suggestion:
        "동전을 쥐지 않은 사람도 일부러 긴장한 척, 웃는 척 등 연기를 할 수 있습니다. 추리 난이도가 올라갑니다.",
    },
    {
      condition: "동전 여러 개",
      suggestion:
        "동전을 2~3개로 늘려 여러 사람에게 나눠줍니다. 탐정이 찾아야 할 동전이 많아져 난이도가 올라가고, 빈 손 확률이 낮아져 긴장감이 높아집니다.",
    },
    {
      condition: "수비 보너스",
      suggestion:
        "동전을 쥔 사람이 해당 라운드에서 들키지 않고 살아남으면 +10점을 받습니다. 수비 측도 긴장감이 생깁니다.",
    },
    {
      condition: "성경 특화",
      suggestion:
        "동전 대신 성경 구절이 적힌 카드를 사용합니다. 범인을 찾으면 해당 구절을 다 같이 읽고 의미를 나눕니다.",
    },
  ],
  safetyNotes: [
    "동전이 작아서 분실될 수 있으니, 게임 시작 전후로 동전 개수를 확인하세요.",
    "지목당한 사람이 기분 나빠하지 않도록 게임임을 충분히 안내하세요.",
  ],
  tips: [
    "탐정에게 '스톱' 규칙을 꼭 설명해 주세요. 욕심 vs 안전의 전략이 이 게임의 핵심 재미입니다.",
    "첫 라운드는 연습 라운드로 진행하면 점수 체계를 빠르게 이해할 수 있습니다.",
    "참가자들에게 표정 관리 시간을 5초 정도 준 뒤 탐정이 눈을 뜨게 하면 더 재밌습니다.",
  ],
  assets: [
    {
      fileName: "진행 자료",
      fileType: "pptx",
      storagePath: "/downloads/games/poker-face/rules.pptx",
    },
    {
      fileName: "진행 자료",
      fileType: "pdf",
      storagePath: "/downloads/games/poker-face/rules.pdf",
    },
    {
      fileName: "진행 자료",
      fileType: "zip",
      storagePath: "/downloads/games/poker-face/slides.zip",
    },
  ],
  creditPrice: 500,
};

export default pokerFace;
