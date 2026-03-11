import { Game } from "@/types/game";

const humanKnot: Game = {
  id: "human-knot",
  title: "인간매듭 풀기",
  summary: "서로 손을 잡고 얽힌 매듭을 풀어 원형을 만드는 협동 게임",
  description:
    "참가자들이 원형으로 서서 무작위로 다른 사람의 손을 잡은 뒤, 손을 놓지 않고 얽힌 매듭을 풀어 하나의 원을 만드는 게임입니다. 아이스브레이킹과 팀빌딩에 효과적입니다.",
  thumbnailUrl: "/images/games/human-knot.jpg",
  ageGroups: ["중고등부", "청년부"],
  energyLevel: 3,
  environments: ["실내교실", "실내강당", "야외"],
  prepTime: "none",
  groupSizes: ["sm", "md"],
  biblicalThemes: ["협동", "사랑", "인내"],
  durationMinutes: 10,
  difficulty: 3,
  steps: [
    {
      title: "원형으로 모이기",
      content:
        "8~12명이 한 그룹으로 원형으로 섭니다. 인원이 많으면 여러 그룹으로 나눕니다.",
      scriptKo: "자, 동그랗게 모여볼까요? 어깨가 닿을 정도로 가까이 서주세요!",
      scriptEn: "Alright, let's form a circle! Stand close enough so your shoulders are almost touching!",
    },
    {
      title: "손 잡기",
      content:
        "눈을 감고 원 중앙으로 양손을 뻗어 무작위로 다른 사람의 손을 잡습니다. 한 손에 한 사람, 양손이 같은 사람이면 안 됩니다. 바로 옆 사람의 손을 잡으면 안 됩니다.",
      scriptKo:
        "눈을 감고 양손을 앞으로 뻗어주세요. 아무 손이나 잡으면 돼요! 옆 사람 손은 안 돼요~",
      scriptEn:
        "Close your eyes and reach out both hands. Grab any hand you find! Just not the person right next to you!",
    },
    {
      title: "매듭 풀기",
      content:
        "눈을 뜨고 손을 놓지 않은 채 몸을 움직여 매듭을 풉니다. 팔 밑으로 지나가거나, 몸을 돌리거나, 넘어가는 등 다양한 방법을 시도합니다. 제한 시간은 5분입니다.",
      scriptKo: "자, 이제 눈을 뜨세요! 손을 놓지 말고 매듭을 풀어보세요. 5분 안에 할 수 있을까요?",
      scriptEn:
        "Now open your eyes! Without letting go, try to untangle the knot. Can you do it in 5 minutes?",
    },
    {
      title: "마무리",
      content:
        "성공 여부와 관계없이, 함께 문제를 풀어가는 과정 자체가 중요하다는 점을 나눕니다.",
    },
  ],
  materials: [],
  bibleConnections: [
    {
      verseReference: "고린도전서 12:27",
      verseText: "너희는 그리스도의 몸이요 지체의 각 부분이라",
      messageSummary:
        "우리 한 사람 한 사람이 그리스도의 몸의 일부예요. 서로 연결되어 있고, 함께 움직일 때 아름다운 모습이 됩니다.",
    },
  ],
  variations: [
    {
      condition: "인원이 5명 미만일 때",
      suggestion: "인원이 너무 적으면 매듭이 단순해져 재미가 줄어듦. 최소 6명 이상 권장.",
    },
    {
      condition: "남녀 혼성 그룹일 때",
      suggestion: "손 잡기가 불편할 수 있으므로, 짧은 수건이나 끈을 잡는 방식으로 대체.",
    },
  ],
  assets: [],
};

export default humanKnot;
