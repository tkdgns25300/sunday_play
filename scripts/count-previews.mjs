import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const GAMES_DIR = join(process.cwd(), "public", "downloads", "games");
const OUTPUT_FILE = join(process.cwd(), "src", "data", "preview-counts.ts");

function collectCounts() {
  const counts = {};
  for (const gameId of readdirSync(GAMES_DIR)) {
    try {
      const files = readdirSync(join(GAMES_DIR, gameId, "preview"));
      const pngs = files.filter((name) => name.endsWith(".png"));
      if (pngs.length > 0) counts[gameId] = pngs.length;
    } catch {
      // preview 폴더 없는 게임은 스킵
    }
  }
  return counts;
}

function generate() {
  const counts = collectCounts();
  const sorted = Object.fromEntries(Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)));

  const content = `// 자동 생성된 파일입니다. 수정하지 마세요.
// scripts/count-previews.mjs 가 빌드 전(prebuild) 자동 갱신합니다.

export const PREVIEW_COUNTS: Record<string, number> = ${JSON.stringify(sorted, null, 2)};
`;

  writeFileSync(OUTPUT_FILE, content);
  console.log(`✓ Generated ${OUTPUT_FILE} (${Object.keys(sorted).length} games)`);
}

generate();
