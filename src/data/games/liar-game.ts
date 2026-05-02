import { Game } from "@/types/game";

const liarGame: Game = {
    id: "liar-game",
    title: "라이어 게임",
    summary: "한 명의 라이어를 대화로 찾아내는 추리 게임",
    description:
        "참가자 중 한 명만 라이어로, 나머지는 같은 단어를 받습니다. 돌아가며 단어에 대해 한 마디씩 설명하고, 투표로 라이어를 찾아냅니다. 라이어는 들키지 않게, 시민은 라이어를 찾아내는 심리 대결 게임입니다.",
    thumbnailUrl: "/images/games/liar-game.png",
    ageGroups: ["초등부", "중고등부", "청년부", "장년부"],
    energyLevel: 2,
    environments: ["실내교실"],
    prepTime: "quick",
    groupSizes: ["sm"],
    characterQualities: ["분별력", "지혜", "진실성"],
    durationMinutes: 15,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content:
                "원형으로 앉습니다.\n진행자가 쪽지를 준비합니다. 라이어 쪽지 1장과 나머지는 같은 단어가 적힌 쪽지입니다.",
        },
        {
            title: "단어 전달",
            content:
                "진행자가 각 참가자에게 쪽지를 나눠줍니다.\n쪽지를 확인한 뒤 다른 사람에게 보여주지 않습니다.\n라이어는 자신이 라이어임을 알게 됩니다.",
        },
        {
            title: "설명",
            content:
                "돌아가며 단어에 대해 한 마디씩 설명합니다.\n너무 직접적으로 말하면 라이어에게 단서를 주게 되고, 너무 모호하면 라이어로 의심받습니다.\n라이어는 다른 사람들의 설명을 듣고 눈치껏 맞춰서 말합니다.",
        },
        {
            title: "투표",
            content:
                "설명이 끝나면 토론 후 동시에 라이어를 지목합니다.\n가장 많은 표를 받은 사람이 라이어로 지목됩니다.",
        },
        {
            title: "결과",
            content:
                "라이어가 지목되면 시민 승리입니다.\n라이어를 못 찾으면 라이어 승리입니다.\n라이어가 지목되더라도 단어를 맞추면 라이어 역전 승리입니다.",
        },
    ],
    materials: [
        {
            name: "쪽지 (종이)",
            quantity: "인원수만큼",
            isOptional: false,
        },
        {
            name: "펜",
            quantity: "1개",
            isOptional: false,
        },
    ],
    bibleConnections: [
        {
            verseReference: "잠언 12:22",
            verseText: "거짓 입술은 여호와께 미움을 받아도 진실하게 행하는 자는 그의 기뻐하심을 받느니라",
            messageSummary:
                "게임에서는 라이어가 되어 재미있게 속여보지만, 실제 삶에서는 진실한 말이 가장 아름다워요. 하나님은 우리가 정직하고 진실한 사람이 되길 원하십니다.",
        },
    ],
    variations: [
        {
            condition: "대규모 (20명 이상)",
            suggestion: "팀별로 나누어 각 팀에서 라이어 게임을 진행합니다. 라이어 2명을 배치하면 더 어려워집니다.",
        },
        {
            condition: "저학년 (초등부)",
            suggestion: "쉬운 단어(동물, 과일 등)를 사용하고, 설명 시간을 넉넉히 줍니다.",
        },
        {
            condition: "난이도 상향",
            suggestion:
                "라이어에게도 비슷하지만 다른 단어를 줍니다. 예: 시민 '사과', 라이어 '배'. 라이어가 더 자연스럽게 섞일 수 있어 찾기 어려워집니다.",
        },
        {
            condition: "성경 특화",
            suggestion: "성경 인물, 성경 속 장소, 성경 이야기 등을 단어로 사용합니다.",
        },
    ],
    safetyNotes: [
        "라이어로 지목된 사람이 기분 나빠하지 않도록 게임 전 분위기를 밝게 만들어주세요.",
        "투표 시 특정인을 집중 공격하지 않도록 서로 존중하는 규칙을 정하세요.",
    ],
    previewPages: [1, 2, 4, 5],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/liar-game/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/liar-game/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/liar-game/slides.zip",
        },
    ],
  creditPrice: 1000,
};

export default liarGame;
