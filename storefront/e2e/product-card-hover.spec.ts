import { test, expect, devices } from "@playwright/test";

// ProductCardImage defers its hover-swap image: hover-capable devices mount it
// once the page has settled (or on first hover, whichever comes first); touch
// devices never mount it, since hover can never fire there.

const SECONDARY_IMG = 'a[href^="/product/"] .aspect-square img + img';

test.describe("product card hover image - desktop", () => {
  test("mounts after page settle and crossfades on hover", async ({ page }) => {
    await page.goto("/");

    // Idle-mount: swap images appear without any interaction shortly after load.
    await expect(page.locator(SECONDARY_IMG).first()).toBeAttached({ timeout: 15_000 });

    const card = page
      .locator('a[href^="/product/"]')
      .filter({ has: page.locator(".aspect-square img + img") })
      .first();
    await card.scrollIntoViewIfNeeded();
    const imageArea = card.locator(".aspect-square");
    const primary = imageArea.locator("img").first();
    const secondary = imageArea.locator("img + img");

    // Not hovered: primary shown, swap hidden.
    await expect(primary).toHaveClass(/opacity-100/);
    await expect(secondary).toHaveClass(/opacity-0/);

    // Hover: crossfade fires once the swap image has actually loaded.
    await imageArea.hover();
    await expect(secondary).toHaveClass(/opacity-100/, { timeout: 15_000 });
    await expect(primary).toHaveClass(/opacity-0/);

    // Leave: primary returns.
    await page.mouse.move(0, 0);
    await expect(secondary).toHaveClass(/opacity-0/);
    await expect(primary).toHaveClass(/opacity-100/);
  });
});

// devices["Pixel 5"] carries defaultBrowserType, which test.use() rejects
// inside a describe group - strip it and keep the emulation options.
const { defaultBrowserType: _browserType, ...pixel5 } = devices["Pixel 5"];

test.describe("product card hover image - touch", () => {
  test.use(pixel5);

  test("never mounts the swap image on touch devices", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator('a[href^="/product/"] .aspect-square img').first(),
    ).toBeAttached();

    // Wait past the idle-mount deadline (requestIdleCallback timeout is 3s
    // after window load) before asserting the swap image never appeared.
    await page.waitForTimeout(4_000);
    expect(await page.locator(SECONDARY_IMG).count()).toBe(0);
  });
});
