# Accessible Municipal Map Demo

## Purpose

This is a static demonstration of accessibility best practices for municipal GIS web applications. It shows how to make civic map data accessible to blind, low-vision, color-blind, and keyboard-only users by treating maps as a **secondary visual aid** rather than the primary interface.

## Audience

- Accessibility reviewers and auditors
- Municipal GIS and IT staff
- Blind, low-vision, color-blind, and keyboard-only users
- Civic technologists evaluating best practices

## Key Principles

1. **Text First, Map Second**: All essential information is available without viewing the map
2. **Semantic Data**: Every feature includes explicit metadata, not just visual styling
3. **Multi-Channel Encoding**: Uses color + pattern + width, never color alone
4. **Full Keyboard Support**: All functionality accessible without a mouse
5. **Clear Data Provenance**: Explicitly labels real vs. hypothetical data

## What This Demo Shows

### Page 1: "Where Should I Not Dig?"
Primary civic task demonstration. Users can:
- Select an address or parcel
- Get a plain-language answer about excavation restrictions
- View applicable utilities and restrictions in a structured list
- See map highlights synchronized with selections (optional)

### Page 2: "Utilities and Features Explorer"
Layer and legend demonstration. Shows:
- Layer toggles as standard form controls
- HTML-based legends with full textual explanations
- Color + pattern + width encoding for utilities
- Feature list synchronized with map

### Page 3: "How This Map Is Accessible"
Documentation page explaining:
- Accessibility approach and limitations
- Keyboard interaction model
- How semantics are exposed
- Data disclaimer

## Data Sources

### Real Data (OpenStreetMap-derived)
When available for the selected city:
- Sidewalks
- Roads
- Trees
- Parcels (or synthetic approximations)

All real features marked with `data_status: "real_osm"`

### Hypothetical Data (Illustrative Only)
**⚠️ CLEARLY FICTIONAL** - for demonstration purposes only:
- Gas lines
- Water mains
- Sewer laterals
- Electrical conduits
- Excavation restriction zones

All hypothetical features marked with `data_status: "hypothetical"` and `confidence: "illustrative only"`

## Technology Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript (ES6+)
- **Mapping**: Leaflet.js with OpenStreetMap tiles
- **Data Format**: GeoJSON
- **Hosting**: GitHub Pages (static site, no backend)
- **Dependencies**: Minimal and documented

## Project Structure

```
a11y-maps/
├── 📄 index.html                    # Landing page with project overview
├── 📄 dig-safety.html               # Page 1: "Where should I not dig?"
├── 📄 explorer.html                 # Page 2: "Utilities and features explorer"
├── 📄 accessibility.html            # Page 3: "How this map is accessible"
│
├── 📁 css/
│   ├── common.css                   # Shared accessible styles (WCAG AA)
│   └── map.css                      # Map-specific styles
│
├── 📁 js/
│   ├── config.js                    # City configs and feature definitions
│   ├── location.js                  # Privacy-preserving geolocation
│   ├── data-generator.js            # Generate hypothetical features
│   ├── accessibility.js             # Keyboard and screen reader utilities
│   ├── map-utils.js                 # Leaflet wrapper with accessibility
│   ├── dig-safety.js                # Dig safety page logic
│   └── explorer.js                  # Explorer page logic
│
├── 📄 README.md                     # This file
├── 📄 QUICKSTART.md                 # Getting started guide
├── 📄 CONTRIBUTING.md               # Contribution guidelines
├── 📄 PROJECT-SUMMARY.md            # Complete implementation summary
├── 📄 LICENSE                       # MIT license
└── 📄 .gitignore                    # Git ignore patterns
```

## Location Selection

The demo uses browser geolocation (with consent) to:
1. Determine the nearest major city (population > 100,000)
2. Select appropriate data and bounding box
3. **Never stores or transmits precise user location**

Fallback cities if geolocation denied:
- Minneapolis, MN
- Portland, OR
- Toronto, ON
- Amsterdam, NL

## Accessibility Features

### Keyboard Navigation
- Logical tab order throughout
- No keyboard traps
- Visible focus indicators
- ESC closes dialogs
- ENTER/SPACE activates controls

### Screen Reader Support
- ARIA live regions announce selections
- Semantic HTML structure
- Alternative text for all visual elements
- Details panels update when features selected

### Visual Accessibility
- Does not rely on color alone
- Sufficient contrast for all elements
- Distinguishable patterns at multiple zoom levels
- Text alternatives for all information

## Non-Goals

This demo does **NOT** include:
- Real-time data or live updates
- Complex routing algorithms
- AI-generated interpretations
- Hover-only interactions
- Legal or safety authority
- User authentication or tracking

## Usage

### Local Development
1. Clone this repository
2. Open any HTML file in a modern browser
3. Grant location permission (optional) or use default city

### GitHub Pages Deployment
1. Enable GitHub Pages in repository settings
2. Set source to main branch, root directory
3. Access via `https://[username].github.io/a11y-maps/`

## Evaluation Criteria

This demo succeeds if:
- ✓ A blind user can determine excavation restrictions
- ✓ A color-blind user can distinguish utilities
- ✓ A keyboard-only user can operate all functions
- ✓ An accessibility reviewer can see clear intent and structure
- ✓ Municipal staff understand how to replicate the pattern

## Credits

- Basemap data: © OpenStreetMap contributors
- Map library: Leaflet.js
- Hypothetical data: Generated for demonstration purposes only

## Getting Started

### Quick Start (No Installation Required)

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/yourusername/a11y-maps.git
   cd a11y-maps
   ```

2. **Open any HTML file in a modern web browser**
   ```bash
   open index.html
   # or simply double-click index.html
   ```

3. **Grant location permission** (optional) or use the default city

That's it! No build process, no server, no dependencies to install.

### For Developers

See [QUICKSTART.md](QUICKSTART.md) for:
- Detailed architecture overview
- How to add new feature types
- How to customize for your city
- How to use real OSM data
- Deployment instructions

### For Contributors

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Accessibility testing checklist
- Code style guidelines
- Pull request process

## License

MIT License - See LICENSE file for details

## Disclaimer

**All utility and restriction data is illustrative only and must not be used for actual excavation planning, construction, or safety decisions.**

Always contact local authorities (811 in North America) before digging.
