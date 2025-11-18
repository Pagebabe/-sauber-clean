/**
 * Quick Visual Service Pages Check
 */

import { test } from '@playwright/test';

test.setTimeout(10000);

test('Visual check of service detail page', async ({ page }) => {
  await page.goto('http://localhost:3000/services/property-sales');

  await page.waitForTimeout(2000);

  await page.screenshot({
    path: 'tests/screenshots/service-property-sales.png',
    fullPage: true
  });

  console.log('✅ Screenshot saved: service-property-sales.png');
});

test('Visual check of services index', async ({ page }) => {
  await page.goto('http://localhost:3000/services');

  await page.waitForTimeout(2000);

  await page.screenshot({
    path: 'tests/screenshots/services-index.png',
    fullPage: true
  });

  console.log('✅ Screenshot saved: services-index.png');
});
