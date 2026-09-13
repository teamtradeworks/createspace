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
  // The rail chip is the only "On sale" control carrying aria-pressed — the
  // removable chip in the active-filter row shares its label.
  const saleChip = (page: import("@playwright/test").Page) =>
    page.locator("button[aria-pressed]").filter({ hasText: "On sale" });

  test("the Sale nav shortcut lands on the filtered shop", async ({ page }) => {
    await page.goto("/");
    await page.locator("header").getByRole("link", { name: "Sale", exact: true }).click();
    await expect(page).toHaveURL(/\/shop\?sale=true/);
    await expect(saleChip(page)).toHaveAttribute("aria-pressed", "true");
  });

  test("every product listed under the sale filter shows a discount badge", async ({ page }) => {
    await page.goto("/shop?sale=true");
    await expect(saleChip(page)).toHaveAttribute("aria-pressed", "true");

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

    await page.getByRole("button", { name: "Clear all" }).first().click();
    await expect(saleChip(page)).toHaveAttribute("aria-pressed", "false");
    await expect(page).not.toHaveURL(/sale=true/);
    expect(await page.locator('main a[href^="/product/"]').count()).toBeGreaterThan(saleCount);
  });
});
