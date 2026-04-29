"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Game } from "@/types/game";
import { createClient } from "@/lib/supabase/client";
import GameDetail from "@/components/game-detail";

export default function GameDetailGate({ game }: { game: Game }) {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAccess() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      setIsAuthed(true);
    }

    checkAccess();
  }, [game.id, router]);

  if (isAuthed === null) {
    return <GameDetail game={game} accessLevel="loading" />;
  }

  return <GameDetail game={game} accessLevel="full" />;
}
