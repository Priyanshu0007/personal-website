import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects, blogs } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const featuredProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .limit(6);

    const latestBlogs = await db
      .select()
      .from(blogs)
      .limit(3);

    return NextResponse.json({
      projects: featuredProjects,
      blogs: latestBlogs,
    });
  } catch (error) {
    console.error("Error fetching home data:", error);
    return NextResponse.json({ error: "Failed to fetch home data" }, { status: 500 });
  }
}
