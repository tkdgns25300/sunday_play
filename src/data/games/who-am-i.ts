import { Game } from "@/types/game";

const whoAmI: Game = {
    id: "who-am-i",
    title: "나는 누구일까요?",
    summary: "3단계 힌트를 하나씩 듣고 대상을 맞히는 추리 퀴즈",
    description:
        "라운드마다 대상을 묘사하는 힌트 3개를 순서대로 공개합니다. 일찍 맞힐수록 높은 점수를 얻으며, 팀원이 함께 추리하는 과정에서 웃음과 집중이 넘칩니다.",
    thumbnailUrl: "/images/games/who-am-i.png",
    ageGroups: ["유년부", "초등부", "중고등부", "청년부", "장년부"],
    energyLevel: 2,
    environments: ["실내교실", "실내강당"],
    prepTime: "quick",
    groupSizes: ["sm", "md", "lg"],
    characterQualities: ["경청", "분별력", "지혜"],
    durationMinutes: 15,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content: "팀을 나눕니다.",
        },
        {
            title: "추리",
            content:
                '힌트를 1개씩 순서대로 공개합니다.\n각 단계마다 "정답!"을 먼저 외친 팀이 답합니다.\n• 1번 힌트 후 정답 → 3점\n• 2번 힌트 후 정답 → 2점\n• 3번 힌트 후 정답 → 1점\n오답이면 해당 단계 기회를 잃고 다음 힌트부터 다시 참여할 수 있습니다.\n3개 힌트까지 못 맞히면 정답을 공개하고 다음 라운드로 넘어갑니다.',
        },
        {
            title: "우승",
            content: "모든 라운드가 끝난 후 점수가 가장 높은 팀이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "시편 139:14",
            verseText:
                "내가 주께 감사하옴은 나를 지으심이 심히 기묘하심이라 주께서 하시는 일이 기이함을 내 영혼이 잘 아나이다",
            messageSummary:
                "힌트를 통해 정답을 찾아가는 게임처럼, 우리도 때로 '나는 누구인가?'를 묻습니다. 하나님은 우리를 신묘히 지으셨습니다. 나의 진짜 정체성은 세상의 평가가 아닌, 나를 창조하신 하나님 안에서 발견됩니다.",
        },
    ],
    variations: [
        {
            condition: "소규모 (10명 이하)",
            suggestion: "팀전 대신 개인전으로 진행합니다. 누적 점수로 순위를 매깁니다.",
        },
        {
            condition: "성경 인물 특집",
            suggestion:
                "성경 속 인물의 특징으로만 힌트를 구성합니다. 정답 공개 후 해당 인물의 이야기를 간단히 나눠도 좋습니다.",
        },
        {
            condition: "전달 퀴즈",
            suggestion:
                "팀원 중 한 명만 힌트를 듣고, 나머지 팀원에게 말로 설명해서 맞히게 합니다. 경청과 표현력이 동시에 요구되어 난이도가 올라갑니다.",
        },
    ],
    safetyNotes: [
        "흥분하여 소리가 커질 수 있으므로 시작 전 볼륨 규칙을 정해두세요.",
    ],
    tips: [
        "동시에 외쳤을 경우를 대비해 판정 규칙을 미리 정해두세요. (예: 진행자 판단, 가위바위보 등)",
    ],
    previewPages: [1, 2, 5, 6, 7, 8],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/who-am-i/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/who-am-i/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/who-am-i/slides.zip",
        },
    ],
  creditPrice: 2000,
};

export default whoAmI;
