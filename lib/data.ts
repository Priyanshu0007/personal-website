import type { LandingData, PersonalData, Project, Blog } from "@/types";

import landingData from "@/data/landing.json";
import personalData from "@/data/personal.json";
import projectsData from "@/data/projects.json";
import blogsData from "@/data/blogs.json";
import { envConfig } from "@/utils/envConfig";

export function getPersonalData(): PersonalData {
  const data = { ...personalData } as PersonalData;
  if (envConfig.resumeUrl) {
    data.resumeUrl = envConfig.resumeUrl;
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
