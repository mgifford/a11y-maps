
import { test, expect } from '@playwright/test';

test.describe('Keyboard Navigation Verification', () => {

    test('Recipe 01: Map Container Focus & Panning', async ({ page }) => {
        await page.goto('/recipes/01-hello-map.html');

        // 1. Initial State: Body is focused (or nothing)
        // Press Tab to enter the page content
        await page.keyboard.press('Tab'); // Nav Link
        await page.keyboard.press('Tab'); // Map Container

        // 2. Expect focus to land on the Map Container (tabindex="0")
        // Note: If there were other focusable elements before implementation, this would fail.
        await expect(page.locator('#map')).toBeFocused();

        // 3. User should be able to press Arrow Keys without moving focus away
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowDown');
        await expect(page.locator('#map')).toBeFocused();

        // 4. Tab again -> Should leave the map
        await page.keyboard.press('Tab');

        // Check if a marker is focused
        const isMarkerFocused = await page.evaluate(() => {
            return document.activeElement.classList.contains('leaflet-marker-icon');
        });
        expect(isMarkerFocused).toBeTruthy();
    });

    test('Recipe 02: Full Keyboard Cycle (List -> Map -> List)', async ({ page }) => {
        await page.goto('/recipes/02-map-list-sync.html');

        // 1. Tab into the List
        await page.keyboard.press('Tab'); // Nav Link
        await page.keyboard.press('Tab'); // First Button
        const firstListBtn = page.locator('.location-btn').first();
        await expect(firstListBtn).toBeFocused();

        // 2. Select First Item via Enter
        await page.keyboard.press('Enter');
        await expect(firstListBtn).toHaveAttribute('aria-current', 'true');

        // 3. Tab through the rest of the list...
        // There are 4 items. We are on #1.
        await page.keyboard.press('Tab'); // #2
        await page.keyboard.press('Tab'); // #3
        await page.keyboard.press('Tab'); // #4

        // 4. Tab out of List -> Into Map Container
        await page.keyboard.press('Tab');
        await expect(page.locator('#map')).toBeFocused();

        // 5. Tab into Map Markers
        await page.keyboard.press('Tab'); // Marker 1

        // 6. Verify Marker Interaction
        // We are on a marker. Press Enter.
        await page.keyboard.press('Enter');

        // The Sync Logic should have updated the List
        const activeBtn = page.locator('.location-btn[aria-current="true"]');
        await expect(activeBtn).toBeVisible();
    });

    test('Recipe 03: Search Input & Polygon Navigation', async ({ page }) => {
        await page.goto('/recipes/03-patterns.html');

        // 1. Tab to Search Input
        await page.keyboard.press('Tab'); // Nav Link
        await page.keyboard.press('Tab'); // Input
        await expect(page.locator('#address-input')).toBeFocused();

        // 2. Type and Enter
        await page.keyboard.type('123 Main St');
        // Tab to 'Search' button
        await page.keyboard.press('Tab');
        const searchBtn = page.locator('button:has-text("Search")');
        await expect(searchBtn).toBeFocused();

        // 3. Activate Search
        await page.keyboard.press('Enter');

        // 4. Verify Result
        await expect(page.locator('#search-result')).toContainText('Downtown');

        // 5. Tab to Map Container
        // We need to tab past:
        // - Opacity Slider
        // - Outline Checkbox
        // - 3 Legend Items (West End, Downtown, River District)
        for (let i = 0; i < 5; i++) {
            await page.keyboard.press('Tab');
        }

        // Final tab to map
        await page.keyboard.press('Tab');
        await expect(page.locator('#map')).toBeFocused();

        // 6. Tab to Polygons
        await page.keyboard.press('Tab');

        const isPathFocused = await page.evaluate(() => {
            const el = document.activeElement;
            return el.tagName === 'path' || el.classList.contains('leaflet-interactive');
        });
        expect(isPathFocused).toBeTruthy();

        // 7. Activate Polygon
        await page.keyboard.press('Enter');

        // Check that at least one popup is visible (search or click)
        const popups = page.locator('.leaflet-popup-content');
        await expect(popups.first()).toBeVisible();
    });

});
