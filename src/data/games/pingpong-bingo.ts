import { Game } from "@/types/game";

const pingpongBingo: Game = {
    id: "pingpong-bingo",
    title: "탁구공 빙고",
    summary: "계란판에 탁구공을 튕겨 넣어 빙고를 완성하는 팀 대결 게임",
    description:
        "계란판(5×5)을 빙고판으로 사용합니다. 출발선에서 탁구공을 튕겨 계란판 칸에 넣고, 공이 들어간 칸을 체크하여 가로·세로·대각선 빙고를 먼저 완성하는 팀이 승리합니다. 단순하지만 컨트롤이 필요해 누구나 즐길 수 있는 게임입니다.",
    thumbnailUrl: "/images/games/pingpong-bingo.png",
    ageGroups: ["유년부", "초등부", "중고등부", "청년부"],
    energyLevel: 2,
    environments: ["실내교실", "실내강당"],
    prepTime: "quick",
    groupSizes: ["sm", "md", "lg"],
    characterQualities: ["끈기", "절제", "인내"],
    durationMinutes: 20,
    difficulty: 3,
    requiredStaff: { min: 1, recommended: 2 },
    steps: [
        {
            title: "준비",
            content:
                "2팀으로 나눕니다.\n각 팀에 계란판(5×5) 1개와 탁구공을 준비합니다.\n출발선을 정하고 계란판을 적당한 거리에 배치합니다.",
        },
        {
            title: "게임 진행",
            content:
                "팀원이 한 명씩 번갈아 출발선에서 탁구공을 튕겨 계란판에 넣습니다.\n공이 칸에 들어가면 해당 칸을 체크합니다.\n가로, 세로, 대각선 중 한 줄을 완성하면 빙고입니다.",
        },
        {
            title: "우승",
            content:
                "먼저 빙고를 완성한 팀이 승리합니다.\n양 팀이 같은 턴에 동시에 빙고를 완성하면 빙고 줄 수가 많은 팀이 승리합니다.\n빙고 줄 수도 같으면 각 팀 대표 1명이 먼저 칸에 넣는 서든데스로 승부를 가립니다.",
        },
    ],
    materials: [
        {
            name: "탁구공 + 계란판 세트",
            quantity: "1세트",
            isOptional: false,
            purchaseUrl:
                "https://www.coupang.com/vp/products/8502713166?itemId=22233890727&vendorItemId=91941714775&q=%ED%83%81%EA%B5%AC%EA%B3%B5+%EA%B2%8C%EC%9E%84+%EA%B3%84%EB%9E%80%ED%8C%90&searchId=4fd5bf313184522&sourceType=search&itemsCount=36&searchRank=0&rank=0&traceId=mng4s2f5",
        },
        {
            name: "출발선 표시용 테이프",
            quantity: "1개",
            isOptional: true,
            purchaseUrl:
                "https://www.coupang.com/vp/products/8511069704?itemId=24636154242&vendorItemId=91647093392&pickType=COU_PICK&q=%EB%A7%88%EC%8A%A4%ED%82%B9+%ED%85%8C%EC%9D%B4%ED%94%84&searchId=76a56cd56656897&sourceType=search&itemsCount=36&searchRank=0&rank=0&traceId=mn8yhv3h",
        },
        {
            name: "책상",
            quantity: "1개",
            isOptional: true,
            purchaseUrls: [
                {
                    label: "긴 책상",
                    url: "https://www.coupang.com/vp/products/7425478468?itemId=19273387023&vendorItemId=86388527586&sourceType=srp_product_ads&clickEventId=c1e60bb0-29e3-11f1-aa02-0957a64b3185&korePlacement=15&koreSubPlacement=1&traceId=mn8yjz3z",
                },
                {
                    label: "짧은 책상",
                    url: "https://www.coupang.com/vp/products/8670075687?itemId=25168124659&vendorItemId=92165667520&q=%EB%8B%A8%EC%B2%B4%20%EC%B1%85%EC%83%81&searchId=ecf8be045636810&sourceType=search&itemsCount=36&searchRank=2&rank=2&traceId=mn8yk9m6",
                },
            ],
        },
    ],
    bibleConnections: [
        {
            verseReference: "빌립보서 3:14",
            verseText: "푯대를 향하여 그리스도 예수 안에서 하나님이 위에서 부르신 부름의 상을 위하여 달려가노라",
            messageSummary:
                "탁구공이 정확히 칸에 들어가려면 집중과 끈기가 필요하듯, 우리의 믿음 생활도 푯대를 향해 꾸준히 나아가는 것이 중요해요. 포기하지 않고 목표를 향해 달려가는 사람이 되어요.",
        },
    ],
    variations: [
        {
            condition: "여러 팀 (3팀 이상)",
            suggestion: "토너먼트 방식으로 진행합니다. 2팀씩 대결하여 승자끼리 다시 대결합니다.",
        },
        {
            condition: "저학년 (유년부)",
            suggestion: "출발선과 계란판 사이 거리를 가깝게 조절합니다.",
        },
        {
            condition: "난이도 상향",
            suggestion:
                "출발선 거리를 멀리하거나, 탁구공을 반드시 2번 이상 튕겨서 넣어야 하는 규칙을 추가합니다. 2줄 빙고를 완성해야 승리하는 방식도 좋습니다.",
        },
    ],
    safetyNotes: [
        "탁구공이 튀어 다른 친구를 맞힐 수 있으니 관전 구역을 분리하세요.",
        "바닥이 미끄러우면 계란판 아래에 미끄럼 방지 패드를 깔아주세요.",
    ],
    tips: [
        "양 팀 모두 빙고를 완성할 수 없는 상황이 되면 해당 판을 리셋하고 다시 시작합니다.",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/pingpong-bingo/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/pingpong-bingo/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/pingpong-bingo/slides.zip",
        },
    ],
  recommendScore: 2,
  creditPrice: 500,
};

export default pingpongBingo;
