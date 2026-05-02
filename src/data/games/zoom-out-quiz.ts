import { Game } from "@/types/game";

const zoomOutQuiz: Game = {
  id: "zoom-out-quiz",
  title: "줌아웃 퀴즈",
  summary: "크게 확대된 사진을 단계적으로 줌아웃하며 정체를 맞히는 관찰력 퀴즈 게임",
  description:
    "확대된 사진의 일부분에서 시작해 3단계에 걸쳐 점점 줌아웃하는 퀴즈입니다. 일찍 맞힐수록 높은 점수를 얻으며, 팀원이 함께 추리하는 과정에서 웃음과 집중이 넘칩니다.",
  thumbnailUrl: "/images/games/zoom-out-quiz.png",
  ageGroups: ["유년부", "초등부", "중고등부", "청년부", "장년부"],
  energyLevel: 2,
  environments: ["실내교실", "실내강당"],
  prepTime: "quick",
  groupSizes: ["sm", "md", "lg"],
  characterQualities: ["분별력", "민감성", "지혜"],
  durationMinutes: 15,
  difficulty: 2,
  requiredStaff: { min: 1, recommended: 1 },
  steps: [
    {
      title: "준비",
      content: "팀을 나눕니다.",
    },
    {
      title: "줌아웃",
      content:
        "사진을 3단계에 걸쳐 점점 줌아웃하며 보여줍니다.\n각 단계마다 팀당 정답 기회는 1번으로, \"정답!\"을 먼저 외친 팀이 답합니다.\n• 1단계(가장 확대) 정답 → 3점\n• 2단계 정답 → 2점\n• 3단계 정답 → 1점\n3단계까지 못 맞히면 전체 사진을 공개합니다.",
    },
    {
      title: "우승",
      content:
        "모든 라운드가 끝난 후 점수가 가장 높은 팀이 우승합니다.",
    },
  ],
  materials: [],
  bibleConnections: [
    {
      verseReference: "고린도전서 13:12",
      verseText:
        "우리가 지금은 거울로 보는 것 같이 희미하나 그 때에는 얼굴과 얼굴을 대하여 볼 것이요 지금은 내가 부분적으로 아나 그 때에는 주께서 나를 아신 것 같이 내가 온전히 알리라",
      messageSummary:
        "흐릿하게 확대된 사진도 줌아웃하면 전체가 보이듯, 우리 삶도 지금은 일부분만 보일 때가 있어요. 하지만 하나님은 처음부터 우리의 전체를 보고 계세요. 답이 보이지 않는 순간에도, 하나님의 큰 그림을 신뢰하는 것이 믿음입니다.",
    },
  ],
  variations: [
    {
      condition: "팀 구호 방식",
      suggestion:
        "\"정답!\" 대신 각 팀의 구호(예: \"불꽃팀!\", \"독수리팀!\")를 외쳐 팀을 구분합니다. 팀 정체성이 살아나고 응원 분위기가 더 활기차집니다.",
    },
    {
      condition: "소규모 (10명 이하)",
      suggestion:
        "팀전 대신 개인전으로 진행합니다. 누적 점수로 순위를 매깁니다.",
    },
    {
      condition: "영적 메시지 강조",
      suggestion:
        "성경 인물, 성경 속 장소 등 신앙 주제 사진으로만 구성합니다. 정답 공개 후 관련 말씀을 간단히 나눠도 좋습니다.",
    },
    {
      condition: "힌트 추가 (저학년)",
      suggestion:
        "각 단계에서 텍스트 힌트를 함께 제공합니다. 유년부·초등 저학년도 쉽게 참여할 수 있습니다.",
    },
  ],
  safetyNotes: [
    "정답을 외칠 때 소리가 커질 수 있으므로 시작 전 볼륨 규칙을 정하세요.",
  ],
  tips: [
    "프로젝터 화면이 모든 팀에게 균등하게 잘 보이는지 사전에 확인하세요.",
  ],
  previewPages: [1, 2, 9, 10, 11, 12],
  assets: [
    {
      fileName: "진행 자료",
      fileType: "pptx",
      storagePath: "/downloads/games/zoom-out-quiz/rules.pptx",
    },
    {
      fileName: "진행 자료",
      fileType: "pdf",
      storagePath: "/downloads/games/zoom-out-quiz/rules.pdf",
    },
    {
      fileName: "진행 자료",
      fileType: "zip",
      storagePath: "/downloads/games/zoom-out-quiz/slides.zip",
    },
  ],
  creditPrice: 1500,
};

export default zoomOutQuiz;
