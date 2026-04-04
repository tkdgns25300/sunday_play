import { Game } from "@/types/game";

const personQuiz: Game = {
    id: "person-quiz",
    title: "인물퀴즈",
    summary: "화면에 나오는 인물 사진을 3초 안에 맞추는 릴레이 퀴즈 게임",
    description:
        "팀원이 한 줄로 서서 한 명씩 앞에 나와 화면의 인물 사진을 보고 3초 안에 맞추는 릴레이 게임입니다. 배우, 캐릭터, 유명인 등 다양한 인물이 출제됩니다. 가장 많이 맞춘 팀이 승리합니다.",
    thumbnailUrl: "/images/games/person-quiz.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 3,
    environments: ["실내교실", "실내강당"],
    prepTime: "quick",
    groupSizes: ["sm", "md", "lg"],
    characterQualities: ["경각심", "민감성", "담대함"],
    durationMinutes: 20,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 2 },
    steps: [
        {
            title: "준비",
            content:
                "팀을 나누고 팀별로 한 줄로 섭니다.\n화면 앞에 도전 위치를 정합니다.",
        },
        {
            title: "게임 진행",
            content:
                "한 팀씩 도전합니다.\n맨 앞 사람이 화면 앞에 서면 인물 사진이 나타납니다.\n3초 안에 인물 이름을 맞추면 성공, 틀리거나 시간 초과 시 패스합니다.\n바로 다음 사람이 나와 새로운 문제에 도전합니다.\n편도(한 바퀴) 또는 왕복(두 바퀴)으로 진행합니다.",
        },
        {
            title: "우승",
            content: "모든 팀이 도전을 마친 후 가장 많이 맞춘 팀이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "히브리서 12:1",
            verseText: "이러므로 우리에게 구름 같이 둘러싼 허다한 증인들이 있으니",
            messageSummary:
                "오늘 다양한 인물들을 맞춰봤는데, 성경에도 우리보다 먼저 믿음의 길을 걸어간 수많은 증인들이 있어요. 그 믿음의 선배들을 본받아 우리도 달려가는 사람이 되어요.",
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
    safetyNotes: [
        "줄을 서서 기다릴 때 밀거나 장난치지 않도록 안내하세요.",
        "틀려도 괜찮다는 분위기를 만들어 부담을 줄여주세요.",
    ],
    assets: [],
};

export default personQuiz;
