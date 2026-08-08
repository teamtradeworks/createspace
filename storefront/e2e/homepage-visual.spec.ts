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

// The hero is the section that holds the single page <h1> ("Build. Play. Learn.").
const heroSection = (page: Page) =>
  page.locator("section").filter({ has: page.getByRole("heading", { level: 1 }) }).first();

// Sections backed by live Shopify data are non-deterministic across runs (prices,
// images, and the photo wall's random card flips), so mask them in full-page
// shots: the "Shop our kits" carousel and the customer photo wall (#builds).
const dynamicMasks = (page: Page) => [
  page.locator("section").filter({ has: page.getByRole("heading", { name: "Shop our kits" }) }),
  page.locator("#builds"),
];

test.describe("Homepage Visual Regression", () => {
  test.skip(!process.env.CI, "Visual regression tests only run in CI");

  test("full page - desktop", async ({ page }) => {
    await page.goto("/");
    await expect(heroSection(page)).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await prepareForScreenshot(page);

    await argosScreenshot(page, "homepage-desktop", {
      fullPage: true,
      maskColor: "#FF00FF",
      mask: dynamicMasks(page),
    });
  });

  test("full page - mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await expect(heroSection(page)).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await prepareForScreenshot(page);

    await argosScreenshot(page, "homepage-mobile", {
      fullPage: true,
      maskColor: "#FF00FF",
      mask: dynamicMasks(page),
    });
  });

  test("hero section - desktop", async ({ page }) => {
    await page.goto("/");
    const hero = heroSection(page);
    await expect(hero).toBeVisible();
    await prepareForScreenshot(page);

    await argosScreenshot(page, "hero-desktop", {
      element: hero,
    });
  });

  test("why createspace section", async ({ page }) => {
    await page.goto("/");
    const section = page
      .locator("section")
      .filter({ hasText: "A specialist store, not a toy aisle" })
      .first();

    await expect(section).toBeVisible();
    await prepareForScreenshot(page);
    await section.scrollIntoViewIfNeeded();

    await argosScreenshot(page, "why-createspace", {
      element: section,
    });
  });

  test("testimonials section", async ({ page }) => {
    await page.goto("/");
    const testimonials = page
      .locator("section")
      .filter({ hasText: "What parents and educators say" })
      .first();

    await expect(testimonials).toBeVisible();
    await prepareForScreenshot(page);
    await testimonials.scrollIntoViewIfNeeded();

    await argosScreenshot(page, "testimonials", {
      element: testimonials,
    });
  });
});
