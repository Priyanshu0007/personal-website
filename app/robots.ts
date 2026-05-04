import type { MetadataRoute } from "next";
import { getPersonalData } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  const personal = getPersonalData();
  const baseUrl = personal.seo.siteUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
