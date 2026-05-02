"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { games } from "@/data/games";
import { createClient } from "@/lib/supabase/client";
import { getPurchasedGames } from "@/lib/credit";
import GameCard from "@/components/game-card";
import GameFilter, { FilterState } from "@/components/game-filter";

const INITIAL_FILTERS: FilterState = {
  ageGroups: [],
  environment: null,
  prepTime: null,
  groupSize: null,
  energyLevel: null,
  characterQualities: [],
};

type SortOption = "credit-low" | "duration-short" | "duration-long" | "difficulty-easy" | "difficulty-hard";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "credit-low", label: "크레딧 낮은순" },
  { value: "duration-short", label: "소요시간 짧은순" },
  { value: "duration-long", label: "소요시간 긴순" },
  { value: "difficulty-easy", label: "난이도 쉬운순" },
  { value: "difficulty-hard", label: "난이도 어려운순" },
];

function loadSavedState(): { filters: FilterState; sortBy: SortOption } {
  if (typeof window === "undefined") return { filters: INITIAL_FILTERS, sortBy: "credit-low" };
  try {
    const saved = sessionStorage.getItem("game-list-state");
    if (saved) return JSON.parse(saved);
  } catch {}
  return { filters: INITIAL_FILTERS, sortBy: "credit-low" };
}

export default function GameList() {
  const saved = loadSavedState();
  const [filters, setFilters] = useState<FilterState>(saved.filters);
  const [sortBy, setSortBy] = useState<SortOption>(saved.sortBy);
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

  const saveState = useCallback(() => {
    sessionStorage.setItem("game-list-state", JSON.stringify({ filters, sortBy }));
  }, [filters, sortBy]);

  useEffect(() => {
    saveState();
  }, [saveState]);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const ids = await getPurchasedGames(supabase, user.id);
      setPurchasedIds(ids);
    }
    load();
  }, []);

  const filteredGames = useMemo(() => {
    const filtered = games.filter((game) => {
      if (
        filters.ageGroups.length > 0 &&
        !filters.ageGroups.some((age) => game.ageGroups.includes(age))
      ) {
        return false;
      }

      if (
        filters.environment &&
        !game.environments.includes(filters.environment)
      ) {
        return false;
      }

      if (filters.prepTime && game.prepTime !== filters.prepTime) {
        return false;
      }

      if (
        filters.groupSize &&
        !game.groupSizes.includes(filters.groupSize)
      ) {
        return false;
      }

      if (
        filters.energyLevel &&
        game.energyLevel !== filters.energyLevel
      ) {
        return false;
      }

      if (
        filters.characterQualities.length > 0 &&
        !filters.characterQualities.some((q) =>
          game.characterQualities.includes(q)
        )
      ) {
        return false;
      }

      return true;
    });

    const sorted = [...filtered];
    if (sortBy === "credit-low") {
      sorted.sort((a, b) => a.creditPrice - b.creditPrice);
    } else if (sortBy === "duration-short") {
      sorted.sort((a, b) => a.durationMinutes - b.durationMinutes);
    } else if (sortBy === "duration-long") {
      sorted.sort((a, b) => b.durationMinutes - a.durationMinutes);
    } else if (sortBy === "difficulty-easy") {
      sorted.sort((a, b) => a.difficulty - b.difficulty);
    } else if (sortBy === "difficulty-hard") {
      sorted.sort((a, b) => b.difficulty - a.difficulty);
    }

    return sorted;
  }, [filters, sortBy]);

  return (
    <div className="flex flex-col gap-6">
      <GameFilter filters={filters} onFilterChange={setFilters} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredGames.length}개의 게임
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="cursor-pointer appearance-none rounded-full border border-border bg-background px-3 py-1.5 pr-7 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {filteredGames.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} isPurchased={purchasedIds.includes(game.id)} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="text-4xl">🔍</div>
          <p className="text-lg font-medium">조건에 맞는 게임이 없습니다</p>
          <p className="text-sm text-muted-foreground">
            다른 필터 조합을 시도해보세요.
          </p>
        </div>
      )}
    </div>
  );
}
