import { Game } from "@/types/game";

const speakTogether: Game = {
    id: "speak-together",
    title: "이구동성",
    summary: "한 글자씩 동시에 외치면 섞인 소리로 단어를 맞추는 게임",
    description:
        "단어의 글자 수에 맞춰 팀원이 앞에 나와 한 글자씩 배정받고 동시에 외칩니다. 나머지 팀원이 섞인 소리를 듣고 단어를 맞추는 게임입니다. 빠르게 맞출수록 높은 점수를 얻습니다.",
    thumbnailUrl: "/images/games/speak-together.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 3,
    environments: ["실내교실", "실내강당"],
    prepTime: "quick",
    groupSizes: ["sm", "md", "lg"],
    characterQualities: ["경청", "민감성", "분별력"],
    durationMinutes: 15,
    difficulty: 3,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content:
                "팀을 나눕니다.\n팀당 5명 이상이어야 합니다.",
        },
        {
            title: "게임 진행",
            content:
                "단어의 글자 수만큼 팀원이 앞에 나와 한 글자씩 배정받습니다.\n동시에 자기 글자를 외치면, 나머지 팀원이 단어를 맞춥니다.\n못 맞추면 최대 3번까지 다시 외칠 수 있습니다.",
        },
        {
            title: "우승",
            content:
                "가장 많은 단어를 맞춘 팀이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "사도행전 2:1",
            verseText:
                "오순절 날이 이미 이르매 그들이 다 같이 한 곳에 모였더니",
            messageSummary:
                "오늘 여러 사람의 목소리를 하나로 모아 단어를 맞춰봤는데, 초대교회 성도들도 한마음으로 모여 기도했어요. 우리도 한마음으로 모이면 큰 일을 이룰 수 있어요.",
        },
    ],
    variations: [
        {
            condition: "소규모",
            suggestion:
                "3글자 단어로 줄여 3명이 외치고 나머지가 맞춥니다.",
        },
        {
            condition: "난이도 상향",
            suggestion:
                "5글자 또는 6글자 단어로 늘립니다.",
        },
        {
            condition: "글자 수 점수",
            suggestion:
                "2글자 1점, 3글자 2점, 4글자 3점으로 글자 수가 많을수록 높은 점수를 부여합니다.",
        },
        {
            condition: "뺏기 규칙",
            suggestion:
                "정답 팀이 못 맞추면 다른 팀이 맞출 기회를 줍니다. 맞추면 해당 팀에게 +1점 또는 원래 팀 -1점.",
        },
        {
            condition: "성경 특화",
            suggestion:
                "성경 관련 단어(할렐루야, 동방박사, 오병이어 등)를 사용합니다.",
        },
    ],
    safetyNotes: [
        "동시에 외칠 때 소리가 커질 수 있으므로 볼륨 규칙을 정하세요.",
        "팀별 인원이 같도록 조정하세요.",
        "글자를 외칠 때 몸짓, 입 모양, 손가락 등 편법을 사용하지 못하도록 사전에 안내하세요.",
        "맞추는 팀원은 화면(정답)을 보지 못하도록 자리를 배치하세요.",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/speak-together/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/speak-together/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/speak-together/slides.zip",
        },
    ],
};

export default speakTogether;
