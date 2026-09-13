import { test, expect } from "@playwright/test";

// Guards against horizontal page scroll — the kind of bug you only see at one
// awkward width. The original case: the desktop nav appeared at `md` (768px)
// but the links plus the search/cart icons needed more room than 768px, so the
// icon cluster hung ~7px past the viewport. 768 and 1023 are the tight spots
// (just inside the tablet band), 1024 is the first desktop-nav width.
const WIDTHS = [320, 375, 414, 640, 700, 720, 768, 800, 900, 1000, 1023, 1024, 1280, 1440];

// Header and footer are shared chrome, so a handful of structurally different
// pages is enough to catch it wherever it comes from.
const PATHS = ["/contact", "/about", "/downloads", "/shop", "/product/arduino-starter-kit"];

test.describe("No horizontal overflow", () => {
  for (const path of PATHS) {
    test(`${path} never scrolls horizontally`, async ({ page }) => {
      await page.goto(path);
      // Not `networkidle` — analytics keep the connection busy on some pages.
      // The site header is the shared chrome under test, so wait for that.
      // `banner` rather than `header`: pages have their own hero <header>.
      await expect(page.getByRole("banner")).toBeVisible();

      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 900 });

        const { scrollWidth, innerWidth, offenders } = await page.evaluate(() => {
          const overflowing = [...document.querySelectorAll("*")]
            .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 0.5)
            .slice(0, 3)
            .map((el) => {
              const cls = el.className;
              const name = String(
                typeof cls === "object" && cls !== null && "baseVal" in cls
                  ? (cls as SVGAnimatedString).baseVal
                  : (cls ?? ""),
              ).slice(0, 60);
              return `${el.tagName}.${name}@${Math.round(el.getBoundingClientRect().right)}`;
            });
          return {
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth,
            offenders: overflowing,
          };
        });

        expect(
          scrollWidth,
          `${path} at ${width}px overflows by ${scrollWidth - innerWidth}px: ${offenders.join(" ; ")}`,
        ).toBeLessThanOrEqual(innerWidth);
      }
    });
  }
});
