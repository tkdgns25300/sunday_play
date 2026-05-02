import { Game } from "@/types/game";

const pingpongBounce: Game = {
    id: "pingpong-bounce",
    title: "탁구공 퐁당",
    summary: "탁구공을 바운드시켜 종이컵에 넣는 집중력 게임",
    description:
        "탁구공을 바닥에 한 번 이상 바운드시켜 종이컵에 넣는 게임입니다. 종이컵 10개를 4-3-2-1 형태로 배치하고, 팀별로 한 번씩 번갈아가며 바운드합니다. 가장 많은 컵을 채운 팀이 우승합니다.",
    thumbnailUrl: "/images/games/pingpong-bounce.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 3,
    environments: ["실내교실", "실내강당"],
    prepTime: "quick",
    groupSizes: ["sm"],
    characterQualities: ["인내", "절제", "끈기"],
    durationMinutes: 15,
    difficulty: 3,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content:
                "팀을 나누고(2~3명씩) 도전 순서를 정합니다.\n종이컵 10개를 4-3-2-1 형태로 바닥에 배치합니다.",
        },
        {
            title: "게임 진행",
            content:
                "팀별로 한 번씩 번갈아가며 탁구공을 바닥에 한 번 이상 바운드시켜 종이컵에 넣습니다.\n팀 내에서도 순서를 정해 돌아가며 던집니다.",
        },
        {
            title: "우승",
            content:
                "모든 도전이 끝난 후 가장 많은 컵을 채운 팀이 우승합니다.",
        },
    ],
    materials: [
        {
            name: "탁구공",
            quantity: "10개 이상",
            isOptional: false,
            purchaseUrl:
                "https://www.coupang.com/np/search?component=&q=%ED%83%81%EA%B5%AC%EA%B3%B5&traceId=mnylgtmy&channel=user",
        },
        {
            name: "종이컵",
            quantity: "10개",
            isOptional: false,
            purchaseUrl:
                "https://www.coupang.com/np/search?component=&q=%EC%A2%85%EC%9D%B4%EC%BB%B5&traceId=mnylpp0z&channel=user",
        },
    ],
    bibleConnections: [
        {
            verseReference: "빌립보서 3:14",
            verseText:
                "푯대를 향하여 그리스도 예수 안에서 하나님이 위에서 부르신 부름의 상을 위하여 달려가노라",
            messageSummary:
                "오늘 컵을 정확히 겨냥해서 공을 넣어봤는데, 우리의 삶도 마찬가지예요. 목표를 향해 집중하고 포기하지 않으면 반드시 이룰 수 있어요.",
        },
    ],
    variations: [
        {
            condition: "계란판 활용",
            suggestion:
                "종이컵 대신 계란판을 사용하면 난이도가 크게 올라갑니다.",
        },
        {
            condition: "거리 조절",
            suggestion:
                "가까운 거리에서 시작해 점점 멀리서 도전합니다.",
        },
        {
            condition: "성경 특화",
            suggestion:
                "종이컵에 성경 구절 번호를 적어두고, 넣은 컵의 구절을 함께 읽습니다.",
        },
    ],
    tips: [
        "한 사람이 계속 던지지 않도록 팀원이 골고루 참여할 수 있게 순서를 정하세요.",
    ],
    safetyNotes: [
        "탁구공이 튀어 다른 사람에게 맞지 않도록 관전 위치를 정하세요.",
        "바닥이 너무 미끄러우면 바운드가 예측 불가하니 적절한 바닥에서 진행하세요.",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/pingpong-bounce/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/pingpong-bounce/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/pingpong-bounce/slides.zip",
        },
    ],
  recommendScore: 1,
  creditPrice: 500,
};

export default pingpongBounce;
