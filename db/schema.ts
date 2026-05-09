import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

export const categoryEnum = pgEnum("category", [
  "react-js",
  "react-native",
  "next-js",
  "other",
]);

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description").notNull(),
  category: categoryEnum("category").notNull(),
  techStack: jsonb("tech_stack").$type<string[]>().notNull(),
  images: jsonb("images").$type<string[]>().notNull(),
  thumbnail: text("thumbnail").notNull(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  isFavorite: boolean("is_favorite").default(false).notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: varchar("created_at", { length: 50 }).notNull(),
  highlights: jsonb("highlights").$type<string[]>().notNull(),
});

export const blogs = pgTable("blogs", {
  id: varchar("id", { length: 255 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  url: text("url").notNull(),
  platform: varchar("platform", { length: 100 }).notNull(),
  date: varchar("date", { length: 50 }).notNull(),
  description: text("description").notNull(),
});
