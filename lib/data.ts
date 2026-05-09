import { db } from "@/db";
import { projects, blogs } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import type { LandingData, PersonalData, Project, Blog } from "@/types";

import landingData from "@/data/landing.json";
import personalData from "@/data/personal.json";
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

export async function getAllProjects(): Promise<Project[]> {
  const result = await db.select().from(projects);
  // @ts-ignore - mapping schema to type
  return result as Project[];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.featured, true));
  // @ts-ignore - mapping schema to type
  return result as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);
  // @ts-ignore - mapping schema to type
  return result[0] as Project | undefined;
}

export async function getProjectSlugs(): Promise<string[]> {
  const result = await db.select({ slug: projects.slug }).from(projects);
  return result.map((p) => p.slug);
}

export async function getAdjacentProjects(
  slug: string
): Promise<{ prev: Project | null; next: Project | null }> {
  const allProjects = await getAllProjects();
  const index = allProjects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? allProjects[index - 1] : null,
    next: index < allProjects.length - 1 ? allProjects[index + 1] : null,
  };
}

export async function getAllBlogs(): Promise<Blog[]> {
  const result = await db.select().from(blogs);
  return result as Blog[];
}
