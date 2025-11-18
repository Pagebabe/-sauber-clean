import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard Access Test', () => {
  test.setTimeout(15000);

  test('should login and access dashboard successfully', async ({ page }) => {
    // 1. Go to login page
    await page.goto('http://localhost:3000/admin/login');

    // 2. Fill login form
    await page.fill('input[type="email"]', 'admin@pw-pattaya.com');
    await page.fill('input[type="password"]', 'admin123');

    // 3. Click login button
    await page.click('button[type="submit"]');

    // 4. Wait for dashboard navigation
    await page.waitForURL('**/admin/dashboard', { timeout: 10000 });

    // 5. Check if dashboard loaded without 500 error
    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('500');
    expect(bodyText).not.toContain('Internal Server Error');
    expect(bodyText).not.toContain('undefined cannot be serialized');

    // 6. Check for dashboard content
    const hasContent = await page.locator('text=/Dashboard|Properties|Projects|Leads/i').count();
    expect(hasContent).toBeGreaterThan(0);

    console.log('✅ Dashboard is accessible and working!');

    // 7. Take screenshot
    await page.screenshot({ path: 'test-results/admin-dashboard-working.png', fullPage: true });
  });
});
