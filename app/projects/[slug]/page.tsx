import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProjectBySlug,
  getProjectSlugs,
  getAdjacentProjects,
} from "@/lib/data";
import BackButton from "@/components/ui/BackButton";
import ScreenshotCarousel from "@/components/ui/ScreenshotCarousel";

// Pre-generate all project pages at build time
export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Dynamic metadata per project
export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: `${
      project.description
    } Built by Priyanshu Gupta with ${project.techStack
      .slice(0, 3)
      .join(", ")}.`,
    keywords: [
      project.title,
      ...project.techStack,
      "Priyanshu Gupta",
      "portfolio project",
    ],
    openGraph: {
      title: `${project.title} | Priyanshu Gupta`,
      description: project.description,
      type: "article",
      images: project.images.length > 0 ? [project.images[0]] : [],
    },
    alternates: {
      canonical: `/projects/${slug}`,
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

const categoryEmojis: Record<string, string> = {
  "react-js": "⚛️",
  "react-native": "📱",
  "next-js": "▲",
  other: "🔧",
};

// Raw accent color values for inline styles where CSS vars won't work
const categoryRawColors: Record<string, string> = {
  "react-js": "#F59E0B",
  "react-native": "#8B5CF6",
  "next-js": "#F43F5E",
  other: "#F97316",
};

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[slug]">
) {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = await getAdjacentProjects(slug);
  const rawColor = categoryRawColors[project.category];

  return (
    <article className="section pt-6" id="project-detail">
      <div className="container">
        {/* Back link */}
        <BackButton />

        {/* ============================================
            HERO BANNER
            ============================================ */}
        <div
          className="relative w-full aspect-[16/9] mb-8 border-[3px] border-[var(--color-border)] overflow-hidden"
          style={{
            backgroundColor: `${categoryColors[project.category]}15`,
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <img
            src={project.thumbnail}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient overlay for readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
            }}
          />

          {/* Floating project number */}
          <div
            className="absolute top-4 left-4 w-14 h-14 flex items-center justify-center border-[3px] border-[var(--color-border)] font-extrabold text-lg"
            style={{
              backgroundColor: rawColor,
              color: "#fff",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {String(project.id).padStart(2, "0")}
          </div>

          {/* Category badge on hero */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span
              className="neo-badge text-xs"
              style={{
                backgroundColor: rawColor,
                color: "#FFFFFF",
              }}
            >
              {categoryEmojis[project.category]}{" "}
              {categoryLabels[project.category]}
            </span>
            {project.isFavorite && (
              <span className="neo-badge neo-badge-secondary text-xs">
                ★ Favorite
              </span>
            )}
          </div>
        </div>

        {/* ============================================
            PROJECT HEADER
            ============================================ */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <span className="text-sm text-[var(--color-text-muted)] font-bold block mb-2">
              {new Date(project.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
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
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 mt-2 md:mt-0">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn neo-btn-primary w-full sm:w-auto"
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
                className="neo-btn neo-btn-secondary w-full sm:w-auto"
                id="project-github-link"
              >
                💻 Source Code
              </a>
            )}
          </div>
        </div>

        {/* Short description tagline */}
        <p
          className="text-lg md:text-xl leading-relaxed mb-6 max-w-3xl"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {project.description}
        </p>

        <div className="neo-divider" />

        {/* ============================================
            MAIN CONTENT: TWO COLUMN LAYOUT
            ============================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left column: Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* About section */}
            <section>
              <h2
                className="text-xl font-extrabold mb-4 flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-heading), system-ui, sans-serif",
                }}
              >
                <span
                  className="inline-block w-8 h-1"
                  style={{ backgroundColor: rawColor }}
                />
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
            </section>

            {/* Key Highlights - redesigned as feature cards */}
            {project.highlights.length > 0 && (
              <section>
                <h2
                  className="text-xl font-extrabold mb-5 flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-heading), system-ui, sans-serif",
                  }}
                >
                  <span
                    className="inline-block w-8 h-1"
                    style={{ backgroundColor: rawColor }}
                  />
                  Key Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.highlights.map((highlight, i) => (
                    <div
                      key={highlight}
                      className="relative p-5 border-[3px] border-[var(--color-border)] bg-[var(--color-surface)] transition-all hover:translate-x-[-3px] hover:translate-y-[-3px]"
                      style={{
                        boxShadow: "var(--shadow-md)",
                      }}
                    >
                      {/* Feature number */}
                      <span
                        className="block text-3xl font-extrabold mb-2 opacity-30"
                        style={{ color: rawColor }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-bold leading-tight">
                        {highlight}
                      </span>
                      {/* Corner accent */}
                      <div
                        className="absolute bottom-0 right-0 w-4 h-4"
                        style={{ backgroundColor: rawColor }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ============================================
                SCREENSHOT CAROUSEL
                ============================================ */}
            {project.images.length > 0 && (
              <section>
                <h2
                  className="text-xl font-extrabold mb-5 flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-heading), system-ui, sans-serif",
                  }}
                >
                  <span
                    className="inline-block w-8 h-1"
                    style={{ backgroundColor: rawColor }}
                  />
                  Screenshots
                </h2>
                <ScreenshotCarousel
                  images={project.images}
                  title={project.title}
                  accentColor={rawColor}
                />
              </section>
            )}
          </div>

          {/* ============================================
              RIGHT SIDEBAR
              ============================================ */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <div className="neo-card">
              <h3 className="text-sm font-extrabold uppercase tracking-wider mb-4 text-[var(--color-text-muted)] flex items-center gap-2">
                <span className="text-base">🛠</span>
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

            {/* Project Info Card */}
            <div
              className="border-[3px] border-[var(--color-border)] p-5 space-y-4"
              style={{
                backgroundColor: "var(--color-surface)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-2">
                <span className="text-base">📋</span>
                Project Info
              </h3>

              <div className="space-y-3">
                {/* Category */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Type
                  </span>
                  <span
                    className="neo-badge text-xs"
                    style={{
                      backgroundColor: rawColor,
                      color: "#fff",
                    }}
                  >
                    {categoryLabels[project.category]}
                  </span>
                </div>

                <div
                  className="w-full h-[2px]"
                  style={{
                    backgroundColor: "var(--color-border)",
                    opacity: 0.2,
                  }}
                />

                {/* Date */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Date
                  </span>
                  <span className="text-sm font-extrabold">
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div
                  className="w-full h-[2px]"
                  style={{
                    backgroundColor: "var(--color-border)",
                    opacity: 0.2,
                  }}
                />

                {/* Stack count */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Technologies
                  </span>
                  <span className="text-sm font-extrabold">
                    {project.techStack.length}
                  </span>
                </div>

                <div
                  className="w-full h-[2px]"
                  style={{
                    backgroundColor: "var(--color-border)",
                    opacity: 0.2,
                  }}
                />

                {/* Screenshots */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Screenshots
                  </span>
                  <span className="text-sm font-extrabold">
                    {project.images.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick stats decorative card */}
            <div
              className="relative border-[3px] border-[var(--color-border)] p-5 overflow-hidden"
              style={{
                backgroundColor: rawColor,
                boxShadow: "var(--shadow-md)",
              }}
            >
              {/* Background pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    rgba(255,255,255,0.3) 10px,
                    rgba(255,255,255,0.3) 20px
                  )`,
                }}
              />
              <div className="relative z-10">
                <span className="text-5xl font-extrabold text-white block leading-none">
                  {categoryEmojis[project.category]}
                </span>
                <span className="text-white text-sm font-bold mt-2 block opacity-90">
                  {categoryLabels[project.category]} Project
                </span>
                <span className="text-white text-xs mt-1 block opacity-70">
                  Built with {project.techStack[0]}
                  {project.techStack.length > 1
                    ? ` + ${project.techStack.length - 1} more`
                    : ""}
                </span>
              </div>
            </div>

            {/* CTA actions - compact sidebar */}
            <div className="space-y-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn neo-btn-primary w-full text-sm"
                >
                  🌐 View Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn neo-btn-secondary w-full text-sm"
                >
                  💻 View Source Code
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="neo-divider" />

        {/* ============================================
            PREV / NEXT NAVIGATION
            ============================================ */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              transitionTypes={["nav-back"]}
              scroll={false}
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
              scroll={false}
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
  );
}
