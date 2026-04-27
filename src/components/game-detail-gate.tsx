"use client";

import { useEffect, useState } from "react";
import { Game } from "@/types/game";
import { createClient } from "@/lib/supabase/client";
import GameDetail from "@/components/game-detail";

type AccessLevel = "full" | "login_required";

export default function GameDetailGate({ game }: { game: Game }) {
  const [accessLevel, setAccessLevel] = useState<AccessLevel | null>(null);

  useEffect(() => {
    async function checkAccess() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setAccessLevel("login_required");
        return;
      }

      setAccessLevel("full");
    }

    checkAccess();
  }, [game.id]);

  if (accessLevel === null) {
    return <GameDetail game={game} accessLevel="loading" />;
  }

  return <GameDetail game={game} accessLevel={accessLevel} />;
}
