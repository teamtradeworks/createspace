import { test, expect } from "@playwright/test";

test.describe("Shop page", () => {
  test("loads and displays products", async ({ page }) => {
    await page.goto("/shop/all");
    const productCards = page.locator('a[href^="/product/"]');
    await expect(productCards.first()).toBeVisible({ timeout: 15000 });
    expect(await productCards.count()).toBeGreaterThan(0);
  });

  test("product cards show prices in ZAR", async ({ page }) => {
    await page.goto("/shop/all");
    // Wait for at least one price to appear
    const price = page.locator("text=/R[\\d,]+\\.\\d{2}/").first();
    await expect(price).toBeVisible({ timeout: 15000 });
  });

  test("clicking a product navigates to product page", async ({ page }) => {
    await page.goto("/shop/all");
    const firstProduct = page.locator('a[href^="/product/"]').first();
    await expect(firstProduct).toBeVisible({ timeout: 15000 });
    await firstProduct.click();
    await expect(page).toHaveURL(/\/product\//);
  });
});
