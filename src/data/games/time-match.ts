import { Game } from "@/types/game";

const timeMatch: Game = {
    id: "time-match",
    title: "시간 맞추기",
    summary: "목표 시간에 맞춰 타이머를 멈추는 감각 게임",
    description:
        "목표 시간을 정하고 타이머를 시작한 뒤, 화면을 보지 않고 감각으로 시간을 맞춰 스탑하는 게임입니다. 목표 시간과 가장 가깝게 멈춘 사람이 우승합니다.",
    thumbnailUrl: "/images/games/time-match.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 1,
    environments: ["실내교실"],
    prepTime: "none",
    groupSizes: ["xs", "sm"],
    characterQualities: ["인내", "절제", "민감성"],
    durationMinutes: 10,
    difficulty: 1,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content: "목표 시간을 정합니다. (예: 10초)",
        },
        {
            title: "게임 진행",
            content:
                "타이머를 시작하고 화면을 가리거나 눈을 감습니다.\n참가자는 감각으로 목표 시간이 되었다고 생각하면 스탑을 외칩니다.\n실제 경과 시간과 목표 시간의 차이를 기록합니다.",
        },
        {
            title: "우승",
            content:
                "여러 라운드 진행 후 목표 시간과의 차이가 가장 적은 사람이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "전도서 3:1",
            verseText: "범사에 기한이 있고 천하 만사가 다 때가 있나니",
            messageSummary:
                "오늘 시간 감각을 맞춰봤는데, 하나님은 모든 일에 때를 정해두셨어요. 기다리는 것도, 행동하는 것도 하나님의 때에 맞추는 것이 중요해요.",
        },
    ],
    variations: [
        {
            condition: "난이도 상향",
            suggestion:
                "목표 시간을 1분, 2분으로 늘려 더 어렵게 진행합니다.",
        },
        {
            condition: "대규모",
            suggestion:
                "토너먼트 형식으로 진행합니다. 가까운 사람끼리 대결 후 승자끼리 다시 대결합니다.",
        },
        {
            condition: "성경 특화",
            suggestion:
                "목표 시간을 성경 숫자(7초, 12초, 40초 등)로 설정하고 숫자의 성경적 의미를 설명합니다.",
        },
    ],
    safetyNotes: [
        "눈을 감고 진행할 경우 주변 물건에 부딪히지 않도록 안전한 자리에서 진행하세요.",
        "스탑을 외칠 때 너무 큰 소리를 내지 않도록 사전에 안내하세요.",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/time-match/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/time-match/rules.pdf",
        },
    ],
};

export default timeMatch;
