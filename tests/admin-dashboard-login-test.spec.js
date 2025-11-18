/**
 * Admin Dashboard Login Test
 * Tests login and dashboard access
 */

import { test, expect } from '@playwright/test';

test.setTimeout(15000);

test('Admin login and dashboard access works', async ({ page }) => {
  // Go to login page
  await page.goto('http://localhost:3000/admin/login');

  // Fill login form
  await page.fill('input[name="email"]', 'admin@pw-pattaya.com');
  await page.fill('input[name="password"]', 'admin123');

  // Submit
  await page.click('button[type="submit"]');

  // Wait for navigation to dashboard
  await page.waitForURL('**/admin/dashboard');

  // Verify dashboard loaded
  await expect(page.locator('h1')).toBeVisible();

  // Screenshot
  await page.screenshot({
    path: 'tests/screenshots/admin-dashboard-logged-in.png',
    fullPage: true
  });

  console.log('✅ Admin dashboard works after login!');
});
