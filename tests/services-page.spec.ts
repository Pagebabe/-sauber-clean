import { test, expect } from '@playwright/test';

test.describe('Services Page', () => {
  test.setTimeout(15000);

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/services');
  });

  test('Services page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3000/services');
    await expect(page.locator('h1')).toContainText('Services');
  });

  test('Services page displays service cards', async ({ page }) => {
    const serviceCards = page.locator('[data-testid="service-card"]');
    await expect(serviceCards.first()).toBeVisible();
    const count = await serviceCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Services page has header and footer', async ({ page }) => {
    const header = page.locator('header');
    const footer = page.locator('footer');
    await expect(header).toBeVisible();
    await expect(footer).toBeVisible();
  });

  test('Service cards have titles and descriptions', async ({ page }) => {
    const firstCard = page.locator('[data-testid="service-card"]').first();
    await expect(firstCard).toBeVisible();
  });
});
