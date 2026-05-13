import { db } from "@/db";
import { projects, blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { LandingData, PersonalData, Project, Blog } from "@/types";

import landingData from "@/data/landing.json";
import personalData from "@/data/personal.json";
import { envConfig } from "@/utils/envConfig";
import { cleanUrl, cleanUrls } from "@/utils/formatters";

/**
 * Helper to clean project data from the database
 */
function mapProject(p: Project): Project {
  return {
    ...p,
    thumbnail: cleanUrl(p.thumbnail),
    images: cleanUrls(p.images),
  };
}

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

export async function getAllProjects(): Promise<Project[]> {
  const result = await db.select().from(projects).where(eq(projects.hide, false));
  return result.map(mapProject);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const result = await db
    .select()
    .from(projects)
    .where(
      eq(projects.featured, true)
    ); // Note: We might need 'and' from drizzle-orm to combine where clauses if featured projects can be hidden, but usually featured ones aren't hidden.
  return result.filter(p => !p.hide).map(mapProject);
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);
  return result[0] && !result[0].hide ? mapProject(result[0]) : undefined;
}

export async function getProjectSlugs(): Promise<string[]> {
  const result = await db.select({ slug: projects.slug, hide: projects.hide }).from(projects);
  return result.filter(p => !p.hide).map((p) => p.slug);
}

export async function getAdjacentProjects(
  slug: string
): Promise<{ prev: Project | null; next: Project | null }> {
  const allProjects = await getAllProjects();
  const index = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = index > 0 ? allProjects[index - 1] ?? null : null;
  const nextProject = index < allProjects.length - 1 ? allProjects[index + 1] ?? null : null;
  return {
    prev: prevProject,
    next: nextProject,
  };
}

export async function getAllBlogs(): Promise<Blog[]> {
  const result = await db.select().from(blogs).where(eq(blogs.hide, false));
  return result.map((b) => ({
    ...b,
    url: cleanUrl(b.url),
  })) as Blog[];
}
