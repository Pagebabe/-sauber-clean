import { test, expect } from '@playwright/test';

test.describe('Sidebar Component', () => {
  test.setTimeout(15000);

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.setViewportSize({ width: 393, height: 852 }); // iPhone 13
  });

  test('Sidebar is hidden by default', async ({ page }) => {
    const sidebar = page.locator('[data-testid="sidebar"]');
    await expect(sidebar).toBeHidden();
  });

  test('Sidebar opens when hamburger menu is clicked', async ({ page }) => {
    const hamburger = page.locator('[data-testid="hamburger-menu"]');
    await hamburger.click();

    const sidebar = page.locator('[data-testid="sidebar"]');
    await expect(sidebar).toBeVisible();
  });

  test('Sidebar contains navigation links', async ({ page }) => {
    const hamburger = page.locator('[data-testid="hamburger-menu"]');
    await hamburger.click();

    const buyLink = page.locator('[data-testid="sidebar"]').getByRole('link', { name: /buy/i });
    const rentLink = page.locator('[data-testid="sidebar"]').getByRole('link', { name: /rent/i });

    await expect(buyLink).toBeVisible();
    await expect(rentLink).toBeVisible();
  });

  test('Sidebar contains language switcher buttons', async ({ page }) => {
    const hamburger = page.locator('[data-testid="hamburger-menu"]');
    await hamburger.click();

    // From analysis: 5 languages (EN, DE, TH, RU, FR)
    const languageButtons = page.locator('[data-testid="sidebar"]').locator('[data-lang]');
    await expect(languageButtons.first()).toBeVisible();
  });

  test('Sidebar closes when close button is clicked', async ({ page }) => {
    const hamburger = page.locator('[data-testid="hamburger-menu"]');
    await hamburger.click();

    const sidebar = page.locator('[data-testid="sidebar"]');
    await expect(sidebar).toBeVisible();

    const closeButton = page.locator('[data-testid="sidebar-close"]');
    await closeButton.click();

    await expect(sidebar).toBeHidden();
  });

  test('Sidebar closes when overlay is clicked', async ({ page }) => {
    const hamburger = page.locator('[data-testid="hamburger-menu"]');
    await hamburger.click();

    const sidebar = page.locator('[data-testid="sidebar"]');
    await expect(sidebar).toBeVisible();

    const overlay = page.locator('[data-testid="sidebar-overlay"]');
    await overlay.click({ position: { x: 10, y: 10 } }); // Click on overlay

    await expect(sidebar).toBeHidden();
  });

  test('Sidebar has PW Pattaya branding', async ({ page }) => {
    const hamburger = page.locator('[data-testid="hamburger-menu"]');
    await hamburger.click();

    const branding = page.locator('[data-testid="sidebar"]').getByText(/PW.*PATTAYA/i);
    await expect(branding).toBeVisible();
  });
});
