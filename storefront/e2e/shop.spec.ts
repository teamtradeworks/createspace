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

test.describe("Sale filter", () => {
  // Both the nav shortcut and the rail chip are hidden while nothing is
  // discounted, so each test first asks whether a sale is running rather than
  // assuming the catalogue always has one.
  const onSaleControl = (page: import("@playwright/test").Page) =>
    page.getByRole("button", { name: "On sale" });

  test("the Sale nav shortcut lands on the filtered shop", async ({ page }) => {
    await page.goto("/");
    const shortcut = page.locator("header").getByRole("link", { name: "Sale", exact: true });
    test.skip((await shortcut.count()) === 0, "nothing is on sale right now");

    await shortcut.click();
    await expect(page).toHaveURL(/\/shop\?sale=true/);
    await expect(onSaleControl(page).first()).toBeVisible();
  });

  test("the Sale nav shortcut is hidden when nothing is discounted", async ({ page }) => {
    await page.goto("/shop?sale=true");
    const discounted = await page.locator('main a[href^="/product/"]').count();
    const shortcut = page.locator("header").getByRole("link", { name: "Sale", exact: true });

    // The shortcut and the sale itself appear and disappear together.
    expect(await shortcut.count()).toBe(discounted > 0 ? 1 : 0);
  });

  test("every product listed under the sale filter shows a discount badge", async ({ page }) => {
    await page.goto("/shop?sale=true");
    await expect(onSaleControl(page).first()).toBeVisible();

    // Passes on an empty sale too: the assertion is that nothing without a
    // saving can appear here, not that a sale is always running.
    const cards = page.locator('main a[href^="/product/"]');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator("text=/^-\\d+%$/")).toBeVisible();
    }
  });

  test("clearing the sale filter restores the full catalogue", async ({ page }) => {
    await page.goto("/shop?sale=true");
    const saleCount = await page.locator('main a[href^="/product/"]').count();
    test.skip(saleCount === 0, "nothing is on sale right now");

    await page.getByRole("button", { name: "Clear all" }).first().click();
    await expect(page).not.toHaveURL(/sale=true/);
    // The rail option stays offered while a sale is on — it is simply no
    // longer applied.
    await expect(
      page.locator("button[aria-pressed]").filter({ hasText: "On sale" }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(await page.locator('main a[href^="/product/"]').count()).toBeGreaterThan(saleCount);
  });
});
