"use client";

import { useState, useRef, useEffect } from "react";
import { AgeGroup, Environment, PrepTime, GroupSize, CharacterQuality } from "@/types/game";
import {
  AGE_GROUP_OPTIONS,
  ENVIRONMENT_OPTIONS,
  PREP_TIME_OPTIONS,
  GROUP_SIZE_OPTIONS,
  ENERGY_LEVEL_LABELS,
  CHARACTER_QUALITIES,
} from "@/constants/game";

export type FilterState = {
  search: string;
  ageGroup: AgeGroup | null;
  environment: Environment | null;
  prepTime: PrepTime | null;
  groupSize: GroupSize | null;
  energyLevel: number | null;
  characterQualities: CharacterQuality[];
};

type GameFilterProps = {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  characterQualities: CharacterQuality[];
};

export default function GameFilter({ filters, onFilterChange }: GameFilterProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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
    filters.characterQualities.length > 0;

  const hasDetailFilters =
    filters.prepTime !== null ||
    filters.energyLevel !== null ||
    filters.characterQualities.length > 0;

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

        <FilterSection label="장소">
          {ENVIRONMENT_OPTIONS.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              isActive={filters.environment === option.value}
              onClick={() => toggleFilter("environment", option.value)}
            />
          ))}
        </FilterSection>
      </div>

      <button
        onClick={() => setIsDetailOpen(!isDetailOpen)}
        className="flex items-center gap-1.5 self-start text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isDetailOpen ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
        상세 필터
        {hasDetailFilters && (
          <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
            적용 중
          </span>
        )}
      </button>

      {isDetailOpen && (
        <div className="flex flex-col gap-3">
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

          <CharacterQualityFilter
            selected={filters.characterQualities}
            onChange={(next) => onFilterChange({ ...filters, characterQualities: next })}
          />
        </div>
      )}

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
              characterQualities: [],
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

function CharacterQualityFilter({
  selected,
  onChange,
}: {
  selected: CharacterQuality[];
  onChange: (next: CharacterQuality[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredQualities = CHARACTER_QUALITIES.filter((q) =>
    q.includes(query)
  );

  function toggle(quality: CharacterQuality) {
    if (selected.includes(quality)) {
      onChange(selected.filter((q) => q !== quality));
    } else {
      onChange([...selected, quality]);
    }
  }

  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3">
      <span className="shrink-0 pt-1 text-xs font-medium text-muted-foreground sm:w-16">
        품성
      </span>
      <div className="flex flex-1 flex-col gap-2">
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {selected.map((quality) => (
              <button
                key={quality}
                onClick={() => toggle(quality)}
                className="flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground"
              >
                {quality}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            ))}
          </div>
        )}

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-input bg-background px-3 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            품성 선택...
          </button>

          {isOpen && (
            <div className="absolute left-0 top-full z-10 mt-1 w-64 rounded-lg border border-border bg-background shadow-lg">
              <div className="border-b border-border p-2">
                <input
                  type="text"
                  placeholder="품성 검색..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-7 w-full rounded border-none bg-muted px-2 text-xs
                    placeholder:text-muted-foreground focus:outline-none"
                  autoFocus
                />
              </div>
              <div className="max-h-48 overflow-y-auto p-1">
                {filteredQualities.length > 0 ? (
                  filteredQualities.map((quality) => (
                    <button
                      key={quality}
                      onClick={() => toggle(quality)}
                      className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs transition-colors hover:bg-muted"
                    >
                      <div
                        className={`flex size-4 shrink-0 items-center justify-center rounded border ${
                          selected.includes(quality)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input"
                        }`}
                      >
                        {selected.includes(quality) && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      {quality}
                    </button>
                  ))
                ) : (
                  <p className="px-2 py-3 text-center text-xs text-muted-foreground">
                    결과 없음
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
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
