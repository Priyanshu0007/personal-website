import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import Link from "next/link";
import {
  getProjectBySlug,
  getProjectSlugs,
  getAdjacentProjects,
} from "@/lib/data";

// Pre-generate all project pages at build time
export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

// Dynamic metadata per project
export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      images: project.images.length > 0 ? [project.images[0]] : [],
    },
  };
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

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[slug]">
) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      <article className="section" id="project-detail">
        <div className="container">
          {/* Back link */}
          <Link
            href="/projects"
            transitionTypes={["nav-back"]}
            className="inline-flex items-center gap-2 mb-8 text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors"
            id="project-back"
          >
            ← Back to Projects
          </Link>

          {/* Hero Image */}
          <ViewTransition name={`project-${project.id}`} share="morph">
            <div
              className="relative w-full aspect-[16/9] mb-8 border-[3px] border-[var(--color-border)] overflow-hidden"
              style={{
                backgroundColor: `${categoryColors[project.category]}15`,
                boxShadow: "var(--shadow-lg)",
              }}
            >
              {/* Decorative placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="text-7xl md:text-9xl font-extrabold opacity-10"
                    style={{ color: categoryColors[project.category] }}
                  >
                    {String(project.id).padStart(2, "0")}
                  </div>
                  <div
                    className="mt-4 text-xl md:text-2xl font-extrabold uppercase tracking-wider opacity-30"
                    style={{ color: categoryColors[project.category] }}
                  >
                    {project.title}
                  </div>
                </div>
              </div>
            </div>
          </ViewTransition>

          {/* Project Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
            <div>
              {/* Category + Date */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="neo-badge text-xs"
                  style={{
                    backgroundColor: categoryColors[project.category],
                    color: "#FFFFFF",
                  }}
                >
                  {categoryLabels[project.category]}
                </span>
                {project.isFavorite && (
                  <span className="neo-badge text-xs">★ Favorite</span>
                )}
                <span className="text-sm text-[var(--color-text-muted)] font-bold">
                  {new Date(project.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-3xl md:text-5xl"
                style={{
                  fontFamily: "var(--font-heading), system-ui, sans-serif",
                }}
              >
                {project.title}
              </h1>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 shrink-0">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn neo-btn-primary"
                  id="project-live-link"
                >
                  🌐 Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn neo-btn-secondary"
                  id="project-github-link"
                >
                  💻 Source Code
                </a>
              )}
            </div>
          </div>

          <div className="neo-divider" />

          {/* Description */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <h2
                className="text-xl font-extrabold mb-4"
                style={{
                  fontFamily: "var(--font-heading), system-ui, sans-serif",
                }}
              >
                About This Project
              </h2>
              {project.longDescription.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-lg leading-relaxed mb-4 text-[var(--color-text-secondary)]"
                >
                  {paragraph}
                </p>
              ))}

              {/* Highlights */}
              {project.highlights.length > 0 && (
                <div className="mt-8">
                  <h3
                    className="text-lg font-extrabold mb-4"
                    style={{
                      fontFamily:
                        "var(--font-heading), system-ui, sans-serif",
                    }}
                  >
                    Key Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {project.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="neo-card-flat p-4 text-center"
                      >
                        <span className="text-sm font-bold">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tech Stack */}
              <div className="neo-card">
                <h3
                  className="text-sm font-extrabold uppercase tracking-wider mb-4 text-[var(--color-text-muted)]"
                >
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="neo-badge neo-badge-outline text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="neo-card">
                <h3 className="text-sm font-extrabold uppercase tracking-wider mb-4 text-[var(--color-text-muted)]">
                  Links
                </h3>
                <div className="space-y-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm font-bold text-[var(--color-tertiary)] hover:text-[var(--color-secondary)] transition-colors underline underline-offset-4"
                    >
                      🌐 {project.liveUrl.replace("https://", "")}
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm font-bold text-[var(--color-tertiary)] hover:text-[var(--color-secondary)] transition-colors underline underline-offset-4"
                    >
                      💻 {project.githubUrl.replace("https://github.com/", "")}
                    </a>
                  )}
                </div>
              </div>

              {/* Date */}
              <div className="neo-card-flat p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Created
                </span>
                <p className="font-extrabold mt-1">
                  {new Date(project.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mt-12">
            <h2
              className="text-xl font-extrabold mb-6"
              style={{
                fontFamily: "var(--font-heading), system-ui, sans-serif",
              }}
            >
              Screenshots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((image, i) => (
                <div
                  key={i}
                  className="aspect-video border-[3px] border-[var(--color-border)] overflow-hidden"
                  style={{
                    backgroundColor: `${categoryColors[project.category]}10`,
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                      Screenshot {i + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="neo-divider" />

          {/* Navigation: Previous / Next */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                transitionTypes={["nav-back"]}
                className="neo-card group flex flex-col"
                id="project-prev"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                  ← Previous Project
                </span>
                <span className="font-extrabold group-hover:text-[var(--color-secondary)] transition-colors">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                transitionTypes={["nav-forward"]}
                className="neo-card group flex flex-col text-right"
                id="project-next"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                  Next Project →
                </span>
                <span className="font-extrabold group-hover:text-[var(--color-secondary)] transition-colors">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </article>
    </ViewTransition>
  );
}
