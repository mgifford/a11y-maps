# Quick Start Guide

## For End Users

### Viewing the Demo Locally

1. **Clone or download** this repository
2. **Open any HTML file** in a modern web browser:
   - `index.html` - Home page with overview
   - `dig-safety.html` - "Where should I not dig?" demo
   - `explorer.html` - Utilities and features explorer
   - `accessibility.html` - Documentation

3. **Grant location permission** (optional) or use the default city

That's it! No build process or server required.

### Testing Accessibility Features

**Keyboard Navigation:**
- Use `Tab` to move between elements
- Use arrow keys in lists
- Press `Enter` or `Space` to activate
- Press `Escape` to close dialogs

**Screen Reader Testing:**
- **Windows:** Download [NVDA](https://www.nvaccess.org/) (free)
- **macOS:** Use built-in VoiceOver (Cmd+F5)
- **Mobile:** Use TalkBack (Android) or VoiceOver (iOS)

**Visual Testing:**
- Hide the map to verify all info is in text
- Use browser zoom to 200%
- Test with different color schemes
- Use browser DevTools to simulate color blindness

## For Developers

### File Structure

```
/
├── index.html              # Landing page
├── dig-safety.html         # Page 1: Dig safety demo
├── explorer.html           # Page 2: Layer explorer demo
├── accessibility.html      # Page 3: Documentation
├── css/
│   ├── common.css         # Shared styles
│   └── map.css            # Map-specific styles
├── js/
│   ├── config.js          # City and feature configurations
│   ├── location.js        # Geolocation and city selection
│   ├── data-generator.js  # Generate hypothetical data
│   ├── accessibility.js   # Keyboard and ARIA utilities
│   ├── map-utils.js       # Leaflet map wrapper
│   ├── dig-safety.js      # Dig safety page logic
│   └── explorer.js        # Explorer page logic
├── README.md              # Main documentation
├── CONTRIBUTING.md        # Contribution guidelines
└── LICENSE                # MIT license
```

### Key Architecture Patterns

**1. Text-First Design**
- All essential information in HTML
- Map is optional enhancement
- Can be completely hidden

**2. Semantic Data Model**
Every feature includes:
```javascript
{
  id: "unique_id",
  feature_type: "gas_line",
  risk_level: "high",
  restriction: "Plain language explanation",
  description: "Human-readable description",
  data_status: "hypothetical|real_osm|synthetic",
  // Visual encoding (not relied upon for semantics)
  color: "#FFD700",
  pattern: "solid",
  width: 4
}
```

**3. Bidirectional Synchronization**
- Selecting in text list highlights on map
- Clicking on map selects in text list
- Both announce to screen readers

**4. Keyboard Accessibility**
```javascript
// Example: Make a list keyboard-navigable
makeListKeyboardAccessible(listElement, (item) => {
  // Handle selection
});
```

**5. Screen Reader Announcements**
```javascript
// Announce changes
announceToScreenReader("Feature selected");
```

### Adding a New Feature Type

1. **Add to config.js:**
```javascript
FEATURE_TYPES.my_new_type = {
  name: "My Feature",
  category: "utility",
  dataStatus: "hypothetical",
  riskLevel: "medium",
  color: "#FF5733",
  pattern: "dashed",
  dashArray: "5, 5",
  width: 3,
  description: "Description of feature",
  restriction: "Restriction details",
  authority: "Authority name",
  icon: "🔧"
};
```

2. **Generate data in data-generator.js:**
```javascript
generateMyFeatures(count = 5) {
  // Use randomLine() or randomPolygon()
  // Return GeoJSON FeatureCollection
}
```

3. **Add to layer controls** in explorer.js

### Customizing for Your City

1. **Add city to config.js:**
```javascript
CITIES.mycity = {
  name: "My City, ST",
  center: [latitude, longitude],
  bounds: [[minLat, minLon], [maxLat, maxLon]],
  zoom: 13,
  population: 123456,
  osmCoverage: "good|excellent|fair"
};
```

2. **Add sample addresses:**
```javascript
SAMPLE_ADDRESSES.mycity = [
  {
    id: "addr_001",
    address: "123 Main St",
    parcelId: "PARCEL-001",
    coordinates: [lat, lon],
    description: "Downtown"
  }
];
```

### Using Real OSM Data

To use actual OpenStreetMap data instead of generated features:

1. **Query Overpass API** for your area
2. **Convert to GeoJSON**
3. **Add proper semantic metadata:**
```javascript
feature.properties.data_status = "real_osm";
feature.properties.feature_type = "sidewalk"; // or other type
feature.properties.risk_level = "none";
// etc.
```

4. **Load instead of generating** in data-generator.js

### Deployment

**GitHub Pages:**
1. Push to GitHub repository
2. Settings → Pages → Source: main branch, root directory
3. Access at `https://username.github.io/repo-name/`

**Other Static Hosts:**
- Works on any static web host
- No build process required
- No server-side code needed

### Browser Compatibility

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

Requires:
- ES6 JavaScript support
- CSS Grid and Flexbox
- Geolocation API (optional)
- localStorage (optional, for caching)

### Performance Tips

- Data is generated once per city and cached in localStorage
- Map tiles load from OSM CDN
- No external dependencies except Leaflet
- Static files compress well with gzip

### Common Issues

**Map not loading:**
- Check browser console for errors
- Verify Leaflet CDN is accessible
- Check coordinates are in [lat, lon] order

**Screen reader not announcing:**
- Verify ARIA live region exists
- Check console for JavaScript errors
- Test with delay (announcements debounced)

**Keyboard navigation not working:**
- Ensure elements have tabindex
- Check for JavaScript errors
- Verify event listeners attached

## For Municipal Staff

### Adapting This Demo

1. **Review the approach** on the accessibility page
2. **Identify your use cases** (similar to "dig safety")
3. **Map your data model** to the semantic structure
4. **Replace generated data** with real data sources
5. **Customize visual encoding** for your needs
6. **Test with real users** who use assistive technology

### Key Takeaways

- **Never rely on visual map alone** for essential information
- **Provide structured text alternatives** for all spatial data
- **Use multiple visual channels** (color + pattern + width)
- **Test with keyboard and screen readers** throughout development
- **Document your accessibility decisions** for reviewers

### Contact

For questions about implementing these patterns in your municipality, please file an issue on GitHub.

## License

MIT License - See LICENSE file for details.
