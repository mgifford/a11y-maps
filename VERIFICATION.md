# Verification Strategy

This document outlines the testing strategy for the "Accessible Map Recipes" project. Unlike the legacy plan, this document reflects the **actual automated tests** we are implementing.

## 1. Automated Accessibility Scans (`axe-core`)
Every recipe is automatically scanned for WCAG 2.1 AA violations using `@axe-core/playwright`.

**What is tested:**
- Color contrast
- Missing labels / ARIA attributes
- Landmark structure (checked for `<main>`, `<figure>`, `<nav>`)
- Heading hierarchy

**Command:**
```bash
npx playwright test --grep "@axe"
```

## 2. Keyboard Navigation Verification (Simulated User)
We use Playwright's `page.keyboard` API to simulate a **real keyboard-only user**. We do NOT use synthetic clicks; we strictly use `Tab`, `Shift+Tab`, `ArrowKeys`, and `Enter`.

**Critical User Flows to Verify:**
1.  **Tab Order:** Ensure the user can reach every interactive element in a logical order.
2.  **Focus Visibility:** Ensure the currently focused element matches expectations (`document.activeElement`).
3.  **Activation:** Ensure `Enter` or `Space` triggers buttons and map markers.
4.  **No Keyboard Traps:** Ensure the user can Tab *out* of the map.

**Test File:** `tests/keyboard-verification.spec.js`

## 3. Screen Reader Semantics
While we cannot fully automate a screen reader audio output in a headless CI environment, we verify the **DOM Tree** that the screen reader parses.

**What is tested:**
- `role="application"` on maps
- `aria-label` / `aria-labelledby` relationships
- `aria-current="true"` on active list items
- `aria-live` regions for search results

## 4. Manual Verification Checklist (Human Required)
Some things still require a human check:
- [ ] **VoiceOver / NVDA:** Turn on a real screen reader and navigate the "Hello Map" recipe. Result: "Map of Downtown Service Locations... Use arrow keys to pan".
- [ ] **Zoom/Magnification:** Ensure the layout doesn't break at 200% zoom.
- [ ] **High Contrast Mode:** Ensure SVG patterns are visible in Windows High Contrast mode.
