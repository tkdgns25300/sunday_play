import { Game } from "@/types/game";

const chainWords: Game = {
    id: "chain-words",
    title: "줄줄이 말해요",
    summary: "제시어에 맞는 단어를 팀원들이 줄줄이 이어서 말하는 게임",
    description:
        "진행자의 제시어에 따라 팀원들이 한 명씩 3초 안에 순서대로 해당하는 단어를 말합니다. 끝나는 글자('리'자로 끝나는 말), 카테고리(분식 메뉴), 초성(초성이 'ㅅㅂ'인 단어) 등 다양한 유형으로 진행합니다. 팀원 전원이 성공하면 점수를 얻고, 실패하면 다른 팀이 이어서 도전합니다.",
    thumbnailUrl: "/images/games/chain-words.png",
    ageGroups: ["초등부", "중고등부", "청년부", "장년부"],
    energyLevel: 1,
    environments: ["실내교실", "실내강당"],
    prepTime: "none",
    groupSizes: ["sm", "md", "lg"],
    characterQualities: ["경각심", "민감성", "창의성"],
    durationMinutes: 15,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content: "팀을 나누고 팀별 도전 순서와 팀 내 순서를 정합니다.\n팀별 인원이 같도록 조정합니다.",
        },
        {
            title: "게임 진행",
            content:
                "진행자가 제시어를 말합니다. (예: '리'자로 끝나는 말, 2글자 동물 이름)\n팀원들이 한 명씩 순서대로 3초 안에 해당하는 단어를 말합니다.\n이전에 나온 단어는 중복 사용할 수 없습니다.\n팀원 전원이 성공하면 점수를 얻습니다.\n실패하면 다른 팀이 이어서 도전하고, 성공한 팀이 점수를 가져갑니다.",
        },
        {
            title: "우승",
            content: "모든 제시어가 끝난 후 가장 많은 점수를 얻은 팀이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "잠언 15:23",
            verseText: "사람은 그 입의 대답으로 말미암아 기쁨을 얻나니 때에 맞는 말이 얼마나 좋은가",
            messageSummary:
                "오늘 적절한 단어를 빠르게 말해봤는데, 실제로도 때에 맞는 좋은 말 한마디가 큰 힘이 돼요. 주변 사람들에게 힘이 되는 말을 해봐요.",
        },
    ],
    variations: [
        {
            condition: "소규모 (10명 이하)",
            suggestion: "팀 없이 전원이 원형으로 앉아 한 바퀴 돌며 진행합니다. 단어를 말하지 못한 사람은 탈락하고 마지막까지 남은 사람이 우승합니다.",
        },
        {
            condition: "난이도 상향",
            suggestion: "제한 시간을 2초로 줄이거나 어려운 제시어를 사용합니다.",
        },
        {
            condition: "탈락형",
            suggestion: "단어를 말하지 못한 팀은 탈락하고, 마지막까지 남은 팀이 우승합니다.",
        },
        {
            condition: "왕복 모드",
            suggestion: "팀원 전원이 한 바퀴 성공하면 다시 역순으로 돌아옵니다. 왕복 완주 시 보너스 점수를 줍니다.",
        },
        {
            condition: "성경 특화",
            suggestion: "성경 관련 제시어를 사용합니다. (예: 성경 인물 이름, '사'자로 시작하는 성경 단어 등)",
        },
    ],
    safetyNotes: [
        "답을 못하는 참가자를 놀리지 않도록 서로 응원하는 분위기를 만들어주세요.",
        "팀별 인원이 같도록 조정하세요. 인원이 다르면 불공정합니다.",
    ],
    previewPages: [1, 2, 5, 6],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/chain-words/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/chain-words/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/chain-words/slides.zip",
        },
    ],
  recommendScore: 3,
  creditPrice: 1500,
};

export default chainWords;
