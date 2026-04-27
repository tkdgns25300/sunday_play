import { Game } from "@/types/game";

const bibleRelay: Game = {
    id: "bible-relay",
    title: "릴레이 암송",
    summary: "성경 구절을 팀원끼리 나눠 외우고 이어서 암송하는 팀 대결 게임",
    description:
        "성경 구절을 화면에 보여준 뒤, 팀원끼리 구절을 나눠 암기합니다. 암기 시간이 끝나면 팀별로 순서대로 이어서 암송하며, 가장 정확하고 빠르게 완성한 팀이 우승합니다.",
    thumbnailUrl: "/images/games/bible-relay.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 2,
    environments: ["실내교실", "실내강당"],
    prepTime: "quick",
    groupSizes: ["sm", "md", "lg"],
    characterQualities: ["경청", "끈기", "충성"],
    durationMinutes: 10,
    difficulty: 3,
    requiredStaff: { min: 1, recommended: 2 },
    steps: [
        {
            title: "준비",
            content:
                "팀을 나누고 성경 구절을 화면에 보여줍니다.\n팀별로 구절을 문장 단위로 자유롭게 분담합니다.",
        },
        {
            title: "게임 진행",
            content:
                "팀별로 암기 준비가 되면 화면을 끄고 순서대로 이어서 암송합니다.\n막히면 다음 사람이 이어받을 수 있습니다.",
        },
        {
            title: "우승",
            content:
                "가장 정확하고 빠르게 암송을 완성한 팀이 우승합니다.",
        },
    ],
    materials: [
        {
            name: "성경책",
            quantity: "팀당 1권",
            isOptional: true,
            purchaseUrl:
                "https://www.coupang.com/np/search?component=&q=%EC%84%B1%EA%B2%BD%EC%B1%85&traceId=mnr9pu57&channel=user",
        },
    ],
    bibleConnections: [
        {
            verseReference: "시편 119:11",
            verseText:
                "내가 주께 범죄하지 아니하려 하여 주의 말씀을 마음에 두었나이다",
            messageSummary:
                "오늘 함께 말씀을 외워봤는데, 말씀을 마음에 새기면 어려운 순간에도 하나님의 음성을 기억할 수 있어요. 혼자보다 함께 외우면 더 오래 기억에 남습니다.",
        },
    ],
    variations: [
        {
            condition: "소규모 (10명 이하)",
            suggestion:
                "팀전 없이 개인전으로 진행합니다. 각자 전체 구절을 외우고 가장 정확하게 암송한 사람이 우승합니다.",
        },
        {
            condition: "저학년 (초등부)",
            suggestion:
                "짧은 구절(1~2절)을 선택하고 암기 시간을 넉넉히 줍니다.",
        },
        {
            condition: "난이도 상향",
            suggestion:
                "암기 시간을 줄이거나, 긴 구절(5절 이상)을 사용합니다.",
        },
        {
            condition: "힌트 모드",
            suggestion:
                "암송 중 막히면 진행자가 첫 글자 힌트를 줍니다. 단, 힌트를 받으면 해당 구절 점수가 감점됩니다.",
        },
    ],
    safetyNotes: [
        "암송에 실패하더라도 격려하는 분위기를 만들어주세요.",
        "팀원 간 비난이 나오지 않도록 사전에 안내하세요.",
    ],
    previewPages: [1, 2, 5, 6],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/bible-relay/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/bible-relay/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/bible-relay/slides.zip",
        },
    ],
  creditPrice: 1000,
};

export default bibleRelay;
