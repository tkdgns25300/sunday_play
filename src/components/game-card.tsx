import Link from "next/link";
import { Game, GroupSize } from "@/types/game";

const GROUP_SIZE_RANGE: Record<GroupSize, { min: number; max: number | null }> = {
  xs: { min: 1, max: 5 },
  sm: { min: 5, max: 10 },
  md: { min: 10, max: 30 },
  lg: { min: 30, max: null },
};

const ALL_SIZES: GroupSize[] = ["xs", "sm", "md", "lg"];

function getGroupSizeSummary(sizes: GroupSize[]): string {
  if (sizes.length === ALL_SIZES.length) return "인원 무관";

  const sorted = ALL_SIZES.filter((s) => sizes.includes(s));
  const min = GROUP_SIZE_RANGE[sorted[0]].min;
  const last = sorted[sorted.length - 1];
  const max = GROUP_SIZE_RANGE[last].max;

  if (max === null) return `${min}명 이상`;
  if (min === max || sorted.length === 1) {
    const range = GROUP_SIZE_RANGE[sorted[0]];
    return range.max === null ? `${range.min}명 이상` : `${range.min}~${range.max}명`;
  }
  return `${min}~${max}명`;
}

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {
  const groupSizeLabel = getGroupSizeSummary(game.groupSizes);

  return (
    <Link href={`/games/${game.id}`}>
      <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
        <div className="aspect-[16/10] overflow-hidden bg-muted">
          {game.thumbnailUrl ? (
            <img
              src={game.thumbnailUrl}
              alt={game.title}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-primary/5 text-4xl">
              🎮
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <h3 className="text-base font-semibold group-hover:text-primary">
            {game.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {game.summary}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1" title="소요 시간">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {game.durationMinutes}분
            </span>
            <span className="flex items-center gap-1" title="인원">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              {groupSizeLabel}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
