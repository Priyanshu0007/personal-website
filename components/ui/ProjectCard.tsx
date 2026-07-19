"use client";

import Link from "next/link";
import Image from "next/image";
import { trackUserAction, AnalyticsEvents } from "@/lib/analytics";
import type { Project } from "@/types";
import { IMAGE_BLUR_DATA_URL } from "@/utils/constants";

interface ProjectCardProps {
  project: Project;
  index?: number;
  as?: "h2" | "h3";
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

export default function ProjectCard({
  project,
  as: Tag = "h3",
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={["nav-forward"]}
      scroll={false}
      prefetch={true}
      onClick={() => trackUserAction(AnalyticsEvents.PROJECT_VIEW, { project_slug: project.slug, project_name: project.title })}
      className="group block"
      id={`project-card-${project.slug}`}
      aria-label={`View project: ${project.title}`}
    >
      <article
        className="glass-card glass-border-glow glass-sweep flex h-full flex-col overflow-hidden p-0"
        style={
          {
            "--glow-color": categoryColors[project.category],
          } as React.CSSProperties
        }
      >
        {/* Thumbnail */}
        <div
          className="relative aspect-[16/10] w-full overflow-hidden"
          style={{
            backgroundColor: `color-mix(in srgb, ${
              categoryColors[project.category]
            } 15%, transparent)`,
          }}
        >
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={`Thumbnail for ${project.title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              loading="lazy"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_DATA_URL}
            />
          ) : null}

          {/* Favorite badge */}
          {project.isFavorite && (
            <div
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm text-white shadow-md"
              role="img"
              aria-label="Favorite project"
            >
              ★
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span
              className="glass-badge text-xs"
              style={{ backgroundColor: categoryColors[project.category], color: "#000" }}
            >
              {categoryLabels[project.category]}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <Tag className="mb-2 text-xl font-extrabold text-text transition-colors duration-300 group-hover:text-primary">
            {project.title}
          </Tag>

          <p className="mb-4 line-clamp-2 flex-1 text-sm text-text-secondary">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="glass-badge glass-badge-outline text-[0.65rem]"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="glass-badge glass-badge-outline text-[0.65rem]">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border/20 pt-3">
            <span className="text-xs font-bold text-text-muted">
              {new Date(project.createdAt).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-text transition-transform group-hover:translate-x-1">
              View Details →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
