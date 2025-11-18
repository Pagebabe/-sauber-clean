import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.setTimeout(15000);

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/contact');
  });

  test('Contact page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3000/contact');
    await expect(page.locator('h1')).toContainText('Contact');
  });

  test('Contact page displays contact form', async ({ page }) => {
    const form = page.locator('[data-testid="contact-form"]');
    await expect(form).toBeVisible();
  });

  test('Contact form has required fields', async ({ page }) => {
    await expect(page.locator('input[type="text"]').first()).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="tel"]')).toBeVisible();
    await expect(page.locator('textarea')).toBeVisible();
  });

  test('Contact page displays contact information', async ({ page }) => {
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('Contact form submit button is visible', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
  });
});
