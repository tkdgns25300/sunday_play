import { Game } from "@/types/game";

const relayBallPipe: Game = {
    id: "relay-ball-pipe",
    title: "릴레이 공 옮기기",
    summary: "U보드로 공을 굴려 옮기는 협동 릴레이 게임",
    description:
        "팀원들이 일렬로 서서 U보드 위에 공을 굴립니다. 공이 자기 보드를 지나가면 빠르게 대열의 끝으로 달려가 공이 계속 굴러가도록 연결합니다. 공을 떨어뜨리지 않고 가장 먼저 컵에 골인시킨 팀이 승리합니다.",
    thumbnailUrl: "/images/games/relay-ball-pipe.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 4,
    environments: ["실내강당", "야외"],
    prepTime: "quick",
    groupSizes: ["md", "lg"],
    characterQualities: ["끈기", "신뢰성", "조심성"],
    durationMinutes: 10,
    difficulty: 3,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content:
                "팀을 나누고 일렬로 섭니다.\n각자 U보드를 들고 출발지점과 도착지점(컵)을 정합니다.",
        },
        {
            title: "게임 진행",
            content:
                "첫 번째 주자가 보드 위에 공을 놓고 출발시킵니다.\n공이 자신의 보드를 지나가면 빠르게 대열의 끝으로 달려가 공이 계속 굴러가도록 연결합니다.\n공을 떨어뜨리면 처음부터 다시 시작합니다.",
        },
        {
            title: "우승",
            content:
                "공을 떨어뜨리지 않고 가장 먼저 컵에 골인시킨 팀이 승리합니다.",
        },
    ],
    materials: [
        {
            name: "U보드 세트",
            quantity: "팀당 1세트",
            isOptional: false,
            purchaseUrl:
                "https://www.coupang.com/vp/products/8339963411?itemId=24084505296&vendorItemId=91104039528&sourceType=srp_product_ads&clickEventId=173d22d0-38d8-11f1-b59f-d2c056c7d6e8&korePlacement=15&koreSubPlacement=1&clickEventId=173d22d0-38d8-11f1-b59f-d2c056c7d6e8&korePlacement=15&koreSubPlacement=1&traceId=mo05hz00",
        },
        {
            name: "탁구공",
            quantity: "팀별 1개",
            isOptional: false,
            purchaseUrl:
                "https://www.coupang.com/np/search?component=&q=%ED%83%81%EA%B5%AC%EA%B3%B5&traceId=mo05rm2v&channel=user",
        },
        {
            name: "종이컵 (380ml)",
            quantity: "팀별 1개",
            isOptional: false,
            purchaseUrl:
                "https://www.coupang.com/np/search?component=&q=%EC%A2%85%EC%9D%B4%EC%BB%B5+380ml&traceId=mo05mocg&channel=auto",
        },
    ],
    bibleConnections: [
        {
            verseReference: "전도서 4:9",
            verseText:
                "두 사람이 한 사람보다 나음은 그들이 수고함으로 좋은 상을 얻을 것임이라",
            messageSummary:
                "오늘 팀원들과 협력해서 공을 옮겨봤는데, 혼자가 아닌 함께할 때 더 큰 일을 해낼 수 있어요. 우리도 서로 협력하는 사람이 되어요.",
        },
    ],
    variations: [
        {
            condition: "난이도 상향",
            suggestion:
                "작은 공(구슬 등)으로 진행하거나, 거리를 늘립니다.",
        },
        {
            condition: "반복 도전",
            suggestion:
                "정해진 시간 내에 가장 많이 골인한 팀이 우승합니다.",
        },
        {
            condition: "장애물 코스",
            suggestion:
                "도착지점까지 가는 길에 장애물(콘 등)을 배치합니다.",
        },
        {
            condition: "성경 특화",
            suggestion:
                "출발/도착 지점을 성경 장소로 정합니다. (예: 애굽 → 가나안)",
        },
    ],
    tips: [
        "줄이 너무 길면 시간이 오래 걸리니 팀당 5~7명 정도가 적당합니다.",
        "출발선과 도착선(컵 위치)을 명확히 표시해서 팀별로 동일한 거리에서 시작하도록 하세요.",
    ],
    safetyNotes: [
        "빠르게 이동하다 부딪힐 수 있으니 충분한 공간을 확보하세요.",
        "U보드로 다른 사람을 치지 않도록 주의하세요.",
        "공이 떨어졌을 때 줍느라 부딪히지 않게 안내하세요.",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/relay-ball-pipe/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/relay-ball-pipe/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/relay-ball-pipe/slides.zip",
        },
    ],
  creditPrice: 500,
};

export default relayBallPipe;
