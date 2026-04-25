import { Game } from "@/types/game";

const bodyTalk: Game = {
    id: "body-talk",
    title: "몸으로 말해요",
    summary: "제시어를 몸동작으로만 표현해서 팀원이 맞추는 제스처 게임",
    description:
        "팀 대표가 제시어를 보고 말 없이 몸동작으로만 표현하면 나머지 팀원이 정답을 맞추는 게임입니다. 팀당 3분 동안 최대한 많은 제시어를 맞추고, 가장 많이 맞춘 팀이 우승합니다.",
    thumbnailUrl: "/images/games/body-talk.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 4,
    environments: ["실내교실", "실내강당"],
    prepTime: "quick",
    groupSizes: ["md", "lg"],
    characterQualities: ["창의성", "기쁨", "담대함"],
    durationMinutes: 20,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content:
                "팀을 나누고 팀별 도전 순서를 정합니다.",
        },
        {
            title: "게임 진행",
            content:
                "팀 대표가 앞에 나와서 제시어를 확인합니다.\n말 없이 몸동작으로만 표현하고, 나머지 팀원이 정답을 맞춥니다.\n팀당 3분 동안 최대한 많은 제시어를 맞춥니다.\n모르겠으면 '패스'하고 다음 제시어로 넘어갑니다.",
        },
        {
            title: "우승",
            content:
                "모든 팀이 도전한 후 가장 많은 제시어를 맞춘 팀이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "야고보서 2:17",
            verseText:
                "이와 같이 행함이 없는 믿음은 그 자체가 죽은 것이라",
            messageSummary:
                "오늘 말 대신 행동으로 표현해봤는데, 믿음도 마찬가지예요. 말로만이 아니라 행동으로 보여주는 믿음이 진짜 믿음이에요.",
        },
    ],
    variations: [
        {
            condition: "소규모 (10명 이하)",
            suggestion:
                "팀 없이 2명씩 짝을 지어 진행합니다.",
        },
        {
            condition: "난이도 상향",
            suggestion:
                "제시어를 추상적으로 줍니다. (예: 사랑, 우정, 배신 등)",
        },
        {
            condition: "성경 특화",
            suggestion:
                "성경 인물이나 성경 속 장면을 제시어로 사용합니다. (예: 다윗과 골리앗, 모세의 홍해 가르기)",
        },
    ],
    tips: [
        "진행 자료에 다양한 난이도의 제시어가 포함되어 있습니다. 상황에 맞춰 팀별로 적절히 배분해서 사용하세요.",
        "제시어가 사람인지, 상황인지 등 어려워하면 진행자가 카테고리 힌트를 줄 수 있습니다.",
        "패스는 팀당 1~2개로 제한하면 긴장감이 높아집니다.",
    ],
    safetyNotes: [
        "몸동작 시 주변 사람이나 물건에 부딪히지 않도록 충분한 공간을 확보하세요.",
        "과격한 동작은 자제하도록 안내하세요.",
        "다른 팀이 힌트를 주거나 방해하면 반칙입니다. 사전에 안내하세요.",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/body-talk/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/body-talk/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/body-talk/slides.zip",
        },
    ],
};

export default bodyTalk;
