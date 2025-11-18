import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test.setTimeout(15000);

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/about');
  });

  test('About page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3000/about');
    await expect(page.locator('h1')).toContainText('About');
  });

  test('About page displays company information', async ({ page }) => {
    const content = page.locator('main');
    await expect(content).toBeVisible();
    await expect(content).toContainText('PW Pattaya');
  });

  test('About page displays mission or vision', async ({ page }) => {
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('About page has header and footer', async ({ page }) => {
    const header = page.locator('header');
    const footer = page.locator('footer');
    await expect(header).toBeVisible();
    await expect(footer).toBeVisible();
  });
});
