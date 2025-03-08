import { test, expect, Page } from "@playwright/test";

let page: Page;
test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto("https://www.netflix.com");
});

test.afterAll(async () => {
  await page.close();
});

test("netflix title", async () => {
  await page.goto("https://www.netflix.com");
  const title = await page.title();
  expect(title).toContain("Netflix");
});
test("netflix sign in text", async () => {
  await page.goto("https://www.netflix.com");
  const signInText = page.getByRole("button", { name: "Sign In" });
  await expect(signInText).toBeVisible();
});
test("netflix landing text", async () => {
  await page.goto("https://www.netflix.com");
  const landingText = page.getByText("Unlimited movies, TV shows, and more.");
  await expect(landingText).toBeVisible();
});

test("netflix subscription price text", async () => {
  await page.goto("https://www.netflix.com");
  const subscriptionPriceText = page.getByText(
    "Starts at $7.99. Cancel anytime."
  );
  await expect(subscriptionPriceText).toBeVisible();
});
