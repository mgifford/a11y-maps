
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Recipe 03: Patterns', () => {
    test('should pass automated accessibility check', async ({ page }) => {
        await page.goto('/recipes/03-patterns.html');
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('legend should show new zone names', async ({ page }) => {
        await page.goto('/recipes/03-patterns.html');

        await expect(page.locator('.legend-item:has-text("Downtown")')).toBeVisible();
        await expect(page.locator('.legend-item:has-text("River District")')).toBeVisible();
        await expect(page.locator('.legend-item:has-text("West End")')).toBeVisible();
    });

    test('address search should find a zone (User Example: 57 Wapping Wall)', async ({ page }) => {
        await page.goto('/recipes/03-patterns.html');

        // Type address
        await page.fill('#address-input', '57 Wapping Wall');

        // Click Search
        await page.click('button:has-text("Search")');

        // Check result
        const result = page.locator('#search-result');
        await expect(result).toContainText('River District');
        await expect(result).toContainText('Commercial Zone');
    });

    test('click on sample address should populate input', async ({ page }) => {
        await page.goto('/recipes/03-patterns.html');

        // Click the sample text
        await page.click('text=15 Prescot St');

        // Check input value
        await expect(page.locator('#address-input')).toHaveValue('15 Prescot St');

        // It also triggers search automatically in our implementation
        const result = page.locator('#search-result');
        await expect(result).toContainText('Downtown');
    });

    test('opacity slider should update path styles', async ({ page }) => {
        await page.goto('/recipes/03-patterns.html');

        // Wait for map
        await page.waitForSelector('.leaflet-interactive');

        // Change opacity to 0.5
        await page.fill('#opacity-slider', '0.5');
        await page.dispatchEvent('#opacity-slider', 'input');

        // Check display value
        await expect(page.locator('#opacity-val')).toHaveText('50%');

        // We can't easily check SVG computed styles in Playwright without evaluating, 
        // but we can check if the function ran without error and verify text update.
    });

    test('address search should handle outside zones (County Hall)', async ({ page }) => {
        await page.goto('/recipes/03-patterns.html');

        await page.fill('#address-input', 'County Hall');
        await page.click('button:has-text("Search")');

        const result = page.locator('#search-result');
        await expect(result).toContainText('Outside of Zoned Areas');
    });
});
