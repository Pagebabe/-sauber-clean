/**
 * Language Switcher Test
 * Tests the i18n language switching functionality
 */

import { test, expect } from '@playwright/test';

test.describe('Language Switcher', () => {
  test.setTimeout(15000);

  test('should display language switcher button in header', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Wait for header to load
    await page.waitForSelector('[data-testid="language-switcher"]');

    // Check language switcher button exists
    const langSwitcher = page.locator('[data-testid="language-switcher"]');
    await expect(langSwitcher).toBeVisible();

    // Should show current language (default EN)
    await expect(langSwitcher).toContainText('EN');
  });

  test('should open language dropdown on click', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Click language switcher
    await page.click('[data-testid="language-switcher"]');

    // Check if dropdown appears with all 5 languages
    await expect(page.locator('text=English')).toBeVisible();
    await expect(page.locator('text=Deutsch')).toBeVisible();
    await expect(page.locator('text=ไทย')).toBeVisible();
    await expect(page.locator('text=Русский')).toBeVisible();
    await expect(page.locator('text=Français')).toBeVisible();
  });

  test('should switch to German and show German navigation', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Open language dropdown
    await page.click('[data-testid="language-switcher"]');

    // Click on Deutsch
    await page.click('text=Deutsch');

    // Wait for page to reload with German locale
    await page.waitForLoadState('networkidle');

    // Check URL contains /de
    expect(page.url()).toContain('/de');

    // Check navigation is in German
    await expect(page.locator('.desktop-nav >> text=Kaufen')).toBeVisible();
    await expect(page.locator('.desktop-nav >> text=Mieten')).toBeVisible();
    await expect(page.locator('.desktop-nav >> text=Projekte')).toBeVisible();
  });

  test('should switch to Thai and show Thai navigation', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Open language dropdown
    await page.click('[data-testid="language-switcher"]');

    // Click on ไทย
    await page.click('text=ไทย');

    // Wait for page to reload
    await page.waitForLoadState('networkidle');

    // Check URL contains /th
    expect(page.url()).toContain('/th');

    // Check navigation is in Thai
    await expect(page.locator('.desktop-nav >> text=ซื้อ')).toBeVisible();
    await expect(page.locator('.desktop-nav >> text=เช่า')).toBeVisible();
  });

  test('should persist language across navigation', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Switch to French
    await page.click('[data-testid="language-switcher"]');
    await page.click('text=Français');
    await page.waitForLoadState('networkidle');

    // URL should now have /fr
    expect(page.url()).toContain('/fr');

    // Navigate directly to Buy page with French locale
    await page.goto('http://localhost:3000/fr/buy');
    await page.waitForLoadState('networkidle');

    // Check URL has /fr and /buy
    expect(page.url()).toContain('/fr/buy');

    // Language switcher should still show FR
    await expect(page.locator('[data-testid="language-switcher"]')).toContainText('FR');

    // Navigation links should be in French
    await expect(page.locator('.desktop-nav >> text=Acheter')).toBeVisible();
  });
});
