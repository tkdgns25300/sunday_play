import { Game } from "@/types/game";

const chosungQuiz: Game = {
    id: "chosung-quiz",
    title: "초성 퀴즈",
    summary: "초성만 보고 단어를 맞추는 팀 대결 퀴즈 게임",
    description:
        "화면에 카테고리와 단어의 초성을 보여줍니다. 팀 구호를 외치거나 정답을 가장 먼저 외친 팀에게 기회가 주어지며, 정답을 맞추면 득점합니다.",
    thumbnailUrl: "/images/games/chosung-quiz.png",
    ageGroups: ["초등부", "중고등부", "청년부", "장년부"],
    energyLevel: 1,
    environments: ["실내교실", "실내강당", "온라인"],
    prepTime: "none",
    groupSizes: ["sm", "md", "lg"],
    characterQualities: ["지혜", "경각심", "민감성"],
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
                "화면에 카테고리와 단어의 초성을 보여줍니다.\n팀 구호를 외치거나 정답을 가장 먼저 외친 팀에게 기회가 주어집니다.\n정답을 맞추면 1점, 틀리면 다른 팀에게 기회가 넘어갑니다.",
        },
        {
            title: "우승",
            content: "모든 문제가 끝난 후 가장 많은 점수를 얻은 팀이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "잠언 2:6",
            verseText:
                "여호와는 지혜를 주시는 이로서 지식과 명철이 그 입에서 나오며",
            messageSummary:
                "오늘 작은 힌트만으로 정답을 찾아봤는데, 하나님은 우리에게 지혜를 주시는 분이에요. 어려운 문제 앞에서도 하나님께 지혜를 구하면 길을 찾을 수 있어요.",
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
                "카테고리 힌트 없이 초성만 보여줍니다.",
        },
        {
            condition: "점수 차등",
            suggestion:
                "2글자 1점, 3글자 2점, 4글자 3점으로 글자 수가 많을수록 높은 점수를 부여합니다.",
        },
        {
            condition: "선생님 참여",
            suggestion:
                "마지막 몇 문제는 각 팀 선생님만 맞출 수 있도록 합니다.",
        },
        {
            condition: "성경 특화",
            suggestion:
                "성경 관련 단어로만 출제합니다. (예: ㅎㄹㄹㅇ → 할렐루야)",
        },
    ],
    safetyNotes: [
        "정답을 외칠 때 소리가 커질 수 있으므로 시작 전 볼륨 규칙을 정하세요.",
        "동시에 외쳤을 때를 대비해 판정 규칙을 미리 정하세요. (예: 진행자 판단, 가위바위보 등)",
    ],
    previewPages: [1, 2, 5, 6, 7, 8],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/chosung-quiz/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/chosung-quiz/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/chosung-quiz/slides.zip",
        },
    ],
  recommendScore: 4,
  creditPrice: 2000,
};

export default chosungQuiz;
