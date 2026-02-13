import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("main pages are accessible", async ({ page }) => {
    // Homepage
    const homeResponse = await page.goto("/");
    expect(homeResponse?.status()).toBe(200);

    // Shop
    const shopResponse = await page.goto("/shop");
    expect(shopResponse?.status()).toBe(200);

    // Cart
    const cartResponse = await page.goto("/cart");
    expect(cartResponse?.status()).toBe(200);

    // About
    const aboutResponse = await page.goto("/about");
    expect(aboutResponse?.status()).toBe(200);

    // Contact
    const contactResponse = await page.goto("/contact");
    expect(contactResponse?.status()).toBe(200);
  });

  test("education pages are accessible", async ({ page }) => {
    const pages = [
      "/education",
      "/education/stem-tutors",
      "/education/curriculum",
      "/education/classroom-kits",
    ];

    for (const path of pages) {
      const response = await page.goto(path);
      expect(response?.status(), `${path} should return 200`).toBe(200);
    }
  });

  test("404 page shown for invalid routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    const notFound = page.locator("text=/not found|404/i").first();
    await expect(notFound).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("mobile menu is accessible", async ({ page }) => {
    await page.goto("/");
    // On mobile, there should be a hamburger menu or mobile nav
    const menuButton = page.locator('button[aria-label*="menu" i], button[aria-label*="nav" i], button:has(svg)').first();
    await expect(menuButton).toBeVisible();
  });
});
