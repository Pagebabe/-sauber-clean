/**
 * Admin Properties CRUD Test
 * Tests create, read, update, delete operations for properties
 */

import { test, expect } from '@playwright/test';

test.describe('Admin Properties CRUD', () => {
  test('should login, create, edit, and delete a property', async ({ page }) => {
    test.setTimeout(30000);

    // 1. Login to Admin Panel
    await page.goto('http://localhost:3000/admin/login');
    await page.fill('input[type="email"]', 'admin@pw-pattaya.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard
    await page.waitForURL('**/admin/dashboard');
    await expect(page.locator('text=Welcome back')).toBeVisible();

    // 2. Navigate to Properties Management
    await page.click('a[href="/admin/properties"]');
    await page.waitForURL('**/admin/properties');
    await expect(page.locator('h2:has-text("Properties")')).toBeVisible();

    // 3. Verify existing properties are displayed
    const propertyRows = page.locator('tbody tr');
    const initialCount = await propertyRows.count();
    expect(initialCount).toBeGreaterThan(0);

    // 4. Create a new property
    await page.click('text=Add Property');
    await page.waitForURL('**/admin/properties/new');
    await expect(page.locator('h2:has-text("Add New Property")')).toBeVisible();

    // Fill in property form
    await page.fill('input[name="title"]', 'Test Luxury Condo');
    await page.fill('textarea[name="description"]', 'Beautiful test condo with sea view');
    await page.fill('input[name="price"]', '5500000');
    await page.fill('input[name="location"]', 'Pratumnak Hill');
    await page.fill('input[name="bedrooms"]', '2');
    await page.fill('input[name="bathrooms"]', '2');
    await page.fill('input[name="area"]', '75');
    await page.selectOption('select[name="propertyType"]', 'condo');
    await page.selectOption('select[name="listingType"]', 'sale');
    await page.selectOption('select[name="status"]', 'active');
    await page.fill('input[name="features"]', 'Pool, Gym, Sea View');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for redirect back to properties list
    await page.waitForURL('**/admin/properties');

    // 5. Verify the new property appears in the list
    await expect(page.locator('text=Test Luxury Condo')).toBeVisible();
    await expect(page.locator('text=Pratumnak Hill')).toBeVisible();
    await expect(page.locator('text=฿5,500,000')).toBeVisible();

    // Verify property count increased
    const newCount = await propertyRows.count();
    expect(newCount).toBe(initialCount + 1);

    // 6. Edit the property
    const testPropertyRow = page.locator('tr:has-text("Test Luxury Condo")');
    await testPropertyRow.locator('button:has-text("Edit")').click();

    await page.waitForURL(/\/admin\/properties\/[^/]+$/);
    await expect(page.locator('h2:has-text("Edit Property")')).toBeVisible();

    // Verify form is pre-filled
    await expect(page.locator('input[name="title"]')).toHaveValue('Test Luxury Condo');
    await expect(page.locator('input[name="price"]')).toHaveValue('5500000');

    // Update the property
    await page.fill('input[name="price"]', '5800000');
    await page.fill('input[name="bedrooms"]', '3');
    await page.click('button[type="submit"]');

    // Wait for redirect back to properties list
    await page.waitForURL('**/admin/properties');

    // 7. Verify the property was updated
    await expect(page.locator('text=Test Luxury Condo')).toBeVisible();
    await expect(page.locator('text=฿5,800,000')).toBeVisible();
    await expect(page.locator('text=3BR')).toBeVisible();

    // 8. Delete the property
    const updatedPropertyRow = page.locator('tr:has-text("Test Luxury Condo")');

    // Setup dialog handler before clicking delete
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Are you sure');
      await dialog.accept();
    });

    await updatedPropertyRow.locator('button:has-text("Delete")').click();

    // Wait a moment for the deletion to process
    await page.waitForTimeout(1000);

    // 9. Verify the property was deleted
    await expect(page.locator('text=Test Luxury Condo')).not.toBeVisible();

    // Verify property count is back to original
    const finalCount = await propertyRows.count();
    expect(finalCount).toBe(initialCount);

    // 10. Sign out
    await page.click('button:has-text("Sign Out")');
    await page.waitForURL('**/admin/login');
  });

  test('should show empty state when no properties exist', async ({ page }) => {
    // This test assumes a fresh database or can be adapted
    // For now, just verify the empty state exists in the component
    test.skip();
  });

  test('should validate required fields on property form', async ({ page }) => {
    test.setTimeout(20000);

    // Login
    await page.goto('http://localhost:3000/admin/login');
    await page.fill('input[type="email"]', 'admin@pw-pattaya.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/dashboard');

    // Navigate to new property form
    await page.goto('http://localhost:3000/admin/properties/new');

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Verify form validation prevents submission
    // HTML5 required fields should prevent form submission
    await expect(page).toHaveURL('**/admin/properties/new');
  });
});
