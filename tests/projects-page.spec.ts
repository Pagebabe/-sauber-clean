import { test, expect } from '@playwright/test';

test.describe('Projects Page', () => {
  test.setTimeout(15000);

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/projects');
  });

  test('Projects page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL('http://localhost:3000/projects');
    await expect(page.locator('h1')).toContainText('Projects');
  });

  test('Projects page displays header', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('Projects page displays footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('Projects page displays project cards', async ({ page }) => {
    const projectCards = page.locator('[data-testid="project-card"]');
    if (await projectCards.count() > 0) {
      await expect(projectCards.first()).toBeVisible();
    }
  });

  test('Projects page has proper layout', async ({ page }) => {
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });
});
