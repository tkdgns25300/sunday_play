import { Game } from "@/types/game";

const voiceGuess: Game = {
    id: "voice-guess",
    title: "누구게?",
    summary: "뒤돌아 서서 목소리만 듣고 누가 말했는지 맞추는 게임",
    description:
        "도전자가 뒤돌아 선 상태에서 다른 사람들이 한 명씩 같은 단어를 말합니다. 한 명이 말할 때마다 도전자는 누구인지 즉시 답하고, 진행자는 맞춘 사람은 왼쪽, 틀린 사람은 오른쪽으로 이동시킵니다. 모두 끝난 후 도전자가 뒤돌아 결과를 확인합니다. 가장 많이 맞춘 사람이 우승합니다.",
    thumbnailUrl: "/images/games/voice-guess.png",
    ageGroups: ["초등부", "중고등부", "청년부", "장년부"],
    energyLevel: 2,
    environments: ["실내교실"],
    prepTime: "none",
    groupSizes: ["sm"],
    characterQualities: ["경청", "민감성", "분별력"],
    durationMinutes: 15,
    difficulty: 1,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content:
                "도전 순서를 정합니다.\n첫 번째 도전자가 뒤돌아 섭니다.",
        },
        {
            title: "게임 진행",
            content:
                "나머지 사람들이 한 명씩 같은 단어('안녕하세요' 등)를 말합니다.\n목소리 변조도 가능합니다.\n한 명이 말할 때마다 도전자가 즉시 누구인지 답합니다.",
        },
        {
            title: "결과 확인",
            content:
                "진행자는 도전자에게 정답 여부를 알리지 않고, 맞춘 사람은 왼쪽, 틀린 사람은 오른쪽으로 이동시킵니다.\n모두 끝난 후 도전자가 뒤돌아 결과를 확인합니다.\n왼쪽에 있는 사람 수만큼 점수를 얻습니다.",
        },
        {
            title: "우승",
            content:
                "모든 사람이 도전한 후 가장 많이 맞춘 사람이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "요한복음 10:27",
            verseText:
                "내 양은 내 음성을 들으며 나는 그들을 알며 그들은 나를 따르느니라",
            messageSummary:
                "오늘 목소리만 듣고 누구인지 맞춰봤는데, 양이 목자의 음성을 알아듣듯 우리도 익숙한 사람의 목소리를 알아봐요. 평소 하나님의 말씀에 귀 기울이며 그분의 음성을 알아듣는 사람이 되어요.",
        },
    ],
    variations: [
        {
            condition: "난이도 상향",
            suggestion:
                "한 음절만 말합니다. (예: '아', '헤')",
        },
        {
            condition: "교역자/리더 활용",
            suggestion:
                "목사님, 전도사님, 선생님 등 교역자를 대상으로 진행합니다. 친숙하면서도 헷갈리는 재미가 있습니다.",
        },
        {
            condition: "성경 특화",
            suggestion:
                "단어 대신 성경 인물 이름을 말하게 합니다. (예: '다윗', '모세')",
        },
    ],
    tips: [
        "단어는 짧고 같은 것으로 통일해야 공정합니다. (예: '안녕하세요')",
        "변조가 너무 과하면 게임이 어려워지니 적절한 수준으로 제한하세요.",
    ],
    safetyNotes: [
        "도전 중간에 정답 여부를 알려주거나 '아, 못 맞췄네' 같은 반응을 하면 안 됩니다. 결과는 모두 끝난 후 공개하세요.",
        "도전자가 절대 뒤돌아보지 않도록 안내하세요.",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/voice-guess/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/voice-guess/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/voice-guess/slides.zip",
        },
    ],
  recommendScore: 1,
  creditPrice: 500,
};

export default voiceGuess;
