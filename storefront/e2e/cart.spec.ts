import { test, expect } from "@playwright/test";

test.describe("Cart", () => {
  test("cart page loads when empty", async ({ page }) => {
    await page.goto("/cart");
    await expect(
      page.locator("text=/cart|empty|no items/i").first()
    ).toBeVisible();
  });

  test("adding a product updates cart", async ({ page }) => {
    await page.goto("/shop/all");
    const firstProduct = page.locator('main a[href^="/product/"]').first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.click();
    await page.waitForURL(/\/product\//);

    const addToCart = page.getByRole("button", { name: /add to cart/i }).first();
    await expect(addToCart).toBeVisible();
    await addToCart.click();

    // Wait for cart action to complete before navigating
    await page.waitForTimeout(1000);
    await page.goto("/cart");
    const cartItem = page
      .locator("main")
      .locator("text=/R[\\d,]+\\.\\d{2}/")
      .first();
    await expect(cartItem).toBeVisible();
  });

  test("delivery cost shown in cart", async ({ page }) => {
    await page.goto("/shop/all");
    const firstProduct = page.locator('main a[href^="/product/"]').first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.click();
    await page.waitForURL(/\/product\//);

    const addToCart = page.getByRole("button", { name: /add to cart/i }).first();
    await expect(addToCart).toBeVisible();
    await addToCart.click();

    // Wait for cart action to complete before navigating
    await page.waitForTimeout(1000);
    await page.goto("/cart");
    const deliveryInfo = page
      .locator("text=/deliver|R115|free delivery/i")
      .first();
    await expect(deliveryInfo).toBeVisible();
  });
});
