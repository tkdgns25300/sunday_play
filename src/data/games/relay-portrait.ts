import { Game } from "@/types/game";

const relayPortrait: Game = {
  id: "relay-portrait",
  title: "릴레이 초상화",
  summary: "모델의 등 뒤에서 릴레이로 얼굴을 그리고, 맞추는 사람이 누구인지 알아맞히는 게임",
  description:
    "맞추는 사람 1명이 뒤돌아 있는 동안, 모델이 정해지면 나머지 팀원들이 모델의 등 뒤에서 한 부위씩 릴레이로 얼굴을 그립니다. 등 뒤라 모델 얼굴은 안 보이고 기억에만 의존해야 합니다. 완성 후 맞추는 사람이 그림만 보고 누구인지 맞히면 성공!",
  thumbnailUrl: "/images/games/relay-portrait.png",
  ageGroups: ["초등부", "중고등부", "청년부"],
  energyLevel: 3,
  environments: ["실내교실", "실내강당"],
  prepTime: "quick",
  groupSizes: ["md", "lg"],
  characterQualities: ["창의성", "유연성", "기쁨"],
  durationMinutes: 15,
  difficulty: 3,
  requiredStaff: { min: 1, recommended: 1 },
  steps: [
    {
      title: "준비",
      content:
        "팀을 나누고(팀당 최소 5명) 팀별로 스케치북 1장과 펜 1개를 배분합니다.\n먼저 맞추는 사람 1명을 정해 뒤돌아 있거나 밖으로 나가게 합니다.\n그 후 모델 1명을 정하고 앞에 세웁니다.",
    },
    {
      title: "게임 진행",
      content:
        "화면에 그릴 부위가 나타나면 팀원 1명이 모델의 등 뒤로 가서 스케치북에 해당 부위를 그리고 돌아옵니다.\n다음 지시가 나오면 다음 팀원이 등 뒤로 가서 이어 그리는 식으로 릴레이합니다.\n모든 부위를 다 그리면 맞추는 사람이 돌아옵니다.",
    },
    {
      title: "우승",
      content:
        "맞추는 사람이 완성된 그림만 보고 모델이 누구인지 맞힙니다.\n맞힌 팀끼리 다음 라운드로 진행하며, 최종까지 살아남은 팀이 우승합니다.",
    },
  ],
  materials: [
    {
      name: "스케치북",
      quantity: "팀당 1개",
      isOptional: false,
      purchaseUrl:
        "https://www.coupang.com/np/search?component=&q=%EC%8A%A4%EC%BC%80%EC%B9%98%EB%B6%81&traceId=mo4h7rem&channel=user",
    },
    {
      name: "마커",
      quantity: "팀당 1개",
      isOptional: false,
      purchaseUrl:
        "https://www.coupang.com/np/search?component=&q=%EB%A7%88%EC%BB%A4&traceId=mo4h7x4b&channel=user",
    },
  ],
  bibleConnections: [
    {
      verseReference: "창세기 1:27",
      verseText: "하나님이 자기 형상 곧 하나님의 형상대로 사람을 창조하시되",
      messageSummary:
        "친구의 얼굴을 그리며 그 사람을 다시 바라보게 되었듯이, 우리 모두가 하나님의 형상대로 만들어진 소중한 존재라는 것을 기억해요.",
    },
  ],
  variations: [
    {
      condition: "난이도 상향",
      suggestion:
        "그릴 부위 수를 최소한으로 줄입니다. (예: 눈, 코, 입만) 적은 힌트로 맞춰야 하니 난이도가 올라갑니다.",
    },
    {
      condition: "연예인 모드",
      suggestion:
        "팀원 대신 연예인 사진을 PPT에 보여주고 그립니다. 맞추는 사람에게 카테고리(아이돌, 배우, 개그맨 등)를 알려주면 적절한 힌트가 됩니다.",
    },
    {
      condition: "진행자 지정 모델",
      suggestion:
        "모델을 팀이 아닌 진행자가 지정합니다. 특징이 덜한 평범한 사람을 골라주면 맞추기가 어려워져 재미가 올라갑니다.",
    },
    {
      condition: "시간 제한",
      suggestion:
        "한 사람당 그리는 시간을 10초로 제한합니다. 시간이 지나면 미완성이어도 다음 사람으로 교체됩니다.",
    },
    {
      condition: "성경 특화",
      suggestion:
        "팀원의 얼굴 대신 성경 속 장면이나 사물(노아의 방주, 다윗의 물매 등)을 PPT에 보여주고 릴레이로 그립니다.",
    },
  ],
  safetyNotes: [
    "펜으로 등을 찌르거나 세게 누르지 않도록 주의하세요. 스케치북를 받칠 판이 있으면 더 좋습니다.",
    "모델이 움직이면 그림이 흐트러지니 자세를 유지하도록 안내하세요.",
  ],
  tips: [
    "부위 순서를 뒤죽박죽으로 하면 (예: 코 → 왼쪽 귀 → 오른쪽 눈 → 얼굴형) 그림이 더 웃기게 나옵니다.",
    "완성된 그림을 나란히 전시하면 관전 재미가 올라갑니다.",
    "라운드마다 모델과 맞추는 사람 역할을 바꾸면 모두가 다양하게 참여할 수 있습니다.",
  ],
  previewPages: [1, 2, 5, 6, 7],
  assets: [
    {
      fileName: "진행 자료",
      fileType: "pptx",
      storagePath: "/downloads/games/relay-portrait/rules.pptx",
    },
    {
      fileName: "진행 자료",
      fileType: "pdf",
      storagePath: "/downloads/games/relay-portrait/rules.pdf",
    },
    {
      fileName: "진행 자료",
      fileType: "zip",
      storagePath: "/downloads/games/relay-portrait/slides.zip",
    },
  ],
  creditPrice: 1000,
};

export default relayPortrait;
