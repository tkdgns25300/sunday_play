import { Game } from "@/types/game";

const twentyQuestions: Game = {
    id: "twenty-questions",
    title: "스무고개",
    summary: "예/아니오 질문 20번 안에 정답을 맞추는 추리 게임",
    description:
        "진행자가 정답을 정하고 카테고리를 알려줍니다. 팀별로 돌아가며 '예/아니오'로만 대답할 수 있는 질문을 하고, 20번의 질문 안에 정답을 맞추면 점수를 얻습니다.",
    thumbnailUrl: "/images/games/twenty-questions.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 2,
    environments: ["실내교실", "실내강당", "온라인"],
    prepTime: "none",
    groupSizes: ["md", "lg"],
    characterQualities: ["지혜", "분별력", "경청"],
    durationMinutes: 15,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content:
                "팀을 나누고 질문 순서를 정합니다.\n진행자가 정답을 정합니다.",
        },
        {
            title: "게임 진행",
            content:
                "진행자가 카테고리(인물, 동물, 사물 등)를 알려줍니다.\n팀별로 돌아가며 '예/아니오'로 대답할 수 있는 질문을 합니다.\n20번의 질문 안에 정답을 맞춘 팀이 점수를 얻습니다.\n아무도 못 맞추면 정답을 공개하고 다음 문제로 넘어갑니다.",
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
            verseReference: "마태복음 7:7",
            verseText:
                "구하라 그리하면 너희에게 주실 것이요 찾으라 그리하면 찾아낼 것이요 문을 두드리라 그리하면 너희에게 열릴 것이니",
            messageSummary:
                "오늘 질문을 하나씩 해가며 정답을 찾아갔는데, 하나님도 구하고 찾는 사람에게 응답해 주신다고 약속하셨어요. 포기하지 않고 구하는 사람이 되어요.",
        },
    ],
    variations: [
        {
            condition: "소규모 (10명 이하)",
            suggestion:
                "팀 없이 개인전으로 진행하고, 누적 점수로 우승자를 정합니다.",
        },
        {
            condition: "난이도 상향",
            suggestion:
                "카테고리 힌트 없이 진행하거나, 질문 횟수를 10번으로 줄입니다.",
        },
        {
            condition: "팀끼리 출제",
            suggestion:
                "A팀이 문제를 내고 B팀이 맞추는 형태로 번갈아 진행합니다.",
        },
        {
            condition: "성경 특화",
            suggestion:
                "성경 인물, 성경 속 장소, 성경 이야기 등으로만 출제합니다.",
        },
    ],
    tips: [
        "큰 범위부터 좁혀가는 질문 전략을 알려주면 게임이 더 재미있어집니다. (예: \"살아있는 건가요?\" → \"사람인가요?\" → \"한국 사람인가요?\")",
        "PPT에 카테고리가 제공됩니다. 진행자가 카테고리에 맞는 정답을 미리 정해주세요.",
    ],
    safetyNotes: [
        "질문 시 소리가 커질 수 있으므로 한 팀씩 질문하는 규칙을 정하세요.",
        "동시에 정답을 외쳤을 때를 대비해 판정 규칙을 미리 정하세요.",
    ],
    previewPages: [1, 2, 7, 8],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/twenty-questions/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/twenty-questions/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/twenty-questions/slides.zip",
        },
    ],
  creditPrice: 1000,
};

export default twentyQuestions;
