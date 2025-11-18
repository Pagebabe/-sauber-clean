import { test, expect } from '@playwright/test';

test.describe('FAQ Page', () => {
  test.setTimeout(15000);

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/faq');
  });

  test('FAQ page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3000/faq');
    await expect(page.locator('h1')).toContainText('Frequently Asked Questions');
  });

  test('FAQ page displays questions', async ({ page }) => {
    const faqItems = page.locator('[data-testid="faq-item"]');
    await expect(faqItems.first()).toBeVisible();
    const count = await faqItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('FAQ items are expandable', async ({ page }) => {
    const firstFaq = page.locator('[data-testid="faq-item"]').first();
    const button = firstFaq.locator('button');
    await expect(button).toBeVisible();
  });

  test('FAQ page has header and footer', async ({ page }) => {
    const header = page.locator('header');
    const footer = page.locator('footer');
    await expect(header).toBeVisible();
    await expect(footer).toBeVisible();
  });
});
