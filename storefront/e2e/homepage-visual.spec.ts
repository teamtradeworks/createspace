import { test, expect } from "@playwright/test";
import { argosScreenshot } from "@argos-ci/playwright";
import type { Page } from "@playwright/test";

/**
 * Prepare page for deterministic screenshots:
 * - Disable CSS animations/transitions
 * - Force lazy-loaded images to load eagerly
 */
async function prepareForScreenshot(page: Page) {
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

  await page.evaluate(() => {
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.removeAttribute("loading");
    });
  });

  await page.waitForFunction(
    () => Array.from(document.images).every((img) => img.complete),
    { timeout: 15000 }
  ).catch(() => {});
}

test.describe("Homepage Visual Regression", () => {
  test.skip(!process.env.CI, "Visual regression tests only run in CI");

  test("full page - desktop", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".hero-carousel-wrapper").first()).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await prepareForScreenshot(page);

    await argosScreenshot(page, "homepage-desktop", {
      fullPage: true,
      maskColor: "#FF00FF",
      mask: [
        page.locator("section:has(button[role='tab'])"),
      ],
    });
  });

  test("full page - mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await expect(page.locator(".hero-carousel-wrapper").first()).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await prepareForScreenshot(page);

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
    const hero = page.locator(".hero-carousel-wrapper").first();
    await expect(hero).toBeVisible();
    await prepareForScreenshot(page);

    await argosScreenshot(page, "hero-desktop", {
      element: hero,
    });
  });

  test("why STEM section", async ({ page }) => {
    await page.goto("/");
    const stemSection = page
      .locator("section")
      .filter({ hasText: "Why Early STEM Exposure Matters" })
      .first();

    await expect(stemSection).toBeVisible();
    await prepareForScreenshot(page);
    await stemSection.scrollIntoViewIfNeeded();

    await argosScreenshot(page, "why-stem", {
      element: stemSection,
    });
  });

  test("testimonials section", async ({ page }) => {
    await page.goto("/");
    const testimonials = page
      .locator("section")
      .filter({ hasText: "What Parents & Educators Say" })
      .first();

    await expect(testimonials).toBeVisible();
    await prepareForScreenshot(page);
    await testimonials.scrollIntoViewIfNeeded();

    await argosScreenshot(page, "testimonials", {
      element: testimonials,
    });
  });

  test("CTA section", async ({ page }) => {
    await page.goto("/");
    const cta = page
      .locator("section")
      .filter({ hasText: "Ready to Spark Curiosity?" })
      .first();

    await expect(cta).toBeVisible();
    await prepareForScreenshot(page);
    await cta.scrollIntoViewIfNeeded();

    await argosScreenshot(page, "cta-section", {
      element: cta,
    });
  });
});
