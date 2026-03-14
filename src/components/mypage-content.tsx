"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { SUBSCRIPTION_PRICE_LABEL } from "@/constants/subscription";

type SubscriptionInfo = {
  status: string;
  current_period_end: string | null;
} | null;

export default function MypageContent() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionInfo>(null);
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

      const { data } = await supabase
        .from("subscriptions")
        .select("status, current_period_end")
        .eq("user_id", user.id)
        .single();

      setSubscription(data);
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

  const isActive = subscription?.status === "active";
  const periodEnd = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("ko-KR")
    : null;

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">내 정보</h2>
        <div className="rounded-xl border border-border p-6">
          <div className="flex items-center gap-4">
            {user.user_metadata.avatar_url && (
              <img
                src={user.user_metadata.avatar_url}
                alt="프로필"
                className="size-12 rounded-full"
              />
            )}
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
        <h2 className="text-lg font-bold">구독 상태</h2>
        <div className="rounded-xl border border-border p-6">
          {isActive ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  활성
                </span>
                <span className="text-sm font-medium">프리미엄 구독 중</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {SUBSCRIPTION_PRICE_LABEL} · 다음 결제일: {periodEnd}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  무료
                </span>
                <span className="text-sm font-medium">무료 플랜 이용 중</span>
              </div>
              <p className="text-sm text-muted-foreground">
                프리미엄 구독으로 모든 기능을 이용하세요.
              </p>
              <Button
                className="w-fit"
                onClick={() => router.push("/pricing")}
              >
                구독하기
              </Button>
            </div>
          )}
        </div>
      </section>

      <section>
        <Button
          variant="outline"
          onClick={async () => {
            await signOut();
            router.push("/");
          }}
        >
          로그아웃
        </Button>
      </section>
    </div>
  );
}
