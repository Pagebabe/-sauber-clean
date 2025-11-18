/**
 * Quick Admin Login Page Check
 */

import { test } from '@playwright/test';

test.setTimeout(10000);

test('Check admin login page', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/login');

  await page.waitForTimeout(2000);

  await page.screenshot({
    path: 'tests/screenshots/admin-login-page.png',
    fullPage: true
  });

  console.log('✅ Screenshot saved');
});
