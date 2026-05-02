import { ViewTransition } from "react";
import Link from "next/link";
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

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={["nav-forward"]}
      scroll={false}
      className="group block"
      id={`project-card-${project.slug}`}
    >
      <article className="neo-card h-full flex flex-col overflow-hidden p-0">
        {/* Thumbnail */}
        <ViewTransition name={`project-${project.id}`} share="morph">
          <div
            className="relative w-full aspect-[16/10] overflow-hidden border-b-[3px] border-[var(--color-border)]"
            style={{
              backgroundColor: `${categoryColors[project.category]}20`,
            }}
          >
            {/* Decorative pattern for placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div
                  className="text-5xl md:text-6xl font-extrabold opacity-10"
                  style={{ color: categoryColors[project.category] }}
                >
                  {String(project.id).padStart(2, "0")}
                </div>
                <div
                  className="mt-2 text-sm font-bold uppercase tracking-wider opacity-40"
                  style={{ color: categoryColors[project.category] }}
                >
                  {project.title}
                </div>
              </div>
            </div>

            {/* Favorite badge */}
            {project.isFavorite && (
              <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-[var(--color-primary)] border-[2px] border-[var(--color-border)] text-sm">
                ★
              </div>
            )}

            {/* Category badge */}
            <div
              className="absolute top-3 left-3 px-2 py-1 text-xs font-bold uppercase tracking-wider text-white border-[2px] border-[var(--color-border)]"
              style={{ backgroundColor: categoryColors[project.category] }}
            >
              {categoryLabels[project.category]}
            </div>
          </div>
        </ViewTransition>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="text-xl font-extrabold mb-2 group-hover:text-[var(--color-secondary)] transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-2 flex-1">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
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
          <div className="flex items-center justify-between pt-3 border-t-[2px] border-[var(--color-border)]">
            <span className="text-xs text-[var(--color-text-muted)] font-bold">
              {new Date(project.createdAt).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="text-sm font-bold text-[var(--color-secondary)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              View Details →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
