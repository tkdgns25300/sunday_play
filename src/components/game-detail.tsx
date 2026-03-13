import Link from "next/link";
import { Game } from "@/types/game";
import {
  ENERGY_LEVEL_LABELS,
  DIFFICULTY_LABELS,
  PREP_TIME_OPTIONS,
  GROUP_SIZE_OPTIONS,
} from "@/constants/game";
import { FREE_MONTHLY_VIEW_LIMIT } from "@/constants/subscription";
import Paywall from "@/components/paywall";

type AccessLevel = "full" | "login_required" | "limit_reached" | "loading";

type GameDetailProps = {
  game: Game;
  accessLevel?: AccessLevel;
  viewCount?: number;
};

export default function GameDetail({
  game,
  accessLevel = "full",
  viewCount,
}: GameDetailProps) {
  const prepTimeLabel =
    PREP_TIME_OPTIONS.find((o) => o.value === game.prepTime)?.label ?? "";
  const groupSizeLabels = game.groupSizes
    .map((s) => GROUP_SIZE_OPTIONS.find((o) => o.value === s)?.label)
    .filter(Boolean)
    .join(", ");

  const isLocked = accessLevel === "login_required" || accessLevel === "limit_reached";
  const isLoading = accessLevel === "loading";

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          href="/games"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6" />
          </svg>
          게임 목록으로
        </Link>
      </div>

      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-1.5">
          {game.ageGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {group}
            </span>
          ))}
          {game.environments.map((env) => (
            <span
              key={env}
              className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {env}
            </span>
          ))}
        </div>

        <h1 className="text-3xl font-bold">{game.title}</h1>
        <p className="text-muted-foreground">{game.description}</p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <MetaItem label="소요 시간" value={`${game.durationMinutes}분`} />
          <MetaItem label="활동성" value={ENERGY_LEVEL_LABELS[game.energyLevel]} />
          <MetaItem label="난이도" value={DIFFICULTY_LABELS[game.difficulty]} />
          <MetaItem label="인원" value={groupSizeLabels} />
          <MetaItem label="준비" value={prepTimeLabel} />
          <MetaItem
            label="심판"
            value={
              game.requiredStaff.min === game.requiredStaff.recommended
                ? `${game.requiredStaff.min}명`
                : `${game.requiredStaff.min}~${game.requiredStaff.recommended}명`
            }
          />
        </div>

        {accessLevel === "full" && viewCount !== undefined && viewCount > 0 && (
          <p className="text-xs text-muted-foreground">
            이번 달 무료 열람 {viewCount}/{FREE_MONTHLY_VIEW_LIMIT}
          </p>
        )}
      </section>

      {game.bibleConnections.length > 0 && (
        <section className="flex flex-col gap-3">
          <SectionTitle>말씀 연결</SectionTitle>
          <div className="flex flex-col gap-4">
            {game.bibleConnections.map((connection, index) => (
              <div
                key={index}
                className="rounded-xl border border-primary/20 bg-primary/5 p-4"
              >
                <p className="text-xs font-medium text-primary">
                  {connection.verseReference}
                </p>
                <blockquote className="mt-2 border-l-2 border-primary/30 pl-3 text-sm italic text-foreground">
                  {connection.verseText}
                </blockquote>
                <p className="mt-3 text-sm text-muted-foreground">
                  {connection.messageSummary}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {isLoading && (
        <div className="flex flex-col gap-3">
          <div className="h-6 w-20 animate-pulse rounded bg-muted" />
          <div className="h-32 animate-pulse rounded-xl bg-muted" />
        </div>
      )}

      {isLocked && (
        <Paywall
          type={accessLevel === "login_required" ? "login" : "subscribe"}
          viewCount={viewCount}
        />
      )}

      {accessLevel === "full" && (
        <>
          {game.materials.length > 0 && (
            <section className="flex flex-col gap-3">
              <SectionTitle>준비물</SectionTitle>
              <ul className="grid gap-2 sm:grid-cols-2">
                {game.materials.map((material) => (
                  <li
                    key={material.name}
                    className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-primary">
                      <path d="m7.5 4.27 9 5.15" />
                      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                      <path d="m3.3 7 8.7 5 8.7-5" />
                      <path d="M12 22V12" />
                    </svg>
                    <span className="flex-1">
                      {material.name}
                      {material.quantity && (
                        <span className="ml-1 text-muted-foreground">
                          ({material.quantity})
                        </span>
                      )}
                    </span>
                    {material.isOptional && (
                      <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                        선택
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="flex flex-col gap-3">
            <SectionTitle>진행 방법</SectionTitle>
            <ol className="flex flex-col gap-4">
              {game.steps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  <div className="flex flex-1 flex-col gap-1 pt-1">
                    <h4 className="font-semibold">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.content}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {game.variations.length > 0 && (
            <section className="flex flex-col gap-3">
              <SectionTitle>변형 팁</SectionTitle>
              <div className="flex flex-col gap-3">
                {game.variations.map((variation, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-border bg-muted/30 p-4"
                  >
                    <p className="text-sm font-medium">{variation.condition}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {variation.suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold">{children}</h2>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-muted-foreground/70">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}
