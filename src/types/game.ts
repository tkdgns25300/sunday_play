export type AgeGroup =
  | "영아부"
  | "유치부"
  | "유년부"
  | "초등부"
  | "중고등부"
  | "청년부"
  | "장년부";

export type Environment = "실내교실" | "실내강당" | "야외" | "온라인";

export type PrepTime = "none" | "quick" | "advance";

export type GroupSize = "xs" | "sm" | "md" | "lg";

export type CharacterQuality =
  | "감사" | "검약" | "겸손" | "경각심" | "경청"
  | "공경" | "과단성" | "근면" | "긍휼" | "기쁨"
  | "끈기" | "담대함" | "덕성" | "만족" | "민감성"
  | "믿음" | "베풂" | "분별력" | "설득력" | "솔선"
  | "순종" | "시간엄수" | "신뢰성" | "신실" | "신중"
  | "안정" | "열성" | "온유" | "온화함" | "용서"
  | "유연성" | "유용성" | "의지력" | "인내" | "자원선용"
  | "절제" | "정돈" | "정의" | "조심성" | "존중"
  | "지혜" | "진실성" | "창의성" | "책임감" | "철저함"
  | "충성" | "포용" | "환대" | "후함";

export type GameStep = {
  title: string;
  content: string;
};

export type GameMaterial = {
  name: string;
  quantity: string;
  isOptional: boolean;
  purchaseUrl?: string;
  downloadPath?: string;
};

export type BibleConnection = {
  verseReference: string;
  verseText: string;
  messageSummary: string;
};

export type GameVariation = {
  condition: string;
  suggestion: string;
};

export type GameAsset = {
  fileName: string;
  fileType: "ppt" | "pdf" | "image";
  storagePath: string;
};

export type Game = {
  id: string;
  title: string;
  summary: string;
  description: string;
  thumbnailUrl: string;
  ageGroups: AgeGroup[];
  energyLevel: 1 | 2 | 3 | 4 | 5;
  environments: Environment[];
  prepTime: PrepTime;
  groupSizes: GroupSize[];
  characterQualities: CharacterQuality[];
  durationMinutes: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  requiredStaff: { min: number; recommended: number };
  steps: GameStep[];
  materials: GameMaterial[];
  bibleConnections: BibleConnection[];
  variations: GameVariation[];
  safetyNotes: string[];
  assets: GameAsset[];
};
