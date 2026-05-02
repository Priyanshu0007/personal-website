import type { Metadata } from "next";
import { Suspense, ViewTransition } from "react";
import { getAllProjects } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectFilters from "@/components/ui/ProjectFilters";
import type { ProjectCategory, SortOrder } from "@/types";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of web and mobile projects built with React, Next.js, React Native, and more.",
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
  const params = await searchParams;
  const category = (params.category as ProjectCategory) || "all";
  const sort = (params.sort as SortOrder) || "newest";
  const showFavorites = params.favorites === "true";

  let projects = getAllProjects();

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
      <section className="section" id="projects-page">
        <div className="container">
          <SectionHeading
            title="All Projects"
            subtitle="Everything I've built — from side projects to production apps."
            accent="var(--color-secondary)"
          />

          {/* Filters */}
          <Suspense fallback={null}>
            <ProjectFilters />
          </Suspense>

          {/* Project Grid */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          ) : (
            <div className="neo-card-flat text-center py-16">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="text-xl font-extrabold mb-2">No projects found</h3>
              <p className="text-[var(--color-text-muted)]">
                Try adjusting your filters to see more projects.
              </p>
            </div>
          )}

          {/* Count */}
          <div className="mt-8 text-center">
            <p className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
              Showing {projects.length} project{projects.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </section>
    </ViewTransition>
  );
}
