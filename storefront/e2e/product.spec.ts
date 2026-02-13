import { test, expect } from "@playwright/test";

test.describe("Product page", () => {
  test("displays product details", async ({ page }) => {
    await page.goto("/shop/all");
    const firstProduct = page.locator('a[href^="/product/"]').first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.click();
    await page.waitForURL(/\/product\//);

    await expect(page.locator("h1").first()).toBeVisible();
    await expect(
      page.locator("text=/R[\\d,]+\\.\\d{2}/").first()
    ).toBeVisible();
  });

  test("has an add-to-cart button", async ({ page }) => {
    await page.goto("/shop/all");
    const firstProduct = page.locator('a[href^="/product/"]').first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.click();
    await page.waitForURL(/\/product\//);

    const addToCart = page
      .locator(
        'button:has-text("Add to Cart"), button:has-text("Add to cart")'
      )
      .first();
    await expect(addToCart).toBeVisible();
  });

  test("returns 404 for non-existent product", async ({ page }) => {
    await page.goto("/product/this-product-does-not-exist-xyz");
    const notFound = page
      .locator("text=/not found|404|doesn't exist/i")
      .first();
    await expect(notFound).toBeVisible();
  });
});
