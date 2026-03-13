"use client";

import { useEffect, useState } from "react";
import { Game } from "@/types/game";
import { createClient } from "@/lib/supabase/client";
import {
  getSubscriptionStatus,
  getMonthlyViewCount,
  hasViewedGame,
  logGameView,
} from "@/lib/subscription";
import { FREE_MONTHLY_VIEW_LIMIT } from "@/constants/subscription";
import GameDetail from "@/components/game-detail";
import Paywall from "@/components/paywall";

type AccessLevel = "full" | "login_required" | "limit_reached";

type GameDetailGateProps = {
  game: Game;
};

export default function GameDetailGate({ game }: GameDetailGateProps) {
  const [accessLevel, setAccessLevel] = useState<AccessLevel | null>(null);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    async function checkAccess() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setAccessLevel("login_required");
        return;
      }

      const isSubscriber = await getSubscriptionStatus(supabase, user.id);
      if (isSubscriber) {
        setAccessLevel("full");
        return;
      }

      const alreadyViewed = await hasViewedGame(supabase, user.id, game.id);
      const monthlyCount = await getMonthlyViewCount(supabase, user.id);
      setViewCount(monthlyCount);

      if (alreadyViewed || monthlyCount < FREE_MONTHLY_VIEW_LIMIT) {
        if (!alreadyViewed) {
          await logGameView(supabase, user.id, game.id);
          setViewCount(monthlyCount + 1);
        }
        setAccessLevel("full");
        return;
      }

      setAccessLevel("limit_reached");
    }

    checkAccess();
  }, [game.id]);

  if (accessLevel === null) {
    return <GameDetail game={game} accessLevel="loading" />;
  }

  if (accessLevel === "full") {
    return <GameDetail game={game} accessLevel="full" viewCount={viewCount} />;
  }

  return <GameDetail game={game} accessLevel={accessLevel} viewCount={viewCount} />;
}
