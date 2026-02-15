
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Recipe 05: Filtered Map', () => {

    test('should pass automated accessibility check', async ({ page }) => {
        await page.goto('/recipes/05-filtered.html');
        const results = await new AxeBuilder({ page }).analyze();
        expect(results.violations).toEqual([]);
    });

    test('checking/unchecking filters should update status message', async ({ page }) => {
        await page.goto('/recipes/05-filtered.html');

        const status = page.locator('#status-live');
        // Initial: 30 items
        await expect(status).toHaveText(/Showing 30 locations/);

        // Uncheck "School" (10 items) -> 20 left
        await page.uncheck('input[value="school"]');
        await expect(status).toHaveText(/Showing 20 locations/);

        // Uncheck "Library" (10 items) -> 10 left
        await page.uncheck('input[value="library"]');
        await expect(status).toHaveText(/Showing 10 locations/);

        // Uncheck "Park" (10 items) -> 0 left
        await page.uncheck('input[value="park"]');
        await expect(status).toHaveText('No locations visible.');
    });

    test('keyboard navigation for checkbox group', async ({ page }) => {
        await page.goto('/recipes/05-filtered.html');

        // Tab to first checkbox (Library)
        await page.keyboard.press('Tab'); // Nav
        await page.keyboard.press('Tab'); // First checkbox
        const libCheckbox = page.locator('input[value="library"]');
        await expect(libCheckbox).toBeFocused();

        // Toggle with Space
        await page.keyboard.press('Space');
        await expect(libCheckbox).not.toBeChecked();

        // Status updates? 30 -> 20
        await expect(page.locator('#status-live')).toHaveText(/Showing 20 locations/);
    });

});
