import Link from "next/link";
import Image from "next/image";
import { Game, GroupSize } from "@/types/game";
import {
  ENERGY_LEVEL_LABELS,
  DIFFICULTY_LABELS,
  PREP_TIME_OPTIONS,
} from "@/constants/game";
import Paywall from "@/components/paywall";
import ShareButton from "@/components/share-button";
import DownloadsSection from "@/components/downloads-section";
import TimerGame from "@/components/timer-game";
import PhotoStopGame from "@/components/photo-stop-game";

const ExternalLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" x2="21" y1="14" y2="3" />
  </svg>
);

const PurchaseLink = ({ label, url }: { label: string; url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
  >
    {label}
    <ExternalLinkIcon />
  </a>
);

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

type AccessLevel = "full" | "login_required" | "loading";

type GameDetailProps = {
  game: Game;
  accessLevel?: AccessLevel;
};

export default function GameDetail({
  game,
  accessLevel = "full",
}: GameDetailProps) {
  const prepTimeLabel =
    PREP_TIME_OPTIONS.find((o) => o.value === game.prepTime)?.label ?? "";
  const groupSizeLabel = getGroupSizeSummary(game.groupSizes);

  const isLocked = accessLevel === "login_required";
  const isLoading = accessLevel === "loading";

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6" />
          </svg>
          게임 목록으로
        </Link>
      </div>

      {game.thumbnailUrl && (
        <div className="overflow-hidden rounded-xl">
          <Image
            src={game.thumbnailUrl}
            alt={game.title}
            width={1200}
            height={750}
            sizes="(max-width: 768px) 100vw, 768px"
            priority
            className="w-full object-cover"
          />
        </div>
      )}

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
          {game.characterQualities.map((quality) => (
            <span
              key={quality}
              className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
            >
              {quality}
            </span>
          ))}
        </div>

        <h1 className="text-3xl font-bold">{game.title}</h1>
        <p className="max-w-2xl whitespace-pre-line leading-relaxed text-muted-foreground">
          {game.description.replace(/\. /g, ".\n")}
        </p>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          <MetaCard label="소요 시간" value={`${game.durationMinutes}분`} />
          <MetaCard label="인원" value={groupSizeLabel} />
          <MetaCard label="활동성" value={ENERGY_LEVEL_LABELS[game.energyLevel]} />
          <MetaCard label="난이도" value={DIFFICULTY_LABELS[game.difficulty]} />
          <MetaCard label="준비" value={prepTimeLabel} />
          <MetaCard
            label="심판"
            value={
              game.requiredStaff.min === game.requiredStaff.recommended
                ? `${game.requiredStaff.min}명`
                : `${game.requiredStaff.min}~${game.requiredStaff.recommended}명`
            }
          />
        </div>

      </section>

      <ShareButton />

      {isLoading && (
        <div className="flex flex-col gap-3">
          <div className="h-6 w-20 animate-pulse rounded bg-muted" />
          <div className="h-32 animate-pulse rounded-xl bg-muted" />
        </div>
      )}

      {isLocked && (
        <>
          <Paywall
            type="login"
          />
          <DownloadsSection game={game} />
        </>
      )}

      {accessLevel === "full" && (
        <>
          <DownloadsSection game={game} />

          {game.id === "time-match" && (
            <section className="flex flex-col gap-3">
              <SectionTitle>게임 플레이</SectionTitle>
              <TimerGame />
            </section>
          )}

          {game.id === "photo-stop" && (
            <section className="flex flex-col gap-3">
              <SectionTitle>게임 플레이</SectionTitle>
              <PhotoStopGame />
            </section>
          )}

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
                    <span className="flex items-center gap-1.5">
                      {material.isOptional && (
                        <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                          선택
                        </span>
                      )}
                      {material.purchaseUrls
                        ? material.purchaseUrls.map(({ label, url }) => (
                            <PurchaseLink key={label} label={label} url={url} />
                          ))
                        : material.purchaseUrl && (
                            <PurchaseLink label="구매하기" url={material.purchaseUrl} />
                          )}
                    </span>
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
                    <p className="whitespace-pre-line text-sm text-muted-foreground">{step.content}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {game.tips && game.tips.length > 0 && (
            <section className="flex flex-col gap-3">
              <SectionTitle>진행 팁</SectionTitle>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800/50 dark:bg-amber-900/20">
                <ul className="flex flex-col gap-2">
                  {game.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-amber-500">
                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                      </svg>
                      {tip}
                    </li>
                  ))}
                </ul>
                {game.referenceVideoUrl && (
                  <a
                    href={game.referenceVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-200 dark:bg-amber-800/40 dark:text-amber-300 dark:hover:bg-amber-800/60"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.8 5 12 5 12 5s-4.8 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.2.8C6.8 19 12 19 12 19s4.8 0 7-.1c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8z" />
                      <polygon fill="white" points="10,8.5 16,12 10,15.5" />
                    </svg>
                    참고 영상 보기
                  </a>
                )}
              </div>
            </section>
          )}

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

          {game.variations.length > 0 && (
            <section className="flex flex-col gap-3">
              <SectionTitle>응용 아이디어</SectionTitle>
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

          {game.safetyNotes.length > 0 && (
            <div className="flex flex-col gap-2">
              {game.safetyNotes.map((note, index) => (
                <div key={index} className="flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground/70">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-yellow-400">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>
                  {note}
                </div>
              ))}
            </div>
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

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border px-3 py-2">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}


