import { test, expect, type Page } from "@playwright/test";

// `?join={email}` on any page subscribes that address to the mailing list and
// confirms with a toast. The subscribe API is stubbed so these tests never
// touch the real Resend audience.
type SubscribeResponse = { success: true; alreadySubscribed?: boolean } | { error: string };

async function stubSubscribe(page: Page, response: SubscribeResponse, status = 200) {
  const bodies: { email?: string }[] = [];
  await page.route("**/api/subscribe", async (route) => {
    bodies.push(route.request().postDataJSON() as { email?: string });
    await route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify(response),
    });
  });
  return bodies;
}

const toast = (page: Page) => page.getByTestId("join-toast");

test.describe("Join link (?join=email)", () => {
  test("subscribes the address from the query string and confirms", async ({ page }) => {
    const bodies = await stubSubscribe(page, { success: true });

    await page.goto("/?join=playwright-join@example.com");

    await expect(toast(page)).toContainText("You're on the list!");
    await expect(toast(page)).toContainText("playwright-join@example.com");
    expect(bodies).toEqual([{ email: "playwright-join@example.com" }]);
  });

  test("works on any page, not just the homepage", async ({ page }) => {
    const bodies = await stubSubscribe(page, { success: true });

    await page.goto("/about?join=playwright-join@example.com");

    await expect(toast(page)).toContainText("You're on the list!");
    expect(bodies).toHaveLength(1);
  });

  test("restores a plus sign that the URL decodes to a space", async ({ page }) => {
    const bodies = await stubSubscribe(page, { success: true });

    await page.goto("/?join=playwright+kits@example.com");

    await expect(toast(page)).toContainText("playwright+kits@example.com");
    expect(bodies).toEqual([{ email: "playwright+kits@example.com" }]);
  });

  test("tells an existing subscriber they are already on the list", async ({ page }) => {
    await stubSubscribe(page, { success: true, alreadySubscribed: true });

    await page.goto("/?join=playwright-join@example.com");

    await expect(toast(page)).toContainText("already on the list");
  });

  test("shows an error toast when the subscription fails", async ({ page }) => {
    await stubSubscribe(page, { error: "Something went wrong. Please try again." }, 500);

    await page.goto("/?join=playwright-join@example.com");

    await expect(toast(page)).toContainText("couldn't add you");
  });

  test("an error toast stays put and can be retried", async ({ page }) => {
    // First attempt fails, the retry succeeds.
    let attempts = 0;
    await page.route("**/api/subscribe", async (route) => {
      attempts += 1;
      await route.fulfill({
        status: attempts === 1 ? 500 : 200,
        contentType: "application/json",
        body: JSON.stringify(attempts === 1 ? { error: "x" } : { success: true }),
      });
    });

    await page.goto("/?join=playwright-join@example.com");
    await expect(toast(page)).toContainText("couldn't add you");

    await toast(page).getByRole("button", { name: "Try again" }).click();

    await expect(toast(page)).toContainText("You're on the list!");
    expect(attempts).toBe(2);
  });

  test("ignores a value that is not an email address", async ({ page }) => {
    const bodies = await stubSubscribe(page, { success: true });

    await page.goto("/?join=not-an-email");
    await expect(page.locator("main")).toBeVisible();

    await expect(toast(page)).toBeEmpty();
    expect(bodies).toEqual([]);
  });

  test("can be dismissed", async ({ page }) => {
    await stubSubscribe(page, { success: true });

    await page.goto("/?join=playwright-join@example.com");
    await expect(toast(page)).toContainText("You're on the list!");

    await toast(page).getByRole("button", { name: "Dismiss" }).click();
    await expect(toast(page)).toBeEmpty();
  });
});
