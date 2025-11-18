/**
 * Service Pages Verification Test
 * Tests all 6 service detail pages
 */

import { test, expect } from '@playwright/test';

test.setTimeout(15000);

test.describe('Service Pages', () => {
  const services = [
    'property-sales',
    'rental-services',
    'property-management',
    'investment-consulting',
    'legal-assistance',
    'relocation-services'
  ];

  test('Services index page loads and displays all service cards', async ({ page }) => {
    await page.goto('http://localhost:3000/services');

    // Verify page loaded
    await expect(page.locator('h1')).toBeVisible();

    // Verify all 6 service cards are present
    const serviceCards = await page.locator('[data-testid="service-card"]').count();
    expect(serviceCards).toBe(6);

    // Screenshot
    await page.screenshot({
      path: 'tests/screenshots/services-index.png',
      fullPage: true
    });

    console.log('✅ Services index page: 6 cards found');
  });

  test('All service detail pages load correctly', async ({ page }) => {
    for (const serviceSlug of services) {
      await page.goto(`http://localhost:3000/services/${serviceSlug}`);

      // Verify page loaded
      await expect(page.locator('h1')).toBeVisible();

      // Verify main content sections
      await expect(page.locator('text=What We Offer')).toBeVisible();
      await expect(page.locator('text=Why Choose Us')).toBeVisible();
      await expect(page.locator('text=Get Started')).toBeVisible();

      // Screenshot
      await page.screenshot({
        path: `tests/screenshots/service-${serviceSlug}.png`,
        fullPage: true
      });

      console.log(`✅ Service detail page: ${serviceSlug}`);
    }
  });

  test('Navigation from index to detail page works', async ({ page }) => {
    await page.goto('http://localhost:3000/services');

    // Click first service card
    await page.locator('[data-testid="service-card"]').first().click();

    // Wait for navigation
    await page.waitForURL(/\/services\//);

    // Verify detail page loaded
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=What We Offer')).toBeVisible();

    console.log('✅ Navigation from index to detail page works');
  });

  test('Back navigation from detail to index works', async ({ page }) => {
    // Go to a detail page
    await page.goto('http://localhost:3000/services/property-sales');

    // Go back
    await page.goBack();

    // Verify we're back on index
    await expect(page).toHaveURL('http://localhost:3000/services');
    const serviceCards = await page.locator('[data-testid="service-card"]').count();
    expect(serviceCards).toBe(6);

    console.log('✅ Back navigation works');
  });
});
