"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getCreditBalance } from "@/lib/credit";
import { Button } from "@/components/ui/button";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [creditBalance, setCreditBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(async ({ data: { user } }) => {
      setUser(user);
      if (user) {
        const balance = await getCreditBalance(supabase, user.id);
        setCreditBalance(balance);
      }
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return <div className="h-8 w-16 animate-pulse rounded-lg bg-muted" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        {creditBalance !== null && (
          <Link
            href="/pricing"
            className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-400 dark:hover:bg-amber-900/70"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v12M6 12h12" />
            </svg>
            {creditBalance.toLocaleString()}C
          </Link>
        )}
        <Link
          href="/mypage"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {user.user_metadata.full_name ?? "마이페이지"}
        </Link>
      </div>
    );
  }

  return (
    <Link href="/login">
      <Button size="sm">로그인</Button>
    </Link>
  );
}
