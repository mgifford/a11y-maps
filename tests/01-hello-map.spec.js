
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Recipe 01: Hello Map', () => {
    test('should have accessible semantic structure', async ({ page }) => {
        await page.goto('/recipes/01-hello-map.html');

        // Check for figure wrapper
        const figure = page.locator('figure');
        await expect(figure).toBeVisible();
        await expect(figure).toHaveAttribute('aria-labelledby', 'map-caption');

        // Check for map role
        const map = page.locator('#map');
        await expect(map).toHaveRole('application');
        await expect(map).toHaveAttribute('aria-label', 'Interactive map of downtown services');
    });

    test('should pass automated accessibility check (axe)', async ({ page }) => {
        await page.goto('/recipes/01-hello-map.html');

        // Inject axe-core
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        if (accessibilityScanResults.violations.length > 0) {
            console.log('Axe Violations:');
            console.log(JSON.stringify(accessibilityScanResults.violations, null, 2));
        }

        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('markers should exist and be functional', async ({ page }) => {
        await page.goto('/recipes/01-hello-map.html');

        // Leaflet markers are usually images with alt text or divs with roles
        // In standard Leaflet, they are often img elements inside the marker pane
        // We configured tile: 'Central School'

        // Wait for map to load
        await page.waitForSelector('.leaflet-marker-icon');

        // Check if markers are present
        const markers = page.locator('.leaflet-marker-icon');
        await expect(markers).toHaveCount(3);

        // Click a marker and verify popup
        await markers.first().click();
        await expect(page.locator('.leaflet-popup-content')).toContainText('Central School');
    });
});
