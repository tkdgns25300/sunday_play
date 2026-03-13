"use client";

import { AgeGroup, Environment, PrepTime, GroupSize } from "@/types/game";
import {
  AGE_GROUP_OPTIONS,
  ENVIRONMENT_OPTIONS,
  PREP_TIME_OPTIONS,
  GROUP_SIZE_OPTIONS,
  ENERGY_LEVEL_LABELS,
} from "@/constants/game";

export type FilterState = {
  search: string;
  ageGroup: AgeGroup | null;
  environment: Environment | null;
  prepTime: PrepTime | null;
  groupSize: GroupSize | null;
  energyLevel: number | null;
  biblicalThemes: string[];
};

type GameFilterProps = {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  biblicalThemes: string[];
};

export default function GameFilter({ filters, onFilterChange, biblicalThemes }: GameFilterProps) {
  function updateFilter<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    onFilterChange({ ...filters, [key]: value });
  }

  function toggleFilter<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    onFilterChange({ ...filters, [key]: filters[key] === value ? null : value });
  }

  const hasActiveFilters =
    filters.ageGroup !== null ||
    filters.environment !== null ||
    filters.prepTime !== null ||
    filters.groupSize !== null ||
    filters.energyLevel !== null ||
    filters.biblicalThemes.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="게임 이름 또는 키워드로 검색..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm
            placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
        />
      </div>

      <div className="flex flex-col gap-3">
        <FilterSection label="대상">
          {AGE_GROUP_OPTIONS.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              isActive={filters.ageGroup === option.value}
              onClick={() => toggleFilter("ageGroup", option.value)}
            />
          ))}
        </FilterSection>

        <FilterSection label="공간">
          {ENVIRONMENT_OPTIONS.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              isActive={filters.environment === option.value}
              onClick={() => toggleFilter("environment", option.value)}
            />
          ))}
        </FilterSection>

        <FilterSection label="준비 시간">
          {PREP_TIME_OPTIONS.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              isActive={filters.prepTime === option.value}
              onClick={() => toggleFilter("prepTime", option.value)}
            />
          ))}
        </FilterSection>

        <FilterSection label="인원">
          {GROUP_SIZE_OPTIONS.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              isActive={filters.groupSize === option.value}
              onClick={() => toggleFilter("groupSize", option.value)}
            />
          ))}
        </FilterSection>

        <FilterSection label="활동성">
          {[1, 2, 3, 4, 5].map((level) => (
            <FilterChip
              key={level}
              label={ENERGY_LEVEL_LABELS[level]}
              isActive={filters.energyLevel === level}
              onClick={() => toggleFilter("energyLevel", level)}
            />
          ))}
        </FilterSection>

        <FilterSection label="성경 주제">
          {biblicalThemes.map((theme) => (
            <FilterChip
              key={theme}
              label={theme}
              isActive={filters.biblicalThemes.includes(theme)}
              onClick={() => {
                const next = filters.biblicalThemes.includes(theme)
                  ? filters.biblicalThemes.filter((t) => t !== theme)
                  : [...filters.biblicalThemes, theme];
                onFilterChange({ ...filters, biblicalThemes: next });
              }}
            />
          ))}
        </FilterSection>
      </div>

      {hasActiveFilters && (
        <button
          onClick={() =>
            onFilterChange({
              search: filters.search,
              ageGroup: null,
              environment: null,
              prepTime: null,
              groupSize: null,
              energyLevel: null,
              biblicalThemes: [],
            })
          }
          className="self-start text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          필터 초기화
        </button>
      )}
    </div>
  );
}

function FilterSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
      <span className="shrink-0 text-xs font-medium text-muted-foreground sm:w-16">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}
