import { Game } from "@/types/game";

const commonSenseQuiz: Game = {
    id: "common-sense-quiz",
    title: "상식 퀴즈",
    summary: "다양한 분야의 상식 문제를 맞추는 팀 대결 퀴즈 게임",
    description:
        "과학, 역사, 지리, 문화 등 다양한 분야의 상식 문제를 출제합니다. 팀 구호를 외치거나 정답을 가장 먼저 외친 팀에게 기회가 주어지며, 정답을 맞추면 득점합니다.",
    thumbnailUrl: "/images/games/common-sense-quiz.png",
    ageGroups: ["초등부", "중고등부", "청년부", "장년부"],
    energyLevel: 1,
    environments: ["실내", "온라인"],
    prepTime: "none",
    groupSizes: ["sm", "md", "lg"],
    characterQualities: ["지혜", "경청", "분별력"],
    durationMinutes: 15,
    difficulty: 1,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content: "팀을 나누고 각 팀의 구호를 정합니다.",
        },
        {
            title: "게임 진행",
            content:
                "화면에 상식 문제를 보여줍니다.\n팀 구호를 외치거나 정답을 가장 먼저 외친 팀에게 기회가 주어집니다.\n정답을 맞추면 1점, 틀리면 다른 팀에게 기회가 넘어갑니다.",
        },
        {
            title: "우승",
            content: "모든 문제가 끝난 후 가장 많은 점수를 얻은 팀이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "잠언 1:7",
            verseText:
                "여호와를 경외하는 것이 지식의 근본이거늘",
            messageSummary:
                "오늘 다양한 상식을 맞춰봤는데, 성경은 진짜 지혜의 시작은 하나님을 아는 것이라고 해요. 세상의 지식도 중요하지만 하나님을 아는 지혜가 가장 소중해요.",
        },
    ],
    variations: [
        {
            condition: "소규모 (10명 이하)",
            suggestion:
                "팀전 없이 개인전으로 진행합니다. 누적 점수로 순위를 매깁니다.",
        },
        {
            condition: "저학년 (초등부)",
            suggestion:
                "쉬운 문제 위주로 출제하고 보기를 3개로 제시합니다.",
        },
        {
            condition: "점수 차등",
            suggestion:
                "쉬운 문제 1점, 보통 2점, 어려운 문제 3점으로 차등 부여하여 후반 역전 가능성을 높입니다.",
        },
        {
            condition: "선생님 참여",
            suggestion:
                "마지막 몇 문제는 각 팀 선생님만 맞출 수 있도록 합니다. 선생님도 함께 즐기는 분위기를 만들어줍니다.",
        },
        {
            condition: "성경 특화",
            suggestion:
                "성경 상식 문제를 포함시킵니다. 예: 성경에서 가장 긴 책은? 예수님이 태어난 도시는?",
        },
    ],
    safetyNotes: [
        "정답을 외칠 때 소리가 커질 수 있으므로 시작 전 볼륨 규칙을 정하세요.",
        "동시에 외쳤을 때를 대비해 판정 규칙을 미리 정하세요. (예: 진행자 판단, 가위바위보 등)",
    ],
    previewPages: [1, 2, 5, 6, 17, 18],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/common-sense-quiz/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/common-sense-quiz/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/common-sense-quiz/slides.zip",
        },
    ],
  recommendScore: 4,
  creditPrice: 1500,
};

export default commonSenseQuiz;
