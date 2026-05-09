import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects, blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cleanUrl, cleanUrls } from "@/utils/formatters";

export async function GET() {
  try {
    const featuredProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .limit(6);

    const latestBlogs = await db.select().from(blogs).limit(3);

    const cleanedProjects = featuredProjects.map((p) => ({
      ...p,
      thumbnail: cleanUrl(p.thumbnail),
      images: cleanUrls(p.images as string[]),
    }));

    const cleanedBlogs = latestBlogs.map((b) => ({
      ...b,
      url: cleanUrl(b.url),
    }));

    return NextResponse.json({
      projects: cleanedProjects,
      blogs: cleanedBlogs,
    });
  } catch (error) {
    console.error("Error fetching home data:", error);
    return NextResponse.json(
      { error: "Failed to fetch home data" },
      { status: 500 }
    );
  }
}
