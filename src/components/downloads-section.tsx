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
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
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
    <section className="overflow-hidden rounded-2xl border-2 border-amber-300/50 bg-gradient-to-br from-amber-50 to-orange-50/50 dark:border-amber-500/30 dark:from-amber-950/30 dark:to-orange-950/20">
      <div className="flex items-center justify-between border-b border-amber-200/50 px-5 py-3 dark:border-amber-500/20">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-amber-500/10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
          </div>
          <h2 className="text-base font-bold lg:text-lg">진행 자료</h2>
          {isPurchased ? (
            <span className="flex items-center gap-1 rounded-full bg-green-500 px-2.5 py-0.5 text-[11px] font-semibold text-white">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              구매 완료
            </span>
          ) : (
            <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-[11px] font-semibold text-white">
              {priceLabel} 크레딧
            </span>
          )}
        </div>
        {isLoggedIn && (
          <Link href="/pricing" className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v12" />
              <path d="M6 12h12" />
            </svg>
            {creditBalance.toLocaleString()} 크레딧
          </Link>
        )}
      </div>

      <div className="p-5">
        {isPurchased ? (
          <div className="flex flex-col gap-3">
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
          <div className="flex flex-col items-center gap-4 py-4">
            <PreviewButton gameId={game.id} previewPages={game.previewPages} />

            <div className="flex flex-col items-center gap-1">
              <p className="text-sm font-medium text-foreground/80">
                게임 진행에 필요한 모든 자료가 포함되어 있습니다
              </p>
              <p className="text-xs text-muted-foreground">
                PPT · PDF · PNG 이미지 · 구매 후 무제한 재다운로드
              </p>
            </div>

            {isLoggedIn ? (
              creditBalance >= game.creditPrice ? (
                <button
                  onClick={() => setShowPurchaseModal(true)}
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/30 active:scale-[0.98]"
                >
                  <span className="relative z-10">{priceLabel} 크레딧으로 구매</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs text-red-500 dark:text-red-400">
                    크레딧이 부족합니다 (보유: {creditBalance.toLocaleString()})
                  </p>
                  <Link
                    href="/pricing"
                    className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/30"
                  >
                    크레딧 충전하기
                  </Link>
                </div>
              )
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/30"
              >
                로그인하고 구매하기
              </Link>
            )}
          </div>
        )}
      </div>

      {showPurchaseModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => !isPurchasing && setShowPurchaseModal(false)}
        >
          <div
            className="w-full max-w-sm animate-in fade-in zoom-in-95 rounded-2xl border border-border bg-background p-6 shadow-2xl duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {isPurchasing ? (
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="flex size-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="animate-spin text-amber-500">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-sm font-medium">구매 처리 중...</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/50">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold">진행 자료 구매</h3>
                    <p className="text-xs text-muted-foreground">{game.title}</p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-muted/50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">가격</span>
                    <span className="text-lg font-bold text-primary">{priceLabel} 크레딧</span>
                  </div>
                  <div className="mt-3 border-t border-border pt-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">보유 크레딧</span>
                      <span>{creditBalance.toLocaleString()}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">구매 후 잔액</span>
                      <span className="font-semibold">{(creditBalance - game.creditPrice).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => setShowPurchaseModal(false)}
                    className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    취소
                  </button>
                  <button
                    onClick={async () => { await handlePurchase(); setShowPurchaseModal(false); }}
                    className="flex-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
                  >
                    구매하기
                  </button>
                </div>
              </>
            )}
          </div>
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
    const pages = previewPages ?? [1, 2];
    setPreviewPaths(pages.map((p) => `/downloads/games/${gameId}/preview/${p}.png`));
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
