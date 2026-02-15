/**
 * City configurations and feature type definitions
 * All hypothetical data is clearly marked as illustrative only
 */

const CITIES = {
  minneapolis: {
    name: "Minneapolis, MN",
    center: [44.9778, -93.2650],
    bounds: [[44.890, -93.329], [45.051, -93.193]],
    zoom: 13,
    population: 425336,
    osmCoverage: "good"
  },
  portland: {
    name: "Portland, OR",
    center: [45.5152, -122.6784],
    bounds: [[45.432, -122.835], [45.650, -122.471]],
    zoom: 12,
    population: 652503,
    osmCoverage: "excellent"
  },
  toronto: {
    name: "Toronto, ON",
    center: [43.6532, -79.3832],
    bounds: [[43.581, -79.639], [43.855, -79.116]],
    zoom: 11,
    population: 2794356,
    osmCoverage: "good"
  },
  amsterdam: {
    name: "Amsterdam, NL",
    center: [52.3676, 4.9041],
    bounds: [[52.278, 4.728], [52.431, 5.079]],
    zoom: 12,
    population: 872680,
    osmCoverage: "excellent"
  }
};

// Default city when geolocation unavailable or denied
const DEFAULT_CITY = "minneapolis";

/**
 * Feature type definitions with semantic metadata
 * Each type includes visual encoding (color, pattern, width) AND textual description
 */
const FEATURE_TYPES = {
  // Hypothetical utility features (fictional, for demo only)
  gas_line: {
    name: "Gas Line",
    category: "utility",
    dataStatus: "hypothetical",
    riskLevel: "high",
    color: "#FFD700", // Gold
    pattern: "solid",
    width: 4,
    description: "Natural gas distribution pipe",
    restriction: "Do not dig within 18 inches without locating service",
    authority: "Metro Gas Authority (fictional)",
    icon: "⚠️"
  },
  water_main: {
    name: "Water Main",
    category: "utility",
    dataStatus: "hypothetical",
    riskLevel: "high",
    color: "#1E90FF", // Dodger Blue
    pattern: "dashed",
    dashArray: "10, 5",
    width: 3,
    description: "Municipal water supply pipe",
    restriction: "Do not dig within 24 inches without approval",
    authority: "City Water Department (fictional)",
    icon: "💧"
  },
  sewer_line: {
    name: "Sewer Line",
    category: "utility",
    dataStatus: "hypothetical",
    riskLevel: "medium",
    color: "#8B4513", // Saddle Brown
    pattern: "dotted",
    dashArray: "2, 4",
    width: 3,
    description: "Wastewater collection pipe",
    restriction: "Do not dig within 12 inches without locating service",
    authority: "Metro Sewer District (fictional)",
    icon: "🚰"
  },
  electrical_conduit: {
    name: "Electrical Conduit",
    category: "utility",
    dataStatus: "hypothetical",
    riskLevel: "high",
    color: "#FF4500", // Orange Red
    pattern: "double-dashed",
    dashArray: "8, 4, 2, 4",
    width: 3,
    description: "Underground electrical cable",
    restriction: "Do not dig within 18 inches - call utility locator",
    authority: "City Electric Utility (fictional)",
    icon: "⚡"
  },
  
  // Restriction zones (hypothetical)
  excavation_restriction: {
    name: "Excavation Restriction Zone",
    category: "restriction",
    dataStatus: "hypothetical",
    riskLevel: "advisory",
    color: "#FF6B6B",
    fillOpacity: 0.2,
    patternType: "diagonal-hatch",
    description: "Area with special excavation requirements",
    restriction: "Permit required for excavation deeper than 6 inches",
    authority: "City Planning Department (fictional)",
    icon: "🚧"
  },
  
  // Real OSM-derived features (when available)
  sidewalk: {
    name: "Sidewalk",
    category: "infrastructure",
    dataStatus: "real_osm",
    riskLevel: "none",
    color: "#808080", // Gray
    pattern: "solid",
    width: 2,
    description: "Pedestrian walkway",
    restriction: "No restrictions (informational only)",
    authority: "OpenStreetMap contributors",
    icon: "🚶"
  },
  road: {
    name: "Road",
    category: "infrastructure",
    dataStatus: "real_osm",
    riskLevel: "none",
    color: "#696969", // Dim Gray
    pattern: "solid",
    width: 3,
    description: "Street or roadway",
    restriction: "No restrictions (informational only)",
    authority: "OpenStreetMap contributors",
    icon: "🛣️"
  },
  tree: {
    name: "Tree",
    category: "natural",
    dataStatus: "real_osm",
    riskLevel: "advisory",
    color: "#228B22", // Forest Green
    description: "Tree feature from OSM data",
    restriction: "Check local ordinances for root protection zones",
    authority: "OpenStreetMap contributors",
    icon: "🌳"
  },
  parcel: {
    name: "Property Parcel",
    category: "boundary",
    dataStatus: "synthetic", // Often not in OSM, synthetically generated
    riskLevel: "none",
    color: "#000000",
    fillOpacity: 0,
    strokeWidth: 1,
    description: "Property boundary",
    restriction: "No restrictions (informational only)",
    authority: "Synthetic boundary (illustrative)",
    icon: "📐"
  }
};

/**
 * Risk level definitions for accessibility
 */
const RISK_LEVELS = {
  high: {
    label: "High Risk",
    description: "Contact utility locator before digging",
    ariaLabel: "High risk utility - call before you dig"
  },
  medium: {
    label: "Medium Risk",
    description: "Exercise caution when excavating",
    ariaLabel: "Medium risk utility - use caution"
  },
  advisory: {
    label: "Advisory",
    description: "Be aware of local regulations",
    ariaLabel: "Advisory notice - check local regulations"
  },
  none: {
    label: "Informational",
    description: "No excavation restrictions",
    ariaLabel: "Informational only - no restrictions"
  }
};

/**
 * Sample addresses/parcels for demo
 * These are plausible locations within each city
 */
const SAMPLE_ADDRESSES = {
  minneapolis: [
    {
      id: "addr_001",
      address: "123 Hennepin Ave",
      parcelId: "MN-HEN-001",
      coordinates: [44.9778, -93.2650],
      description: "Downtown commercial district"
    },
    {
      id: "addr_002",
      address: "456 Lake St",
      parcelId: "MN-LKE-002",
      coordinates: [44.9483, -93.2733],
      description: "Uptown residential area"
    },
    {
      id: "addr_003",
      address: "789 University Ave SE",
      parcelId: "MN-UNI-003",
      coordinates: [44.9745, -93.2320],
      description: "University district"
    }
  ],
  portland: [
    {
      id: "addr_001",
      address: "100 SW Broadway",
      parcelId: "OR-BRD-001",
      coordinates: [45.5155, -122.6789],
      description: "Downtown core"
    },
    {
      id: "addr_002",
      address: "2500 NE Burnside St",
      parcelId: "OR-BRN-002",
      coordinates: [45.5230, -122.6404],
      description: "East side neighborhood"
    }
  ],
  toronto: [
    {
      id: "addr_001",
      address: "100 Queen St W",
      parcelId: "ON-QUE-001",
      coordinates: [43.6529, -79.3849],
      description: "Financial district"
    },
    {
      id: "addr_002",
      address: "500 Bloor St W",
      parcelId: "ON-BLR-002",
      coordinates: [43.6667, -79.4069],
      description: "Annex neighborhood"
    }
  ],
  amsterdam: [
    {
      id: "addr_001",
      address: "Dam Square 1",
      parcelId: "NL-DAM-001",
      coordinates: [52.3730, 4.8936],
      description: "City center"
    },
    {
      id: "addr_002",
      address: "Museumplein 10",
      parcelId: "NL-MUS-002",
      coordinates: [52.3580, 4.8814],
      description: "Museum quarter"
    }
  ]
};

/**
 * Accessibility constants
 */
const A11Y_CONFIG = {
  // Focus indicator styles
  focusOutlineWidth: "3px",
  focusOutlineColor: "#005fcc",
  
  // Minimum contrast ratios (WCAG AA)
  minContrastText: 4.5,
  minContrastUI: 3.0,
  
  // Live region politeness
  liveRegionPoliteness: "polite",
  
  // Keyboard shortcuts
  shortcuts: {
    escape: "Close dialog or panel",
    enter: "Activate selected item",
    space: "Toggle checkbox or button",
    tab: "Move to next interactive element",
    shiftTab: "Move to previous interactive element",
    arrowKeys: "Navigate within lists or maps"
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CITIES,
    DEFAULT_CITY,
    FEATURE_TYPES,
    RISK_LEVELS,
    SAMPLE_ADDRESSES,
    A11Y_CONFIG
  };
}
