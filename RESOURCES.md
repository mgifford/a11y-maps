# Accessible Mapping Resources

A collection of external examples, guidelines, and articles for building accessible maps.

## Key Guidelines & Articles

### 1. [Maps | Accessibility Guidelines (Carnegie Museums)](http://web-accessibility.carnegiemuseums.org/content/maps/)
*   **Core Advice:** If a map is used for directions, *always* provide text-based directions adjacent to it.
*   **Google Maps:** Using an embedded Google Map? Ensure the `iframe` has a `title` attribute and a descriptive heading before it.
*   **Key Takeaway:** "If the map is on the page to show landmarks, describe those landmarks and their locations, either in an unordered list or a paragraph."

### 2. [Digital Maps & Accessibility (Concept3D)](https://concept3d.com/blog/accessibility/digital-maps-accessibility/)
*   **Focus:** Highlights the importance of color contrast and text overlays.
*   **Practical Tip:** Eliminate content that appears only on hover. Make elements clickable so the content persists, which aids screen magnification users who might be zoomed in on a different part of the screen.
*   **Location Accessibility:** Suggests highlighting accessible parking, ramps, and elevators specifically on the map implementation.

### 3. [Minnesota IT Services: Maps](https://mn.gov/mnit/about-mnit/accessibility/maps/)
*   **State Standard:** Excellent example of government standards for accessible maps.
*   **Requirement:** Emphasizes that maps must not be the *sole* source of information. Equivalent text or data tables are required.

### 4. [Accessible Maps & Wayfinding (Perkins School for the Blind)](https://www.perkins.org/resource/accessible-maps-and-way-finding-tools-for-low-vision/)
*   **Context:** Expert resources from a leader in visual impairment education. Focuses on tools and strategies for low-vision users, including high-contrast and tactile options.

### 5. [How to adapt maps for accessibility (MapLibrary)](https://www.maplibrary.org/11476/how-to-adapt-maps-for-accessibility-7-steps/)
*   **7-Step Guide:** A practical step-by-step approach to adapting existing maps for better accessibility.

### 6. [Making GIS Data Accessible (NSGIC)](https://nsgic.org/wp-content/uploads/2025/10/Making-GIS-Data-Accessible-and-ADA-Compliant.pdf)
*   **For GIS Professionals:** A PDF resource focused on the data side—ensuring the underlying GIS data is structured in a way that can be exported or presented accessibly.

---

## Technical Libraries

### Leaflet.js
The library we are using in our recipes.
-   **Docs:** [Leaflet Accessibility Guide](https://leafletjs.com/examples/accessibility/)
-   **Why we use it:** Best out-of-the-box keyboard navigation for markers and popups.

### Mapbox GL JS
-   **Note:** Powerful but requires significant custom effort (ARIA management) to match Leaflet's baseline accessibility.

## Summary of Best Practices

Based on the resources above, here is the "Gold Standard" checklist for accessible maps:

1.  **The "Text Alternative" Rule:** Never publish a map without an accompanying list, table, or text description of the same data (Recipe 02).
2.  **No "Hover-Only" Content:** Vital information must be revealed on *click* or *focus*, not just hover (Concept3D).
3.  **Keyboard Operability:** You must be able to reach every interactive feature using only `Tab` and `Enter` (Carnegie Museums).
4.  **Pattern + Color:** Never rely on color alone to distinguish regions (Recipe 03).

