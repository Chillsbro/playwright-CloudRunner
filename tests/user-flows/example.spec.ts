import { test, expect } from '@playwright/test';

test('basic user flow test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  expect(page.url()).toContain('docs/intro');
});
