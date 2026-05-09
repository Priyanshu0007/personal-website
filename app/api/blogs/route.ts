import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { cleanUrl } from "@/utils/formatters";

export async function GET() {
  try {
    const allBlogs = await db.select().from(blogs);

    const cleanedBlogs = allBlogs.map((b) => ({
      ...b,
      url: cleanUrl(b.url),
    }));

    return NextResponse.json(cleanedBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
