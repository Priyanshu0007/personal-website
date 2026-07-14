import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getProjectBySlug,
  getProjectSlugs,
  getAdjacentProjects,
  getPersonalData,
} from "@/lib/data";
import BackButton from "@/components/ui/BackButton";
import dynamic from "next/dynamic";

// Revalidate every hour (3600 seconds) - ISR for incremental updates
export const revalidate = 3600;

const ScreenshotCarousel = dynamic(
  () => import("@/components/ui/ScreenshotCarousel"),
  {
    loading: () => (
      <div className="aspect-video w-full animate-pulse rounded-lg border-[3px] border-border bg-surface" />
    ),
    ssr: true,
  }
);

// Pre-generate all project pages at build time
export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Dynamic metadata per project
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
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
      images: project.images[0] ? [project.images[0]] : [],
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

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const personal = getPersonalData();

  if (!project) {
    notFound();
  }

  const { prev, next } = await getAdjacentProjects(slug);
  const rawColor = categoryRawColors[project.category] || "#3B82F6";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: personal.seo.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${personal.seo.siteUrl}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${personal.seo.siteUrl}/projects/${slug}`,
      },
    ],
  };

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    author: {
      "@type": "Person",
      name: personal.name,
    },
    datePublished: project.createdAt,
    image: project.thumbnail,
    url: `${personal.seo.siteUrl}/projects/${slug}`,
    keywords: project.techStack.join(", "),
  };

  return (
    <article className="section pt-6" id="project-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <div className="container">
        {/* Back link */}
        <BackButton />

        {/* ============================================
            HERO BANNER
            ============================================ */}
        <div
          className="relative mb-8 aspect-[16/9] w-full overflow-hidden border-[3px] border-border"
          style={{
            backgroundColor: `${categoryColors[project.category]}15`,
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {project.category === "react-native" && (
            <Image
              src={project.thumbnail}
              alt=""
              fill
              className="object-cover opacity-40 blur-2xl scale-110"
              aria-hidden="true"
            />
          )}
          <Image
            src={project.thumbnail}
            alt={`Main screenshot for ${project.title}`}
            fill
            className="object-contain z-10"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />

          {/* Gradient overlay for readability */}
          <div
            className="absolute inset-0 z-20"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
            }}
            aria-hidden="true"
          />


          {/* Category badge on hero */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
            <span
              className="neo-badge text-xs"
              style={{
                backgroundColor: rawColor,
                color: "#000000",
              }}
            >
              <span role="img" aria-label="Project category" className="mr-1">
                {categoryEmojis[project.category]}
              </span>{" "}
              {categoryLabels[project.category]}
            </span>
            {project.isFavorite && (
              <span className="neo-badge neo-badge-secondary text-xs">
                <span role="img" aria-label="Favorite" className="mr-1">
                  ★
                </span>{" "}
                Favorite
              </span>
            )}
          </div>
        </div>

        {/* ============================================
            PROJECT HEADER
            ============================================ */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="mb-2 block text-sm font-bold text-text-muted">
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
          <div className="mt-2 flex w-full shrink-0 flex-col gap-3 sm:flex-row md:mt-0 md:w-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn neo-btn-primary w-full sm:w-auto"
                id="project-live-link"
                aria-label={`View live demo of ${project.title}`}
              >
                <span role="img" aria-label="Globe" className="mr-1">
                  🌐
                </span>{" "}
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn neo-btn-secondary w-full sm:w-auto"
                id="project-github-link"
                aria-label={`View source code of ${project.title} on GitHub`}
              >
                <span role="img" aria-label="Computer" className="mr-1">
                  💻
                </span>{" "}
                Source Code
              </a>
            )}
          </div>
        </div>

        {/* Short description tagline */}
        <p
          className="mb-6 max-w-3xl text-lg leading-relaxed md:text-xl"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {project.description}
        </p>

        <div className="neo-divider" />

        {/* ============================================
            MAIN CONTENT: TWO COLUMN LAYOUT
            ============================================ */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Left column: Main content */}
          <div className="space-y-10 lg:col-span-2">
            {/* About section */}
            <section>
              <h2
                className="mb-4 flex items-center gap-2 text-xl font-extrabold"
                style={{
                  fontFamily: "var(--font-heading), system-ui, sans-serif",
                }}
              >
                <span
                  className="inline-block h-1 w-8"
                  style={{ backgroundColor: rawColor }}
                  aria-hidden="true"
                />
                About This Project
              </h2>
              {project.longDescription.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="mb-4 text-lg leading-relaxed text-text-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </section>

            {/* Key Highlights - redesigned as feature cards */}
            {project.highlights.length > 0 && (
              <section>
                <h2
                  className="mb-5 flex items-center gap-2 text-xl font-extrabold"
                  style={{
                    fontFamily: "var(--font-heading), system-ui, sans-serif",
                  }}
                >
                  <span
                    className="inline-block h-1 w-8"
                    style={{ backgroundColor: rawColor }}
                    aria-hidden="true"
                  />
                  Key Features
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {project.highlights.map((highlight, i) => (
                    <div
                      key={highlight}
                      className="relative border-[3px] border-border bg-surface p-5 transition-all hover:translate-x-[-3px] hover:translate-y-[-3px]"
                      style={{
                        boxShadow: "var(--shadow-md)",
                      }}
                    >
                      {/* Feature number */}
                      <span
                        className="mb-2 block text-3xl font-extrabold opacity-30"
                        style={{ color: rawColor }}
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm leading-tight font-bold">
                        {highlight}
                      </span>
                      {/* Corner accent */}
                      <div
                        className="absolute right-0 bottom-0 h-4 w-4"
                        style={{ backgroundColor: rawColor }}
                        aria-hidden="true"
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
                  className="mb-5 flex items-center gap-2 text-xl font-extrabold"
                  style={{
                    fontFamily: "var(--font-heading), system-ui, sans-serif",
                  }}
                >
                  <span
                    className="inline-block h-1 w-8"
                    style={{ backgroundColor: rawColor }}
                    aria-hidden="true"
                  />
                  Screenshots
                </h2>
                <ScreenshotCarousel
                  images={project.images}
                  title={project.title}
                  accentColor={rawColor}
                  isMobile={project.category === "react-native"}
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
              <h3 className="mb-4 flex items-center gap-2 text-sm font-extrabold tracking-wider text-text-muted uppercase">
                <span className="text-base" role="img" aria-label="Tools">
                  🛠
                </span>
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
              className="space-y-4 border-[3px] border-border p-5"
              style={{
                backgroundColor: "var(--color-surface)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <h3 className="flex items-center gap-2 text-sm font-extrabold tracking-wider text-text-muted uppercase">
                <span className="text-base" role="img" aria-label="Clipboard">
                  📋
                </span>
                Project Info
              </h3>

              <div className="space-y-3">
                {/* Category */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-text-muted uppercase">
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
                  className="h-[2px] w-full"
                  style={{
                    backgroundColor: "var(--color-border)",
                    opacity: 0.2,
                  }}
                />

                {/* Date */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-text-muted uppercase">
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
                  className="h-[2px] w-full"
                  style={{
                    backgroundColor: "var(--color-border)",
                    opacity: 0.2,
                  }}
                />

                {/* Stack count */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-text-muted uppercase">
                    Technologies
                  </span>
                  <span className="text-sm font-extrabold">
                    {project.techStack.length}
                  </span>
                </div>

                <div
                  className="h-[2px] w-full"
                  style={{
                    backgroundColor: "var(--color-border)",
                    opacity: 0.2,
                  }}
                />

                {/* Screenshots */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider text-text-muted uppercase">
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
              className="relative overflow-hidden border-[3px] border-border p-5"
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
                <span
                  className="block text-5xl leading-none font-extrabold text-white"
                  role="img"
                  aria-label="Category icon"
                >
                  {categoryEmojis[project.category]}
                </span>
                <span className="mt-2 block text-sm font-bold text-white opacity-90">
                  {categoryLabels[project.category]} Project
                </span>
                <span className="mt-1 block text-xs text-white opacity-70">
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
                  aria-label={`View live demo of ${project.title}`}
                >
                  <span role="img" aria-label="Globe" className="mr-1">
                    🌐
                  </span>{" "}
                  View Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn neo-btn-secondary w-full text-sm"
                  aria-label={`View source code of ${project.title} on GitHub`}
                >
                  <span role="img" aria-label="Computer" className="mr-1">
                    💻
                  </span>{" "}
                  View Source Code
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="neo-divider" />

        {/* ============================================
            PREV / NEXT NAVIGATION
            ============================================ */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              transitionTypes={["nav-back"]}
              scroll={false}
              prefetch={true}
              className="neo-card group flex flex-col"
              id="project-prev"
            >
              <span className="mb-1 text-xs font-bold tracking-wider text-text-muted uppercase">
                ← Previous Project
              </span>
              <span className="font-extrabold transition-colors group-hover:text-secondary">
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
              prefetch={true}
              className="neo-card group flex flex-col text-right"
              id="project-next"
            >
              <span className="mb-1 text-xs font-bold tracking-wider text-text-muted uppercase">
                Next Project →
              </span>
              <span className="font-extrabold transition-colors group-hover:text-secondary">
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
