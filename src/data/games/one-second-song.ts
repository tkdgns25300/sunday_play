import { Game } from "@/types/game";

const oneSecondSong: Game = {
    id: "one-second-song",
    title: "1초 송퀴즈",
    summary: "노래 1초만 듣고 제목을 맞추는 팀 대결 퀴즈 게임",
    description:
        "진행자가 노래를 1초만 재생하면, 모든 팀이 동시에 듣고 가장 먼저 노래 제목을 외치는 팀이 득점합니다. 짧은 순간에 집중력을 발휘하는 음악 퀴즈 게임입니다.",
    thumbnailUrl: "/images/games/one-second-song.png",
    ageGroups: ["유년부", "초등부", "중고등부", "청년부"],
    energyLevel: 1,
    environments: ["실내교실", "실내강당"],
    prepTime: "none",
    groupSizes: ["md", "lg"],
    characterQualities: ["경각심", "민감성", "기쁨"],
    durationMinutes: 15,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content: "팀을 나눕니다.\n노래 목록을 참고하여 유튜브 등에서 음원을 미리 준비합니다.",
        },
        {
            title: "게임 진행",
            content:
                "진행자가 노래를 1초만 재생합니다.\n모든 팀이 동시에 듣고 가장 먼저 노래 제목을 외칩니다.\n정답을 맞춘 팀에게 1점을 부여합니다.\n못 맞추면 한 번 더 재생하거나 힌트를 줄 수 있습니다.",
        },
        {
            title: "우승",
            content: "모든 문제가 끝난 후 가장 많은 점수를 얻은 팀이 우승합니다.",
        },
    ],
    materials: [
        {
            name: "휴대용 스피커",
            quantity: "1개",
            isOptional: true,
            purchaseUrl:
                "https://www.coupang.com/vp/products/7456542331?itemId=19425189583&vendorItemId=86536553267&pickType=COU_PICK&q=%ED%9C%B4%EB%8C%80%EC%9A%A9+%EC%8A%A4%ED%94%BC%EC%BB%A4&searchId=6f2205096623020&sourceType=search&itemsCount=36&searchRank=0&rank=0&traceId=mnhhhl3k",
        },
    ],
    bibleConnections: [
        {
            verseReference: "시편 95:1",
            verseText: "오라 우리가 여호와께 노래하며 우리의 구원의 반석을 향하여 즐거이 외치자",
            messageSummary:
                "오늘 다양한 노래를 들어봤는데, 그중 가장 아름다운 노래는 하나님을 찬양하는 노래예요. 기쁠 때도, 힘들 때도 하나님께 노래하는 사람이 되어요.",
        },
    ],
    variations: [
        {
            condition: "저학년 (유년부)",
            suggestion: "재생 시간을 3초로 늘리고, 동요 위주로 출제합니다.",
        },
        {
            condition: "난이도 상향",
            suggestion: "재생 시간을 0.5초로 줄이거나, 노래 중간 부분을 재생합니다.",
        },
        {
            condition: "연속 재생 모드",
            suggestion: "1초가 아닌 처음부터 계속 재생하며, 가장 먼저 맞추는 팀이 득점합니다. 빨리 맞출수록 높은 점수를 부여하면 더 긴장감 있습니다.",
        },
        {
            condition: "소규모 (10명 이하)",
            suggestion: "팀전 없이 개인전으로 진행합니다. 누적 점수로 순위를 매깁니다.",
        },
    ],
    safetyNotes: [
        "스피커 볼륨을 미리 테스트하여 너무 크지 않게 조절하세요.",
        "정답을 외칠 때 소리가 커질 수 있으므로 시작 전 볼륨 규칙을 정하세요.",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/one-second-song/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/one-second-song/rules.pdf",
        },
        {
            fileName: "진행 자료",
            fileType: "zip",
            storagePath: "/downloads/games/one-second-song/slides.zip",
        },
        {
            fileName: "노래 목록",
            fileType: "pdf",
            storagePath: "/downloads/games/one-second-song/songs.pdf",
        },
        {
            fileName: "노래 목록",
            fileType: "hwpx",
            storagePath: "/downloads/games/one-second-song/songs.hwpx",
        },
    ],
  recommendScore: 4,
  creditPrice: 500,
};

export default oneSecondSong;
