"use server";

import { db } from "@/db";
import { projects, blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { cleanUrl, cleanUrls } from "@/utils/formatters";

// ── Validation schemas ──────────────────────────────────────────

const projectSchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  longDescription: z.string().min(1, "Long description is required"),
  category: z.enum(["react-js", "react-native", "next-js", "other"]),
  techStack: z.array(z.string()).min(1, "At least one tech is required"),
  images: z.array(z.string().url("Must be a valid URL")),
  thumbnail: z.string().url("Must be a valid URL"),
  liveUrl: z.string().url("Must be a valid URL").nullable().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").nullable().or(z.literal("")),
  isFavorite: z.boolean(),
  featured: z.boolean(),
  createdAt: z.string().min(1, "Date is required"),
  highlights: z.array(z.string()),
  hide: z.boolean(),
});

const blogSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Must be a valid URL"),
  platform: z.string().min(1, "Platform is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
  hide: z.boolean(),
});

// ── Toggle visibility ───────────────────────────────────────────

export async function toggleProjectVisibility(id: number, currentHideStatus: boolean) {
  await db
    .update(projects)
    .set({ hide: !currentHideStatus })
    .where(eq(projects.id, id));

  revalidatePath("/admin");
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function toggleBlogVisibility(id: string, currentHideStatus: boolean) {
  await db
    .update(blogs)
    .set({ hide: !currentHideStatus })
    .where(eq(blogs.id, id));

  revalidatePath("/admin");
  revalidatePath("/blogs");
  revalidatePath("/");
}

// ── Create Project ──────────────────────────────────────────────

export async function createProject(formData: unknown) {
  const parsed = projectSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;

  await db.insert(projects).values({
    slug: data.slug,
    title: data.title,
    description: data.description,
    longDescription: data.longDescription,
    category: data.category,
    techStack: data.techStack,
    images: cleanUrls(data.images),
    thumbnail: cleanUrl(data.thumbnail),
    liveUrl: cleanUrl(data.liveUrl) || null,
    githubUrl: cleanUrl(data.githubUrl) || null,
    isFavorite: data.isFavorite,
    featured: data.featured,
    createdAt: data.createdAt,
    highlights: data.highlights,
    hide: data.hide,
  });

  revalidatePath("/admin");
  revalidatePath("/projects");
  revalidatePath("/");
  return { success: true };
}

// ── Update Project ──────────────────────────────────────────────

export async function updateProject(id: number, formData: unknown) {
  const parsed = projectSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;

  await db
    .update(projects)
    .set({
      slug: data.slug,
      title: data.title,
      description: data.description,
      longDescription: data.longDescription,
      category: data.category,
      techStack: data.techStack,
      images: cleanUrls(data.images),
      thumbnail: cleanUrl(data.thumbnail),
      liveUrl: cleanUrl(data.liveUrl) || null,
      githubUrl: cleanUrl(data.githubUrl) || null,
      isFavorite: data.isFavorite,
      featured: data.featured,
      createdAt: data.createdAt,
      highlights: data.highlights,
      hide: data.hide,
    })
    .where(eq(projects.id, id));

  revalidatePath("/admin");
  revalidatePath("/projects");
  revalidatePath(`/projects/${data.slug}`);
  revalidatePath("/");
  return { success: true };
}

// ── Delete Project ──────────────────────────────────────────────

export async function deleteProject(id: number) {
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/admin");
  revalidatePath("/projects");
  revalidatePath("/");
  return { success: true };
}

// ── Create Blog ─────────────────────────────────────────────────

export async function createBlog(formData: unknown) {
  const parsed = blogSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;

  await db.insert(blogs).values({
    id: data.id,
    title: data.title,
    url: cleanUrl(data.url),
    platform: data.platform,
    date: data.date,
    description: data.description,
    hide: data.hide,
  });

  revalidatePath("/admin");
  revalidatePath("/blogs");
  revalidatePath("/");
  return { success: true };
}

// ── Update Blog ─────────────────────────────────────────────────

export async function updateBlog(originalId: string, formData: unknown) {
  const parsed = blogSchema.safeParse(formData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;

  await db
    .update(blogs)
    .set({
      title: data.title,
      url: cleanUrl(data.url),
      platform: data.platform,
      date: data.date,
      description: data.description,
      hide: data.hide,
    })
    .where(eq(blogs.id, originalId));

  revalidatePath("/admin");
  revalidatePath("/blogs");
  revalidatePath("/");
  return { success: true };
}

// ── Delete Blog ─────────────────────────────────────────────────

export async function deleteBlog(id: string) {
  await db.delete(blogs).where(eq(blogs.id, id));
  revalidatePath("/admin");
  revalidatePath("/blogs");
  revalidatePath("/");
  return { success: true };
}
