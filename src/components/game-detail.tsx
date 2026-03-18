import Link from "next/link";
import { Game, GroupSize } from "@/types/game";
import {
  ENERGY_LEVEL_LABELS,
  DIFFICULTY_LABELS,
  PREP_TIME_OPTIONS,
} from "@/constants/game";
import { FREE_MONTHLY_VIEW_LIMIT } from "@/constants/subscription";
import Paywall from "@/components/paywall";

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
  const groupSizeLabel = getGroupSizeSummary(game.groupSizes);

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

      {game.thumbnailUrl && (
        <div className="overflow-hidden rounded-xl">
          <img
            src={game.thumbnailUrl}
            alt={game.title}
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
              className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700"
            >
              {quality}
            </span>
          ))}
        </div>

        <h1 className="text-3xl font-bold">{game.title}</h1>
        <p className="text-muted-foreground">{game.description}</p>

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

        {accessLevel === "full" && viewCount !== undefined && viewCount > 0 && (
          <p className="text-xs text-muted-foreground">
            이번 달 무료 열람 {viewCount}/{FREE_MONTHLY_VIEW_LIMIT}
          </p>
        )}
      </section>

      <DownloadsSection game={game} accessLevel={accessLevel} />

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
                      {material.purchaseUrl && (
                        <a
                          href={material.purchaseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                          구매
                        </a>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

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

function DownloadCard({ href, name, type }: { href: string; name: string; type: string }) {
  return (
    <a
      href={href}
      download
      className="flex flex-col items-center gap-2 rounded-lg border border-amber-200 bg-background px-3 py-3 text-center transition-colors hover:bg-amber-50"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
      <span className="text-xs font-medium leading-tight">{name}</span>
      <span className="text-[10px] text-muted-foreground uppercase">{type}</span>
    </a>
  );
}

function DownloadsSection({ game, accessLevel }: { game: Game; accessLevel: AccessLevel }) {
  const downloadMaterials = game.materials.filter((m) => m.downloadPath);
  const hasDownloads = game.assets.length > 0 || downloadMaterials.length > 0;

  if (!hasDownloads) return null;

  const isUnlocked = accessLevel === "full";

  return (
    <section className="flex flex-col gap-3 rounded-xl border-2 border-amber-300/50 bg-amber-50 p-4 lg:p-5">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-bold lg:text-lg">진행 자료</h2>
        <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-medium text-white">
          프리미엄
        </span>
      </div>

      {isUnlocked ? (
        <div className="grid grid-cols-3 gap-2">
          {game.assets.map((asset) => (
            <DownloadCard
              key={asset.fileName}
              href={asset.storagePath}
              name={asset.fileName}
              type={asset.fileType}
            />
          ))}
          {downloadMaterials.map((material) => (
            <DownloadCard
              key={material.name}
              href={material.downloadPath!}
              name={material.name}
              type="pdf"
            />
          ))}
        </div>
      ) : (
        <div className="relative min-h-48">
          <div className="grid w-full grid-cols-3 gap-2 opacity-30 blur-[2px]">
            {game.assets.map((asset) => (
              <DownloadCard
                key={asset.fileName}
                href="#"
                name={asset.fileName}
                type={asset.fileType}
              />
            ))}
            {downloadMaterials.map((material) => (
              <DownloadCard
                key={material.name}
                href="#"
                name={material.name}
                type="pdf"
              />
            ))}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <p className="text-sm font-medium">
              프리미엄 구독으로 진행 자료를 다운로드하세요
            </p>
            <p className="text-xs text-muted-foreground">
              PPT, 대본 스크립트, 활동지 등 모든 자료 무제한 이용
            </p>
            <Link
              href="/pricing"
              className="mt-1 rounded-full bg-amber-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600"
            >
              ₩5,000/월 구독하기
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

