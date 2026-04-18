import { Game } from "@/types/game";

const cupSpeedStacking: Game = {
    id: "cup-speed-stacking",
    title: "스피드 스태킹",
    summary: "화면 속 컵 패턴을 릴레이로 가장 빨리 완성하는 팀 게임",
    description:
        "4가지 색(파랑, 노랑, 빨강, 초록) 스피드 스태킹 컵을 사용합니다. 화면(PPT)에 컵 배치 패턴이 나타나면, 팀원이 한 명씩 달려가 컵 하나를 놓고 돌아옵니다. 바톤터치 후 다음 사람이 이어서 쌓아 가장 먼저 패턴을 완성한 팀이 승리합니다.",
    thumbnailUrl: "/images/games/cup-speed-stacking.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 4,
    environments: ["실내교실", "실내강당"],
    prepTime: "quick",
    groupSizes: ["sm", "md", "lg"],
    characterQualities: ["경각심", "끈기", "절제"],
    durationMinutes: 20,
    difficulty: 3,
    requiredStaff: { min: 1, recommended: 2 },
    steps: [
        {
            title: "준비",
            content:
                "팀을 나누고 팀별로 책상 1개와 컵 세트를 배치합니다.\n컵은 책상 위에 색깔별로 정리해 둡니다.\n출발선을 정하고 팀원들은 출발선 뒤에 한 줄로 섭니다.",
        },
        {
            title: "게임 진행",
            content:
                "화면에 컵 배치 패턴이 나타나면 첫 번째 주자가 책상으로 달려가 컵 1개를 배치하고 돌아옵니다.\n돌아온 뒤 다음 주자와 바톤터치하면 다음 주자가 출발합니다.\n한 번에 컵 1개만 놓을 수 있고, 이미 놓인 컵의 위치를 바꿀 수도 있습니다.\n가장 먼저 패턴을 정확히 완성한 팀이 해당 라운드를 가져갑니다.",
        },
        {
            title: "우승",
            content:
                "라운드를 여러 번 진행하며 난이도를 올려가고, 가장 많은 라운드를 가져간 팀이 우승합니다.",
        },
    ],
    materials: [
        {
            name: "스태킹 컵",
            quantity: "팀당 1세트",
            isOptional: false,
            purchaseUrl:
                "https://www.coupang.com/vp/products/7089775447?itemId=17663240855&vendorItemId=84828688429&q=%EC%BB%B5%EB%B9%A8%EB%A6%AC%EC%8C%93%EA%B8%B0%EA%B2%8C%EC%9E%84&searchId=fbb9596d5074275&sourceType=search&itemsCount=49&searchRank=6&rank=6&traceId=mo3tvv0q",
        },
        {
            name: "책상",
            quantity: "팀당 1개",
            isOptional: false,
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
        {
            name: "출발선 표시용 테이프",
            quantity: "1개",
            isOptional: true,
            purchaseUrl:
                "https://www.coupang.com/vp/products/8511069704?itemId=24636154242&vendorItemId=91647093392&pickType=COU_PICK&q=%EB%A7%88%EC%8A%A4%ED%82%B9+%ED%85%8C%EC%9D%B4%ED%94%84&searchId=76a56cd56656897&sourceType=search&itemsCount=36&searchRank=0&rank=0&traceId=mn8yhv3h",
        },
    ],
    bibleConnections: [
        {
            verseReference: "고린도전서 12:27",
            verseText:
                "너희는 그리스도의 몸이요 지체의 각 부분이라",
            messageSummary:
                "한 사람이 컵 하나씩 놓아 멋진 패턴을 완성했듯이, 우리 한 사람 한 사람이 모여 하나의 몸을 이루어요. 내 역할이 작아 보여도 전체를 완성하는 소중한 한 조각이에요.",
        },
    ],
    variations: [
        {
            condition: "개인전 (소규모)",
            suggestion:
                "각자 컵 세트를 나눠 갖고, 주어진 패턴대로 빨리 쌓는 형태로 진행합니다. 가장 빨리 완성한 사람이 승리합니다.",
        },
        {
            condition: "컵 세트 축소",
            suggestion:
                "1세트를 2팀이 나눠 색상별 5개씩 사용해도 충분합니다. 패턴만 5개 컵 기준으로 조정하면 됩니다.",
        },
        {
            condition: "저학년 (초등부 저학년)",
            suggestion:
                "2가지 색만 사용하고, 패턴을 단순하게(3단 피라미드, 일렬 배치 등) 구성합니다. 시간 제한 없이 정확도만으로 승부합니다.",
        },
        {
            condition: "성경 특화",
            suggestion:
                "각 라운드 시작 전 성경 퀴즈를 내고, 맞힌 팀이 컵 1개를 미리 배치할 수 있는 선착 기회를 얻습니다.",
        },
    ],
    safetyNotes: [
        "컵이 바닥에 떨어져 밟으면 미끄러질 수 있으니, 떨어진 컵은 즉시 줍도록 안내하세요.",
        "속도 경쟁에 흥분하여 책상을 밀거나 넘어뜨리지 않도록 책상을 고정하세요.",
        "다른 팀 책상에 접근하거나 방해하지 않도록 팀별 구역을 명확히 구분하세요.",
    ],
    tips: [
        "패턴 PPT를 미리 테스트하여 뒤에 앉은 팀도 화면이 잘 보이는지 확인하세요.",
        "첫 라운드는 연습 라운드로 진행하면 규칙 이해도가 높아지고 분위기가 살아납니다.",
        "심판이 패턴 정확도를 빠르게 확인할 수 있도록, 정답 패턴을 인쇄해서 손에 들고 있으면 편합니다.",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/cup-speed-stacking/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/cup-speed-stacking/rules.pdf",
        },
    ],
};

export default cupSpeedStacking;
