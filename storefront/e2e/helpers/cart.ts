import type { Page } from "@playwright/test";
import type { CartItem } from "../../src/context/CartContext";

// A physical product priced below the free-delivery threshold, so the cart
// shows the standard delivery rate by default.
export const TEST_CART_ITEM: CartItem = {
  id: "gid://shopify/Product/1",
  variantId: "gid://shopify/ProductVariant/1",
  title: "Test Kit",
  price: 899,
  currencyCode: "ZAR",
  quantity: 1,
  handle: "test-kit",
  image: "/images/brand/logo-dark.png",
};

/**
 * Seeds the cart directly in localStorage so cart-page tests don't depend on
 * any product being in stock, and stubs the availability refresh the cart runs
 * on mount so every seeded item stays purchasable. Call once the page is on
 * the site's origin and before navigating to /cart.
 */
export async function seedCart(page: Page, items: CartItem[]) {
  const availability = Object.fromEntries(
    items.map((item) => [item.variantId, { available: true, currentlyNotInStock: false }])
  );
  await page.route("**/api/cart-availability", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ availability }),
    })
  );
  await page.evaluate(
    (cart) => localStorage.setItem("createspace-cart", JSON.stringify(cart)),
    items
  );
}
