import { Game } from "@/types/game";

const emojiMovieQuiz: Game = {
    id: "emoji-movie-quiz",
    title: "이모티콘 영화 퀴즈",
    summary: "이모티콘 조합을 보고 어떤 영화인지 맞추는 퀴즈 게임",
    description:
        "진행자가 이모티콘 조합을 화면에 보여주면, 모든 팀이 동시에 보고 가장 먼저 영화 제목을 외치는 팀이 득점합니다. 준비물 없이 바로 즐길 수 있는 퀴즈 게임입니다.",
    thumbnailUrl: "/images/games/emoji-movie-quiz.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 2,
    environments: ["실내교실", "실내강당"],
    prepTime: "quick",
    groupSizes: ["md", "lg"],
    characterQualities: ["지혜", "경각심", "민감성"],
    durationMinutes: 15,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content: "팀을 나눕니다.",
        },
        {
            title: "게임 진행",
            content:
                "진행자가 이모티콘 조합을 화면에 보여줍니다.\n모든 팀이 동시에 보고 가장 먼저 영화 제목을 외칩니다.\n정답을 맞춘 팀에게 1점을 부여합니다.",
        },
        {
            title: "우승",
            content: "모든 문제가 끝난 후 가장 많은 점수를 얻은 팀이 우승합니다.",
        },
    ],
    materials: [],
    bibleConnections: [
        {
            verseReference: "마태복음 13:34",
            verseText: "예수께서 이 모든 것을 무리에게 비유로 말씀하시고 비유가 아니면 아무 것도 말씀하지 아니하셨으니",
            messageSummary:
                "예수님도 비유로 진리를 전하셨듯이, 이모티콘도 하나의 비유예요. 겉모습만 보지 않고 그 안에 담긴 의미를 찾아내는 눈을 키워봐요.",
        },
    ],
    variations: [
        {
            condition: "저학년 (초등부)",
            suggestion: "디즈니/픽사 애니메이션 위주로 출제하여 난이도를 낮춥니다.",
        },
        {
            condition: "청년부",
            suggestion: "최신 영화나 한국 영화를 포함하여 난이도를 높입니다.",
        },
        {
            condition: "소규모 (10명 이하)",
            suggestion: "팀전 없이 개인전으로 진행합니다. 누적 점수로 순위를 매깁니다.",
        },
        {
            condition: "성경 특화",
            suggestion: "영화 대신 성경 인물이나 사건을 이모티콘으로 표현합니다. 예: 🍎🐍👫🌳 → 아담과 하와",
        },
    ],
    safetyNotes: [
        "정답을 외칠 때 소리가 커질 수 있으므로 시작 전 볼륨 규칙을 정하세요.",
        "참가자 연령에 맞는 영화를 선별하세요. 초등부에게 공포·폭력적인 영화가 정답으로 나오지 않도록 주의합니다.",
    ],
    assets: [],
};

export default emojiMovieQuiz;
