import { test, expect } from "@playwright/test";

test.describe("Product page", () => {
  test("displays product details", async ({ page }) => {
    // Use the shop page to find a real product handle
    await page.goto("/shop/all");
    const firstProduct = page.locator('a[href^="/product/"]').first();
    await expect(firstProduct).toBeVisible({ timeout: 15000 });
    await firstProduct.click();
    await page.waitForURL(/\/product\//);

    // Product title should be visible
    await expect(page.locator("h1").first()).toBeVisible();

    // Price should be displayed in ZAR
    await expect(page.locator("text=/R[\\d,]+\\.\\d{2}/").first()).toBeVisible();
  });

  test("has an add-to-cart button", async ({ page }) => {
    await page.goto("/shop/all");
    const firstProduct = page.locator('a[href^="/product/"]').first();
    await expect(firstProduct).toBeVisible({ timeout: 15000 });
    await firstProduct.click();
    await page.waitForURL(/\/product\//);

    const addToCart = page.locator('button:has-text("Add to Cart"), button:has-text("Add to cart")').first();
    await expect(addToCart).toBeVisible();
  });

  test("returns 404 for non-existent product", async ({ page }) => {
    const response = await page.goto("/product/this-product-does-not-exist-xyz");
    // Should show 404 page or the not-found component
    const notFound = page.locator("text=/not found|404|doesn't exist/i").first();
    await expect(notFound).toBeVisible({ timeout: 10000 });
  });
});
