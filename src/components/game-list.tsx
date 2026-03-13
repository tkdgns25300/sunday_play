"use client";

import { useState, useMemo } from "react";
import { games } from "@/data/games";
import GameCard from "@/components/game-card";
import GameFilter, { FilterState } from "@/components/game-filter";

const INITIAL_FILTERS: FilterState = {
  search: "",
  ageGroup: null,
  environment: null,
  prepTime: null,
  groupSize: null,
  energyLevel: null,
  biblicalThemes: [],
};

const allBiblicalThemes = [
  ...new Set(games.flatMap((game) => game.biblicalThemes)),
];

export default function GameList() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const isMatch =
          game.title.toLowerCase().includes(query) ||
          game.summary.toLowerCase().includes(query) ||
          game.biblicalThemes.some((theme) =>
            theme.toLowerCase().includes(query)
          );
        if (!isMatch) return false;
      }

      if (filters.ageGroup && !game.ageGroups.includes(filters.ageGroup)) {
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
        filters.biblicalThemes.length > 0 &&
        !filters.biblicalThemes.some((theme) =>
          game.biblicalThemes.includes(theme)
        )
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="flex flex-col gap-6">
      <GameFilter filters={filters} onFilterChange={setFilters} biblicalThemes={allBiblicalThemes} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredGames.length}개의 게임
        </p>
      </div>

      {filteredGames.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="text-4xl">🔍</div>
          <p className="text-lg font-medium">검색 결과가 없습니다</p>
          <p className="text-sm text-muted-foreground">
            다른 필터 조합을 시도해보세요.
          </p>
        </div>
      )}
    </div>
  );
}
