import Link from "next/link";
import { Game } from "@/types/game";
import { ENERGY_LEVEL_LABELS } from "@/constants/game";

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {
  const hasMaterials = game.materials.length > 0;

  return (
    <Link href={`/games/${game.id}`}>
      <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
        <div className="aspect-[16/10] bg-muted">
          {game.thumbnailUrl ? (
            <div className="flex size-full items-center justify-center bg-primary/5 text-4xl">
              🎮
            </div>
          ) : (
            <div className="flex size-full items-center justify-center bg-primary/5 text-4xl">
              🎮
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex flex-wrap gap-1.5">
            {game.ageGroups.slice(0, 3).map((group) => (
              <span
                key={group}
                className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
              >
                {group}
              </span>
            ))}
            {game.ageGroups.length > 3 && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                +{game.ageGroups.length - 3}
              </span>
            )}
          </div>

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
            <span className="flex items-center gap-1" title="활동성">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              {ENERGY_LEVEL_LABELS[game.energyLevel]}
            </span>
            {hasMaterials && (
              <span className="flex items-center gap-1" title="준비물 필요">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m7.5 4.27 9 5.15" />
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
                준비물
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
