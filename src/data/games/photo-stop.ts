import { Game } from "@/types/game";

const photoStop: Game = {
    id: "photo-stop",
    title: "사진 스탑",
    summary: "빠르게 넘어가는 사진을 멈춰 사람이 가장 많은 사진을 찾는 게임",
    description:
        "다양한 사진이 빠르게 넘어가다가 스탑하면 멈춘 사진 속 사람 수가 점수가 됩니다. 사람이 가장 많은 사진에서 멈춘 사람이 우승하는 운과 감각의 게임입니다.",
    thumbnailUrl: "/images/games/photo-stop.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 1,
    environments: ["실내"],
    prepTime: "none",
    groupSizes: ["xs", "sm"],
    characterQualities: ["경각심", "민감성", "담대함"],
    durationMinutes: 10,
    difficulty: 1,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content: "참가자 전원이 화면을 볼 수 있도록 자리를 배치합니다.",
        },
        {
            title: "게임 진행",
            content:
                "화면에 다양한 사진이 빠르게 넘어갑니다.\n참가자가 스탑을 외치면 사진이 멈추고, 멈춘 사진 속 사람 수를 셉니다.\n사람 수가 곧 점수가 됩니다.",
        },
        {
            title: "우승",
            content:
                "여러 라운드 진행 후 가장 많은 사람이 있는 사진에서 멈춘 사람이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "마태복음 9:37",
            verseText:
                "추수할 것은 많되 일꾼이 적으니",
            messageSummary:
                "오늘 사진 속 많은 사람을 찾아봤는데, 예수님은 세상에 복음이 필요한 사람이 많다고 하셨어요. 우리도 주변 사람들에게 관심을 가지는 사람이 되어요.",
        },
    ],
    variations: [
        {
            condition: "난이도 상향",
            suggestion: "사진 전환 속도를 '매우 빠르게'로 설정합니다.",
        },
        {
            condition: "반대 버전",
            suggestion:
                "사람이 가장 적은 사진에서 멈추면 우승하는 방식으로 변형합니다.",
        },
        {
            condition: "팀전",
            suggestion:
                "팀별로 나누어 한 명씩 도전하고, 팀원들의 사진 속 사람 수 합산으로 승부합니다.",
        },
    ],
    safetyNotes: [
        "빠르게 넘어가는 화면에 민감한 참가자가 있을 수 있으므로 사전에 안내하세요.",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/photo-stop/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/photo-stop/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/photo-stop/slides.zip",
        },
    ],
  recommendScore: 3,
  creditPrice: 500,
};

export default photoStop;
