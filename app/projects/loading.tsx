"use client";

export default function ProjectsLoading() {
  return (
    <section className="section" id="projects-page">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-4 h-8 w-48 animate-pulse rounded bg-border" />
              <div className="h-12 w-3/4 animate-pulse rounded bg-border md:w-1/2 lg:w-1/3" />
            </div>
            <div className="flex gap-2">
              <div className="h-10 w-24 animate-pulse rounded bg-border" />
              <div className="h-10 w-24 animate-pulse rounded bg-border" />
            </div>
          </div>
        </div>

        {/* Filters Skeleton */}
        <div className="mb-8 flex flex-wrap gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-24 animate-pulse rounded-md border border-border/20 bg-surface"
            />
          ))}
        </div>

        {/* Project Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="glass-card flex h-full flex-col overflow-hidden p-0"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] w-full animate-pulse rounded-t-2xl bg-surface" />

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-border" />
                <div className="mb-4 flex-1">
                  <div className="mb-2 h-4 w-full animate-pulse rounded bg-border" />
                  <div className="mb-2 h-4 w-full animate-pulse rounded bg-border" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-border" />
                </div>

                {/* Tech Stack */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div
                      key={j}
                      className="h-5 w-14 animate-pulse rounded bg-border"
                    />
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-border/20 pt-3">
                  <div className="h-4 w-16 animate-pulse rounded bg-border" />
                  <div className="h-4 w-20 animate-pulse rounded bg-border" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Count */}
        <div className="mt-8 text-center">
          <div className="mx-auto h-4 w-32 animate-pulse rounded bg-border" />
        </div>
      </div>
    </section>
  );
}