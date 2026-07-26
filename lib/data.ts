import { cache } from "react";
import { unstable_cache } from "next/cache";
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

export const getAllProjects = cache(
  unstable_cache(
    async (): Promise<Project[]> => {
      const result = await db
        .select()
        .from(projects)
        .where(eq(projects.hide, false));
      return result.map(mapProject);
    },
    ["all-projects"],
    { tags: ["projects"], revalidate: 3600 }
  )
);

export const getFeaturedProjects = cache(
  unstable_cache(
    async (): Promise<Project[]> => {
      const result = await db
        .select()
        .from(projects)
        .where(eq(projects.featured, true));
      return result.filter((p) => !p.hide).map(mapProject);
    },
    ["featured-projects"],
    { tags: ["projects"], revalidate: 3600 }
  )
);

export const getProjectBySlug = cache(
  (slug: string): Promise<Project | undefined> =>
    unstable_cache(
      async (s: string): Promise<Project | undefined> => {
        const result = await db
          .select()
          .from(projects)
          .where(eq(projects.slug, s))
          .limit(1);
        return result[0] && !result[0].hide ? mapProject(result[0]) : undefined;
      },
      [`project-${slug}`],
      { tags: ["projects"], revalidate: 3600 }
    )(slug)
);

export const getProjectSlugs = cache(
  unstable_cache(
    async (): Promise<string[]> => {
      const result = await db
        .select({ slug: projects.slug, hide: projects.hide })
        .from(projects);
      return result.filter((p) => !p.hide).map((p) => p.slug);
    },
    ["project-slugs"],
    { tags: ["projects"], revalidate: 3600 }
  )
);

export const getAdjacentProjects = cache(
  async (
    slug: string
  ): Promise<{ prev: Project | null; next: Project | null }> => {
    const allProjects = await getAllProjects();
    const index = allProjects.findIndex((p) => p.slug === slug);
    const prevProject = index > 0 ? (allProjects[index - 1] ?? null) : null;
    const nextProject =
      index < allProjects.length - 1 ? (allProjects[index + 1] ?? null) : null;
    return {
      prev: prevProject,
      next: nextProject,
    };
  }
);

export const getAllBlogs = cache(
  unstable_cache(
    async (): Promise<Blog[]> => {
      const result = await db.select().from(blogs).where(eq(blogs.hide, false));
      return result.map((b) => ({
        ...b,
        url: cleanUrl(b.url),
      })) as Blog[];
    },
    ["all-blogs"],
    { tags: ["blogs"], revalidate: 3600 }
  )
);

export const getBlogById = cache(
  (id: string): Promise<Blog | undefined> =>
    unstable_cache(
      async (bId: string): Promise<Blog | undefined> => {
        const result = await db
          .select()
          .from(blogs)
          .where(eq(blogs.id, bId))
          .limit(1);
        return result[0] && !result[0].hide
          ? ({ ...result[0], url: cleanUrl(result[0].url) } as Blog)
          : undefined;
      },
      [`blog-${id}`],
      { tags: ["blogs"], revalidate: 3600 }
    )(id)
);
