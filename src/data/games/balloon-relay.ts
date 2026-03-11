import { Game } from "@/types/game";

const balloonRelay: Game = {
  id: "balloon-relay",
  title: "풍선 릴레이",
  summary: "팀별로 풍선을 떨어뜨리지 않고 릴레이하는 게임",
  description:
    "신나는 음악과 함께 팀별로 풍선을 릴레이하며 협동심을 배우는 활동입니다. 간단한 규칙으로 누구나 쉽게 참여할 수 있고, 응원하는 재미도 있어 분위기를 한껏 띄울 수 있습니다.",
  thumbnailUrl: "/images/games/balloon-relay.jpg",
  ageGroups: ["유년부", "초등부", "중고등부"],
  energyLevel: 4,
  environments: ["실내강당", "야외"],
  prepTime: "quick",
  groupSizes: ["md", "lg"],
  biblicalThemes: ["협동", "사랑"],
  durationMinutes: 15,
  difficulty: 2,
  steps: [
    {
      title: "팀 나누기",
      content:
        "참가자를 2~4팀으로 나눕니다. 각 팀은 일렬로 줄을 섭니다. 팀별로 색깔 풍선을 다르게 배정하면 구분이 쉽습니다.",
      scriptKo:
        "자, 오늘은 팀별로 나눠서 재밌는 게임을 할 거예요! 이쪽은 빨간 팀, 저쪽은 파란 팀!",
      scriptEn:
        "Alright, today we're going to split into teams for a fun game! This side is the red team, that side is the blue team!",
    },
    {
      title: "규칙 설명",
      content:
        "풍선을 손으로만 터치하여 다음 사람에게 전달합니다. 풍선이 땅에 떨어지면 처음부터 다시 시작합니다. 먼저 마지막 사람까지 도달한 팀이 승리합니다.",
      scriptKo:
        "규칙은 간단해요! 풍선을 손으로만 톡톡 쳐서 다음 친구에게 넘기면 돼요. 땅에 떨어지면? 처음부터 다시!",
      scriptEn:
        "The rules are simple! Tap the balloon with your hands to pass it to the next person. If it drops? Start over!",
    },
    {
      title: "게임 진행",
      content:
        "호루라기 신호와 함께 게임을 시작합니다. 진행자는 각 팀의 풍선 낙하 여부를 관찰합니다. 2~3라운드 진행하여 총점으로 우승팀을 정합니다.",
    },
    {
      title: "마무리",
      content:
        "우승팀에게 간단한 상품(사탕 등)을 나눠주고, 함께 협동하는 것의 의미에 대해 이야기합니다.",
    },
  ],
  materials: [
    { name: "풍선", quantity: "팀당 3개", isOptional: false },
    { name: "호루라기", quantity: "1개", isOptional: true },
    { name: "상품(사탕 등)", quantity: "적당량", isOptional: true },
  ],
  bibleConnections: [
    {
      verseReference: "전도서 4:9",
      verseText:
        "두 사람이 한 사람보다 나으니 이는 그들이 수고함으로 좋은 상을 얻을 것임이라",
      messageSummary:
        "혼자보다 함께할 때 더 큰 힘이 나와요. 오늘 게임처럼, 우리가 서로 도우면 더 멋진 일을 할 수 있답니다.",
    },
  ],
  variations: [
    {
      condition: "인원이 5명 미만일 때",
      suggestion: "팀 대항 대신 개인전으로 진행. 풍선을 떨어뜨리면 탈락하는 서바이벌 방식.",
    },
    {
      condition: "실내 교실일 때",
      suggestion:
        "책상을 벽쪽으로 밀어 공간을 확보하고, 릴레이 대신 원형으로 서서 풍선을 돌리는 방식으로 변경.",
    },
    {
      condition: "유아부와 함께할 때",
      suggestion: "풍선을 손에 들고 뛰어서 전달하는 방식으로 난이도를 낮춤.",
    },
  ],
  assets: [],
};

export default balloonRelay;
