import { Game } from "@/types/game";

const personQuiz: Game = {
    id: "person-quiz",
    title: "인물퀴즈",
    summary: "화면에 나오는 인물 사진을 3초 안에 맞추는 릴레이 퀴즈 게임",
    description:
        "팀원이 가로로 나란히 서서 한 명씩 화면의 인물 사진을 보고 3초 안에 맞추는 릴레이 게임입니다. 배우, 캐릭터, 유명인 등 다양한 인물이 출제되며, 틀리면 바로 탈락! 끝까지 살아남은 팀이 우승합니다.",
    thumbnailUrl: "/images/games/person-quiz.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 3,
    environments: ["실내교실", "실내강당"],
    prepTime: "quick",
    groupSizes: ["sm", "md"],
    characterQualities: ["경각심", "민감성", "담대함"],
    durationMinutes: 15,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 2 },
    steps: [
        {
            title: "준비",
            content: "팀을 나누고 화면을 바라보며 가로로 나란히 섭니다.\n왼쪽(또는 오른쪽)부터 순서대로 도전합니다.",
        },
        {
            title: "게임 진행",
            content:
                "한 팀씩 도전합니다.\n첫 번째 사람부터 화면에 인물 사진이 나타납니다.\n3초 안에 인물 이름을 맞추면 성공, 틀리거나 시간 초과 시 탈락합니다.\n바로 다음 사람이 도전하며 편도(한 바퀴) 또는 왕복(두 바퀴)으로 진행합니다.",
        },
        {
            title: "우승",
            content: "끝까지 탈락하지 않고 살아남은 팀이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "사무엘상 16:7",
            verseText:
                "여호와께서 사무엘에게 이르시되 그의 용모와 키를 보지 말라 사람은 외모를 보거니와 나 여호와는 중심을 보느니라",
            messageSummary:
                "오늘 게임에서 얼굴만 보고 인물을 맞춰봤는데, 하나님은 겉모습이 아니라 마음을 보신대요. 사람의 외모보다 마음이 더 중요하다는 것을 기억해요.",
        },
    ],
    variations: [
        {
            condition: "저학년 (초등부)",
            suggestion: "애니메이션 캐릭터 위주로 출제하고, 제한 시간을 5초로 늘립니다.",
        },
        {
            condition: "난이도 상향",
            suggestion: "제한 시간을 2초로 줄이거나, 인물 사진을 흑백이나 일부만 보여줍니다.",
        },
        {
            condition: "성경 특화",
            suggestion: "성경 인물 삽화를 사용합니다. 힌트로 성경 구절을 함께 보여줄 수도 있습니다.",
        },
        {
            condition: "소규모 (10명 이하)",
            suggestion: "팀전 없이 개인전으로 진행합니다. 한 명씩 돌아가며 도전하고 누적 점수로 순위를 매깁니다.",
        },
    ],
    safetyNotes: ["탈락한 친구를 놀리지 않도록 서로 응원하는 분위기를 만들어주세요."],
    previewPages: [1, 2, 5, 6, 7, 8, 9, 10],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/person-quiz/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/person-quiz/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/person-quiz/slides.zip",
        },
    ],
  creditPrice: 2000,
};

export default personQuiz;
