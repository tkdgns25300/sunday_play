import { Game } from "@/types/game";

const tongueTwister: Game = {
    id: "tongue-twister",
    title: "잰말놀이",
    summary: "발음 어려운 문장을 팀 릴레이로 읽어내는 게임",
    description:
        "발음하기 어려운 문장들을 팀원이 한 명씩 순서대로 읽습니다. 틀리면 처음부터 다시! 가장 빠르게 모든 문장을 완료한 팀이 우승합니다.",
    thumbnailUrl: "/images/games/tongue-twister.png",
    ageGroups: ["초등부", "중고등부", "청년부", "장년부"],
    energyLevel: 1,
    environments: ["실내"],
    prepTime: "none",
    groupSizes: ["sm", "md"],
    characterQualities: ["인내", "끈기", "절제"],
    durationMinutes: 15,
    difficulty: 3,
    requiredStaff: { min: 1, recommended: 2 },
    steps: [
        {
            title: "준비",
            content: "팀을 나누고 순서를 정합니다.",
        },
        {
            title: "게임 진행",
            content:
                "화면에 발음 어려운 문장을 보여줍니다.\n팀원이 한 명씩 한 문장을 맡아 순서대로 읽습니다.\n틀리면 첫 번째 사람부터 다시 시작합니다.",
        },
        {
            title: "시간 기록",
            content: "모든 문장을 성공적으로 읽으면 시간을 기록합니다.",
        },
        {
            title: "우승",
            content: "가장 빠른 시간에 완료한 팀이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "잠언 18:21",
            verseText: "죽고 사는 것이 혀의 힘에 달렸나니",
            messageSummary:
                "오늘 혀가 꼬이는 경험을 해봤는데, 성경은 우리의 말에 큰 힘이 있다고 해요. 어려운 말도 연습하면 잘할 수 있듯이, 좋은 말을 연습해서 주변 사람들에게 힘이 되는 말을 해봐요.",
        },
    ],
    variations: [
        {
            condition: "소규모 (10명 이하)",
            suggestion: "개인전으로 진행합니다. 가장 빠르게 전체 문단을 읽은 사람이 우승합니다.",
        },
        {
            condition: "벌칙형",
            suggestion: "틀려도 다시 시작하지 않되, 틀릴 때마다 +10초 페널티를 부여합니다.",
        },
        {
            condition: "난이도 상향",
            suggestion: "문장 길이를 늘리거나, 속도 제한(10초 안에 한 문장)을 둡니다.",
        },
        {
            condition: "성경 특화",
            suggestion: "성경 구절 중 발음이 어려운 구절을 사용합니다.",
        },
    ],
    safetyNotes: [
        "발음을 틀린 참가자를 놀리지 않도록 서로 응원하는 분위기를 만들어주세요.",
    ],
    tips: [
        "진행 자료에 다양한 잰말놀이가 준비되어 있습니다. 팀별로 1개만 해도 되고 여러 개를 해도 되니 진행자가 시간에 맞게 골라 진행하세요.",
        "짧은 문장은 대표 1명이 읽고 여러 문장을 돌아가며 진행해도 좋고, 긴 문장은 팀원이 순서를 정해 릴레이로 읽어도 좋습니다.",
    ],
    previewPages: [1, 2, 5, 9, 10],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/tongue-twister/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/tongue-twister/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/tongue-twister/slides.zip",
        },
    ],
  recommendScore: 3,
  creditPrice: 1500,
};

export default tongueTwister;
