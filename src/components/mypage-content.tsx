"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/auth";
import { getCreditBalance, getPurchasedGames } from "@/lib/credit";
import { Button } from "@/components/ui/button";
import { games } from "@/data/games";

export default function MypageContent() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [creditBalance, setCreditBalance] = useState(0);
  const [purchasedGameIds, setPurchasedGameIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);

      const balance = await getCreditBalance(supabase, user.id);
      setCreditBalance(balance);

      const purchased = await getPurchasedGames(supabase, user.id);
      setPurchasedGameIds(purchased);

      setIsLoading(false);
    }
    loadData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-32 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (!user) return null;

  const purchasedGames = games.filter((g) => purchasedGameIds.includes(g.id));

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">내 정보</h2>
        <div className="rounded-xl border border-border p-6">
          <div className="flex items-center gap-4">
            {user.user_metadata.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="프로필"
                className="size-12 rounded-full"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove("hidden");
                }}
              />
            ) : null}
            <div className={`flex size-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary ${user.user_metadata.avatar_url ? "hidden" : ""}`}>
              {(user.user_metadata.full_name ?? "U").charAt(0)}
            </div>
            <div>
              <p className="font-medium">
                {user.user_metadata.full_name ?? "사용자"}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">크레딧</h2>
        <div className="rounded-xl border border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-bold">{creditBalance.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">보유 크레딧</p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push("/pricing")}
            >
              충전하기
            </Button>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">구매한 게임 ({purchasedGames.length})</h2>
        {purchasedGames.length > 0 ? (
          <div className="flex flex-col gap-2">
            {purchasedGames.map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.id}`}
                className="flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <img
                  src={game.thumbnailUrl}
                  alt={game.title}
                  className="size-12 rounded-lg object-cover"
                />
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium">{game.title}</p>
                  <p className="text-xs text-muted-foreground">{game.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border p-6 text-center">
            <p className="text-sm text-muted-foreground">
              아직 구매한 게임이 없습니다.
            </p>
            <Button
              variant="outline"
              className="mt-3"
              onClick={() => router.push("/games")}
            >
              게임 둘러보기
            </Button>
          </div>
        )}
      </section>

      <Button
        variant="outline"
        className="w-full border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600"
        onClick={async () => {
          await signOut();
          router.push("/");
        }}
      >
        로그아웃
      </Button>
    </div>
  );
}
