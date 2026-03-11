"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
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
        <span className="hidden text-sm text-muted-foreground sm:block">
          {user.user_metadata.full_name ?? user.email}
        </span>
        <Button variant="outline" size="sm" onClick={signOut}>
          로그아웃
        </Button>
      </div>
    );
  }

  return (
    <Link href="/login">
      <Button size="sm">로그인</Button>
    </Link>
  );
}
