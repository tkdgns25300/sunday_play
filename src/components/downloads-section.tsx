"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Game } from "@/types/game";
import { createClient } from "@/lib/supabase/client";
import {
  getSubscriptionStatus,
  getMonthlyDownloadedGames,
} from "@/lib/subscription";
import { MONTHLY_DOWNLOAD_LIMIT } from "@/constants/subscription";

type AccessLevel = "full" | "login_required" | "limit_reached" | "loading";

export default function DownloadsSection({
  game,
  accessLevel,
}: {
  game: Game;
  accessLevel: AccessLevel;
}) {
  const downloadMaterials = game.materials.filter((m) => m.downloadPath);
  const hasDownloads = game.assets.length > 0 || downloadMaterials.length > 0;

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

  if (!hasDownloads) return null;

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
        <div className="grid grid-cols-3 gap-2">
          {game.assets.map((asset) => (
            <button
              key={asset.fileName}
              onClick={() => handleDownload(asset.fileName, asset.storagePath)}
              disabled={!canDownload}
              className="flex flex-col items-center gap-2 rounded-lg border border-amber-200 bg-background px-3 py-3 text-center transition-colors hover:bg-amber-50 disabled:opacity-50"
            >
              <DownloadIcon />
              <span className="text-xs font-medium leading-tight">{asset.fileName}</span>
              <span className="text-[10px] text-muted-foreground uppercase">{asset.fileType}</span>
            </button>
          ))}
          {downloadMaterials.map((material) => (
            <button
              key={material.name}
              onClick={() => handleDownload(material.name, material.downloadPath!)}
              disabled={!canDownload}
              className="flex flex-col items-center gap-2 rounded-lg border border-amber-200 bg-background px-3 py-3 text-center transition-colors hover:bg-amber-50 disabled:opacity-50"
            >
              <DownloadIcon />
              <span className="text-xs font-medium leading-tight">{material.name}</span>
              <span className="text-[10px] text-muted-foreground">PDF</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="relative min-h-48">
          <div className="grid w-full grid-cols-3 gap-2 opacity-30 blur-[2px]">
            {game.assets.map((asset) => (
              <LockedCard key={asset.fileName} name={asset.fileName} type={asset.fileType} />
            ))}
            {downloadMaterials.map((material) => (
              <LockedCard key={material.name} name={material.name} type="pdf" />
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
              PPT, 대본 스크립트, 활동지 등 월 {MONTHLY_DOWNLOAD_LIMIT}개 다운로드
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

function DownloadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function LockedCard({ name, type }: { name: string; type: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-amber-200 bg-background px-3 py-3 text-center">
      <DownloadIcon />
      <span className="text-xs font-medium leading-tight">{name}</span>
      <span className="text-[10px] text-muted-foreground uppercase">{type}</span>
    </div>
  );
}
