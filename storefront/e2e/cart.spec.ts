import { test, expect } from "@playwright/test";

test.describe("Cart", () => {
  test("cart page loads when empty", async ({ page }) => {
    await page.goto("/cart");
    // Should show empty cart state
    await expect(page.locator("text=/cart|empty|no items/i").first()).toBeVisible();
  });

  test("adding a product updates cart", async ({ page }) => {
    // Navigate to a product
    await page.goto("/shop/all");
    const firstProduct = page.locator('a[href^="/product/"]').first();
    await expect(firstProduct).toBeVisible({ timeout: 15000 });
    await firstProduct.click();
    await page.waitForURL(/\/product\//);

    // Click add to cart
    const addToCart = page.locator('button:has-text("Add to Cart"), button:has-text("Add to cart")').first();
    await expect(addToCart).toBeVisible();
    await addToCart.click();

    // Cart should now indicate it has items (badge count or slide-out)
    // Navigate to cart page to verify
    await page.goto("/cart");

    // Cart should have at least one item - look for a quantity or product title
    const cartItem = page.locator("text=/R[\\d,]+\\.\\d{2}/").first();
    await expect(cartItem).toBeVisible({ timeout: 10000 });
  });

  test("delivery cost shown in cart", async ({ page }) => {
    // Add a product first
    await page.goto("/shop/all");
    const firstProduct = page.locator('a[href^="/product/"]').first();
    await expect(firstProduct).toBeVisible({ timeout: 15000 });
    await firstProduct.click();
    await page.waitForURL(/\/product\//);

    const addToCart = page.locator('button:has-text("Add to Cart"), button:has-text("Add to cart")').first();
    await expect(addToCart).toBeVisible();
    await addToCart.click();

    await page.goto("/cart");

    // Should show delivery info (cost or free delivery message)
    const deliveryInfo = page.locator("text=/deliver|R115|free delivery/i").first();
    await expect(deliveryInfo).toBeVisible({ timeout: 10000 });
  });
});
