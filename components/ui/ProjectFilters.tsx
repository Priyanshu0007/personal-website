"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { ProjectCategory, SortOrder } from "@/types";

const categories: { value: ProjectCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "react-js", label: "React JS" },
  { value: "react-native", label: "React Native" },
  { value: "next-js", label: "Next.js" },
];

export default function ProjectFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCategory =
    (searchParams.get("category") as ProjectCategory) || "all";
  const activeSort = (searchParams.get("sort") as SortOrder) || "newest";
  const showFavorites = searchParams.get("favorites") === "true";

  function updateFilters(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="mb-8 md:mb-12" id="project-filters">
      {/* Category filters */}
      <div
        className="mb-4 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by category"
      >
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() =>
              updateFilters({
                category: cat.value === "all" ? null : cat.value,
              })
            }
            aria-pressed={activeCategory === cat.value}
            className={`glass-btn glass-btn-sm text-xs font-bold tracking-wider uppercase ${
              activeCategory === cat.value
                ? "bg-primary text-white border-primary/30 shadow-md"
                : "bg-surface border-border/20 hover:bg-bg-secondary"
            }`}
            id={`filter-${cat.value}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Secondary filters */}
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Other filters"
      >
        {/* Favorites toggle */}
        <button
          onClick={() =>
            updateFilters({ favorites: showFavorites ? null : "true" })
          }
          aria-pressed={showFavorites}
          className={`glass-btn glass-btn-sm text-xs font-bold ${
            showFavorites
              ? "bg-primary text-white border-primary/30 shadow-md"
              : "bg-surface border-border/20 hover:bg-bg-secondary"
          }`}
          id="filter-favorites"
        >
          <span role="img" aria-label="Star" className="mr-1">
            ★
          </span>{" "}
          Favorites
        </button>

        {/* Sort toggle */}
        <button
          onClick={() =>
            updateFilters({
              sort: activeSort === "newest" ? "oldest" : "newest",
            })
          }
          className="glass-btn glass-btn-sm glass-btn-secondary text-xs font-bold"
          id="filter-sort"
          aria-label={`Sort by ${activeSort === "newest" ? "oldest" : "newest"} first`}
        >
          <span aria-hidden="true">{activeSort === "newest" ? "↓" : "↑"}</span>{" "}
          {activeSort === "newest" ? "Newest First" : "Oldest First"}
        </button>
      </div>
    </div>
  );
}
