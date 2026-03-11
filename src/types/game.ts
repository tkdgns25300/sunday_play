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

export type GameStep = {
  title: string;
  content: string;
  scriptKo?: string;
  scriptEn?: string;
};

export type GameMaterial = {
  name: string;
  quantity: string;
  isOptional: boolean;
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
  biblicalThemes: string[];
  durationMinutes: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  steps: GameStep[];
  materials: GameMaterial[];
  bibleConnections: BibleConnection[];
  variations: GameVariation[];
  assets: GameAsset[];
};
