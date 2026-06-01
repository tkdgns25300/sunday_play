import { readdirSync, renameSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const GAMES_DIR = join(process.cwd(), "public", "downloads", "games");
const PNG_QUALITY = 85;
const COMPRESSION_LEVEL = 9;

async function compressFile(filePath) {
  const tempPath = `${filePath}.tmp`;
  const before = statSync(filePath).size;

  await sharp(filePath)
    .png({ quality: PNG_QUALITY, compressionLevel: COMPRESSION_LEVEL, palette: true })
    .toFile(tempPath);

  const after = statSync(tempPath).size;
  if (after < before) {
    renameSync(tempPath, filePath);
    return { before, after, replaced: true };
  }
  unlinkSync(tempPath);
  return { before, after: before, replaced: false };
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
}

async function main() {
  const gameIds = readdirSync(GAMES_DIR);
  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;
  let replaced = 0;

  for (const gameId of gameIds) {
    const previewDir = join(GAMES_DIR, gameId, "preview");
    let files;
    try {
      files = readdirSync(previewDir).filter((name) => name.endsWith(".png"));
    } catch {
      continue;
    }

    for (const file of files) {
      const result = await compressFile(join(previewDir, file));
      totalBefore += result.before;
      totalAfter += result.after;
      processed += 1;
      if (result.replaced) replaced += 1;

      if (processed % 100 === 0) {
        const saved = totalBefore - totalAfter;
        const pct = totalBefore > 0 ? (saved / totalBefore * 100).toFixed(1) : "0";
        console.log(`  ${processed} files... saved ${formatBytes(saved)} (${pct}%)`);
      }
    }
  }

  const saved = totalBefore - totalAfter;
  const pct = totalBefore > 0 ? (saved / totalBefore * 100).toFixed(1) : "0";
  console.log(`\n✓ Compressed ${replaced}/${processed} files`);
  console.log(`  Before: ${formatBytes(totalBefore)}`);
  console.log(`  After:  ${formatBytes(totalAfter)}`);
  console.log(`  Saved:  ${formatBytes(saved)} (${pct}%)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
