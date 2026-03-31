import { Game } from "@/types/game";

const flashMemory: Game = {
  id: "flash-memory",
  title: "순간 포착",
  summary: "3초간 보여주는 이미지 속 항목을 모두 기억해서 적는 순간 기억력 게임",
  description:
    "라운드마다 이미지를 단 3초만 보여줍니다. 이미지가 사라지면 팀원이 함께 기억나는 항목을 최대한 많이 적어 정답과 일치하는 수만큼 점수를 얻습니다. 집중과 협력이 승패를 가릅니다.",
  thumbnailUrl: "/images/games/flash-memory.png",
  ageGroups: ["유년부", "초등부", "중고등부", "청년부"],
  energyLevel: 2,
  environments: ["실내교실", "실내강당"],
  prepTime: "quick",
  groupSizes: ["sm", "md", "lg"],
  characterQualities: ["경각심", "민감성", "신중"],
  durationMinutes: 15,
  difficulty: 2,
  requiredStaff: { min: 1, recommended: 1 },
  steps: [
    {
      title: "준비",
      content: "팀을 나눕니다.",
    },
    {
      title: "포착",
      content:
        "이미지를 3초간 보여줍니다.\n이미지가 사라지면 팀원이 함께 기억나는 항목을 모두 적습니다.\n정답 이미지를 다시 공개하고, 일치하는 항목 수만큼 점수를 얻습니다.",
    },
    {
      title: "우승",
      content: "모든 라운드가 끝난 후 점수가 가장 높은 팀이 우승합니다.",
    },
  ],
  materials: [
    {
      name: "종이 + 펜",
      quantity: "팀당 1세트",
      isOptional: false,
    },
  ],
  bibleConnections: [
    {
      verseReference: "잠언 4:23",
      verseText:
        "모든 지킬 만한 것 중에 더욱 네 마음을 지키라 생명의 근원이 이에서 남이니라",
      messageSummary:
        "순간을 포착하려면 온 마음을 집중해야 하듯, 하나님은 우리 마음이 가장 중요한 것을 바라보길 원하십니다. 무엇을 보고 기억하느냐가 우리의 생각과 삶을 만들어갑니다.",
    },
  ],
  variations: [
    {
      condition: "감점제",
      suggestion:
        "정답에 없는 항목을 적으면 1점 감점합니다. 무조건 많이 적는 전략이 통하지 않아 신중함이 요구됩니다.",
    },
    {
      condition: "성경 주제 특집",
      suggestion:
        "성경 인물, 장소, 사건 등 신앙 주제 이미지로만 구성합니다. 정답 공개 후 해당 주제의 말씀을 간단히 나눠도 좋습니다.",
    },
    {
      condition: "소규모 개인전",
      suggestion:
        "팀전 대신 개인전으로 진행합니다. 누적 점수로 순위를 매깁니다.",
    },
  ],
  safetyNotes: [
    "3초 타이머를 정확히 지켜야 공정합니다. 스톱워치나 PPT 타이머 활용을 권장합니다.",
    "항목을 적는 시간 제한을 사전에 정해두세요. 30초~1분이 적당합니다.",
  ],
  assets: [
    {
      fileName: "진행 자료",
      fileType: "pptx",
      storagePath: "/downloads/games/flash-memory/rules.pptx",
    },
    {
      fileName: "진행 자료",
      fileType: "pdf",
      storagePath: "/downloads/games/flash-memory/rules.pdf",
    },
  ],
};

export default flashMemory;
