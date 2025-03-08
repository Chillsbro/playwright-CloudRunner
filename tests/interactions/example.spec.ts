import { test, expect } from "@playwright/test";

test("basic interaction test", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await page.getByRole("button", { name: "Toggle navigation bar" }).click();
  expect(await page.getByRole("navigation").isVisible()).toBeTruthy();
});
