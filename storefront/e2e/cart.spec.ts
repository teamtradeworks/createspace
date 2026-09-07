import { test, expect, Locator } from "@playwright/test";
import siteConfig from "../src/config/site.json";
import { findPurchasableProductHandle } from "./helpers/shopify";
import { seedCart, TEST_CART_ITEM } from "./helpers/cart";

// Preferred product for the add-to-cart flow: a custom product page with
// add-ons. When Shopify reports it out of stock the test falls back to any
// in-stock product, so a stock-out never blocks CI.
const PREFERRED_PRODUCT_HANDLE = "arduino-starter-kit";

const { freeDeliveryThreshold, standardDeliveryCost } = siteConfig.delivery;

// Matches formatPrice output for ZAR with cents, e.g. "R 1,027.00" (the space
// is a non-breaking space).
const randWithCents = (amount: number) =>
  new RegExp(`R[\\s\\u00a0]${amount.toLocaleString("en-US")}\\.00`);

// The "Total" row in the order summary (the items table header also says
// "Total", but as a div rather than a span).
const orderTotalRow = (main: Locator) =>
  main.locator("span", { hasText: /^Total$/ }).locator("xpath=..");

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
    const handle = await findPurchasableProductHandle(PREFERRED_PRODUCT_HANDLE);
    if (!handle) {
      test.skip(true, "No in-stock product found via the Shopify Storefront API");
      return;
    }
    test.info().annotations.push({ type: "product", description: handle });

    await page.goto(`/product/${handle}`);

    const addToCart = page
      .getByRole("button", { name: /add to cart/i })
      .first();
    await expect(addToCart).toBeVisible();
    // Stock can change between the build that rendered this page and now;
    // skip with a reason rather than time out on a disabled button.
    test.skip(
      await addToCart.isDisabled(),
      `/product/${handle} rendered as out of stock`
    );
    await addToCart.click();

    // Wait for success state instead of arbitrary timeout
    await expect(
      page.getByRole("button", { name: /added to cart/i }).first()
    ).toBeVisible();

    await page.goto("/cart");
    const cartItem = page
      .locator("main")
      .locator("text=/R[\\s\\u00a0][\\d,]+\\.\\d{2}/")
      .first();
    await expect(cartItem).toBeVisible();
  });

  test("delivery cost shown in cart", async ({ page }) => {
    // Seed the cart directly so this test doesn't depend on any product being
    // in stock. The item is priced below the free-delivery threshold.
    const item = { ...TEST_CART_ITEM, price: freeDeliveryThreshold - 1 };
    await seedCart(page, [item]);

    await page.goto("/cart");
    const main = page.locator("main");
    await expect(main.getByText(item.title)).toBeVisible();
    await expect(main.getByText(randWithCents(standardDeliveryCost))).toBeVisible();
    await expect(main.getByText(/more for FREE delivery/i)).toBeVisible();
    await expect(orderTotalRow(main)).toHaveText(
      randWithCents(item.price + standardDeliveryCost)
    );
  });

  test("free delivery shown above threshold", async ({ page }) => {
    const item = { ...TEST_CART_ITEM, price: freeDeliveryThreshold };
    await seedCart(page, [item]);

    await page.goto("/cart");
    const main = page.locator("main");
    await expect(main.getByText("FREE", { exact: true })).toBeVisible();
    await expect(main.getByText(/more for FREE delivery/i)).toHaveCount(0);
    await expect(orderTotalRow(main)).toHaveText(randWithCents(item.price));
  });
});
