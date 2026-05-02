import { Game } from "@/types/game";

const newspaperPuzzle: Game = {
    id: "newspaper-puzzle",
    title: "신문지 퍼즐",
    summary: "신문지에서 글자를 오려 주어진 단어를 가장 빨리 완성하는 게임",
    description:
        "각 팀에게 신문지, 가위, 풀, 도화지를 나눠주고, 주어진 단어를 공개합니다. 신문지에서 글자를 찾아 오려 붙여 가장 빨리 단어를 완성한 팀이 우승합니다.",
    thumbnailUrl: "/images/games/newspaper-puzzle.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 2,
    environments: ["실내교실", "실내강당"],
    prepTime: "advance",
    groupSizes: ["sm", "md"],
    characterQualities: ["근면", "솔선", "창의성"],
    durationMinutes: 15,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content:
                "팀을 나누고 각 팀에게 신문지, 가위, 풀, 도화지를 배부합니다.",
        },
        {
            title: "게임 진행",
            content:
                "주어진 단어를 공개합니다.\n신문지에서 글자를 찾아 오려서 도화지에 붙여 단어를 완성합니다.",
        },
        {
            title: "우승",
            content: "가장 빨리 단어를 완성한 팀이 우승합니다.",
        },
    ],
    materials: [
        {
            name: "신문지 또는 잡지",
            quantity: "팀당 여러 장",
            isOptional: false,
        },
        {
            name: "가위 + 풀 세트",
            quantity: "팀당 1세트",
            isOptional: false,
            purchaseUrl:
                "https://www.coupang.com/np/search?component=&q=%EA%B0%80%EC%9C%84+%ED%92%80&traceId=mnq1hjb0&channel=user&sorter=saleCountDesc",
        },
        {
            name: "도화지",
            quantity: "팀당 1장",
            isOptional: false,
            purchaseUrl:
                "https://www.coupang.com/np/search?component=&q=%EB%8F%84%ED%99%94%EC%A7%80&traceId=mnq1is27&channel=user&sorter=saleCountDesc",
        },
    ],
    bibleConnections: [
        {
            verseReference: "시편 119:105",
            verseText:
                "주의 말씀은 내 발에 등이요 내 길에 빛이니이다",
            messageSummary:
                "오늘 글자를 하나하나 찾아 단어를 완성해봤는데, 하나님의 말씀도 이렇게 소중한 한 글자 한 글자로 이루어져 있어요. 말씀을 소중히 여기고 마음에 새기는 사람이 되어요.",
        },
    ],
    variations: [
        {
            condition: "난이도 상향",
            suggestion:
                "단어 대신 문장을 완성하도록 합니다.",
        },
        {
            condition: "창작형",
            suggestion:
                "주어진 단어 없이 신문지 글자로 가장 재미있는 문장을 만든 팀이 우승합니다.",
        },
        {
            condition: "소규모 (10명 이하)",
            suggestion:
                "개인전으로 진행합니다.",
        },
        {
            condition: "성경 특화",
            suggestion:
                "성경 구절을 완성하도록 합니다.",
        },
    ],
    safetyNotes: [
        "가위 사용 시 안전에 유의하세요. 저학년은 안전 가위를 사용합니다.",
        "신문지 잉크가 손에 묻을 수 있으므로 물티슈를 준비하세요.",
        "신문지가 없으면 잡지, 전단지, 광고지 등으로 대체할 수 있습니다.",
    ],
    previewPages: [1, 2, 5, 6, 7],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/newspaper-puzzle/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/newspaper-puzzle/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/newspaper-puzzle/slides.zip",
        },
    ],
  recommendScore: 2,
  creditPrice: 1000,
};

export default newspaperPuzzle;
