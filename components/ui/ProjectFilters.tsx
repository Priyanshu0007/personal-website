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
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() =>
              updateFilters({
                category: cat.value === "all" ? null : cat.value,
              })
            }
            className={`neo-btn neo-btn-sm text-xs font-bold tracking-wider uppercase ${
              activeCategory === cat.value
                ? "border-[var(--color-border)] bg-[var(--color-primary)] shadow-[3px_3px_0px_var(--color-shadow)]"
                : "border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-bg-secondary)]"
            }`}
            id={`filter-${cat.value}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Secondary filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Favorites toggle */}
        <button
          onClick={() =>
            updateFilters({ favorites: showFavorites ? null : "true" })
          }
          className={`neo-btn neo-btn-sm text-xs font-bold ${
            showFavorites
              ? "border-[var(--color-border)] bg-[var(--color-primary)] shadow-[3px_3px_0px_var(--color-shadow)]"
              : "border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-bg-secondary)]"
          }`}
          id="filter-favorites"
        >
          ★ Favorites
        </button>

        {/* Sort toggle */}
        <button
          onClick={() =>
            updateFilters({
              sort: activeSort === "newest" ? "oldest" : "newest",
            })
          }
          className="neo-btn neo-btn-sm neo-btn-secondary text-xs font-bold"
          id="filter-sort"
        >
          {activeSort === "newest" ? "↓ Newest First" : "↑ Oldest First"}
        </button>
      </div>
    </div>
  );
}
