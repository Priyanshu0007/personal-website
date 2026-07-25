import { describe, it, expect } from "vitest";
import { contactSchema, projectSchema, blogSchema } from "@/lib/validations";

describe("lib/validations", () => {
  describe("contactSchema", () => {
    it("validates a correct contact form payload", () => {
      const validPayload = {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello! I would love to collaborate on a project with you.",
      };

      const result = contactSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
    });

    it("fails when name is shorter than 2 characters", () => {
      const invalidPayload = {
        name: "J",
        email: "john@example.com",
        message: "Hello! I would love to collaborate on a project with you.",
      };

      const result = contactSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe(
          "Name must be at least 2 characters."
        );
      }
    });

    it("fails on invalid email addresses", () => {
      const invalidPayload = {
        name: "John Doe",
        email: "not-an-email",
        message: "Hello! I would love to collaborate on a project with you.",
      };

      const result = contactSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Invalid email address.");
      }
    });

    it("fails when message is shorter than 10 characters", () => {
      const invalidPayload = {
        name: "John Doe",
        email: "john@example.com",
        message: "Short",
      };

      const result = contactSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe(
          "Message must be at least 10 characters."
        );
      }
    });
  });

  describe("projectSchema", () => {
    const validProject = {
      slug: "my-cool-project",
      title: "My Cool Project",
      description: "Short description of project",
      longDescription: "Long detailed description of the project.",
      category: "react-js" as const,
      techStack: ["React", "TypeScript", "Tailwind CSS"],
      images: ["https://example.com/img1.png"],
      thumbnail: "https://example.com/thumb.png",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/repo",
      isFavorite: true,
      featured: false,
      createdAt: "2026-01-01",
      highlights: ["High performance", "Clean UI"],
      hide: false,
    };

    it("validates a valid project payload", () => {
      const result = projectSchema.safeParse(validProject);
      expect(result.success).toBe(true);
    });

    it("rejects non-lowercase/invalid slug formats", () => {
      const invalidProject = {
        ...validProject,
        slug: "My Cool Project!",
      };

      const result = projectSchema.safeParse(invalidProject);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe(
          "Slug must be lowercase with hyphens only"
        );
      }
    });

    it("rejects empty techStack array", () => {
      const invalidProject = {
        ...validProject,
        techStack: [],
      };

      const result = projectSchema.safeParse(invalidProject);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe(
          "At least one tech is required"
        );
      }
    });

    it("allows empty string or null for liveUrl and githubUrl", () => {
      const projectWithNullUrls = {
        ...validProject,
        liveUrl: "",
        githubUrl: null,
      };

      const result = projectSchema.safeParse(projectWithNullUrls);
      expect(result.success).toBe(true);
    });
  });

  describe("blogSchema", () => {
    const validBlog = {
      id: "blog-1",
      title: "Building modern Next.js apps",
      url: "https://medium.com/@dev/nextjs-apps",
      platform: "Medium",
      date: "2026-05-10",
      description: "A comprehensive guide to App Router and server actions.",
      hide: false,
    };

    it("validates a valid blog payload", () => {
      const result = blogSchema.safeParse(validBlog);
      expect(result.success).toBe(true);
    });

    it("rejects invalid blog URLs", () => {
      const invalidBlog = {
        ...validBlog,
        url: "invalid-url",
      };

      const result = blogSchema.safeParse(invalidBlog);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Must be a valid URL");
      }
    });
  });
});
