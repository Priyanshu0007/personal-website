import type { MetadataRoute } from "next";
import { getProjectSlugs, getPersonalData, getAllBlogs } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const personal = getPersonalData();
  const baseUrl = personal.seo.siteUrl;
  const projectSlugs = await getProjectSlugs();
  const allBlogs = await getAllBlogs();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/uses`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Note: Blogs currently link to external URLs, but we include them if they have a local page
  // If blogs had local pages like /blogs/[id], we would add them here.
  // For now, we only have the /blogs list page.

  return [...staticPages, ...projectPages];
}
