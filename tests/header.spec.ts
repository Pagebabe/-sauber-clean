import { test, expect } from '@playwright/test';

test.describe('Header Component', () => {
  test.setTimeout(15000); // Bootstrap-Regel: Max 15 Sekunden

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Header is visible on page load', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('Header contains logo/brand name "PW PATTAYA"', async ({ page }) => {
    const logo = page.locator('header').getByText(/PW.*PATTAYA/i);
    await expect(logo).toBeVisible();
  });

  test('Header has main navigation links', async ({ page }) => {
    // From website analysis: Buy, Rent, Projects, Service, About, Contact
    const buyLink = page.locator('header').getByRole('link', { name: /buy/i });
    const rentLink = page.locator('header').getByRole('link', { name: /rent/i });

    await expect(buyLink).toBeVisible();
    await expect(rentLink).toBeVisible();
  });

  test('Header has language switcher', async ({ page }) => {
    // Website has 5 languages: EN, DE, TH, RU, FR
    const languageSwitcher = page.locator('header').locator('[data-testid="language-switcher"]');
    await expect(languageSwitcher).toBeVisible();
  });

  test('Header has hamburger menu on mobile (393px width)', async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 852 }); // iPhone 13

    const hamburger = page.locator('header').locator('[data-testid="hamburger-menu"]');
    await expect(hamburger).toBeVisible();
  });

  test('Header navigation hidden on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 852 }); // iPhone 13

    const desktopNav = page.locator('header nav.desktop-nav');
    await expect(desktopNav).toBeHidden();
  });

  test('Header has gradient background (from analysis)', async ({ page }) => {
    const header = page.locator('header');
    const bgColor = await header.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );

    // Should have background color (gradient renders as color)
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
  });
});
