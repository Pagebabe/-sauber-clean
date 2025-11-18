/**
 * i18n Content Translation Test
 * Tests that translated content displays correctly in different languages
 */

import { test, expect } from '@playwright/test';

test.describe('i18n Content Translation', () => {
  test.setTimeout(15000);

  test('should display homepage content in English by default', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Check English homepage content
    await expect(page.locator('text=Hot Deals for Sale in Pattaya')).toBeVisible();
    await expect(page.locator('text=Show More')).toBeVisible();
    await expect(page.locator('text=Popular Projects')).toBeVisible();
  });

  test('should display homepage content in German', async ({ page }) => {
    await page.goto('http://localhost:3000/de');
    await page.waitForLoadState('networkidle');

    // Check German homepage content
    await expect(page.locator('text=Top-Angebote zum Verkauf in Pattaya')).toBeVisible();
    await expect(page.locator('text=Mehr anzeigen')).toBeVisible();
    await expect(page.locator('text=Beliebte Projekte')).toBeVisible();
  });

  test('should display footer in English', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Check English footer content
    await expect(page.locator('footer >> text=Company')).toBeVisible();
    await expect(page.locator('footer >> text=About Us')).toBeVisible();
    await expect(page.locator('footer >> text=Properties')).toBeVisible();
  });

  test('should display footer in German', async ({ page }) => {
    await page.goto('http://localhost:3000/de');
    await page.waitForLoadState('networkidle');

    // Check German footer content
    await expect(page.locator('footer >> h4:has-text("Unternehmen")')).toBeVisible();
    await expect(page.locator('footer >> text=Über uns')).toBeVisible();
    await expect(page.locator('footer >> h4:has-text("Immobilien")')).toBeVisible();
  });

  test('should display buy page filters in English', async ({ page }) => {
    await page.goto('http://localhost:3000/buy');
    await page.waitForLoadState('networkidle');

    // Check English buy page content
    await expect(page.locator('h1:has-text("Buy Property in Pattaya")')).toBeVisible();
    await expect(page.locator('p:has-text("Find your dream home")')).toBeVisible();
    await expect(page.locator('p.text-text-secondary:has-text("Showing")')).toBeVisible();
    await expect(page.locator('button:has-text("Previous")')).toBeVisible();
    await expect(page.locator('button:has-text("Next")')).toBeVisible();
  });

  test('should display buy page filters in German', async ({ page }) => {
    await page.goto('http://localhost:3000/de/buy');
    await page.waitForLoadState('networkidle');

    // Check German buy page content
    await expect(page.locator('h1:has-text("Immobilien kaufen in Pattaya")')).toBeVisible();
    await expect(page.locator('p:has-text("Finden Sie Ihr Traumhaus")')).toBeVisible();
    await expect(page.locator('p.text-text-secondary:has-text("Anzeige von")')).toBeVisible();
    await expect(page.locator('button:has-text("Zurück")')).toBeVisible();
    await expect(page.locator('button:has-text("Weiter")')).toBeVisible();
  });

  test('should display contact form in English', async ({ page }) => {
    await page.goto('http://localhost:3000/contact');
    await page.waitForLoadState('networkidle');

    // Check English contact form labels
    await expect(page.locator('h1:has-text("Contact Us")')).toBeVisible();
    await expect(page.locator('label:has-text("Name")')).toBeVisible();
    await expect(page.locator('label:has-text("Email")')).toBeVisible();
    await expect(page.locator('label:has-text("Message")')).toBeVisible();
    await expect(page.locator('button:has-text("Send Message")')).toBeVisible();
  });

  test('should display contact form in German', async ({ page }) => {
    await page.goto('http://localhost:3000/de/contact');
    await page.waitForLoadState('networkidle');

    // Check German contact form labels
    await expect(page.locator('h1:has-text("Kontaktieren Sie uns")')).toBeVisible();
    await expect(page.locator('label:has-text("Name")')).toBeVisible();
    await expect(page.locator('label:has-text("E-Mail")')).toBeVisible();
    await expect(page.locator('label:has-text("Nachricht")')).toBeVisible();
    await expect(page.locator('button:has-text("Nachricht senden")')).toBeVisible();
  });

  test('should display about page in English', async ({ page }) => {
    await page.goto('http://localhost:3000/about');
    await page.waitForLoadState('networkidle');

    // Check English about page content
    await expect(page.locator('h1:has-text("About PW Pattaya")')).toBeVisible();
    await expect(page.locator('text=Leading Real Estate Agency in Pattaya')).toBeVisible();
    await expect(page.locator('text=Our Mission')).toBeVisible();
    await expect(page.locator('text=Our Vision')).toBeVisible();
  });

  test('should display about page in German', async ({ page }) => {
    await page.goto('http://localhost:3000/de/about');
    await page.waitForLoadState('networkidle');

    // Check German about page content
    await expect(page.locator('h1:has-text("Über PW Pattaya")')).toBeVisible();
    await expect(page.locator('text=Führende Immobilienagentur in Pattaya')).toBeVisible();
    await expect(page.locator('text=Unsere Mission')).toBeVisible();
    await expect(page.locator('text=Unsere Vision')).toBeVisible();
  });

  test('should switch language and update content dynamically', async ({ page }) => {
    await page.goto('http://localhost:3000/buy');
    await page.waitForLoadState('networkidle');

    // Verify English content first
    await expect(page.locator('h1:has-text("Buy Property in Pattaya")')).toBeVisible();
    await expect(page.locator('button:has-text("Previous")')).toBeVisible();
    await expect(page.locator('button:has-text("Next")')).toBeVisible();

    // Switch to German
    await page.click('[data-testid="language-switcher"]');
    await page.click('text=Deutsch');
    await page.waitForLoadState('networkidle');

    // Verify German content appears
    await expect(page.locator('h1:has-text("Immobilien kaufen in Pattaya")')).toBeVisible();
    await expect(page.locator('button:has-text("Zurück")')).toBeVisible();
    await expect(page.locator('button:has-text("Weiter")')).toBeVisible();
  });
});
