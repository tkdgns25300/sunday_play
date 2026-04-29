"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Game, GameAsset } from "@/types/game";
import { createClient } from "@/lib/supabase/client";
import { hasPurchasedGame, getCreditBalance } from "@/lib/credit";
import { CREDIT_PRICE_LABELS } from "@/constants/credit";

type AssetGroup = {
  name: string;
  variants: GameAsset[];
};

function groupAssets(assets: GameAsset[]): AssetGroup[] {
  const map = new Map<string, GameAsset[]>();
  for (const asset of assets) {
    const existing = map.get(asset.fileName) ?? [];
    existing.push(asset);
    map.set(asset.fileName, existing);
  }
  return Array.from(map.entries()).map(([name, variants]) => ({ name, variants }));
}

export default function DownloadsSection({ game }: { game: Game }) {
  const [isPurchased, setIsPurchased] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [creditBalance, setCreditBalance] = useState(0);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      setIsLoggedIn(true);
      const purchased = await hasPurchasedGame(supabase, user.id, game.id);
      setIsPurchased(purchased);
      const balance = await getCreditBalance(supabase, user.id);
      setCreditBalance(balance);
    }
    load();
  }, [game.id]);

  if (game.assets.length === 0) return null;

  const groups = groupAssets(game.assets);
  const [downloadingPath, setDownloadingPath] = useState<string | null>(null);

  async function handlePurchase() {
    setIsPurchasing(true);
    try {
      const response = await fetch("/api/credit/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameId: game.id,
          creditPrice: game.creditPrice,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setIsPurchased(true);
        const newBalance = creditBalance - game.creditPrice;
        setCreditBalance(newBalance);
        window.dispatchEvent(new CustomEvent("credit-change", { detail: newBalance }));
      } else {
        alert(result.message);
      }
    } finally {
      setIsPurchasing(false);
    }
  }

  async function handleDownload(fileName: string, filePath: string) {
    setDownloadingPath(filePath);

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: game.id, fileName, filePath }),
      });

      const result = await response.json();

      if (result.success) {
        const ext = filePath.split(".").pop() ?? "";
        const downloadName = `[Sunday Play] ${game.title}.${ext}`;
        const link = document.createElement("a");
        link.href = result.filePath;
        link.download = downloadName;
        link.click();
      } else {
        alert(result.message);
      }
    } finally {
      setDownloadingPath(null);
    }
  }

  const priceLabel = CREDIT_PRICE_LABELS[game.creditPrice] ?? String(game.creditPrice);

  return (
    <section className="flex flex-col gap-3 rounded-xl border-2 border-amber-300/50 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-950/30 lg:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold lg:text-lg">진행 자료</h2>
          {isPurchased ? (
            <span className="rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-medium text-white">
              구매 완료
            </span>
          ) : (
            <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-medium text-white">
              {priceLabel} 크레딧
            </span>
          )}
        </div>
        {isLoggedIn && (
          <span className="text-xs text-muted-foreground">
            보유 {creditBalance.toLocaleString()} 크레딧
          </span>
        )}
      </div>

      {isPurchased ? (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
            {groups.map((group) => (
              <AssetCard
                key={group.name}
                group={group}
                gameId={game.id}
                previewPages={game.previewPages}
                canDownload
                downloadingPath={downloadingPath}
                onDownload={handleDownload}
              />
            ))}
          </div>
          <AssetNotes assets={game.assets} />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-2 text-center">
          <PreviewButton gameId={game.id} previewPages={game.previewPages} />
          {isLoggedIn ? (
            creditBalance >= game.creditPrice ? (
              <button
                onClick={handlePurchase}
                disabled={isPurchasing}
                className="rounded-full bg-amber-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
              >
                {isPurchasing ? "구매 중..." : `${priceLabel} 크레딧으로 구매`}
              </button>
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                <p className="text-xs text-muted-foreground">
                  크레딧이 부족합니다 (보유: {creditBalance.toLocaleString()})
                </p>
                <Link
                  href="/pricing"
                  className="rounded-full bg-amber-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600"
                >
                  크레딧 충전하기
                </Link>
              </div>
            )
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-amber-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600"
            >
              로그인하고 구매하기
            </Link>
          )}
        </div>
      )}
    </section>
  );
}

function AssetCard({
  group,
  gameId,
  previewPages,
  canDownload,
  downloadingPath,
  onDownload,
}: {
  group: AssetGroup;
  gameId: string;
  previewPages?: number[];
  canDownload: boolean;
  downloadingPath: string | null;
  onDownload: (fileName: string, filePath: string) => void;
}) {
  const isSingle = group.variants.length === 1;

  if (isSingle) {
    const asset = group.variants[0];
    const isLoading = downloadingPath === asset.storagePath;
    return (
      <button
        onClick={() => onDownload(asset.fileName, asset.storagePath)}
        disabled={!canDownload || isLoading}
        className="group flex items-center gap-3 rounded-xl border border-amber-200 bg-background px-4 py-3 text-left transition-all hover:border-amber-300 hover:shadow-sm disabled:opacity-50 dark:border-amber-500/30 dark:hover:border-amber-500/50"
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 transition-colors group-hover:bg-amber-200 dark:bg-amber-900/50 dark:group-hover:bg-amber-900/70">
          {isLoading ? <Spinner /> : <DownloadIcon />}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">{asset.fileName}</span>
          <span className="text-[11px] text-muted-foreground uppercase">
            {isLoading ? "다운로드 중..." : asset.fileType}
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-background px-4 py-3 dark:border-amber-500/30">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/50">
        <DownloadIcon />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{group.name}</span>
        <div className="flex flex-wrap gap-1.5">
          {group.variants.map((asset) => {
            const isLoading = downloadingPath === asset.storagePath;
            return (
              <button
                key={asset.fileType}
                onClick={() => onDownload(asset.fileName, asset.storagePath)}
                disabled={!canDownload || isLoading}
                className="flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-medium uppercase text-amber-700 transition-all hover:border-amber-400 hover:bg-amber-100 disabled:opacity-50 dark:border-amber-500/30 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:border-amber-500/50 dark:hover:bg-amber-900/50"
              >
                {isLoading && <Spinner size={12} />}
                {isLoading ? "다운로드 중..." : asset.fileType}
              </button>
            );
          })}
          {group.name === "진행 자료" && <PreviewButton gameId={gameId} previewPages={previewPages} />}
        </div>
      </div>
    </div>
  );
}

function PreviewButton({ gameId, previewPages }: { gameId: string; previewPages?: number[] }) {
  const [previewPaths, setPreviewPaths] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (previewPages) {
      setPreviewPaths(previewPages.map((p) => `/downloads/games/${gameId}/preview/${p}.png`));
      return;
    }
    async function findAll() {
      const paths: string[] = [];
      for (let i = 1; i <= 200; i++) {
        const path = `/downloads/games/${gameId}/preview/${i}.png`;
        try {
          const res = await fetch(path, { method: "HEAD" });
          if (res.ok) paths.push(path);
          else break;
        } catch {
          break;
        }
      }
      setPreviewPaths(paths);
    }
    findAll();
  }, [gameId, previewPages]);

  if (previewPaths.length === 0) return null;

  return (
    <>
      <button
        onClick={() => { setCurrentIndex(0); setIsOpen(true); }}
        className="flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700 transition-all hover:border-amber-400 hover:bg-amber-100 dark:border-amber-500/30 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:border-amber-500/50 dark:hover:bg-amber-900/50"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        미리보기
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative flex w-full max-w-3xl flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-white">
              <span className="text-sm font-medium">
                {currentIndex + 1} / {previewPaths.length}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="flex size-8 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="relative select-none">
              <Image
                src={previewPaths[currentIndex]}
                alt={`미리보기 ${currentIndex + 1}`}
                width={1200}
                height={675}
                className="w-full rounded-lg"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-lg"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 80px,
                    rgba(0,0,0,0.03) 80px,
                    rgba(0,0,0,0.03) 81px
                  )`,
                }}
              >
                <div className="grid grid-cols-3 grid-rows-5 gap-x-6 gap-y-3 -rotate-30 scale-[2]">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <span
                      key={i}
                      className="whitespace-nowrap text-xl font-extrabold tracking-[0.2em] text-black/[0.15] sm:text-2xl"
                    >
                      PREVIEW
                    </span>
                  ))}
                </div>
              </div>

              {currentIndex > 0 && (
                <button
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                  className="absolute left-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
              )}

              {currentIndex < previewPaths.length - 1 && (
                <button
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="absolute right-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              )}
            </div>

            <p className="text-center text-sm font-medium text-amber-400">
              미리보기 일부만 표시됩니다. 전체 자료는 구매 후 다운로드하세요.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function AssetNotes({ assets }: { assets: GameAsset[] }) {
  const hasPptx = assets.some((a) => a.fileType === "pptx");
  const hasZip = assets.some((a) => a.fileType === "zip");

  if (!hasPptx && !hasZip) return null;

  return (
    <div className="flex flex-col gap-0.5 px-1">
      {hasPptx && (
        <p className="text-[11px] text-muted-foreground">
          * PPTX는 호환을 위해 기본 고딕체를 사용하였습니다.
        </p>
      )}
      {hasZip && (
        <p className="text-[11px] text-muted-foreground">
          * ZIP에는 PNG 이미지가 포함되어 있습니다.
        </p>
      )}
    </div>
  );
}

function Spinner({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="animate-spin text-amber-500">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function LockedCard({ name, types }: { name: string; types: string[] }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-background px-4 py-3 dark:border-amber-500/30">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/50">
        <DownloadIcon />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-[11px] text-muted-foreground uppercase">
          {types.join(" / ")}
        </span>
      </div>
    </div>
  );
}
