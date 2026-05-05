import Link from "next/link";
import { Blog } from "@/types";

interface BlogCardProps {
  blog: Blog;
  index: number;
}

export default function BlogCard({ blog, index }: BlogCardProps) {
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
      className="group block h-full"
    >
      <article className="neo-card h-full flex flex-col overflow-hidden p-0">
        {/* Thumbnail Area */}
        <div 
          className="relative w-full h-32 overflow-hidden border-b-[3px] border-[var(--color-border)]"
          style={{ backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)` }}
        >
          {/* Decorative Number */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-60 transition-opacity">
            <div className="text-6xl font-black" style={{ color: color }}>
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>
          
          {/* Decorative geometric patterns */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-black/5 rounded-bl-full group-hover:scale-110 transition-transform origin-top-right" />

          {/* Platform badge */}
          <div 
            className="absolute top-3 left-3 px-2 py-1 text-xs font-bold uppercase tracking-wider text-white border-[2px] border-[var(--color-border)]"
            style={{ backgroundColor: color }}
          >
            {blog.platform}
          </div>
        </div>
        
        <div className="flex flex-col flex-1 p-5">
          <div className="mb-2">
            <span className="text-xs font-bold text-[var(--color-text-muted)]">
              {blog.date}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-black mb-3 group-hover:opacity-80 transition-opacity line-clamp-2 leading-tight">
            {blog.title}
          </h3>

          <p className="text-sm text-[var(--color-text-secondary)] mb-6 flex-1 line-clamp-3">
            {blog.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t-[2px] border-[var(--color-border)]">
             <span className="text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center gap-1" style={{ color: color }}>
              Read Article
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </a>
  );
}
