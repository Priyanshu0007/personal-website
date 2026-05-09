import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const categoryColors: Record<string, string> = {
  "react-js": "var(--color-tertiary)",
  "react-native": "var(--color-accent-purple)",
  "next-js": "var(--color-secondary)",
  other: "var(--color-accent-orange)",
};

const categoryLabels: Record<string, string> = {
  "react-js": "React JS",
  "react-native": "React Native",
  "next-js": "Next.js",
  other: "Other",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={["nav-forward"]}
      scroll={false}
      className="group block"
      id={`project-card-${project.slug}`}
      aria-label={`View project: ${project.title}`}
    >
      <article className="neo-card flex h-full flex-col overflow-hidden p-0">
        {/* Thumbnail */}
        <div
          className="relative aspect-[16/10] w-full overflow-hidden border-b-[3px] border-[var(--color-border)]"
          style={{
            backgroundColor: `color-mix(in srgb, ${
              categoryColors[project.category]
            } 15%, transparent)`,
          }}
        >
          {/* Thumbnail Image */}
          <Image
            src={project.thumbnail}
            alt={`Thumbnail for ${project.title}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            loading="lazy"
          />

          {/* Favorite badge */}
          {project.isFavorite && (
            <div
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center border-[2px] border-[var(--color-border)] bg-[var(--color-primary)] text-sm"
              role="img"
              aria-label="Favorite project"
            >
              ★
            </div>
          )}

          {/* Category badge */}
          <div
            className="absolute top-3 left-3 border-[2px] border-[var(--color-border)] px-2 py-1 text-xs font-bold tracking-wider text-white uppercase"
            style={{ backgroundColor: categoryColors[project.category] }}
          >
            {categoryLabels[project.category]}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <div className="relative mb-2 h-7 overflow-hidden">
            <h3 className="absolute inset-0 overflow-hidden text-xl font-extrabold text-ellipsis whitespace-nowrap transition-opacity group-hover:opacity-0">
              {project.title}
            </h3>
            <div
              className="pointer-events-none absolute inset-0 flex items-center opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            >
              <div
                className="marquee-track [animation-play-state:paused] group-hover:[animation-play-state:running]"
                style={{ animationDuration: "6s" }}
              >
                {[...Array(8)].map((_, i) => (
                  <span
                    key={i}
                    className="mr-8 text-xl font-extrabold whitespace-nowrap"
                  >
                    {project.title}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="mb-4 line-clamp-2 flex-1 text-sm text-[var(--color-text-secondary)]">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="neo-badge neo-badge-outline text-[0.65rem]"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="neo-badge neo-badge-outline text-[0.65rem]">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t-[2px] border-[var(--color-border)] pt-3">
            <span className="text-xs font-bold text-[var(--color-text-muted)]">
              {new Date(project.createdAt).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-[var(--color-secondary)] transition-transform group-hover:translate-x-1">
              View Details →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
