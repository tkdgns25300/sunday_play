import { Game } from "@/types/game";

const telepathy: Game = {
    id: "telepathy",
    title: "이심전심",
    summary: "제시어를 듣고 팀원들이 동시에 같은 동작을 하면 점수를 얻는 게임",
    description:
        "진행자가 제시어를 말하면 팀원들이 상의 없이 각자 떠오르는 동작을 생각합니다. '하나, 둘, 셋' 구호에 맞춰 동시에 동작을 하고, 같은 동작을 한 팀원이 많을수록 높은 점수를 얻습니다.",
    thumbnailUrl: "/images/games/telepathy.png",
    ageGroups: ["초등부", "중고등부", "청년부", "장년부"],
    energyLevel: 2,
    environments: ["실내교실", "실내강당"],
    prepTime: "none",
    groupSizes: ["sm", "md", "lg"],
    characterQualities: ["민감성", "경청", "포용"],
    durationMinutes: 15,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content:
                "팀을 나눕니다.\n팀별 인원이 같도록 조정합니다.",
        },
        {
            title: "게임 진행",
            content:
                "진행자가 제시어를 말합니다.\n팀원들은 상의 없이 각자 떠오르는 동작을 생각합니다.\n'하나, 둘, 셋' 구호에 맞춰 동시에 동작합니다.\n같은 동작을 한 팀원 수만큼 점수를 얻습니다.",
        },
        {
            title: "우승",
            content: "모든 제시어가 끝난 후 가장 많은 점수를 얻은 팀이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "빌립보서 2:2",
            verseText:
                "마음을 같이하여 같은 사랑을 가지고 뜻을 합하며 한마음을 품어",
            messageSummary:
                "오늘 같은 동작을 맞춰봤는데, 성경은 우리가 한마음을 품으라고 해요. 서로를 이해하고 마음을 맞추려 노력하면 더 좋은 공동체가 될 수 있어요.",
        },
    ],
    variations: [
        {
            condition: "소규모 (10명 이하)",
            suggestion:
                "팀 없이 전원이 동시에 동작합니다. 가장 많은 사람과 같은 동작을 한 사람이 우승합니다.",
        },
        {
            condition: "난이도 상향",
            suggestion:
                "제시어를 추상적으로 줍니다. (예: 사랑, 행복, 슬픔 등)",
        },
        {
            condition: "점수 보너스",
            suggestion:
                "팀원 전원이 같은 동작을 하면 보너스 점수를 부여합니다.",
        },
        {
            condition: "통과형",
            suggestion:
                "팀원 전원이 같은 동작을 해야만 통과. 틀리면 다시 도전하고, 가장 빠르게 통과한 팀이 우승합니다.",
        },
        {
            condition: "성경 특화",
            suggestion:
                "성경 관련 제시어를 사용합니다. (예: 기도, 찬양, 세례 등)",
        },
    ],
    safetyNotes: [
        "동작 수행 시 주변 사람이나 물건에 부딪히지 않도록 충분한 공간을 확보하세요.",
        "팀원끼리 상의하면 반칙입니다. 사전에 안내하세요.",
        "팀별 인원이 같도록 조정하세요. 인원이 다르면 불공정합니다.",
    ],
    previewPages: [1, 2, 5, 6],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/telepathy/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/telepathy/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/telepathy/slides.zip",
        },
    ],
  recommendScore: 3,
  creditPrice: 1500,
};

export default telepathy;
