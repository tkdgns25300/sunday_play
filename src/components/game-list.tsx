"use client";

import { useState, useMemo, useEffect, useRef } from "react";
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

type SortOption = "recommend" | "credit-low" | "duration-short" | "duration-long" | "difficulty-easy" | "difficulty-hard";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recommend", label: "추천순" },
  { value: "credit-low", label: "크레딧 낮은순" },
  { value: "duration-short", label: "소요시간 짧은순" },
  { value: "duration-long", label: "소요시간 긴순" },
  { value: "difficulty-easy", label: "난이도 쉬운순" },
  { value: "difficulty-hard", label: "난이도 어려운순" },
];

export default function GameList() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>("recommend");
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

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
    if (sortBy === "recommend") {
      sorted.sort((a, b) => {
        if (b.recommendScore !== a.recommendScore) return b.recommendScore - a.recommendScore;
        return a.creditPrice - b.creditPrice;
      });
    } else if (sortBy === "credit-low") {
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
        <SortDropdown value={sortBy} onChange={setSortBy} />
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

function SortDropdown({ value, onChange }: { value: SortOption; onChange: (v: SortOption) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLabel = SORT_OPTIONS.find((o) => o.value === value)?.label ?? "정렬";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 16 4 4 4-4" />
          <path d="M7 20V4" />
          <path d="m21 8-4-4-4 4" />
          <path d="M17 4v16" />
        </svg>
        {currentLabel}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-10 mt-1 min-w-40 rounded-xl border border-border bg-background py-1 shadow-lg">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-muted ${
                value === option.value ? "font-semibold text-primary" : "text-foreground"
              }`}
            >
              {value === option.value ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <span className="w-3" />
              )}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
