import { test, expect } from '@playwright/test';

test.describe('Property Detail Page', () => {
  test.setTimeout(15000);

  test.beforeEach(async ({ page }) => {
    // Navigate to first property from homepage
    await page.goto('http://localhost:3000');
    await page.locator('[data-testid="property-card"]').first().click();
  });

  test('Property detail page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/property\/.+/);
  });

  test('Property detail page displays title', async ({ page }) => {
    const title = page.locator('h1');
    await expect(title).toBeVisible();
  });

  test('Property detail page displays price', async ({ page }) => {
    const price = page.locator('[data-testid="property-detail-price"]');
    await expect(price).toBeVisible();
    await expect(price).toContainText('฿');
  });

  test('Property detail page displays image gallery', async ({ page }) => {
    const gallery = page.locator('[data-testid="property-gallery"]');
    await expect(gallery).toBeVisible();
  });

  test('Property detail page displays property specs', async ({ page }) => {
    const specs = page.locator('[data-testid="property-detail-specs"]');
    await expect(specs).toBeVisible();
  });

  test('Property detail page displays location', async ({ page }) => {
    const location = page.locator('[data-testid="property-location"]');
    await expect(location).toBeVisible();
  });

  test('Property detail page displays description', async ({ page }) => {
    const description = page.locator('[data-testid="property-description"]');
    await expect(description).toBeVisible();
  });

  test('Property detail page has contact form', async ({ page }) => {
    const contactForm = page.locator('[data-testid="contact-form"]');
    await expect(contactForm).toBeVisible();
  });
});
