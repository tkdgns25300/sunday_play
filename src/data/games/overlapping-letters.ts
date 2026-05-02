import { Game } from "@/types/game";

const overlappingLetters: Game = {
    id: "overlapping-letters",
    title: "글자 속 글자",
    summary: "겹쳐진 글자를 보고 어떤 단어인지 맞추는 팀 대결 퀴즈 게임",
    description:
        "화면에 여러 글자가 겹쳐진 이미지를 보여줍니다. 팀 구호를 외치거나 정답을 가장 먼저 외친 팀에게 기회가 주어지며, 정답을 맞추면 득점합니다.",
    thumbnailUrl: "/images/games/overlapping-letters.png",
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
                "화면에 여러 글자가 겹쳐진 이미지를 보여줍니다.\n팀 구호를 외치거나 정답을 가장 먼저 외친 팀에게 기회가 주어집니다.\n정답을 맞추면 1점, 틀리면 다른 팀에게 기회가 넘어갑니다.",
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
            verseReference: "예레미야 33:3",
            verseText:
                "너는 내게 부르짖으라 내가 네게 응답하겠고 네가 알지 못하는 크고 은밀한 일을 네게 보이리라",
            messageSummary:
                "오늘 겹쳐진 글자 속에서 숨겨진 단어를 찾아냈는데, 하나님도 우리가 구하면 숨겨진 것을 보여주신다고 약속하셨어요. 하나님께 구하면 우리가 몰랐던 것들을 알게 해주세요.",
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
                "글자 수를 늘리거나, 비슷한 글자끼리 겹칩니다.",
        },
        {
            condition: "점수 차등",
            suggestion:
                "쉬운 문제 1점, 어려운 문제 2~3점으로 차등 부여합니다.",
        },
        {
            condition: "성경 특화",
            suggestion:
                "성경 단어로만 출제합니다. (예: 할렐루야, 아멘, 감사 등)",
        },
    ],
    tips: [
        "진행 자료에 다양한 난이도의 문제가 포함되어 있습니다. 참가자 수준에 맞게 골라 사용하세요.",
    ],
    safetyNotes: [
        "동시에 외쳤을 때를 대비해 판정 규칙을 미리 정하세요. (예: 진행자 판단, 가위바위보 등)",
    ],
    previewPages: [1, 2, 5, 6, 7, 8],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/overlapping-letters/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/overlapping-letters/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/overlapping-letters/slides.zip",
        },
    ],
  recommendScore: 4,
  creditPrice: 1500,
};

export default overlappingLetters;
