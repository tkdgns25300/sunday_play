import { Game } from "@/types/game";

const eyeLevelQuiz: Game = {
    id: "eye-level-quiz",
    title: "눈높이 퀴즈",
    summary: "어린아이의 눈으로 설명한 문장을 보고 정답을 맞추는 퀴즈 게임",
    description:
        "어린아이가 세상을 바라보는 순수한 시선으로 설명한 문장을 읽고, 무엇을 말하는 건지 맞추는 게임입니다. 모든 팀이 동시에 문장을 보고 가장 먼저 정답을 외친 팀이 득점합니다.",
    thumbnailUrl: "/images/games/eye-level-quiz.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 2,
    environments: ["실내교실", "실내강당"],
    prepTime: "quick",
    groupSizes: ["sm", "md", "lg"],
    characterQualities: ["지혜", "분별력", "기쁨"],
    durationMinutes: 10,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content: "팀을 나눕니다.",
        },
        {
            title: "게임 진행",
            content:
                "화면에 어린아이 시점의 설명 문장을 보여줍니다.\n모든 팀이 동시에 보고 가장 먼저 정답을 외칩니다.\n정답을 맞춘 팀에게 1점을 부여합니다.\n못 맞추면 힌트(추가 설명)를 공개합니다.",
        },
        {
            title: "우승",
            content: "모든 문제가 끝난 후 가장 많은 점수를 얻은 팀이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "마태복음 18:3",
            verseText:
                "진실로 너희에게 이르노니 너희가 돌이켜 어린 아이들과 같이 되지 아니하면 결단코 천국에 들어가지 못하리라",
            messageSummary:
                "오늘 어린아이의 눈으로 세상을 바라봤는데, 예수님도 어린아이처럼 순수한 마음을 가지라고 하셨어요. 복잡하게 생각하지 말고 하나님을 순수하게 믿는 마음이 가장 소중해요.",
        },
    ],
    variations: [
        {
            condition: "저학년 (초등부)",
            suggestion:
                "쉬운 주제(동물, 음식 등)로 출제하고 힌트를 넉넉히 줍니다.",
        },
        {
            condition: "난이도 상향",
            suggestion: "힌트 없이 한 문장만으로 맞추기. 제한 시간 10초.",
        },
        {
            condition: "소규모 (10명 이하)",
            suggestion:
                "팀전 없이 개인전으로 진행합니다. 누적 점수로 순위를 매깁니다.",
        },
        {
            condition: "성경 특화",
            suggestion:
                "성경 속 사건이나 인물을 어린아이 시점으로 설명합니다.",
        },
    ],
    safetyNotes: [
        "정답을 외칠 때 소리가 커질 수 있으므로 시작 전 볼륨 규칙을 정하세요.",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/eye-level-quiz/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/eye-level-quiz/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/eye-level-quiz/slides.zip",
        },
    ],
};

export default eyeLevelQuiz;
