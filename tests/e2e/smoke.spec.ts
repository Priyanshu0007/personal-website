import { test, expect } from "@playwright/test";

test.describe("Portfolio E2E Smoke Tests", () => {
  test("1. Landing page loads correctly with hero text and navigation", async ({
    page,
  }) => {
    await page.goto("/");

    // Verify page title
    await expect(page).toHaveTitle(/Priyanshu/i);

    // Verify main hero heading
    const heroName = page.getByText(/Priyanshu Gupta/i).first();
    await expect(heroName).toBeVisible();

    // Verify navigation links exist
    const navProjectsLink = page.getByRole("link", { name: /Projects/i }).first();
    await expect(navProjectsLink).toBeVisible();
  });

  test("2. Projects page loads and displays project items", async ({ page }) => {
    await page.goto("/projects");

    // Verify header or content
    const heading = page.getByRole("heading", { level: 1 }).first();
    await expect(heading).toBeVisible();

    // Verify at least one project card or link is rendered
    const projectCards = page.locator("a[href^='/projects/']");
    await expect(projectCards.first()).toBeVisible();
  });

  test("3. Contact form inputs and client validation", async ({ page }) => {
    await page.goto("/");

    // Scroll to contact section
    const contactSection = page.locator("#contact");
    if (await contactSection.count()) {
      await contactSection.scrollIntoViewIfNeeded();
    }

    const nameInput = page.locator("#contact-name");
    const emailInput = page.locator("#contact-email-input");
    const messageInput = page.locator("#contact-message");
    const submitBtn = page.getByRole("button", { name: /Send Message/i });

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    // Fill in values
    await nameInput.fill("Test User");
    await emailInput.fill("invalid-email");
    await messageInput.fill("Hello test message");

    // HTML5 email validation check
    const isEmailValid = await emailInput.evaluate(
      (node: HTMLInputElement) => node.checkValidity()
    );
    expect(isEmailValid).toBe(false);
  });
});
