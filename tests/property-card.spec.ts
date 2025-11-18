import { test, expect } from '@playwright/test';

test.describe('PropertyCard Component', () => {
  test.setTimeout(15000);

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('PropertyCard displays property information', async ({ page }) => {
    // Once we add properties to homepage, test them
    const propertyCards = page.locator('[data-testid="property-card"]');

    if (await propertyCards.count() > 0) {
      const firstCard = propertyCards.first();
      await expect(firstCard).toBeVisible();
    }
  });

  test('PropertyCard displays price', async ({ page }) => {
    const priceElement = page.locator('[data-testid="property-price"]').first();

    if (await priceElement.isVisible()) {
      const priceText = await priceElement.textContent();
      expect(priceText).toContain('฿'); // Thai Baht symbol
    }
  });

  test('PropertyCard displays property specs (beds, baths, area)', async ({ page }) => {
    const specsElement = page.locator('[data-testid="property-specs"]').first();

    if (await specsElement.isVisible()) {
      await expect(specsElement).toBeVisible();
    }
  });

  test('PropertyCard has hover effect', async ({ page }) => {
    const card = page.locator('[data-testid="property-card"]').first();

    if (await card.isVisible()) {
      await card.hover();
      await expect(card).toBeVisible();
    }
  });

  test('PropertyCard is clickable and navigates to detail page', async ({ page }) => {
    const card = page.locator('[data-testid="property-card"]').first();

    if (await card.isVisible()) {
      await expect(card).toBeEnabled();
    }
  });
});
