"use client";

import Image from "next/image";
import { Blog } from "@/types";
import { trackUserAction, AnalyticsEvents } from "@/lib/analytics";
import { IMAGE_BLUR_DATA_URL } from "@/utils/constants";

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
      <article
        className="glass-card glass-card-interactive glass-border-glow glass-sweep flex h-full flex-col overflow-hidden p-0"
        style={
          {
            "--glow-color": color,
          } as React.CSSProperties
        }
      >
        {/* Thumbnail Area */}
        <div
          className="relative h-32 w-full overflow-hidden"
          style={{
            background: `radial-gradient(circle at top right, color-mix(in srgb, ${color} 25%, transparent) 0%, color-mix(in srgb, ${color} 5%, transparent) 100%)`,
          }}
        >
          {blog.thumbnail ? (
            <Image
              src={blog.thumbnail}
              alt={`Thumbnail for ${blog.title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              loading="lazy"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_DATA_URL}
            />
          ) : null}
          {/* Decorative Number */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform group-hover:scale-110"
            aria-hidden="true"
          >
            <div className="text-6xl font-black text-text-muted opacity-80">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Decorative geometric patterns */}
          <div
            className="absolute top-0 right-0 h-24 w-24 origin-top-right rounded-bl-full bg-black/5 transition-transform group-hover:scale-110"
            aria-hidden="true"
          />

          {/* Platform badge */}
          <div className="absolute top-3 left-3">
            <span
              className="glass-badge text-xs"
              style={{ backgroundColor: color, color: "#fff" }}
            >
              {blog.platform}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2">
            <span className="text-xs font-bold text-text-muted">
              {blog.date}
            </span>
          </div>

          <Tag className="mb-3 line-clamp-2 text-xl leading-tight font-black transition-opacity group-hover:opacity-80 md:text-2xl">
            {blog.title}
          </Tag>

          <p className="mb-6 line-clamp-3 flex-1 text-sm text-text-secondary">
            {blog.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border/20 pt-3">
            <span
              className="inline-flex items-center gap-1 text-sm font-bold tracking-wider uppercase transition-transform group-hover:translate-x-1 text-text"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
