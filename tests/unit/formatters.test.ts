import { describe, it, expect } from "vitest";
import { cleanUrl, cleanUrls, formatDate } from "@/utils/formatters";

describe("utils/formatters", () => {
  describe("cleanUrl", () => {
    it("returns empty string for null, undefined, or empty input", () => {
      expect(cleanUrl(null)).toBe("");
      expect(cleanUrl(undefined)).toBe("");
      expect(cleanUrl("")).toBe("");
    });

    it("trims whitespace from start and end", () => {
      expect(cleanUrl("   https://example.com   ")).toBe("https://example.com");
    });

    it("strips double and single quotes from string boundaries", () => {
      expect(cleanUrl('"https://example.com"')).toBe("https://example.com");
      expect(cleanUrl("'https://example.com'")).toBe("https://example.com");
      expect(cleanUrl('  "https://example.com"  ')).toBe("https://example.com");
    });

    it("preserves valid internal quotes or characters", () => {
      expect(cleanUrl("https://example.com/query?q=foo")).toBe(
        "https://example.com/query?q=foo"
      );
    });
  });

  describe("cleanUrls", () => {
    it("returns empty array for null or undefined", () => {
      expect(cleanUrls(null)).toEqual([]);
      expect(cleanUrls(undefined)).toEqual([]);
    });

    it("cleans array of URLs and filters out empty results", () => {
      const input = [
        ' "https://img1.png" ',
        "",
        null as unknown as string,
        "'https://img2.png'",
      ];
      expect(cleanUrls(input)).toEqual([
        "https://img1.png",
        "https://img2.png",
      ]);
    });
  });

  describe("formatDate", () => {
    it("returns empty string for null, undefined, or empty string", () => {
      expect(formatDate(null)).toBe("");
      expect(formatDate(undefined)).toBe("");
      expect(formatDate("")).toBe("");
    });

    it("returns empty string for invalid date strings", () => {
      expect(formatDate("not-a-valid-date")).toBe("");
    });

    it("formats ISO date string into readable format", () => {
      const formatted = formatDate("2026-07-25");
      expect(formatted).toContain("Jul");
      expect(formatted).toContain("2026");
    });

    it("formats Date object correctly", () => {
      const dateObj = new Date("2025-01-15T00:00:00Z");
      const formatted = formatDate(dateObj);
      expect(formatted).toContain("Jan");
      expect(formatted).toContain("2025");
    });
  });
});
