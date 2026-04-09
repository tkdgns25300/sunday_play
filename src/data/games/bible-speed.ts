import { Game } from "@/types/game";

const bibleSpeed: Game = {
    id: "bible-speed",
    title: "성경 빨리 찾기",
    summary: "진행자가 말한 구절을 성경책에서 가장 빨리 찾아 암송하는 게임",
    description:
        "진행자가 성경 구절 주소를 말하면 성경책에서 가장 빨리 찾아 암송하는 사람이 득점합니다. 성경의 구조를 자연스럽게 익히고, 말씀에 가까워지는 게임입니다.",
    thumbnailUrl: "/images/games/bible-speed.png",
    ageGroups: ["초등부", "중고등부", "청년부"],
    energyLevel: 2,
    environments: ["실내교실", "실내강당"],
    prepTime: "quick",
    groupSizes: ["xs", "sm", "md", "lg"],
    characterQualities: ["분별력", "끈기", "경청"],
    durationMinutes: 10,
    difficulty: 2,
    requiredStaff: { min: 1, recommended: 1 },
    steps: [
        {
            title: "준비",
            content: "참가자 전원이 성경책을 준비합니다.",
        },
        {
            title: "게임 진행",
            content:
                "진행자가 성경 구절 주소를 말합니다. (예: 요한복음 3장 16절)\n가장 빨리 찾은 사람이 성경을 덮고 해당 구절을 암송하면 1점을 얻습니다.",
        },
        {
            title: "우승",
            content:
                "모든 라운드가 끝난 후 가장 많은 점수를 얻은 사람이 우승합니다.",
        },
    ],
    materials: [
        {
            name: "성경책",
            quantity: "인당 1권",
            isOptional: false,
            purchaseUrl:
                "https://www.coupang.com/np/search?component=&q=%EC%84%B1%EA%B2%BD%EC%B1%85&traceId=mnr9pu57&channel=user",
        },
    ],
    bibleConnections: [
        {
            verseReference: "디모데후서 2:15",
            verseText:
                "너는 진리의 말씀을 옳게 분별하며 부끄러울 것이 없는 일꾼으로 인정된 자로 자신을 하나님 앞에 드리기를 힘쓰라",
            messageSummary:
                "오늘 성경을 빨리 찾아봤는데, 말씀을 자주 펼쳐보는 사람이 하나님의 뜻을 더 잘 알 수 있어요. 성경과 친해지는 것이 믿음의 첫걸음입니다.",
        },
    ],
    variations: [
        {
            condition: "대규모 (팀전)",
            suggestion:
                "팀별로 나누어 팀 대표가 나와서 찾고 읽습니다. 팀원이 응원하며 긴장감을 높입니다.",
        },
        {
            condition: "저학년 (초등부)",
            suggestion:
                "유명한 구절 위주로 출제하고, 권(book) 이름을 먼저 알려준 뒤 장과 절을 말합니다.",
        },
        {
            condition: "난이도 상향",
            suggestion:
                "구절 주소 없이 내용 힌트만 줍니다. 예: \"하나님이 세상을 이처럼 사랑하사…\" → 어디에 있는지 찾기.",
        },
        {
            condition: "읽기 모드",
            suggestion:
                "암송이 어려운 경우, 구절을 찾아 소리 내어 읽기만 해도 득점하도록 난이도를 낮춥니다.",
        },
        {
            condition: "찬송가 버전",
            suggestion:
                "성경 대신 찬송가를 사용합니다. 찬송가 번호를 찾아 첫 소절을 부르면 득점합니다.",
        },
        {
            condition: "릴레이",
            suggestion:
                "팀별로 한 사람씩 돌아가며 찾습니다. 한 사람이 찾으면 다음 사람에게 넘기는 릴레이 방식으로 진행합니다.",
        },
    ],
    safetyNotes: [
        "성경책을 던지거나 거칠게 넘기지 않도록 사전에 안내하세요.",
        "찾지 못하는 참가자가 위축되지 않도록 힌트를 적극적으로 활용하세요.",
    ],
    assets: [
        {
            fileName: "진행 자료",
            fileType: "pptx",
            storagePath: "/downloads/games/bible-speed/rules.pptx",
        },
        {
            fileName: "진행 자료",
            fileType: "pdf",
            storagePath: "/downloads/games/bible-speed/rules.pdf",
        },
    ],
};

export default bibleSpeed;
