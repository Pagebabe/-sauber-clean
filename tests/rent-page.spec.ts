import { test, expect } from '@playwright/test';

test.describe('Rent Page', () => {
  test.setTimeout(15000);

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/rent');
  });

  test('Rent page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3000/rent');
    await expect(page.locator('h1')).toContainText('Rent Property in Pattaya');
  });

  test('Rent page displays filters', async ({ page }) => {
    // Check for filter inputs
    const locationFilter = page.locator('select').first();
    await expect(locationFilter).toBeVisible();
  });

  test('Rent page displays property cards', async ({ page }) => {
    const propertyCards = page.locator('[data-testid="property-card"]');
    await expect(propertyCards.first()).toBeVisible();
  });

  test('Clear filters button appears when filters are active', async ({ page }) => {
    // Select a location
    await page.locator('select').first().selectOption({ index: 1 });

    // Clear filters button should appear
    const clearButton = page.locator('button:has-text("Clear Filters")');
    await expect(clearButton).toBeVisible();
  });

  test('Rent page has pagination controls', async ({ page }) => {
    const pagination = page.locator('button:has-text("Next")');
    await expect(pagination).toBeVisible();
  });
});
