import { Game } from "@/types/game";

const groupNunchi: Game = {
    id: "group-nunchi",
    title: "단체 눈치 게임",
    summary: "팀원이 손잡고 원을 그려 앉아 1부터 차례로 외치며 일어나는 눈치 대결 게임",
    description:
        "팀별로 손잡고 원을 그려 앉아, 1부터 숫자를 외치며 일어나는 눈치 대결 게임입니다. 마지막 번호를 부르거나 같은 번호가 겹치면 탈락! 준비물 없이 바로 즐길 수 있습니다.",
    thumbnailUrl: "/images/games/group-nunchi.png",
    ageGroups: ["유치부", "초등부", "중고등부", "청년부"],
    energyLevel: 3,
    environments: ["실내교실", "실내강당"],
    prepTime: "none",
    groupSizes: ["lg"],
    characterQualities: ["경각심", "민감성", "절제"],
    durationMinutes: 15,
    difficulty: 1,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content: "팀을 구성합니다.\n팀원은 손을 잡고 원을 그려 앉습니다.",
        },
        {
            title: "게임 진행",
            content:
                "진행자가 시작하면 1부터 차례로 숫자를 외치며 일어납니다.\n팀원 전체가 동시에 일어나야 합니다.\n마지막 번호를 부르는 팀이 패배합니다.\n같은 번호를 동시에 부르는 팀은 탈락합니다.",
        },
        {
            title: "우승",
            content:
                "탈락하지 않고 끝까지 살아남은 팀이 우승합니다.\n두 팀이 남았을 경우 가위바위보로 승리팀을 결정합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "전도서 3:1",
            verseText: "범사에 기한이 있고 천하 만사가 다 때가 있나니",
            messageSummary:
                "눈치 게임에서 타이밍이 중요하듯, 우리 삶에도 하나님이 정하신 때가 있어요. 너무 빠르지도 느리지도 않게, 하나님의 때를 기다리며 믿음으로 나아가는 사람이 되어요.",
        },
    ],
    variations: [
        {
            condition: "저학년 (초등부)",
            suggestion: "팀 인원을 적게 구성하고, 연습 라운드를 먼저 진행하여 규칙을 충분히 익히게 합니다.",
        },
        {
            condition: "난이도 상향",
            suggestion:
                "숫자를 거꾸로(큰 수부터) 외치거나, 외치면서 동작(박수, 점프 등)을 함께 하는 규칙을 추가합니다.",
        },
    ],
    safetyNotes: [
        "급하게 일어나다 넘어질 수 있으므로 주변에 장애물이 없는지 확인하세요.",
        "손을 너무 세게 잡지 않도록 안내하세요.",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/group-nunchi/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/group-nunchi/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/group-nunchi/slides.zip",
        },
    ],
  creditPrice: 500,
};

export default groupNunchi;
