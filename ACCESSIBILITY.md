# Accessibility Commitment

## 1. Our Mission

This project demonstrates **best practices for accessible municipal maps** built on OpenStreetMap data. Accessibility is not a feature—it is the foundation of everything we build.

We believe that civic technology must be accessible to all residents, including those who are blind, have low vision, are color-blind, use keyboard-only navigation, or rely on assistive technologies. Our approach treats **maps as a secondary visual aid**, not the primary interface.

### Conformance Target

**WCAG 2.2 Level AA** across all pages and interactive features.

## 2. Core Accessibility Principles

Our accessibility approach is built on seven non-negotiable principles (defined in [AGENTS.md](AGENTS.md)):

1. **No map-only information** - All essential information must be available in text without interacting with the map
2. **Semantics first, visuals second** - Every visual element must map to explicit semantic data
3. **Accessibility is intentional, not accidental** - Keyboard and screen reader support must be designed, not assumed
4. **Hypothetical data must be clearly labeled** - Demo data is marked with `data_status: "hypothetical"`
5. **Static and inspectable** - Works on GitHub Pages with no backend services
6. **Test-driven development** - All features have automated tests before implementation
7. **License compliance and transparency** - All dependencies are AGPL-3.0 compatible

## 3. What Works (Supported User Tasks)

This demo is designed to support the following tasks **without requiring a mouse or visual interpretation**:

✅ Select a city automatically based on browser geolocation (with fallback)  
✅ Search or select a sample address or parcel  
✅ Answer: "Does my property have places where I should not dig?"  
✅ Identify which utilities, trees, or sidewalks affect a property  
✅ Understand *why* a restriction exists  
✅ Toggle layers and understand their meaning  
✅ Navigate the entire interface using keyboard only  

### Testing Status

| Accessibility Feature | Status | Test Coverage |
| :--- | :--- | :--- |
| **Keyboard Navigation** | ✅ Fully supported | Automated (Playwright) |
| **Screen Reader Support** | ✅ Fully supported | Manual verification + ARIA tests |
| **Focus Management** | ✅ Implemented | Automated |
| **Color Independence** | ✅ Multi-channel encoding | Visual regression tests |
| **Semantic HTML** | ✅ Required | Code review |
| **ARIA Live Regions** | ✅ Implemented | Automated |
| **Text Alternatives** | ✅ Required | Manual + automated |

## 4. Keyboard Interaction Model

All functionality is accessible via keyboard:

### Global Navigation
- **Tab** - Move focus forward through interactive elements
- **Shift+Tab** - Move focus backward
- **Enter/Space** - Activate buttons, links, and toggles
- **Escape** - Close dialogs and popups

### Map Container
- **Tab** - Focus the map container (it has `tabindex="0"`)
- **Arrow Keys** - Pan the map while focused
- **Enter** - Activate focused map marker
- **Tab** - Move to next map marker or out of map

### List Navigation
- **Arrow Up/Down** - Navigate list items
- **Enter** - Select item (updates map)
- **Home/End** - Jump to first/last item

See [TESTING.md](TESTING.md) for detailed keyboard testing strategy.

## 5. Screen Reader Support

### ARIA Live Regions
Dynamic content changes are announced to screen readers via live regions:
- Feature selection announcements
- Layer toggle feedback
- Error and status messages

### Semantic Structure
- Semantic HTML5 elements (`<nav>`, `<main>`, `<section>`, `<article>`)
- ARIA landmarks for navigation
- Descriptive heading hierarchy
- List structures for feature lists

### Map Accessibility Strategy
**Key principle:** The map is a visual aid, not the primary interface.
- Map features are also available in synchronized text lists
- Selecting text updates the map
- Selecting on the map updates the text
- Critical information is never map-only

See [accessibility.html](accessibility.html) for detailed documentation.

## 6. Visual Accessibility

### Multi-Channel Encoding
We **never rely on color alone**. Utilities and features use:
- **Color** (for users who can see color)
- **Dash patterns** (dashed, dotted, solid)
- **Line width or casing** (thin, medium, thick)
- **Text labels** in legend

### Color Contrast
- Text: Minimum 4.5:1 contrast ratio (WCAG AA)
- UI components: Minimum 3:1 contrast ratio
- Focus indicators: High contrast, clearly visible

### Zoom Support
- Works at 200% browser zoom
- No horizontal scrolling required
- Touch targets remain at least 44×44 CSS pixels

## 7. Data Model & Semantic Transparency

All features expose explicit semantics (never visual-only information):

### Required Properties
Every feature includes:
- `id` - Unique identifier
- `feature_type` - Type (e.g., `gas_line`, `water_line`, `tree`, `sidewalk`)
- `geometry_type` - GeoJSON geometry type
- `risk_level` - `high`, `medium`, `advisory`, or `none`
- `restriction` - Plain-language explanation
- `description` - Human-readable details
- `authority` - Responsible agency
- `data_status` - `real_osm` or `hypothetical`
- `confidence` - Data quality indicator
- `last_updated` - Date of data

This semantic approach ensures assistive technologies can access all information.

## 8. Automated Testing & CI/CD

### Current Automation

We use **Playwright** with **@axe-core/playwright** for automated accessibility testing:

```bash
# Run all tests (includes accessibility checks)
npx playwright test
```

### Test Categories
1. **Keyboard Navigation Tests** - Verify tab order, focus management, keyboard shortcuts
2. **ARIA Tests** - Validate live regions, roles, and attributes
3. **Semantic HTML Tests** - Ensure proper structure
4. **Axe-core Scans** - Automated WCAG checks on all pages

See [TESTING.md](TESTING.md) for complete testing documentation.

### Test Coverage Requirements
- **Minimum 80% code coverage** for core features
- **100% coverage** for accessibility utilities
- **All keyboard shortcuts** must have tests
- **All ARIA announcements** must be verified
- **All user tasks** must have end-to-end tests

## 9. Contributing Guidelines

### Before You Contribute

1. Read [CONTRIBUTING.md](CONTRIBUTING.md) for the full process
2. Review [AGENTS.md](AGENTS.md) if you're using AI coding assistants
3. Understand our accessibility-first approach
4. Test with keyboard and screen reader

### Accessibility Checklist for Contributors

Before submitting a pull request:

- [ ] Can complete all tasks using only keyboard
- [ ] All interactive elements have visible focus indicators
- [ ] All form inputs have associated labels
- [ ] Dynamic content changes are announced to screen readers
- [ ] Color is not the only way information is conveyed
- [ ] All images and icons have appropriate alt text or aria-hidden
- [ ] Tested with at least one screen reader (NVDA, VoiceOver, or JAWS)
- [ ] Page structure uses semantic HTML
- [ ] Contrast ratios meet WCAG AA (4.5:1 for text, 3:1 for UI)
- [ ] Works with map completely hidden
- [ ] All Playwright tests pass

### AI Coding Assistants

If you use GitHub Copilot, Cursor, Claude, or similar AI tools:

> **Instruction for AI agents:** Before modifying or creating UI components, read `ACCESSIBILITY.md` and `AGENTS.md`. Ensure all changes comply with WCAG 2.2 AA standards. The map is a secondary visual aid—all essential information must be available in text.

See [AGENTS.md](AGENTS.md) for comprehensive AI agent guidelines.

## 10. Known Limitations & Roadmap

### Current Limitations
- ⚠️ **Hypothetical data** - Utility and restriction data is illustrative only (clearly marked)
- ⚠️ **Limited city coverage** - Only major cities with population > 100,000
- ⚠️ **Static data** - No real-time updates
- ⚠️ **Manual screen reader testing** - Not yet automated in CI

### Planned Improvements
- [ ] Automated screen reader testing in CI
- [ ] Additional city data
- [ ] Enhanced pattern library for utilities
- [ ] Improved mobile touch support
- [ ] More comprehensive ARIA documentation

## 11. Reporting Accessibility Issues

### How to Report

If you encounter an accessibility barrier:

1. **File a GitHub issue** with the `accessibility` label
2. **Include details:**
   - What you expected to happen
   - What actually happened
   - Steps to reproduce
   - Assistive technology used (e.g., "NVDA 2024.1 with Chrome 120")
   - Browser and OS version

### Issue Priority

We use the following severity levels:

- **Critical:** Prevents a user from completing a core task (e.g., "Cannot determine dig restrictions")
- **High:** Significant difficulty, but a workaround exists
- **Medium:** Annoyance or inconsistent experience
- **Low:** Minor improvement or enhancement

Critical and High severity issues are prioritized above new features.

## 12. Testing with Assistive Technology

### Recommended Tools

**Screen Readers:**
- **NVDA** (Windows) - https://www.nvaccess.org/
- **VoiceOver** (macOS/iOS) - Built-in
- **JAWS** (Windows) - https://www.freedomscientific.com/products/software/jaws/
- **TalkBack** (Android) - Built-in

**Browser Extensions:**
- **axe DevTools** - https://www.deque.com/axe/devtools/
- **WAVE** - https://wave.webaim.org/
- **Lighthouse** (Chrome DevTools) - Built-in

**Keyboard Testing:**
- Disconnect mouse/trackpad
- Use only Tab, Arrow keys, Enter, Space, Escape

### Manual Testing Checklist

See the complete checklist in [CONTRIBUTING.md](CONTRIBUTING.md#accessibility-testing-checklist).

## 13. Technical Implementation

### Accessibility Utilities

Our custom accessibility utilities are in [js/accessibility.js](js/accessibility.js):

- `announceToScreenReader(message, priority)` - ARIA live region announcements
- `trapFocus(container)` - Focus trap for modals
- `makeListKeyboardAccessible(list, onSelect)` - Arrow key navigation for lists
- Focus management helpers

### Map Accessibility

Our accessible map wrapper is in [js/map-utils.js](js/map-utils.js):

- Keyboard navigation for map markers
- Synchronized text-map selection
- Accessible legend generation
- Focus management for map interactions

## 14. Trusted Accessibility Resources

For authoritative accessibility guidance, we reference:

### Core Standards
- **WCAG 2.2** - https://www.w3.org/WAI/WCAG22/quickref/
- **ARIA Authoring Practices** - https://www.w3.org/WAI/ARIA/apg/
- **WAI-YAML-LD** (machine-readable standards) - https://github.com/mgifford/wai-yaml-ld

### Community Resources
- **WebAIM** - https://webaim.org/
- **The A11Y Project** - https://www.a11yproject.com/
- **Deque University** - https://dequeuniversity.com/

### Extended Resource List
For a comprehensive list of vetted accessibility resources, see:
- **TRUSTED_SOURCES.yaml** - https://github.com/mgifford/ACCESSIBILITY.md/blob/main/examples/TRUSTED_SOURCES.yaml

This machine-readable list includes standards bodies, testing tools, consulting firms, and educational resources that we trust for accessibility guidance.

## 15. License & Legal

This project is licensed under **AGPL-3.0** to ensure transparency in civic/municipal technology.

All dependencies are AGPL-compatible and documented in [ATTRIBUTION.md](ATTRIBUTION.md).

### Disclaimer

**All utility and restriction data is illustrative only and must not be used for actual excavation planning, construction, or safety decisions.**

Always contact local authorities (811 in North America) before digging.

## 16. Success Criteria

This demo succeeds if:

- ✅ A blind user can answer "Where should I not dig?"
- ✅ A color-blind user can distinguish utilities
- ✅ A keyboard-only user can operate all controls
- ✅ An accessibility reviewer can clearly identify intent and structure
- ✅ A municipal technologist can reuse the pattern

If these criteria are not met, the demo has failed regardless of visual quality.

---

## Questions or Feedback?

- **File an issue:** https://github.com/mgifford/a11y-maps/issues
- **Read the docs:** [accessibility.html](accessibility.html)
- **Review the code:** [js/accessibility.js](js/accessibility.js)
- **Check the tests:** [tests/keyboard-verification.spec.js](tests/keyboard-verification.spec.js)

**Last updated:** 2026-02-24
