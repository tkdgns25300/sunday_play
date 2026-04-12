import { Game } from "@/types/game";

const touchGuess: Game = {
    id: "touch-guess",
    title: "이게 뭐야",
    summary: "안대를 끼고 물건을 만져서 맞추는 촉감 게임",
    description:
        "팀별 대표가 안대를 쓰고 물건을 손으로 만져 무엇인지 맞추는 게임입니다. 팀별로 순서대로 도전하며, 제한 시간 20초 안에 맞추면 점수를 얻습니다. 가장 많은 점수를 얻은 팀이 우승합니다.",
    thumbnailUrl: "/images/games/touch-guess.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 2,
    environments: ["실내교실", "실내강당"],
    prepTime: "advance",
    groupSizes: ["sm", "md", "lg"],
    characterQualities: ["민감성", "담대함", "인내"],
    durationMinutes: 20,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 2 },
    steps: [
        {
            title: "준비",
            content: "팀을 나누고 팀별 도전 대표 순서를 정합니다.\n맞출 물건들을 상자나 보자기로 가려서 준비합니다.",
        },
        {
            title: "게임 진행",
            content:
                "팀 대표가 안대를 착용합니다.\n진행자가 물건을 도전자 앞에 놓으면, 20초 안에 만져서 정답을 말합니다.\n맞추면 팀이 점수를 얻습니다.\n시간이 지나거나 틀리면 다음 팀 대표가 다른 물건으로 도전합니다.",
        },
        {
            title: "우승",
            content: "모든 물건이 끝난 후 가장 많은 점수를 얻은 팀이 우승합니다.",
        },
    ],
    materials: [
        {
            name: "안대",
            quantity: "1개 이상",
            isOptional: false,
            purchaseUrl: "https://www.coupang.com/np/search?component=&q=%EC%95%88%EB%8C%80&traceId=mnvptfn1&channel=user",
        },
        {
            name: "맞출 물건 (과일, 장난감, 생활용품 등)",
            quantity: "10개 이상",
            isOptional: false,
        },
    ],
    bibleConnections: [
        {
            verseReference: "고린도후서 5:7",
            verseText: "이는 우리가 믿음으로 행하고 보는 것으로 하지 아니함이로라",
            messageSummary:
                "오늘 눈을 가리고 손으로 느껴서 맞춰봤는데, 믿음도 마찬가지예요. 눈에 보이지 않아도 느끼고 신뢰하는 것이 바로 믿음이에요.",
        },
    ],
    variations: [
        {
            condition: "소규모 (10명 이하)",
            suggestion: "팀 없이 개인전으로 진행하고, 누적 점수로 우승자를 정합니다.",
        },
        {
            condition: "동시 도전",
            suggestion:
                "물건을 팀 수만큼 준비하고, 모든 팀이 동시에 도전합니다. 각 팀은 서로 다른 물건으로 진행하며, 가장 빠르게 맞춘 팀이 점수를 얻습니다.",
        },
        {
            condition: "난이도 상향",
            suggestion: "장갑을 끼고 맞추거나, 비슷한 물건끼리 구별하게 합니다. (예: 사과와 배, 연필과 볼펜)",
        },
        {
            condition: "힌트 허용",
            suggestion: '어려운 물건이 나왔을 때 진행자가 힌트를 줍니다. (예: "먹는 거예요", "학교에서 써요")',
        },
        {
            condition: "성경 특화",
            suggestion: "성경 관련 물건을 사용합니다. (예: 십자가, 성경책, 포도, 빵 등)",
        },
    ],
    tips: ["쉬운 물건(바나나, 연필)부터 시작해서 어려운 물건(비슷한 크기의 과일 구별)으로 난이도를 올리세요."],
    safetyNotes: [
        "안대 착용 시 앞이 안 보이므로 주변 위험물을 제거하고 보조자가 안내하세요.",
        "날카롭거나 위험한 물건은 사용하지 마세요.",
        "음식 알레르기가 있을 수 있으므로 과일류 사용 시 사전에 확인하세요.",
        "팀원이 힌트를 주면 반칙입니다. 사전에 안내하세요.",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/touch-guess/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/touch-guess/rules.pdf",
        },
    ],
};

export default touchGuess;
