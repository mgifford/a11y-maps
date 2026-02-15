
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Recipe 04: Accessible Directions', () => {

    test('should pass automated accessibility check', async ({ page }) => {
        await page.goto('/recipes/04-directions.html');
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('should display visual map and text directions', async ({ page }) => {
        await page.goto('/recipes/04-directions.html');

        // Check list
        const steps = page.locator('.step-btn');
        await expect(steps).toHaveCount(3);
        await expect(steps.first()).toContainText('Start at Southbank Centre (Upper Ground)');

        // Check map
        await expect(page.locator('#map')).toBeVisible();
    });

    test('keyboard navigation should activate steps and update map', async ({ page }) => {
        await page.goto('/recipes/04-directions.html');

        // 1. Tab into first step
        await page.keyboard.press('Tab'); // Nav link
        await page.keyboard.press('Tab'); // First step

        const firstStep = page.locator('.step-btn').nth(0);
        await expect(firstStep).toBeFocused();

        // 2. Activate with Enter
        await page.keyboard.press('Enter');
        await expect(firstStep).toHaveAttribute('aria-current', 'true');

        // 3. Tab to second step
        await page.keyboard.press('Tab');
        const secondStep = page.locator('.step-btn').nth(1);
        await expect(secondStep).toBeFocused();

        // 4. Activate second step
        await page.keyboard.press('Enter');
        await expect(secondStep).toHaveAttribute('aria-current', 'true');
        await expect(firstStep).not.toHaveAttribute('aria-current'); // Sync check
    });

});
