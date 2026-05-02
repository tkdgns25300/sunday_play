import { Game } from "@/types/game";

const wordAssociation: Game = {
  id: "word-association",
  title: "연상 게임",
  summary: "이전 사람의 단어와 연관된 단어를 5초 안에 말하는 서바이벌 게임",
  description:
    "원형으로 앉아 진행자가 첫 단어를 제시하면, 오른쪽 방향으로 돌아가며 이전 단어와 연관된 단어를 5초 안에 말합니다. 바로 이전 단어와만 연관 있으면 되므로 단어가 점점 엉뚱한 방향으로 흘러가는 재미가 있습니다. 5초 초과하거나 연관 없는 단어를 말하면 탈락, 최후까지 살아남은 사람이 우승합니다.",
  thumbnailUrl: "/images/games/word-association.png",
  ageGroups: ["초등부", "중고등부", "청년부", "장년부"],
  energyLevel: 2,
  environments: ["실내교실", "실내강당"],
  prepTime: "none",
  groupSizes: ["sm"],
  characterQualities: ["경청", "민감성", "과단성"],
  durationMinutes: 10,
  difficulty: 2,
  requiredStaff: { min: 1, recommended: 1 },
  steps: [
    {
      title: "준비",
      content:
        "참가자들이 원형으로 앉습니다.\n진행자가 첫 단어를 말하고 한 사람을 지목합니다.\n오른쪽 방향으로 돌아가며 진행한다는 것을 안내합니다.",
    },
    {
      title: "게임 진행",
      content:
        "지목된 사람부터 이전 단어와 연관된 단어를 5초 안에 말하고, 오른쪽 옆사람에게 넘깁니다.\n바로 이전 단어와만 연관 있으면 됩니다. (예: 고양이 → 방울 → 소 → 쟁기 → 농사꾼)\n5초 안에 말하지 못하거나, 연관 없는 단어를 말하면 탈락합니다.\n탈락자가 나오면 원에서 빠지고 새 단어로 다시 시작합니다.",
    },
    {
      title: "우승",
      content:
        "최후까지 살아남은 사람이 우승합니다.",
    },
  ],
  materials: [],
  bibleConnections: [
    {
      verseReference: "잠언 15:23",
      verseText: "적절한 대답을 하면 기쁨이 있나니 때에 맞는 말이 얼마나 좋은가",
      messageSummary:
        "빠르게 연관된 단어를 떠올려야 했듯이, 상황에 맞는 적절한 말 한마디가 얼마나 중요한지 느꼈을 거예요. 우리도 때에 맞는 좋은 말을 하는 사람이 되어요.",
    },
  ],
  variations: [
    {
      condition: "주제 한정",
      suggestion:
        "연관 단어를 특정 주제(음식, 동물, 나라 등)로 한정하면 난이도가 올라갑니다.",
    },
    {
      condition: "역방향",
      suggestion:
        "진행 중 진행자가 '반대!'를 외치면 방향이 왼쪽으로 바뀝니다. 갑작스러운 전환에 긴장감이 생깁니다.",
    },
    {
      condition: "금지어",
      suggestion:
        "자주 나오는 쉬운 단어(사람, 물, 밥 등)를 금지어로 지정하면 더 창의적인 연상이 필요합니다.",
    },
    {
      condition: "성경 특화",
      suggestion:
        "첫 단어를 성경 관련 단어(예수님, 사랑, 십자가 등)로 시작합니다. 연관 단어도 자연스럽게 성경 주제로 흘러갑니다.",
    },
  ],
  safetyNotes: [
    "연관성 판정은 진행자가 하되, 애매한 경우 본인이 이유를 설명하면 인정해 주세요.",
    "탈락자가 소외감을 느끼지 않도록 응원 역할을 주거나, 판정 보조로 참여시키세요.",
  ],
  tips: [
    "첫 단어는 연상하기 쉬운 구체적인 명사(고양이, 바다, 축구 등)로 시작하면 좋습니다.",
    "진행자가 '5, 4, 3, 2, 1' 카운트를 크게 세면 긴장감이 올라갑니다.",
    "인원이 줄어들수록 속도를 빠르게 (3초로 단축) 하면 마지막까지 긴장감을 유지할 수 있습니다.",
  ],
  previewPages: [1, 2, 4, 5],
  assets: [
    {
      fileName: "진행 자료",
      fileType: "pptx",
      storagePath: "/downloads/games/word-association/rules.pptx",
    },
    {
      fileName: "진행 자료",
      fileType: "pdf",
      storagePath: "/downloads/games/word-association/rules.pdf",
    },
    {
      fileName: "진행 자료",
      fileType: "zip",
      storagePath: "/downloads/games/word-association/slides.zip",
    },
  ],
  creditPrice: 1000,
};

export default wordAssociation;
