import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export const projectSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
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

export const blogSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Must be a valid URL"),
  platform: z.string().min(1, "Platform is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(1, "Description is required"),
  hide: z.boolean(),
});
