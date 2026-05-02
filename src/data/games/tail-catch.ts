import { Game } from "@/types/game";

const tailCatch: Game = {
    id: "tail-catch",
    title: "꼬리잡기",
    summary: "팀 대표의 꼬리를 지키면서 상대팀 꼬리를 잡는 팀 대결 게임",
    description:
        "팀 대표가 허리에 꼬리를 착용하고, 팀원들은 대표를 보호하면서 상대팀 대표의 꼬리를 잡습니다. 꼬리가 뽑히면 탈락! 마지막까지 꼬리를 지킨 팀이 우승합니다.",
    thumbnailUrl: "/images/games/tail-catch.png",
    ageGroups: ["유치부", "초등부", "중고등부", "청년부"],
    energyLevel: 3,
    environments: ["실내강당", "야외"],
    prepTime: "quick",
    groupSizes: ["md", "lg"],
    characterQualities: ["담대함", "충성", "끈기"],
    durationMinutes: 20,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 2 },
    steps: [
        {
            title: "준비",
            content: "팀을 나누고 팀별 대표를 정합니다.\n대표는 허리 뒤에 꼬리를 꽂습니다.\n경기장 범위를 정합니다.",
        },
        {
            title: "게임 진행",
            content:
                "시작 신호와 함께 모든 팀이 동시에 움직입니다.\n팀원들은 역할을 나눠 대표를 보호하거나 상대팀 대표의 꼬리를 잡습니다.\n꼬리가 뽑히면 해당 팀은 탈락합니다.",
        },
        {
            title: "우승",
            content: "마지막까지 꼬리를 지킨 팀이 우승합니다.",
        },
    ],
    materials: [
        {
            name: "꼬리",
            quantity: "팀 수만큼",
            isOptional: false,
            purchaseUrl:
                "https://www.coupang.com/np/search?component=&q=%EA%BC%AC%EB%A6%AC%EC%9E%A1%EA%B8%B0&traceId=mnvtwk14&channel=user",
        },
    ],
    bibleConnections: [
        {
            verseReference: "느헤미야 4:9",
            verseText: "우리가 우리 하나님께 기도하며 그들로 말미암아 파수꾼을 두어 주야로 방비하고",
            messageSummary:
                "오늘 팀원들이 대표를 지켜봤는데, 성경에서도 서로를 지키고 보호하는 공동체의 모습이 나와요. 우리도 서로를 위해 기도하고 지켜주는 사람이 되어요.",
        },
    ],
    variations: [
        {
            condition: "소규모 (10명 이하)",
            suggestion:
                "팀 없이 전원이 각자 꼬리를 착용합니다. 다른 사람의 꼬리를 잡으면서 자기 꼬리를 지키고, 마지막까지 남은 사람이 우승합니다.",
        },
        {
            condition: "부활전",
            suggestion: "꼬리를 잡힌 팀이 즉시 탈락하지 않고, 미션을 수행하면 부활할 수 있습니다.",
        },
        {
            condition: "성경 특화",
            suggestion: "팀 이름을 성경 인물(다윗팀, 여호수아팀 등)로 정합니다.",
        },
    ],
    safetyNotes: [
        "꼬리를 잡을 때 상대방 몸을 잡거나 밀면 반칙입니다. 꼬리만 잡도록 안내하세요.",
        "넘어지지 않도록 주의하세요. 특히 바닥이 미끄러운 곳에서는 진행하지 마세요.",
        "경기장 범위를 명확히 정하고, 범위를 벗어나면 탈락으로 처리하세요.",
        "과격한 몸싸움이 발생하면 즉시 중단하세요.",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/tail-catch/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/tail-catch/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/tail-catch/slides.zip",
        },
    ],
  recommendScore: 2,
  creditPrice: 500,
};

export default tailCatch;
