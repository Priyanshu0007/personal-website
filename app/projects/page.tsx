import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProjects, getPersonalData } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectFilters from "@/components/ui/ProjectFilters";
import type { ProjectCategory, SortOrder } from "@/types";

// Revalidate every hour (3600 seconds) - ISR for incremental updates
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Priyanshu Gupta's portfolio of web and mobile projects built with React, Next.js, React Native, TypeScript, and more.",
  openGraph: {
    title: "Projects | Priyanshu Gupta",
    description:
      "Explore Priyanshu Gupta's portfolio of web and mobile projects built with React, Next.js, React Native, TypeScript, and more.",
    type: "website",
  },
  alternates: {
    canonical: "/projects",
  },
};

interface ProjectsPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    favorites?: string;
  }>;
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const personal = getPersonalData();
  const params = await searchParams;
  const category = (params.category as ProjectCategory) || "all";
  const sort = (params.sort as SortOrder) || "newest";
  const showFavorites = params.favorites === "true";

  let projects = await getAllProjects();

  // Filter by category
  if (category !== "all") {
    projects = projects.filter((p) => p.category === category);
  }

  // Filter favorites
  if (showFavorites) {
    projects = projects.filter((p) => p.isFavorite);
  }

  // Sort
  projects = [...projects].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sort === "newest" ? dateB - dateA : dateA - dateB;
  });

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
    ],
  };

  return (
    <section className="section" id="projects-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container">
        <SectionHeading
          title="All Projects"
          subtitle="Everything I've built — from side projects to production apps."
          accent="var(--color-secondary)"
          as="h1"
        />

        {/* Filters */}
        <Suspense fallback={null}>
          <ProjectFilters />
        </Suspense>

        {/* Project Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                as="h2"
              />
            ))}
          </div>
        ) : (
          <div className="glass-card-flat py-16 text-center">
            <p className="mb-4 text-5xl">🔍</p>
            <h3 className="mb-2 text-xl font-extrabold">No projects found</h3>
            <p className="text-text-muted">
              Try adjusting your filters to see more projects.
            </p>
          </div>
        )}

        {/* Count */}
        <div className="mt-8 text-center">
          <p className="text-text-muted text-sm font-bold tracking-wider uppercase">
            Showing {projects.length} project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
