import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { cleanUrl, cleanUrls } from "@/utils/formatters";

export async function GET() {
  try {
    const allProjects = await db.select().from(projects);

    const cleanedProjects = allProjects.map((p) => ({
      ...p,
      thumbnail: cleanUrl(p.thumbnail),
      images: cleanUrls(p.images as string[]),
    }));

    return NextResponse.json(cleanedProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
