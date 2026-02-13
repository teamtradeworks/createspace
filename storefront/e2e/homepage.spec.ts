import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads and displays the CREATESPACE branding", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/CREATESPACE/i);
  });

  test("displays featured products", async ({ page }) => {
    await page.goto("/");
    const productCards = page.locator('main a[href^="/product/"]');
    await expect(productCards.first()).toBeVisible();
  });

  test("cart icon is visible in header", async ({ page }) => {
    await page.goto("/");
    const cartLink = page.locator('a[href="/cart"]').first();
    await expect(cartLink).toBeVisible();
  });

  test("footer is visible", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });
});
