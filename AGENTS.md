# AGENTS.md

## Purpose

This repository demonstrates **best practices for accessible municipal maps built on OpenStreetMap data**.

AI agents, automation tools, and human contributors must follow the rules in this file.  
The goal is not to build a “cool map”, but to demonstrate **how civic mapping can be made accessible, inspectable, and defensible**.

The map is a secondary view.  
The data model and user tasks are primary.

---

## Non-negotiable principles

1. **No map-only information**
   All essential information must be available in text without interacting with the map.

2. **Semantics first, visuals second**
   Every visual element must map to explicit semantic data.

3. **Accessibility is intentional, not accidental**
   Keyboard and screen reader support must be designed, not assumed.

4. **Hypothetical data must be clearly labeled**
   This demo may include fictional services. They must never be presented as authoritative.

5. **Static and inspectable**
   The site must work on GitHub Pages with no backend services.

6. **Test-driven development**
   All features must have automated tests before implementation. Tests define behavior.

7. **License compliance and transparency**
   All code and dependencies must be AGPL-3.0 compatible with clear attribution.

---

## Supported user tasks

The demo must support the following tasks **without requiring a mouse or visual interpretation**:

- Select a city automatically based on browser geolocation (with fallback).
- Search or select a sample address or parcel.
- Answer the question:
  “Does my property have places where I should not dig?”
- Identify which utilities, trees, or sidewalks affect a property.
- Understand *why* a restriction exists.
- Toggle layers and understand their meaning.
- Navigate the entire interface using keyboard only.

If a feature does not support at least one of these tasks, it does not belong in the demo.

---

## License and attribution requirements

### License

- This project is licensed under **AGPL-3.0**
- All modifications to this code must be shared if deployed publicly
- This ensures transparency in civic/municipal technology

### Dependencies

All dependencies must be:
- **AGPL-3.0 compatible** (permissive licenses like BSD, MIT, Apache are acceptable)
- **Clearly attributed** in ATTRIBUTION.md
- **Free and open source** (no proprietary libraries)
- **Minimal and justified** (prefer fewer dependencies)

### Current dependencies

1. **Leaflet.js** - BSD 2-Clause License
   - Mapping library
   - Must maintain attribution in HTML
   
2. **OpenStreetMap** - ODbL (data), CC-BY-SA 2.0 (tiles)
   - Base map tiles
   - Attribution required and displayed

### Prohibited dependencies

- Proprietary or closed-source libraries
- Libraries with tracking or telemetry
- Libraries that require CDN-only access
- Libraries incompatible with AGPL-3.0

---

## Test-driven development requirements

### Testing philosophy

**Tests are documentation.** They define expected behavior for accessibility features.

**Write tests first.** Before implementing a feature:
1. Write the test that describes the behavior
2. Run the test (it should fail)
3. Implement the feature
4. Run the test (it should pass)
5. Refactor if needed

### Required test categories

1. **Accessibility tests** (CRITICAL)
   - Keyboard navigation flows
   - Screen reader announcements
   - Focus management
   - ARIA attributes
   - Color contrast compliance

2. **Functional tests**
   - Data generation
   - Feature search and filtering
   - Layer toggling
   - Location services

3. **Integration tests**
   - Text-map synchronization
   - Page workflows (address → results)
   - City switching

4. **Visual regression tests**
   - Legend rendering
   - Focus indicators
   - Pattern visibility

### Testing tools

**Recommended stack:**
- **Vitest** - Unit and integration tests (MIT license)
- **Playwright** - Browser automation and accessibility testing (Apache 2.0)
- **@axe-core/playwright** - Automated accessibility testing (MPL 2.0)
- **@testing-library/dom** - DOM testing utilities (MIT license)

All testing dependencies must be AGPL-compatible.

### Test coverage requirements

- **Minimum 80% code coverage** for core features
- **100% coverage** for accessibility utilities
- **All keyboard shortcuts** must have tests
- **All ARIA announcements** must be verified
- **All user tasks** from "Supported user tasks" must have end-to-end tests

### Running tests

Tests must be runnable:
- Locally without network access
- In CI/CD pipelines
- With clear pass/fail criteria
- With accessible output (for developers using screen readers)

---

## Location selection rules

- Use browser geolocation only to determine the **nearest major city**.
- Do not store, transmit, or log precise user location.
- Reverse geocode to a city with population > 100,000 when possible.
- If geolocation fails or is denied, fall back to a predefined default city.
- Always display the selected city name.
- Always include a disclaimer that data is illustrative.

---

## Data model requirements

All features, real or hypothetical, must expose explicit semantics.

Minimum required properties:

- `id`
- `feature_type`
  - Examples: `gas_line`, `water_line`, `sewer`, `electrical`, `sidewalk`, `tree`, `restriction_zone`
- `geometry_type`
- `risk_level`
  - `high`, `medium`, `advisory`, `none`
- `restriction`
  - Plain-language explanation
- `description`
- `authority`
- `data_status`
  - `real_osm` or `hypothetical`
- `confidence`
- `last_updated`

No meaning may be encoded solely in color, line style, or opacity.

---

## Hypothetical data rules

- Hypothetical utilities and services are allowed.
- They must be **clearly labeled** as fictional.
- Each hypothetical feature must include:
  - `data_status: "hypothetical"`
  - `confidence: "illustrative only"`
- Hypothetical data must be plausible but not presented as accurate.
- Do not imply legal, safety, or regulatory authority.

---

## Visual encoding rules

### Lines (utilities, sidewalks)

- Use **at least two visual channels beyond color**:
  - Dash pattern
  - Width or casing
- Every pattern must have a text explanation in the legend.

### Polygons (zones, restrictions)

- Use solid fill plus boundary stroke.
- Restriction zones must use pattern or hatching, not color alone.
- Meaning must be described in text.

### Points (trees, assets)

- Use icons with accessible names.
- Provide a list-based alternative view.

---

## Legend requirements

- Must be HTML, not canvas or image.
- Must include:
  - Text labels
  - Pattern examples
  - Clear descriptions
- Must be keyboard operable.

---

## Accessibility requirements

### Keyboard

- Logical tab order.
- No keyboard traps.
- Visible focus indicators.
- Escape closes dialogs and popups.
- Enter activates selections.

### Screen readers

- Selection changes must be announced via a live region.
- Feature details must update in a structured panel.
- Do not attempt to expose individual map geometries as ARIA widgets.

### Color and contrast

- Do not rely on color alone.
- Ensure sufficient contrast for non-text elements.
- Patterns must remain distinguishable at multiple zoom levels.

---

## Map interaction rules

- The map is a **visual aid**, not the primary interface.
- Selecting an item in text must update the map.
- Selecting an item on the map must update text.
- All critical answers must be available without interacting with the map.

---

## Required pages

The demo must include exactly these pages:

1. **Where should I not dig?**
   - Address or parcel selection
   - Plain-language summary
   - Structured list of restrictions
   - Optional map highlighting

2. **Utilities and features explorer**
   - Layer toggles
   - Accessible legend
   - Feature list synchronized with the map

3. **How this map is accessible**
   - Purpose and scope
   - Keyboard interaction model
   - Semantic design explanation
   - Known limitations
   - Hypothetical data disclaimer

---

## Explicit non-goals

Do not add:

- Real-time data
- Authentication
- Tracking or analytics
- Complex routing
- Hover-only interactions
- ARIA roles on raw map shapes
- Claims of accuracy, authority, or safety compliance
- “AI-powered” interpretations

---

## Evaluation criteria

The demo is successful if:

- A blind user can answer “Where should I not dig?”
- A color-blind user can distinguish utilities.
- A keyboard-only user can operate all controls.
- An accessibility reviewer can clearly identify intent and structure.
- A municipal technologist can reuse the pattern.

If these criteria are not met, the demo has failed regardless of visual quality.

---

## Final instruction to agents

When in doubt:

- Prefer clarity over cleverness.
- Prefer text over pixels.
- Prefer semantics over styling.
- Prefer fewer features done correctly over more features done poorly.