"use client";

export default function ProjectDetailLoading() {
  return (
    <div className="section pt-6" id="project-detail">
      <div className="container">
        {/* Back Button Skeleton */}
        <div className="mb-6 h-8 w-24 animate-pulse rounded bg-border" />

        {/* Hero Banner */}
        <div className="relative mb-8 aspect-[16/9] w-full animate-pulse overflow-hidden border-[3px] border-border bg-surface" />

        {/* Project Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-2 h-4 w-24 animate-pulse rounded bg-border" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-border md:h-14 md:w-1/2" />
          </div>
          <div className="flex w-full gap-3 sm:w-auto">
            <div className="h-12 flex-1 animate-pulse rounded bg-border sm:w-32" />
            <div className="h-12 flex-1 animate-pulse rounded bg-border sm:w-32" />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6 max-w-3xl">
          <div className="h-6 w-full animate-pulse rounded bg-border" />
          <div className="mt-2 h-6 w-4/5 animate-pulse rounded bg-border" />
        </div>

        <div className="neo-divider" />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-10 lg:col-span-2">
            {/* About */}
            <section>
              <div className="mb-4 h-6 w-40 animate-pulse rounded bg-border" />
              <div className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-border" />
                <div className="h-4 w-full animate-pulse rounded bg-border" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-border" />
              </div>
            </section>

            {/* Highlights */}
            <section>
              <div className="mb-5 h-6 w-32 animate-pulse rounded bg-border" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-[3px] border-border bg-surface p-5"
                  >
                    <div
                      className="mb-2 h-8 w-8 animate-pulse rounded bg-border"
                      style={{ opacity: 0.3 }}
                    />
                    <div className="h-4 w-full animate-pulse rounded bg-border" />
                  </div>
                ))}
              </div>
            </section>

            {/* Screenshots */}
            <section>
              <div className="mb-5 h-6 w-32 animate-pulse rounded bg-border" />
              <div className="aspect-video w-full animate-pulse rounded-lg border-[3px] border-border bg-surface" />
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <div className="neo-card">
              <div className="mb-4 h-4 w-24 animate-pulse rounded bg-border" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-16 animate-pulse rounded bg-border"
                  />
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-4 border-[3px] border-border p-5">
              <div className="h-4 w-24 animate-pulse rounded bg-border" />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-12 animate-pulse rounded bg-border" />
                  <div className="h-5 w-20 animate-pulse rounded bg-border" />
                </div>
                <div className="h-[2px] w-full animate-pulse rounded bg-border" />
                <div className="flex items-center justify-between">
                  <div className="h-3 w-12 animate-pulse rounded bg-border" />
                  <div className="h-4 w-16 animate-pulse rounded bg-border" />
                </div>
                <div className="h-[2px] w-full animate-pulse rounded bg-border" />
                <div className="flex items-center justify-between">
                  <div className="h-3 w-20 animate-pulse rounded bg-border" />
                  <div className="h-4 w-8 animate-pulse rounded bg-border" />
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2">
              <div className="h-10 w-full animate-pulse rounded bg-border" />
              <div className="h-10 w-full animate-pulse rounded bg-border" />
            </div>
          </div>
        </div>

        <div className="neo-divider" />

        {/* Prev/Next Navigation */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="neo-card h-20 animate-pulse" />
          <div className="neo-card h-20 animate-pulse" />
        </div>
      </div>
    </div>
  );
}