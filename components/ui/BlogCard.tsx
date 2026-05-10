import { Blog } from "@/types";
import { trackUserAction, AnalyticsEvents } from "@/lib/analytics";

interface BlogCardProps {
  blog: Blog;
  index: number;
  as?: "h2" | "h3";
}

export default function BlogCard({
  blog,
  index,
  as: Tag = "h3",
}: BlogCardProps) {
  const bgColors = [
    "var(--color-primary)",
    "var(--color-secondary)",
    "var(--color-tertiary)",
    "var(--color-accent-purple)",
  ];
  const color = bgColors[index % bgColors.length];

  return (
    <a
      href={blog.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackUserAction(AnalyticsEvents.BLOG_VIEW, { blog_title: blog.title, platform: blog.platform })}
      className="group block h-full"
      aria-label={`Read article: ${blog.title} on ${blog.platform}`}
    >
      <article className="neo-card flex h-full flex-col overflow-hidden p-0">
        {/* Thumbnail Area */}
        <div
          className="relative h-32 w-full overflow-hidden border-b-[3px] border-[var(--color-border)]"
          style={{
            backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
          }}
        >
          {/* Decorative Number */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform group-hover:scale-110"
            aria-hidden="true"
          >
            <div className="text-6xl font-black text-[var(--color-text-muted)] opacity-80">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Decorative geometric patterns */}
          <div
            className="absolute top-0 right-0 h-24 w-24 origin-top-right rounded-bl-full bg-black/5 transition-transform group-hover:scale-110"
            aria-hidden="true"
          />

          {/* Platform badge */}
          <div
            className="absolute top-3 left-3 border-[2px] border-[var(--color-border)] px-2 py-1 text-xs font-bold tracking-wider text-black uppercase"
            style={{ backgroundColor: color }}
          >
            {blog.platform}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2">
            <span className="text-xs font-bold text-[var(--color-text-muted)]">
              {blog.date}
            </span>
          </div>

          <Tag className="mb-3 line-clamp-2 text-xl leading-tight font-black transition-opacity group-hover:opacity-80 md:text-2xl">
            {blog.title}
          </Tag>

          <p className="mb-6 line-clamp-3 flex-1 text-sm text-[var(--color-text-secondary)]">
            {blog.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between border-t-[2px] border-[var(--color-border)] pt-3">
            <span
              className="inline-flex items-center gap-1 text-sm font-bold tracking-wider uppercase transition-transform group-hover:translate-x-1 text-[var(--color-text)]"
            >
              Read Article
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth="3"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </a>
  );
}
