import { Game } from "@/types/game";

const actionCommand: Game = {
    id: "action-command",
    title: "문장 만들기 행동지령",
    summary: "섞인 글자를 조합해 행동지령을 알아내고 말 없이 수행하는 게임",
    description:
        "격자판에 흩어진 음절을 조합하여 숨겨진 행동지령을 알아내는 게임입니다. 제한 시간 안에 문장을 해독하고, 말 없이 해당 행동을 수행하면 통과! 정답을 입으로 말하면 안 되고 오직 행동으로만 보여줘야 합니다.",
    thumbnailUrl: "/images/games/action-command.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 3,
    environments: ["실내"],
    prepTime: "none",
    groupSizes: ["md", "lg"],
    characterQualities: ["경각심", "민감성", "기쁨"],
    durationMinutes: 20,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content: "참가자 전원이 화면을 볼 수 있도록 자리를 배치합니다.",
        },
        {
            title: "문제 출제",
            content:
                "화면에 음절이 섞인 격자판을 보여주고 1분 타이머를 시작합니다.\n참가자는 음절을 조합하여 행동지령 문장을 알아냅니다.",
        },
        {
            title: "행동 수행",
            content:
                "정답을 말로 외치면 안 되고, 말 없이 해당 행동을 직접 수행합니다.\n제한 시간 안에 행동을 수행한 사람만 통과합니다.\n시간이 끝나면 정답을 공개하고 다음 문제로 넘어갑니다.",
        },
        {
            title: "우승",
            content: "모든 문제가 끝난 후 가장 많이 통과한 사람이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "야고보서 1:22",
            verseText: "너희는 말씀을 행하는 자가 되고 듣기만 하여 자신을 속이는 자가 되지 말라",
            messageSummary:
                "오늘 글자를 맞추고 직접 행동으로 옮겨봤는데, 하나님의 말씀도 듣기만 하면 안 되고 직접 행동으로 실천하는 것이 중요해요.",
        },
    ],
    variations: [
        {
            condition: "저학년 (초등부)",
            suggestion: "격자를 3x3(9칸)으로만 출제하고, 제한 시간을 2분으로 늘립니다.",
        },
        {
            condition: "난이도 상향",
            suggestion: "격자를 4x4(16칸)으로 늘리거나, 정답에 포함되지 않는 더미 음절을 섞어 난이도를 높입니다.",
        },
        {
            condition: "팀전",
            suggestion: "팀별로 나누어 팀원 중 과반수가 행동을 수행하면 해당 팀이 통과합니다.",
        },
        {
            condition: "성경 특화",
            suggestion: "행동지령 대신 성경 구절이나 성경 인물 이름을 맞추도록 변형합니다.",
        },
    ],
    tips: [
        "진행 자료에 다양한 난이도의 지령이 포함되어 있습니다. 참가자 연령과 수준에 맞게 골라 사용하세요.",
        "참가자들이 어려워하면 진행자가 힌트를 줄 수 있습니다. 예: 첫 글자 공개, 몇 글자 단어인지 알려주기 등.",
    ],
    safetyNotes: ["행동 수행 시 신체 접촉이 포함된 미션은 참가자가 불편하지 않도록 사전에 안내하세요."],
    previewPages: [1, 2, 5, 6, 13, 14],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/action-command/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/action-command/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/action-command/slides.zip",
        },
    ],
  recommendScore: 4,
  creditPrice: 1500,
};

export default actionCommand;
