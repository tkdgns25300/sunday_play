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
};

export default function GameFilter({ filters, onFilterChange }: GameFilterProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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
      <div className="flex flex-wrap items-center gap-2">
        <DropdownFilter
          label="대상"
          value={filters.ageGroup}
          options={AGE_GROUP_OPTIONS}
          onSelect={(value) => toggleFilter("ageGroup", value)}
        />
        <DropdownFilter
          label="인원"
          value={filters.groupSize}
          options={GROUP_SIZE_OPTIONS}
          onSelect={(value) => toggleFilter("groupSize", value)}
        />
        <DropdownFilter
          label="장소"
          value={filters.environment}
          options={ENVIRONMENT_OPTIONS}
          onSelect={(value) => toggleFilter("environment", value)}
        />

        {isDetailOpen && (
          <>
            <DropdownFilter
              label="준비 시간"
              value={filters.prepTime}
              options={PREP_TIME_OPTIONS}
              onSelect={(value) => toggleFilter("prepTime", value)}
            />
            <DropdownFilter
              label="활동성"
              value={filters.energyLevel as number | null}
              options={[1, 2, 3, 4, 5].map((level) => ({
                value: level,
                label: ENERGY_LEVEL_LABELS[level],
              }))}
              onSelect={(value) => toggleFilter("energyLevel", value)}
            />
            <CharacterQualityDropdown
              selected={filters.characterQualities}
              onChange={(next) => onFilterChange({ ...filters, characterQualities: next })}
            />
          </>
        )}

        <button
          onClick={() => setIsDetailOpen(!isDetailOpen)}
          className={`ml-auto flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
            hasDetailFilters
              ? "border-primary text-primary"
              : "border-input text-muted-foreground hover:text-foreground"
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="4" y1="21" y2="14" />
            <line x1="4" x2="4" y1="10" y2="3" />
            <line x1="12" x2="12" y1="21" y2="12" />
            <line x1="12" x2="12" y1="8" y2="3" />
            <line x1="20" x2="20" y1="21" y2="16" />
            <line x1="20" x2="20" y1="12" y2="3" />
            <line x1="2" x2="6" y1="14" y2="14" />
            <line x1="10" x2="14" y1="8" y2="8" />
            <line x1="18" x2="22" y1="16" y2="16" />
          </svg>
          {isDetailOpen ? "접기" : "상세"}
          {hasDetailFilters && !isDetailOpen && (
            <span className="size-1.5 rounded-full bg-primary" />
          )}
        </button>
      </div>

      {hasActiveFilters && (
        <button
          onClick={() =>
            onFilterChange({
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

function DropdownFilter<T extends string | number>({
  label,
  value,
  options,
  onSelect,
}: {
  label: string;
  value: T | null;
  options: { value: T; label: string }[];
  onSelect: (value: T) => void;
}) {
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

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
          value
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
        }`}
      >
        {selectedLabel ?? label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-1 min-w-32 rounded-lg border border-border bg-background py-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs transition-colors hover:bg-muted ${
                value === option.value ? "font-medium text-primary" : "text-foreground"
              }`}
            >
              {value === option.value && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              <span className={value === option.value ? "" : "pl-5"}>
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CharacterQualityDropdown({
  selected,
  onChange,
}: {
  selected: CharacterQuality[];
  onChange: (next: CharacterQuality[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
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

  const buttonLabel = selected.length > 0
    ? `품성 (${selected.length})`
    : "품성";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
          selected.length > 0
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
        }`}
      >
        {buttonLabel}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-1 w-64 rounded-lg border border-border bg-background shadow-lg">
          <div className="flex items-center justify-between border-b border-border p-2">
            <input
              type="text"
              placeholder="품성 검색..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-7 flex-1 rounded border-none bg-muted px-2 text-xs
                placeholder:text-muted-foreground focus:outline-none"
              autoFocus
            />
            <a
              href="https://kr.iblp.org/49cq/"
              target="_blank"
              rel="noopener noreferrer"
              title="49가지 품성 정의 보기"
              className="ml-2 flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              ?
            </a>
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
  );
}

