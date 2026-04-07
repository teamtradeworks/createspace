import { test, expect } from "@playwright/test";

// Use a known custom product page — these are statically generated at build
// time so they load reliably without runtime Shopify API calls.
const TEST_PRODUCT = "/product/arduino-starter-kit";

test.describe("Cart", () => {
  test.beforeEach(async ({ page }) => {
    // Clear cart state so each test starts fresh
    await page.goto("/");
    await page.evaluate(() => localStorage.removeItem("createspace-cart"));
  });

  test("cart page loads when empty", async ({ page }) => {
    await page.goto("/cart");
    await expect(
      page.locator("text=/cart|empty|no items/i").first()
    ).toBeVisible();
  });

  test("adding a product updates cart", async ({ page }) => {
    await page.goto(TEST_PRODUCT);

    const addToCart = page
      .getByRole("button", { name: /add to cart/i })
      .first();
    await expect(addToCart).toBeVisible();
    await addToCart.click();

    // Wait for success state instead of arbitrary timeout
    await expect(
      page.getByRole("button", { name: /added to cart/i }).first()
    ).toBeVisible();

    await page.goto("/cart");
    const cartItem = page
      .locator("main")
      .locator("text=/R [\\d,]+\\.\\d{2}/")
      .first();
    await expect(cartItem).toBeVisible();
  });

  test("delivery cost shown in cart", async ({ page }) => {
    await page.goto(TEST_PRODUCT);

    const addToCart = page
      .getByRole("button", { name: /add to cart/i })
      .first();
    await expect(addToCart).toBeVisible();
    await addToCart.click();

    // Wait for success state instead of arbitrary timeout
    await expect(
      page.getByRole("button", { name: /added to cart/i }).first()
    ).toBeVisible();

    await page.goto("/cart");
    const deliveryInfo = page
      .locator("text=/deliver|R128|free delivery/i")
      .first();
    await expect(deliveryInfo).toBeVisible();
  });
});
