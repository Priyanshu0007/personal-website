import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cleanUrl, cleanUrls } from "@/utils/formatters";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const result = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const p = result[0];
    const cleanedProject = {
      ...p,
      thumbnail: cleanUrl(p.thumbnail),
      images: cleanUrls(p.images as string[]),
    };

    return NextResponse.json(cleanedProject);
  } catch (error) {
    console.error("Error fetching project detail:", error);
    return NextResponse.json(
      { error: "Failed to fetch project detail" },
      { status: 500 }
    );
  }
}
