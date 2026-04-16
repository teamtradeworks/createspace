import { test, expect } from "@playwright/test";

test.describe("Shop page", () => {
  test("loads and displays products", async ({ page }) => {
    await page.goto("/shop");
    const productCards = page.locator('main a[href^="/product/"]');
    await expect(productCards.first()).toBeVisible();
    expect(await productCards.count()).toBeGreaterThan(0);
  });

  test("product cards show prices in ZAR", async ({ page }) => {
    await page.goto("/shop");
    const price = page.locator("main").locator("text=/R[\\s\\u00a0][\\d,]+/").first();
    await expect(price).toBeVisible();
  });

  test("clicking a product navigates to product page", async ({ page }) => {
    await page.goto("/shop");
    const firstProduct = page.locator('main a[href^="/product/"]').first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.click();
    await expect(page).toHaveURL(/\/product\//);
  });
});
