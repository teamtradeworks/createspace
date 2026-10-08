import { test, expect } from "@playwright/test";
import { activeNavPromo, PROMOS } from "../src/config/promo";

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

test.describe("Promotion nav pill", () => {
  // The pill follows the dated promos in config/promo.ts, not prices, so each
  // test asks the config what should be live today.
  test("names only the live promotion, and none once a promotion ends", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");
    const live = activeNavPromo();

    for (const promo of PROMOS) {
      if (!promo.navLabel || promo.navLabel === live?.label) continue;
      await expect(header.getByRole("link", { name: promo.navLabel, exact: true })).toHaveCount(0);
    }
    if (live) {
      await expect(header.getByRole("link", { name: live.label, exact: true })).toBeVisible();
    }
  });

  test("lands on the promotion's page", async ({ page }) => {
    const live = activeNavPromo();
    test.skip(!live, "no promotion is running right now");
    if (!live) return;

    await page.goto("/");
    await page.locator("header").getByRole("link", { name: live.label, exact: true }).click();
    const target = new URL(live.href, page.url());
    await expect(page).toHaveURL((url) => url.pathname === target.pathname);
    for (const [key, value] of target.searchParams) {
      expect(new URL(page.url()).searchParams.get(key)).toBe(value);
    }
  });
});

test.describe("Sale filter", () => {
  // The rail's "On sale" option is hidden while nothing is discounted, so
  // tests that need one ask whether a sale is running rather than assuming the
  // catalogue always has one.
  const onSaleControl = (page: import("@playwright/test").Page) =>
    page.getByRole("button", { name: "On sale" });

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
