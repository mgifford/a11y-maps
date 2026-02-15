/**
 * Map utilities using Leaflet.js
 * Map is treated as secondary visual aid, not primary interface
 */

class AccessibleMap {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.map = null;
    this.layers = {};
    this.selectedFeatures = new Set();
    this.options = {
      center: options.center || [44.9778, -93.2650],
      zoom: options.zoom || 13,
      minZoom: 10,
      maxZoom: 18,
      ...options
    };
  }

  /**
   * Initialize the map
   */
  initialize() {
    // Create map instance
    this.map = L.map(this.containerId, {
      center: this.options.center,
      zoom: this.options.zoom,
      minZoom: this.options.minZoom,
      maxZoom: this.options.maxZoom,
      zoomControl: true,
      attributionControl: true
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);

    // Add scale control
    L.control.scale({
      imperial: true,
      metric: true
    }).addTo(this.map);

    return this.map;
  }

  /**
   * Add an address marker for MapLibre-based map
   * @param {Object} address - address object with coordinates, address, description
   */
  addAddressMarker(address) {
    if (!this.map) return;

    this._ensureLoadHandling();
    if (!this._loaded) {
      this._pending.push({ type: 'addAddressMarker', args: [address] });
      return;
    }

    this._addAddressMarkerInternal(address);
  }

  _addAddressMarkerInternal(address) {
    const srcId = `address_${Date.now()}`;
    const point = {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [address.coordinates[1], address.coordinates[0]] },
      properties: { name: address.address, description: address.description }
    };

    this.map.addSource(srcId, { type: 'geojson', data: point });
    const circleId = `${srcId}_circle`;
    this.map.addLayer({
      id: circleId,
      type: 'circle',
      source: srcId,
      paint: { 'circle-radius': 8, 'circle-color': '#ff0000', 'circle-stroke-color': '#fff', 'circle-stroke-width': 2 }
    });

    // Popup on click
    this.map.on('click', circleId, (e) => {
      if (e.features && e.features.length) {
        const coords = e.features[0].geometry.coordinates.slice();
        const desc = e.features[0].properties.description || '';
        new maplibregl.Popup().setLngLat(coords).setHTML(`<strong>${address.address}</strong><br>${desc}`).addTo(this.map);
      }
    });
  }

  /**
   * Add a GeoJSON layer to the map
   * @param {string} layerId - Unique identifier for the layer
   * @param {Object} geojson - GeoJSON data
   * @param {Object} styleOptions - Style configuration
   * @param {Function} onFeatureClick - Callback when feature is clicked
   */
  addLayer(layerId, geojson, styleOptions = {}, onFeatureClick = null) {
    const layer = L.geoJSON(geojson, {
      style: (feature) => this.getFeatureStyle(feature, styleOptions),
      pointToLayer: (feature, latlng) => this.createMarker(feature, latlng, styleOptions),
      onEachFeature: (feature, layer) => {
        // Add popup with feature info
        if (feature.properties) {
          const popupContent = this.createPopupContent(feature);
          layer.bindPopup(popupContent);
        }

        // Add click handler
        layer.on('click', (e) => {
          this.selectFeature(feature, layer);
          if (onFeatureClick) {
            onFeatureClick(feature, layer);
          }
        });

        // Store reference to feature
        layer.feature = feature;
      }
    });

    this.layers[layerId] = layer;
    layer.addTo(this.map);

    return layer;
  }

  /**
   * Add an address marker (Leaflet implementation)
   * @param {Object} address - address object with coordinates, address, description
   */
  addAddressMarker(address) {
    if (!this.map) return;
    L.marker(address.coordinates, {
      icon: L.divIcon({
        className: 'address-marker',
        html: '<div style="background: red; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white;"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      })
    }).addTo(this.map)
      .bindPopup(`<strong>${address.address}</strong><br>${address.description}`);
  }

  /**
   * Get style for a feature based on its properties
   * @param {Object} feature - GeoJSON feature
   * @param {Object} options - Style options
   * @returns {Object} Leaflet style object
   */
  getFeatureStyle(feature, options = {}) {
    const props = feature.properties;
    const featureType = FEATURE_TYPES[props.feature_type];
    
    if (!featureType) {
      return this.getDefaultStyle();
    }

    const style = {
      color: props.color || featureType.color || '#000000',
      weight: props.width || featureType.width || 2,
      opacity: 0.8,
      fillColor: props.color || featureType.color || '#000000',
      fillOpacity: props.fillOpacity !== undefined ? props.fillOpacity : (featureType.fillOpacity || 0.3)
    };

    // Apply dash patterns for lines
    if (props.dashArray || featureType.dashArray) {
      style.dashArray = props.dashArray || featureType.dashArray;
    }

    return style;
  }

  /**
   * Get default style
   */
  getDefaultStyle() {
    return {
      color: '#3388ff',
      weight: 2,
      opacity: 0.6,
      fillOpacity: 0.2
    };
  }

  /**
   * Create marker for point features
   * @param {Object} feature - GeoJSON feature
   * @param {Object} latlng - Leaflet LatLng
   * @param {Object} options - Style options
   * @returns {Object} Leaflet marker
   */
  createMarker(feature, latlng, options = {}) {
    const props = feature.properties;
    const featureType = FEATURE_TYPES[props.feature_type];
    
    // Create circle marker with appropriate styling
    return L.circleMarker(latlng, {
      radius: 8,
      fillColor: props.color || (featureType ? featureType.color : '#3388ff'),
      color: '#000',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    });
  }

  /**
   * Create popup content for a feature
   * @param {Object} feature - GeoJSON feature
   * @returns {string} HTML content
   */
  createPopupContent(feature) {
    const props = feature.properties;
    const featureType = FEATURE_TYPES[props.feature_type];
    const riskLevel = RISK_LEVELS[props.risk_level];

    let html = `<div class="map-popup">`;
    html += `<h4>${props.name || 'Unknown Feature'}</h4>`;
    
    if (props.description) {
      html += `<p>${props.description}</p>`;
    }
    
    if (riskLevel) {
      html += `<p><strong>Risk Level:</strong> ${riskLevel.label}</p>`;
    }
    
    if (props.restriction) {
      html += `<p><strong>Restriction:</strong> ${props.restriction}</p>`;
    }
    
    if (props.data_status) {
      const statusLabel = props.data_status === 'hypothetical' 
        ? '⚠️ HYPOTHETICAL DATA' 
        : props.data_status === 'real_osm'
        ? '✓ OSM Data'
        : props.data_status;
      html += `<p><em>${statusLabel}</em></p>`;
    }
    
    html += `</div>`;
    return html;
  }

  /**
   * Select a feature (highlight it)
   * @param {Object} feature - GeoJSON feature
   * @param {Object} layer - Leaflet layer
   */
  selectFeature(feature, layer) {
    // Reset previous selection
    this.clearSelection();

    // Highlight the selected feature
    if (layer.setStyle) {
      layer.setStyle({
        weight: 5,
        color: '#ff0000',
        opacity: 1
      });
    }

    this.selectedFeatures.add(feature.id || feature.properties.id);

    // Announce to screen reader
    announceToScreenReader(`Selected ${feature.properties.name || 'feature'}`);
  }

  /**
   * Clear all selections
   */
  clearSelection() {
    Object.values(this.layers).forEach(layer => {
      layer.eachLayer(l => {
        if (l.setStyle && l.feature) {
          l.setStyle(this.getFeatureStyle(l.feature));
        }
      });
    });
    this.selectedFeatures.clear();
  }

  /**
   * Highlight feature by ID
   * @param {string} featureId - Feature ID
   */
  highlightFeatureById(featureId) {
    Object.values(this.layers).forEach(layer => {
      layer.eachLayer(l => {
        if (l.feature && (l.feature.id === featureId || l.feature.properties.id === featureId)) {
          this.selectFeature(l.feature, l);
          
          // Pan to feature
          if (l.getBounds) {
            this.map.fitBounds(l.getBounds(), { padding: [50, 50] });
          } else if (l.getLatLng) {
            this.map.setView(l.getLatLng(), this.map.getZoom());
          }
        }
      });
    });
  }

  /**
   * Toggle layer visibility
   * @param {string} layerId - Layer identifier
   * @param {boolean} visible - Show or hide
   */
  toggleLayer(layerId, visible) {
    const layer = this.layers[layerId];
    if (!layer) return;

    if (visible && !this.map.hasLayer(layer)) {
      layer.addTo(this.map);
    } else if (!visible && this.map.hasLayer(layer)) {
      this.map.removeLayer(layer);
    }

    // Announce change
    const action = visible ? 'shown' : 'hidden';
    announceToScreenReader(`Layer ${layerId} ${action}`);
  }

  /**
   * Remove a layer
   * @param {string} layerId - Layer identifier
   */
  removeLayer(layerId) {
    const layer = this.layers[layerId];
    if (layer) {
      this.map.removeLayer(layer);
      delete this.layers[layerId];
    }
  }

  /**
   * Fit map to show all features
   */
  fitToFeatures() {
    const allLayers = Object.values(this.layers);
    if (allLayers.length === 0) return;

    const group = L.featureGroup(allLayers);
    this.map.fitBounds(group.getBounds(), { padding: [50, 50] });
  }

  /**
   * Set map center and zoom
   * @param {Array} center - [lat, lon]
   * @param {number} zoom - Zoom level
   */
  setView(center, zoom) {
    this.map.setView(center, zoom);
  }

  /**
   * Destroy the map
   */
  destroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}

/*
 * Vector tile (MapLibre GL) based accessible map wrapper
 */
class AccessibleVectorMap {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.map = null;
    this.layers = {}; // maps layerId -> array of created layer ids
    this.options = {
      center: options.center || [44.9778, -93.2650],
      zoom: options.zoom || 13,
      // Default to a local custom style (raster-based). Replace with a vector tile style URL when available.
      style: options.style || 'styles/custom-style.json',
      ...options
    };
  }

  initialize() {
    if (typeof maplibregl === 'undefined') return null;

    this.map = new maplibregl.Map({
      container: this.containerId,
      style: this.options.style,
      center: [this.options.center[1], this.options.center[0]], // lon, lat
      zoom: this.options.zoom
    });

    this.map.addControl(new maplibregl.NavigationControl());

    return this.map;
  }

  /**
   * Internal setup to handle map load state and pending operations
   */
  _ensureLoadHandling() {
    if (this._loadHandlerAttached) return;
    this._loadHandlerAttached = true;
    this._loaded = false;
    this._pending = [];

    this.map.on('load', () => {
      this._loaded = true;
      // flush pending operations
      this._pending.forEach(item => {
        if (item.type === 'addLayer') {
          this._addLayerInternal(...item.args);
        } else if (item.type === 'addAddressMarker') {
          this._addAddressMarkerInternal(...item.args);
        } else if (item.type === 'fitToFeatures') {
          this._fitToFeaturesInternal();
        }
      });
      this._pending = [];
    });
  }

  addLayer(layerId, geojson, styleOptions = {}, onFeatureClick = null) {
    if (!this.map) return;

    this._ensureLoadHandling();

    if (!this._loaded) {
      this._pending.push({ type: 'addLayer', args: [layerId, geojson, styleOptions, onFeatureClick] });
      return;
    }

    this._addLayerInternal(layerId, geojson, styleOptions, onFeatureClick);
  }

  _addLayerInternal(layerId, geojson, styleOptions = {}, onFeatureClick = null) {
    // add source
    const sourceId = `${layerId}_src`;
    if (this.map.getSource(sourceId)) {
      this.map.removeSource(sourceId);
    }
    this.map.addSource(sourceId, { type: 'geojson', data: geojson });

    // Create appropriate layer(s) based on geometry types in the GeoJSON
    const created = [];
    const hasPolygon = geojson.features.some(f => f.geometry && f.geometry.type === 'Polygon');
    const hasLine = geojson.features.some(f => f.geometry && f.geometry.type === 'LineString');
    const hasPoint = geojson.features.some(f => f.geometry && f.geometry.type === 'Point');

    if (hasPolygon) {
      const fillId = `${layerId}_fill`;
      this.map.addLayer({
        id: fillId,
        type: 'fill',
        source: sourceId,
        paint: {
          'fill-color': ['coalesce', ['get', 'color'], '#ff0000'],
          'fill-opacity': ['coalesce', ['get', 'fillOpacity'], 0.3]
        }
      });
      created.push(fillId);

      const outlineId = `${layerId}_outline`;
      this.map.addLayer({
        id: outlineId,
        type: 'line',
        source: sourceId,
        paint: { 'line-color': ['coalesce', ['get', 'color'], '#000000'], 'line-width': ['coalesce', ['get', 'width'], 2] }
      });
      created.push(outlineId);
    }

    if (hasLine) {
      const lineId = `${layerId}_line`;
      this.map.addLayer({
        id: lineId,
        type: 'line',
        source: sourceId,
        paint: { 'line-color': ['coalesce', ['get', 'color'], '#0000ff'], 'line-width': ['coalesce', ['get', 'width'], 2] }
      });
      created.push(lineId);
    }

    if (hasPoint) {
      const circleId = `${layerId}_circle`;
      this.map.addLayer({
        id: circleId,
        type: 'circle',
        source: sourceId,
        paint: { 'circle-radius': 6, 'circle-color': ['coalesce', ['get', 'color'], '#3388ff'], 'circle-stroke-color': '#000', 'circle-stroke-width': 1 }
      });
      created.push(circleId);
    }

    // store created layer ids
    this.layers[layerId] = { sourceId, layerIds: created };

    // feature click handling
    if (onFeatureClick) {
      created.forEach(lid => {
        this.map.on('click', lid, (e) => {
          if (e.features && e.features.length > 0) {
            onFeatureClick(e.features[0]);
          }
        });
        this.map.on('mouseenter', lid, () => { this.map.getCanvas().style.cursor = 'pointer'; });
        this.map.on('mouseleave', lid, () => { this.map.getCanvas().style.cursor = ''; });
      });
    }
}

  toggleLayer(layerId, visible) {
    const record = this.layers[layerId];
    if (!record) return;
    record.layerIds.forEach(id => {
      const v = visible ? 'visible' : 'none';
      if (this.map.getLayer(id)) this.map.setLayoutProperty(id, 'visibility', v);
    });
    const action = visible ? 'shown' : 'hidden';
    announceToScreenReader(`Layer ${layerId} ${action}`);
  }

  removeLayer(layerId) {
    const record = this.layers[layerId];
    if (!record) return;
    record.layerIds.forEach(id => { if (this.map.getLayer(id)) this.map.removeLayer(id); });
    if (this.map.getSource(record.sourceId)) this.map.removeSource(record.sourceId);
    delete this.layers[layerId];
  }

  fitToFeatures() {
    // compute bbox across all sources
    this._ensureLoadHandling();
    if (!this._loaded) {
      this._pending.push({ type: 'fitToFeatures', args: [] });
      return;
    }
    this._fitToFeaturesInternal();
  }

  _fitToFeaturesInternal() {
    const bounds = new maplibregl.LngLatBounds();
    Object.values(this.layers).forEach(rec => {
      const src = this.map.getSource(rec.sourceId);
      if (src && src._data && src._data.features) {
        src._data.features.forEach(f => {
          const coords = this._extractCoordinates(f.geometry);
          coords.forEach(c => bounds.extend(c));
        });
      }
    });
    if (!bounds.isEmpty()) this.map.fitBounds(bounds, { padding: 50 });
  }

  _extractCoordinates(geom) {
    const out = [];
    if (!geom) return out;
    if (geom.type === 'Point') return [[geom.coordinates[0], geom.coordinates[1]]];
    if (geom.type === 'LineString' || geom.type === 'MultiPoint') return geom.coordinates.map(c => [c[0], c[1]]);
    if (geom.type === 'Polygon' || geom.type === 'MultiLineString') {
      geom.coordinates.forEach(r => r.forEach(c => out.push([c[0], c[1]])));
      return out;
    }
    if (geom.type === 'MultiPolygon') {
      geom.coordinates.forEach(p => p.forEach(r => r.forEach(c => out.push([c[0], c[1]]))));
      return out;
    }
    return out;
  }

  destroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}

/**
 * Factory: pick vector (MapLibre) if available, otherwise Leaflet AccessibleMap
 */
function createAccessibleMap(containerId, options = {}) {
  if (typeof maplibregl !== 'undefined') {
    return new AccessibleVectorMap(containerId, options);
  }
  return new AccessibleMap(containerId, options);
}

/**
 * Create legend HTML for a layer
 * @param {string} layerId - Layer identifier
 * @param {Object} featureCollection - GeoJSON FeatureCollection
 * @returns {HTMLElement} Legend element
 */
function createLayerLegend(layerId, featureCollection) {
  const legendDiv = document.createElement('div');
  legendDiv.className = 'map-legend';
  legendDiv.id = `legend-${layerId}`;

  const title = document.createElement('h3');
  title.textContent = 'Map Legend';
  legendDiv.appendChild(title);

  const itemsList = document.createElement('ul');
  itemsList.className = 'legend-items';
  itemsList.setAttribute('role', 'list');

  // Get unique feature types
  const featureTypes = new Set();
  if (featureCollection && featureCollection.features) {
    featureCollection.features.forEach(f => {
      if (f.properties.feature_type) {
        featureTypes.add(f.properties.feature_type);
      }
    });
  }

  // Create legend item for each feature type
  featureTypes.forEach(featureTypeKey => {
    const featureType = FEATURE_TYPES[featureTypeKey];
    if (!featureType) return;

    const item = document.createElement('li');
    item.className = 'legend-item';

    // Symbol
    const symbol = document.createElement('div');
    symbol.className = 'legend-symbol';
    symbol.setAttribute('data-pattern', featureType.pattern || 'solid');
    symbol.setAttribute('aria-hidden', 'true');

    const symbolLine = document.createElement('div');
    symbolLine.className = 'legend-symbol-line';
    symbolLine.style.borderTopColor = featureType.color;
    symbolLine.style.borderTopWidth = (featureType.width || 2) + 'px';
    symbol.appendChild(symbolLine);

    // Label
    const label = document.createElement('div');
    label.className = 'legend-label';

    const name = document.createElement('span');
    name.className = 'legend-label-name';
    name.textContent = featureType.name;

    const description = document.createElement('span');
    description.className = 'legend-label-description';
    description.textContent = featureType.description;

    label.appendChild(name);
    label.appendChild(description);

    // Encoding description
    const encoding = document.createElement('div');
    encoding.className = 'legend-encoding';
    encoding.textContent = `Color: ${featureType.color}, Pattern: ${featureType.pattern || 'solid'}`;

    item.appendChild(symbol);
    item.appendChild(label);
    item.appendChild(encoding);
    itemsList.appendChild(item);
  });

  legendDiv.appendChild(itemsList);
  return legendDiv;
}

/**
 * Create layer toggle controls
 * @param {Object} layers - Map of layer IDs to data
 * @param {Function} onToggle - Callback when layer is toggled
 * @returns {HTMLElement} Controls element
 */
function createLayerControls(layers, onToggle) {
  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'layer-controls';

  const title = document.createElement('h3');
  title.textContent = 'Map Layers';
  controlsDiv.appendChild(title);

  const list = document.createElement('ul');
  list.className = 'layer-list';

  Object.entries(layers).forEach(([layerId, layerData]) => {
    const item = document.createElement('li');
    item.className = 'layer-item';

    const checkbox = createCheckbox(
      `layer-${layerId}`,
      layerData.name || layerId,
      true,
      (checked) => {
        if (onToggle) {
          onToggle(layerId, checked);
        }
      }
    );

    item.appendChild(checkbox);
    list.appendChild(item);
  });

  controlsDiv.appendChild(list);
  return controlsDiv;
}
