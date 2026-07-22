"use client";

export default function ProjectDetailLoading() {
  return (
    <div className="section pt-24 md:pt-32" id="project-detail">
      <div className="container">
        {/* Back Button Skeleton */}
        <div className="bg-border mb-6 h-8 w-24 animate-pulse rounded" />

        {/* Hero Banner */}
        <div className="border-border/20 bg-surface relative mb-8 aspect-[16/9] w-full animate-pulse overflow-hidden rounded-2xl border" />

        {/* Project Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="bg-border mb-2 h-4 w-24 animate-pulse rounded" />
            <div className="bg-border h-10 w-3/4 animate-pulse rounded md:h-14 md:w-1/2" />
          </div>
          <div className="flex w-full gap-3 sm:w-auto">
            <div className="bg-border h-12 flex-1 animate-pulse rounded sm:w-32" />
            <div className="bg-border h-12 flex-1 animate-pulse rounded sm:w-32" />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6 max-w-3xl">
          <div className="bg-border h-6 w-full animate-pulse rounded" />
          <div className="bg-border mt-2 h-6 w-4/5 animate-pulse rounded" />
        </div>

        <div className="glass-divider" />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-10 lg:col-span-2">
            {/* About */}
            <section>
              <div className="bg-border mb-4 h-6 w-40 animate-pulse rounded" />
              <div className="space-y-3">
                <div className="bg-border h-4 w-full animate-pulse rounded" />
                <div className="bg-border h-4 w-full animate-pulse rounded" />
                <div className="bg-border h-4 w-3/4 animate-pulse rounded" />
              </div>
            </section>

            {/* Highlights */}
            <section>
              <div className="bg-border mb-5 h-6 w-32 animate-pulse rounded" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="glass-card-flat p-5">
                    <div
                      className="bg-border mb-2 h-8 w-8 animate-pulse rounded"
                      style={{ opacity: 0.3 }}
                    />
                    <div className="bg-border h-4 w-full animate-pulse rounded" />
                  </div>
                ))}
              </div>
            </section>

            {/* Screenshots */}
            <section>
              <div className="bg-border mb-5 h-6 w-32 animate-pulse rounded" />
              <div className="border-border/20 bg-surface aspect-video w-full animate-pulse rounded-lg border" />
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <div className="glass-card">
              <div className="bg-border mb-4 h-4 w-24 animate-pulse rounded" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-border h-6 w-16 animate-pulse rounded"
                  />
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="glass-card-flat space-y-4 p-5">
              <div className="bg-border h-4 w-24 animate-pulse rounded" />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="bg-border h-3 w-12 animate-pulse rounded" />
                  <div className="bg-border h-5 w-20 animate-pulse rounded" />
                </div>
                <div className="bg-border h-[2px] w-full animate-pulse rounded" />
                <div className="flex items-center justify-between">
                  <div className="bg-border h-3 w-12 animate-pulse rounded" />
                  <div className="bg-border h-4 w-16 animate-pulse rounded" />
                </div>
                <div className="bg-border h-[2px] w-full animate-pulse rounded" />
                <div className="flex items-center justify-between">
                  <div className="bg-border h-3 w-20 animate-pulse rounded" />
                  <div className="bg-border h-4 w-8 animate-pulse rounded" />
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2">
              <div className="bg-border h-10 w-full animate-pulse rounded" />
              <div className="bg-border h-10 w-full animate-pulse rounded" />
            </div>
          </div>
        </div>

        <div className="glass-divider" />

        {/* Prev/Next Navigation */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="glass-card h-20 animate-pulse" />
          <div className="glass-card h-20 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
