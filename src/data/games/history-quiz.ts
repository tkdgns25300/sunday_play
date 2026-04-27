import { Game } from "@/types/game";

const historyQuiz: Game = {
    id: "history-quiz",
    title: "역사 퀴즈",
    summary: "한국사와 역사 상식 문제를 맞추는 팀 대결 퀴즈 게임",
    description:
        "한국사와 다양한 역사 상식 문제를 출제합니다. 팀 구호를 외치거나 정답을 가장 먼저 외친 팀에게 기회가 주어지며, 정답을 맞추면 득점합니다.",
    thumbnailUrl: "/images/games/history-quiz.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 2,
    environments: ["실내교실", "실내강당", "온라인"],
    prepTime: "quick",
    groupSizes: ["sm", "md", "lg"],
    characterQualities: ["지혜", "경청", "분별력"],
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
                "화면에 역사 문제를 보여줍니다.\n팀 구호를 외치거나 정답을 가장 먼저 외친 팀에게 기회가 주어집니다.\n정답을 맞추면 1점, 틀리면 다른 팀에게 기회가 넘어갑니다.",
        },
        {
            title: "우승",
            content: "모든 문제가 끝난 후 가장 많은 점수를 얻은 팀이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "신명기 32:7",
            verseText:
                "옛날을 기억하라 역대의 연대를 생각하라 네 아버지에게 물으라 그가 네게 설명할 것이요 네 어른들에게 물으라 그들이 네게 말하리로다",
            messageSummary:
                "오늘 역사 속 사건들을 맞춰봤는데, 하나님도 우리에게 지나온 역사를 기억하라고 하셨어요. 과거를 통해 배우고 하나님이 함께하셨던 것을 기억하는 사람이 되어요.",
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
                "쉬운 한국사 위주로 출제하고 보기를 3개로 제시합니다.",
        },
        {
            condition: "점수 차등",
            suggestion:
                "쉬운 문제 1점, 보통 2점, 어려운 문제 3점으로 차등 부여하여 후반 역전 가능성을 높입니다.",
        },
        {
            condition: "선생님 참여",
            suggestion:
                "마지막 몇 문제는 각 팀 선생님만 맞출 수 있도록 합니다.",
        },
        {
            condition: "성경 특화",
            suggestion:
                "성경 역사 문제를 포함시킵니다. 예: 출애굽은 어느 나라에서? 바벨탑은 왜 세웠을까?",
        },
    ],
    safetyNotes: [
        "정답을 외칠 때 소리가 커질 수 있으므로 시작 전 볼륨 규칙을 정하세요.",
        "동시에 외쳤을 때를 대비해 판정 규칙을 미리 정하세요. (예: 진행자 판단, 가위바위보 등)",
    ],
    previewPages: [1, 2, 7, 8, 9, 10],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/history-quiz/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/history-quiz/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/history-quiz/slides.zip",
        },
    ],
};

export default historyQuiz;
