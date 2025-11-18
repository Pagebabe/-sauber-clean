import { test, expect } from '@playwright/test';

test.describe('Footer Component', () => {
  test.setTimeout(15000); // Bootstrap-Regel: Max 15 Sekunden

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Footer is visible on page', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('Footer contains company name "PW Pattaya"', async ({ page }) => {
    const companyName = page.locator('footer').getByText(/PW.*Pattaya/i);
    await expect(companyName).toBeVisible();
  });

  test('Footer has company information section', async ({ page }) => {
    // From website analysis: Company info column
    const companySection = page.locator('footer').locator('[data-testid="footer-company"]');
    await expect(companySection).toBeVisible();
  });

  test('Footer has navigation links section', async ({ page }) => {
    // From website analysis: Multiple columns with links
    const navLinks = page.locator('footer').getByRole('link', { name: /buy|rent|about|contact/i });
    await expect(navLinks.first()).toBeVisible();
  });

  test('Footer has contact information', async ({ page }) => {
    // From website analysis: Phone, email, address
    const contactSection = page.locator('footer').locator('[data-testid="footer-contact"]');
    await expect(contactSection).toBeVisible();
  });

  test('Footer has social media links', async ({ page }) => {
    const socialLinks = page.locator('footer').locator('[data-testid="footer-social"]');
    await expect(socialLinks).toBeVisible();
  });

  test('Footer has copyright text', async ({ page }) => {
    const copyright = page.locator('footer').getByText(/© 2025.*PW Pattaya/i);
    await expect(copyright).toBeVisible();
  });

  test('Footer has dark background (from analysis: #1a2c3d)', async ({ page }) => {
    const footer = page.locator('footer');
    const bgColor = await footer.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );

    // Should have dark background (not transparent)
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('Footer links are clickable', async ({ page }) => {
    const buyLink = page.locator('footer').getByRole('link', { name: /buy/i }).first();
    await expect(buyLink).toBeEnabled();
  });

  test('Footer is responsive on mobile (393px)', async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 852 }); // iPhone 13

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Footer should adapt layout on mobile (stacked columns)
    const footerHeight = await footer.evaluate(el => el.offsetHeight);
    expect(footerHeight).toBeGreaterThan(300); // Taller on mobile due to stacking
  });
});
