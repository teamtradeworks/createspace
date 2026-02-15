import { test, expect } from "@playwright/test";
import { argosScreenshot } from "@argos-ci/playwright";

test.describe("Homepage Visual Regression", () => {
  test.skip(!process.env.CI, "Visual regression tests only run in CI");

  test.beforeEach(async ({ page }) => {
    // Disable all CSS animations and transitions for deterministic screenshots
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
    });
  });

  test("full page - desktop", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(
      page.locator(".hero-carousel-wrapper img").first()
    ).toBeVisible();

    await argosScreenshot(page, "homepage-desktop", {
      fullPage: true,
      maskColor: "#FF00FF",
      mask: [
        // Mask the featured products area - content is dynamic from Shopify
        page.locator("section:has(button[role='tab'])"),
      ],
    });
  });

  test("full page - mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.locator(".hero-carousel-wrapper")).toBeVisible();

    await argosScreenshot(page, "homepage-mobile", {
      fullPage: true,
      maskColor: "#FF00FF",
      mask: [
        page.locator("section:has(button[role='tab'])"),
      ],
    });
  });

  test("hero section - desktop", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const hero = page.locator(".hero-carousel-wrapper");
    await expect(hero.locator("img").first()).toBeVisible();

    await argosScreenshot(page, "hero-desktop", {
      element: hero,
    });
  });

  test("why STEM section", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const stemSection = page
      .locator("section")
      .filter({ hasText: "Why STEM Education Matters" })
      .first();

    await stemSection.scrollIntoViewIfNeeded();
    await argosScreenshot(page, "why-stem", {
      element: stemSection,
    });
  });

  test("testimonials section", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const testimonials = page
      .locator("section")
      .filter({ hasText: "What Parents & Educators Say" })
      .first();

    await testimonials.scrollIntoViewIfNeeded();
    await argosScreenshot(page, "testimonials", {
      element: testimonials,
    });
  });

  test("CTA section", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const cta = page
      .locator("section")
      .filter({ hasText: "Ready to Spark Curiosity?" })
      .first();

    await cta.scrollIntoViewIfNeeded();
    await argosScreenshot(page, "cta-section", {
      element: cta,
    });
  });
});
