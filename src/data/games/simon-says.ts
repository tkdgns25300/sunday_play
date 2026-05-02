import { Game } from "@/types/game";

const simonSays: Game = {
    id: "simon-says",
    title: "가라사대",
    summary: '"가라사대"가 붙은 행동만 따르고, 없으면 절대 움직이지 않는 집중력 게임',
    description:
        '"가라사대"가 붙은 행동만 따라야 하고, 없으면 절대 움직이면 안 됩니다. 빠른 속도와 진행자의 속임수에 맞서 끝까지 살아남는 게임입니다.',
    thumbnailUrl: "/images/games/simon-says.png",
    ageGroups: ["유치부", "유년부", "초등부", "중고등부", "청년부"],
    energyLevel: 3,
    environments: ["실내교실", "실내강당", "야외"],
    prepTime: "none",
    groupSizes: ["xs", "sm", "md", "lg"],
    characterQualities: ["경청", "신중", "민감성"],
    durationMinutes: 10,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "따라하기",
            content:
                '진행자가 "가라사대"를 앞에 붙여 행동을 지시합니다.\n예: "가라사대 손 들어!" → 모두 따라야 합니다.',
        },
        {
            title: "함정",
            content: '"가라사대" 없이 행동을 지시하면 절대 따라 하면 안 됩니다.\n예: "손 내려!" → 움직이면 즉시 탈락.',
        },
        {
            title: "우승",
            content: "잘못 움직이거나 반응이 늦으면 탈락합니다.\n마지막까지 생존한 최후의 1인이 우승합니다.",
        },
    ],
    materials: [],
    tips: [
        "핵심은 속도. 빠르게 진행할수록 실수가 나옵니다.",
        "진행자도 반드시 직접 행동해야 합니다. 말이 아닌 행동을 보고 따라하다가 걸리는 게 포인트입니다.",
        "레파토리를 미리 외워두세요. 즉흥 진행은 흐름을 끊습니다.",
        "탈락 판정은 신속하고 확실하게. 애매하게 넘어가면 긴장감이 깨집니다.",
    ],
    referenceVideoUrl: "https://www.youtube.com/watch?v=tYVt-4wzvCE",
    bibleConnections: [
        {
            verseReference: "요한복음 10:27",
            verseText: "내 양은 내 음성을 들으며 나는 그들을 알며 그들은 나를 따르느니라",
            messageSummary:
                "가라사대 게임에서 진행자의 목소리를 잘 듣고 분별해야 하듯, 우리도 예수님의 음성을 듣고 따르는 것이 중요해요. 수많은 소리 속에서 목자의 목소리를 알아듣는 양처럼, 하나님의 말씀에 귀를 기울이는 연습을 해요.",
        },
    ],
    variations: [
        {
            condition: "팀전",
            suggestion:
                "팀별로 나눠 탈락자가 더 많이 나온 팀이 지는 방식으로 진행합니다. 개인 탈락이 아닌 팀 단위 경쟁으로 더 활기찬 분위기를 만들 수 있습니다.",
        },
        {
            condition: "벌칙 미션",
            suggestion:
                "탈락하면 바로 앉히는 대신 간단한 벌칙 미션(예: 닭 울음소리, 제자리 5바퀴)을 수행 후 복귀하는 방식으로 진행합니다. 탈락자도 게임에 계속 참여할 수 있어 소외감 없이 즐길 수 있습니다.",
        },
        {
            condition: "행동 레파토리 확장",
            suggestion:
                "손 들기·내리기 외에 점프, 박수, 앉기, 옆 사람 어깨 두드리기 등 다양한 행동을 추가합니다. 레파토리가 많을수록 속임수 패턴이 풍부해져 난이도가 올라갑니다.",
        },
    ],
    safetyNotes: ["점프나 빠른 동작이 포함될 경우 주변 공간을 충분히 확보하세요."],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/simon-says/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/simon-says/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/simon-says/slides.zip",
        },
    ],
  creditPrice: 500,
};

export default simonSays;
