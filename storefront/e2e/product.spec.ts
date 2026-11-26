import { test, expect } from "@playwright/test";

// Use a known custom product page for reliable, fast tests.
const TEST_PRODUCT = "/product/arduino-starter-kit";

test.describe("Product page", () => {
  test("displays product details", async ({ page }) => {
    await page.goto(TEST_PRODUCT);

    await expect(page.locator("main h1").first()).toBeVisible();
    await expect(
      page.locator("main").locator("text=/R[\\s\\u00a0][\\d,]+/").first()
    ).toBeVisible();
  });

  test("has a purchase button", async ({ page }) => {
    await page.goto(TEST_PRODUCT);

    // The hero's one button reads "Add to cart · R 1,980" when the product is
    // purchasable and "Out of stock" (disabled) when Shopify says it is not.
    const purchaseButton = page
      .getByRole("button", { name: /add to cart|out of stock/i })
      .first();
    await expect(purchaseButton).toBeVisible();
  });

  test("returns 404 for non-existent product", async ({ page }) => {
    await page.goto("/product/this-product-does-not-exist-xyz");
    const notFound = page
      .locator("text=/not found|404|doesn't exist/i")
      .first();
    await expect(notFound).toBeVisible();
  });
});
