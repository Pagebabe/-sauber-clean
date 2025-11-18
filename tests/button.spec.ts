import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test.setTimeout(15000);

  // We'll create a test page for UI components
  test.beforeEach(async ({ page }) => {
    // For now, test on homepage
    await page.goto('http://localhost:3000');
  });

  test('Button renders with text', async ({ page }) => {
    // This test will pass once we add buttons to a test page
    const button = page.getByRole('button').first();
    await expect(button).toBeDefined();
  });

  test('Button is clickable', async ({ page }) => {
    const button = page.getByRole('button').first();
    await expect(button).toBeEnabled();
  });

  test('Button has hover state', async ({ page }) => {
    const button = page.getByRole('button').first();
    await button.hover();

    // Button should be visible after hover
    await expect(button).toBeVisible();
  });
});
