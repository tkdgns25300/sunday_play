import { Game } from "@/types/game";

const flagQuiz: Game = {
    id: "flag-quiz",
    title: "나라 맞추기",
    summary: "국기를 보고 어떤 나라인지 맞추는 퀴즈 게임",
    description:
        "화면에 국기를 보여주면, 모든 팀이 동시에 보고 가장 먼저 나라 이름을 외치는 팀이 득점합니다. 쉬운 나라부터 어려운 나라까지 단계별로 진행하며, 세계 여러 나라에 대한 관심을 넓히는 퀴즈 게임입니다.",
    thumbnailUrl: "/images/games/flag-quiz.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 1,
    environments: ["실내교실", "실내강당", "온라인"],
    prepTime: "quick",
    groupSizes: ["xs", "sm", "md", "lg"],
    characterQualities: ["경청", "지혜", "창의성"],
    durationMinutes: 15,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "팀 나누기",
            content:
                "팀별로 나누고 모여 앉습니다.\n전원이 화면을 볼 수 있도록 자리를 배치합니다.",
        },
        {
            title: "규칙 설명",
            content:
                "화면에 국기가 나타나면 해당 나라 이름을 가장 먼저 외치는 팀이 1점을 얻습니다.\n정답을 외칠 때는 팀 이름을 먼저 말한 뒤 답을 말합니다.",
        },
        {
            title: "게임 진행",
            content:
                "국기를 한 장씩 보여줍니다.\n쉬운 나라부터 시작해 점점 어려운 나라로 넘어갑니다.\n가장 먼저 정답을 외친 팀에 1점을 부여합니다.",
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
            verseReference: "시편 86:9",
            verseText:
                "주여 주께서 지으신 모든 민족이 와서 주의 앞에 경배하며 주의 이름에 영광을 돌리리이다",
            messageSummary:
                "오늘 여러 나라의 국기를 맞춰봤는데, 하나님은 모든 나라와 민족을 사랑하시고 지으셨어요. 세계 여러 나라를 위해 기도하며 관심을 가져봐요.",
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
                "미국, 일본, 중국 등 익숙한 나라 위주로 출제하고 보기를 3개로 제시합니다.",
        },
        {
            condition: "난이도 상향",
            suggestion:
                "어려운 국기(아프리카, 동유럽 등)에 2~3점의 추가 점수를 부여하여 역전 가능성을 높입니다.",
        },
        {
            condition: "성경 특화",
            suggestion:
                "성경에 등장하는 지역(이스라엘, 이집트, 그리스, 이탈리아 등)의 국기를 포함시키고 성경 속 이야기를 함께 소개합니다.",
        },
    ],
    safetyNotes: [
        "특정 나라를 비하하거나 놀리는 발언이 나오지 않도록 사전에 안내하세요.",
        "정답을 모르는 참가자가 위축되지 않도록 힌트를 적극적으로 활용하세요.",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/flag-quiz/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/flag-quiz/rules.pdf",
        },
    ],
};

export default flagQuiz;
