# Automated Keyboard Testing Strategy

We use **Playwright** to simulate real user keyboard interactions. This allows us to verify that our maps are accessible to users who rely on keyboards (and by extension, many screen reader users) to navigate.

## The Core Concept: `page.keyboard`

Instead of just checking for static attributes (like `tabindex`), we validatethe **interaction flow**.

### 1. Verification of Tab Order
We simulate pressing the `Tab` key to move focus through the application.

```javascript
// Press Tab
await page.keyboard.press('Tab');

// Assert that the expected element has focus
await expect(page.locator('#search-input')).toBeFocused();
```

### 2. Verification of Focus Management
We check `document.activeElement` to ensure focus logic (like managing focus within a map or list) is working.

```javascript
const isMarkerFocused = await page.evaluate(() => {
    return document.activeElement.classList.contains('leaflet-marker-icon');
});
expect(isMarkerFocused).toBeTruthy();
```

### 3. Verification of Activation
We simulate `Enter` or `Space` key presses to ensure interactive elements actually work.

```javascript
// Simulate pressing Enter on a map marker
await page.keyboard.press('Enter');

// Assert that the popup opened
await expect(page.locator('.leaflet-popup-content')).toBeVisible();
```

## How to Extend
To add new keyboard tests:
1.  **Identify the User Flow:** (e.g., "User tabs to filter button, presses Enter, selects option").
2.  **Script the Keys:** Use `await page.keyboard.press('KeyName')`.
3.  **Assert Focus/State:** Always check where the focus is (`toBeFocused()`) or what state changed (e.g., `aria-expanded="true"`).

## Future Improvements
-   **Screen Reader Simulation:** Integrate with tools like `voiceover-test` (Mac) or `nvda-test` (Windows) for true screen reader output verification, though this is often flaky in CI.
-   **Focus Trap Testing:** Verify that focus cannot escape modal dialogs.
-   **Arrow Key Navigation:** More robust testing of custom arrow key widgets (like custom map controls).
