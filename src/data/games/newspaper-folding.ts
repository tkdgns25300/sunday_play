import { Game } from "@/types/game";

const newspaperFolding: Game = {
    id: "newspaper-folding",
    title: "신문지 서바이벌",
    summary: "신문지를 반으로 접어가며 팀 전원이 올라가 버티는 게임",
    description:
        "팀원 전원이 신문지 위에 올라가 10초를 버텨야 합니다. 라운드마다 신문지를 반으로 접어 점점 작아지는 신문지 위에서 끝까지 버틴 팀이 우승합니다.",
    thumbnailUrl: "/images/games/newspaper-folding.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 3,
    environments: ["실내"],
    prepTime: "quick",
    groupSizes: ["md", "lg"],
    characterQualities: ["끈기", "담대함", "포용"],
    durationMinutes: 15,
    difficulty: 3,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content:
                "팀을 나누고 각 팀에게 신문지 1장을 배부합니다.\n팀별 인원이 같도록 조정합니다.",
        },
        {
            title: "게임 진행",
            content:
                "팀원 전원이 신문지 위에 올라가 10초를 버팁니다.\n통과하면 신문지를 반으로 접고 다시 도전합니다.\n발이 신문지 밖으로 나가거나 넘어지면 탈락합니다.",
        },
        {
            title: "우승",
            content: "가장 많이 접고도 버틴 팀이 우승합니다.",
        },
    ],
    materials: [
        {
            name: "신문지",
            quantity: "팀당 1장",
            isOptional: false,
        },
    ],
    bibleConnections: [
        {
            verseReference: "고린도전서 12:27",
            verseText:
                "너희는 그리스도의 몸이요 지체의 각 부분이라",
            messageSummary:
                "오늘 좁은 신문지 위에서 서로 붙잡고 버텨봤는데, 교회도 이렇게 서로가 서로를 붙잡아주는 공동체예요. 혼자는 어렵지만 함께하면 할 수 있어요.",
        },
    ],
    variations: [
        {
            condition: "소규모 (10명 이하)",
            suggestion: "2~3명씩 팀을 나누어 진행합니다.",
        },
        {
            condition: "난이도 상향",
            suggestion:
                "버티는 시간을 15초 또는 20초로 늘립니다.",
        },
        {
            condition: "성경 특화",
            suggestion:
                "버틸 때마다 성경 구절을 한 절씩 외우면 추가 점수를 줍니다.",
        },
        {
            condition: "동시 탈락 / 2팀 남았을 때",
            suggestion:
                "마지막 팀들이 동시에 탈락하거나 2팀이 남으면, 같은 라운드에서 더 오래 버틴 팀이 우승합니다.",
        },
    ],
    safetyNotes: [
        "넘어질 수 있으므로 주변에 위험한 물건을 치우고 넓은 공간에서 진행하세요.",
        "신체 접촉이 발생할 수 있으므로 참가자들에게 사전 안내하고 불편한 사람은 빠질 수 있도록 합니다.",
        "팀별 인원이 같도록 조정하세요. 인원이 다르면 불공정합니다.",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/newspaper-folding/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/newspaper-folding/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/newspaper-folding/slides.zip",
        },
    ],
  recommendScore: 2,
  creditPrice: 500,
};

export default newspaperFolding;
