import { Game } from "@/types/game";

const wordRelay: Game = {
    id: "word-relay",
    title: "이어말하기",
    summary: "네 글자 단어의 앞 두 글자를 보고 뒤 두 글자를 맞추는 팀 대결 퀴즈 게임",
    description:
        "진행자가 네 글자 단어(사자성어, 일상 표현 등)의 앞 두 글자만 보여주면, 한 팀씩 도전하여 뒤 두 글자를 맞춥니다. 틀릴 때까지 계속 진행하며, 가장 많이 맞춘 팀이 우승합니다. 빠른 판단력과 어휘력을 겨루는 재미있는 퀴즈 게임입니다.",
    thumbnailUrl: "/images/games/word-relay.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 2,
    environments: ["실내교실", "실내강당"],
    prepTime: "quick",
    groupSizes: ["sm", "md", "lg"],
    characterQualities: ["지혜", "경각심", "끈기"],
    durationMinutes: 15,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 2 },
    steps: [
        {
            title: "준비",
            content: "팀을 나눕니다.",
        },
        {
            title: "게임 진행",
            content:
                "한 팀씩 도전합니다.\n진행자가 네 글자 단어의 앞 두 글자만 화면에 보여줍니다.\n예: '생로__', '우왕__', '천고__'\n뒤 두 글자를 맞추면 다음 문제로 넘어가고, 틀리면 도전이 끝납니다.\n모든 팀이 도전을 마칠 때까지 반복합니다.",
        },
        {
            title: "우승",
            content: "가장 많은 문제를 맞춘 팀이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "잠언 18:21",
            verseText: "죽고 사는 것이 혀의 힘에 달렸나니 혀를 쓰기 좋아하는 자는 혀의 열매를 먹으리라",
            messageSummary:
                "오늘 게임에서 우리가 말한 것처럼, 말에는 큰 힘이 있어요. 우리의 말 한마디가 누군가를 세워줄 수도, 무너뜨릴 수도 있답니다. 좋은 말, 생명을 주는 말을 이어가는 사람이 되어요.",
        },
    ],
    variations: [
        {
            condition: "저학년 (유년부)",
            suggestion: "쉬운 일상 단어 위주로 출제하고, 보기 2개 중 고르기 방식도 좋습니다.",
        },
        {
            condition: "고학년·청년부",
            suggestion: "사자성어 위주로 난이도를 높여 긴장감을 더합니다.",
        },
        {
            condition: "대규모 (30명 이상)",
            suggestion: "팀 대표 1명이 나와서 개인전으로 대결하는 서바이벌 방식으로 진행합니다.",
        },
        {
            condition: "성경 특화",
            suggestion:
                "성경 관련 네 글자 표현만 사용합니다. 예: '할렐루야', '천지창조', '동방박사', '오병이어', '선한목자'",
        },
    ],
    safetyNotes: [
        "정답을 외칠 때 소리가 커질 수 있으므로 시작 전 볼륨 규칙을 정하세요.",
        "틀린 답에 대해 놀리지 않도록 서로 존중하는 분위기를 만들어주세요.",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/word-relay/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/word-relay/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/word-relay/slides.zip",
        },
        {
            fileName: "네 글자 단어 모음",
            fileType: "pdf",
            storagePath: "/downloads/games/word-relay/words.pdf",
        },
        {
            fileName: "네 글자 단어 모음",
            fileType: "hwpx",
            storagePath: "/downloads/games/word-relay/words.hwpx",
        },
    ],
  recommendScore: 3,
  creditPrice: 500,
};

export default wordRelay;
