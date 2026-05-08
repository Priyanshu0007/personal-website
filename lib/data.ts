import type { LandingData, PersonalData, Project, Blog } from "@/types";

import landingData from "@/data/landing.json";
import personalData from "@/data/personal.json";
import projectsData from "@/data/projects.json";
import blogsData from "@/data/blogs.json";

export function getPersonalData(): PersonalData {
  const data = { ...personalData } as PersonalData;
  if (process.env.NEXT_PUBLIC_RESUME_URL) {
    data.resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL;
  }
  return data;
}

export function getLandingData(): LandingData {
  return landingData as LandingData;
}

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getFeaturedProjects(): Project[] {
  return (projectsData as Project[]).filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return (projectsData as Project[]).find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return (projectsData as Project[]).map((p) => p.slug);
}

export function getAdjacentProjects(
  slug: string
): { prev: Project | null; next: Project | null } {
  const projects = projectsData as Project[];
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}

export function getAllBlogs(): Blog[] {
  return blogsData as Blog[];
}
