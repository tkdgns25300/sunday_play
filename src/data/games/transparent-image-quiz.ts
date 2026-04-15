import { Game } from "@/types/game";

const transparentImageQuiz: Game = {
    id: "transparent-image-quiz",
    title: "안 숨은 그림 찾기",
    summary: "투명하게 겹쳐진 이미지를 보고 무엇인지 맞추는 팀 대결 퀴즈 게임",
    description:
        "화면에 여러 이미지가 투명하게 겹쳐진 그림을 보여줍니다. 가장 먼저 정답을 외친 팀에게 기회가 주어지고, 5초 안에 정답을 맞추면 점수를 얻습니다. 가장 많은 점수를 얻은 팀이 우승합니다.",
    thumbnailUrl: "/images/games/transparent-image-quiz.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 2,
    environments: ["실내교실", "온라인"],
    prepTime: "quick",
    groupSizes: ["sm", "md", "lg"],
    characterQualities: ["경각심", "민감성", "분별력"],
    durationMinutes: 15,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content: "팀을 나누고 각 팀의 구호를 정합니다.",
        },
        {
            title: "게임 진행",
            content:
                "화면에 여러 이미지가 투명하게 겹쳐진 그림을 보여줍니다.\n팀 구호를 외치거나 정답을 가장 먼저 외친 팀에게 기회가 주어집니다.\n기회를 얻은 팀은 5초 안에 정답을 말해야 합니다.\n정답을 맞추면 1점, 틀리거나 시간이 지나면 다른 팀에게 기회가 넘어갑니다.",
        },
        {
            title: "우승",
            content:
                "모든 문제가 끝난 후 가장 많은 점수를 얻은 팀이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "고린도전서 13:12",
            verseText:
                "우리가 지금은 거울로 보는 것 같이 희미하나 그 때에는 얼굴과 얼굴을 대하여 볼 것이요",
            messageSummary:
                "오늘 겹쳐진 이미지 속에서 그림을 찾아냈는데, 지금은 희미하게 보이는 것도 자세히 보면 알 수 있어요. 하나님도 지금은 희미하게 느껴져도 언젠가 분명히 만나게 돼요.",
        },
    ],
    variations: [
        {
            condition: "소규모 (10명 이하)",
            suggestion:
                "팀전 없이 개인전으로 진행합니다. 누적 점수로 순위를 매깁니다.",
        },
        {
            condition: "난이도 상향",
            suggestion:
                "겹치는 이미지 수를 늘리거나, 비슷한 모양의 이미지끼리 겹칩니다.",
        },
        {
            condition: "점수 차등",
            suggestion:
                "쉬운 문제 1점, 어려운 문제 2~3점으로 차등 부여합니다.",
        },
        {
            condition: "성경 특화",
            suggestion:
                "성경 관련 이미지로만 출제합니다. (예: 십자가, 비둘기, 무지개 등)",
        },
    ],
    tips: [
        "진행 자료는 갈수록 겹치는 이미지 수가 늘어 난이도가 올라가는 순서로 구성되어 있습니다. 참가자 수준에 맞게 골라 사용하세요.",
    ],
    safetyNotes: [
        "동시에 외쳤을 때를 대비해 판정 규칙을 미리 정하세요. (예: 진행자 판단, 가위바위보 등)",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/transparent-image-quiz/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/transparent-image-quiz/rules.pdf",
        },
    ],
};

export default transparentImageQuiz;
