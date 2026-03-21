"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Game, GameAsset } from "@/types/game";
import { createClient } from "@/lib/supabase/client";
import {
  getSubscriptionStatus,
  getMonthlyDownloadedGames,
} from "@/lib/subscription";
import { MONTHLY_DOWNLOAD_LIMIT } from "@/constants/subscription";

type AccessLevel = "full" | "login_required" | "limit_reached" | "loading";

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

export default function DownloadsSection({
  game,
  accessLevel,
}: {
  game: Game;
  accessLevel: AccessLevel;
}) {
  const [downloadedGames, setDownloadedGames] = useState<string[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const subscribed = await getSubscriptionStatus(supabase, user.id);
      setIsSubscribed(subscribed);

      if (subscribed) {
        const games = await getMonthlyDownloadedGames(supabase, user.id);
        setDownloadedGames(games);
      }
    }
    load();
  }, []);

  if (game.assets.length === 0) return null;

  const groups = groupAssets(game.assets);
  const isUnlocked = accessLevel === "full" && isSubscribed;
  const isAlreadyDownloaded = downloadedGames.includes(game.id);
  const gameCount = downloadedGames.length;
  const canDownload = isAlreadyDownloaded || gameCount < MONTHLY_DOWNLOAD_LIMIT;

  async function handleDownload(fileName: string, filePath: string) {
    if (!canDownload) {
      alert(`이번 달 다운로드 한도(${MONTHLY_DOWNLOAD_LIMIT}개 게임)를 초과했습니다.`);
      return;
    }

    const response = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId: game.id, fileName, filePath }),
    });

    const result = await response.json();

    if (result.success) {
      if (!isAlreadyDownloaded) {
        setDownloadedGames((prev) => [...prev, game.id]);
      }
      const link = document.createElement("a");
      link.href = result.filePath;
      link.download = fileName;
      link.click();
    } else {
      alert(result.message);
    }
  }

  return (
    <section className="flex flex-col gap-3 rounded-xl border-2 border-amber-300/50 bg-amber-50 p-4 lg:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold lg:text-lg">진행 자료</h2>
          <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-medium text-white">
            프리미엄
          </span>
        </div>
        {isUnlocked && (
          <span className="text-xs text-muted-foreground">
            이번 달 {gameCount}/{MONTHLY_DOWNLOAD_LIMIT}개 게임
          </span>
        )}
      </div>

      {isUnlocked ? (
        <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
          {groups.map((group) => (
            <AssetCard
              key={group.name}
              group={group}
              canDownload={canDownload}
              onDownload={handleDownload}
            />
          ))}
        </div>
      ) : (
        <div className="relative min-h-48">
          <div className="flex w-full flex-col gap-2 opacity-30 blur-[2px] sm:grid sm:grid-cols-2">
            {groups.map((group) => (
              <LockedCard key={group.name} name={group.name} types={group.variants.map((v) => v.fileType)} />
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
              진행 PPT, 준비물 자료 등 월 {MONTHLY_DOWNLOAD_LIMIT}개 게임 다운로드
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

function AssetCard({
  group,
  canDownload,
  onDownload,
}: {
  group: AssetGroup;
  canDownload: boolean;
  onDownload: (fileName: string, filePath: string) => void;
}) {
  const isSingle = group.variants.length === 1;

  if (isSingle) {
    const asset = group.variants[0];
    return (
      <button
        onClick={() => onDownload(asset.fileName, asset.storagePath)}
        disabled={!canDownload}
        className="group flex items-center gap-3 rounded-xl border border-amber-200 bg-background px-4 py-3 text-left transition-all hover:border-amber-300 hover:shadow-sm disabled:opacity-50"
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 transition-colors group-hover:bg-amber-200">
          <DownloadIcon />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">{asset.fileName}</span>
          <span className="text-[11px] text-muted-foreground uppercase">{asset.fileType}</span>
        </div>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-background px-4 py-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-100">
        <DownloadIcon />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{group.name}</span>
        <div className="flex gap-1.5">
          {group.variants.map((asset) => (
            <button
              key={asset.fileType}
              onClick={() => onDownload(asset.fileName, asset.storagePath)}
              disabled={!canDownload}
              className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-medium uppercase text-amber-700 transition-all hover:border-amber-400 hover:bg-amber-100 disabled:opacity-50"
            >
              {asset.fileType}
            </button>
          ))}
        </div>
      </div>
    </div>
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
    <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-background px-4 py-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-100">
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
