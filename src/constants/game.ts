import { AgeGroup, Environment, PrepTime, GroupSize, CharacterQuality } from "@/types/game";

export const AGE_GROUP_OPTIONS: { value: AgeGroup; label: string }[] = [
  { value: "영아부", label: "영아부" },
  { value: "유치부", label: "유치부" },
  { value: "유년부", label: "유년부" },
  { value: "초등부", label: "초등부" },
  { value: "중고등부", label: "중고등부" },
  { value: "청년부", label: "청년부" },
  { value: "장년부", label: "장년부" },
];

export const ENVIRONMENT_OPTIONS: { value: Environment; label: string }[] = [
  { value: "실내교실", label: "실내(교실)" },
  { value: "실내강당", label: "실내(강당)" },
  { value: "야외", label: "야외" },
  { value: "온라인", label: "온라인" },
];

export const PREP_TIME_OPTIONS: { value: PrepTime; label: string }[] = [
  { value: "none", label: "준비물 없음" },
  { value: "quick", label: "5분 내 준비" },
  { value: "advance", label: "사전 준비" },
];

export const GROUP_SIZE_OPTIONS: { value: GroupSize; label: string }[] = [
  { value: "xs", label: "5명 미만" },
  { value: "sm", label: "5~10명" },
  { value: "md", label: "10~30명" },
  { value: "lg", label: "30명 이상" },
];

export const ENERGY_LEVEL_LABELS: Record<number, string> = {
  1: "매우 정적",
  2: "정적",
  3: "보통",
  4: "활동적",
  5: "매우 활동적",
};

export const DIFFICULTY_LABELS: Record<number, string> = {
  1: "매우 쉬움",
  2: "쉬움",
  3: "보통",
  4: "어려움",
  5: "매우 어려움",
};

export const CHARACTER_QUALITIES: CharacterQuality[] = [
  "감사", "검약", "겸손", "경각심", "경청",
  "공경", "과단성", "근면", "긍휼", "기쁨",
  "끈기", "담대함", "덕성", "만족", "민감성",
  "믿음", "베풂", "분별력", "설득력", "솔선",
  "순종", "시간엄수", "신뢰성", "신실", "신중",
  "안정", "열성", "온유", "온화함", "용서",
  "유연성", "유용성", "의지력", "인내", "자원선용",
  "절제", "정돈", "정의", "조심성", "존중",
  "지혜", "진실성", "창의성", "책임감", "철저함",
  "충성", "포용", "환대", "후함",
];
