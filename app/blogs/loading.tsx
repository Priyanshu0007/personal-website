"use client";

export default function BlogsLoading() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container">
        {/* Header Skeleton */}
        <div className="mb-12 md:mb-16">
          <div className="mb-4 inline-block">
            <div className="h-7 w-40 -rotate-2 animate-pulse rounded bg-border" />
          </div>
          <div className="mb-6 h-16 w-3/4 animate-pulse rounded bg-border md:h-20 md:w-1/2 lg:h-24" />
          <div className="h-8 w-full max-w-2xl animate-pulse rounded bg-border" />
        </div>

        {/* Blog Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="glass-card flex h-full flex-col overflow-hidden p-0"
            >
              {/* Thumbnail */}
              <div className="relative h-32 w-full animate-pulse rounded-t-2xl bg-surface" />

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 h-4 w-20 animate-pulse rounded bg-border" />
                <div className="mb-3 h-8 w-full animate-pulse rounded bg-border" />
                <div className="mb-6 flex-1">
                  <div className="mb-2 h-4 w-full animate-pulse rounded bg-border" />
                  <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-border" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-border" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-border/20 pt-3">
                  <div className="h-4 w-16 animate-pulse rounded bg-border" />
                  <div className="h-4 w-24 animate-pulse rounded bg-border" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}