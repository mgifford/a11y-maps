# How to Add Custom GeoJSON Layers

This demo allows you to upload your own GeoJSON files to overlay custom data on the maps.

## Quick Start

1. **Get a GeoJSON file**
   - Use the included `sample-data.geojson` file for testing
   - Create your own using [geojson.io](https://geojson.io)
   - Export from QGIS, ArcGIS, or other GIS tools

2. **Upload to the map**
   - **Explorer page**: Look for "Add custom layer (GeoJSON file)" in the left sidebar under Layer controls
   - **Dig Safety page**: After selecting an address, find "Add custom layer" in the Map View controls
   - Click "Choose File" and select your .geojson file
   - Click "Add Layer"

3. **Control your layer**
   - **Toggle visibility**: Check/uncheck the box next to the layer name
   - **Remove layer**: Click the "Remove" button

## Creating Your Own GeoJSON

### Option 1: Use geojson.io (easiest)
1. Go to [https://geojson.io](https://geojson.io)
2. Draw points, lines, or polygons on the map
3. Add properties in the right panel
4. Save → Download as GeoJSON

### Option 2: Write by hand
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-93.2650, 44.9778]
      },
      "properties": {
        "name": "My Custom Point",
        "description": "A point I added",
        "color": "#FF0000"
      }
    }
  ]
}
```

### Supported Properties
- `name`: Feature name (shown in popup)
- `description`: Feature description
- `color`: Hex color code (e.g., "#FF0000")
- `width`: Line width in pixels
- `fillOpacity`: Polygon fill opacity (0-1)

## Tips

- **File size**: Keep files under 5MB for best performance
- **Coordinates**: GeoJSON uses [longitude, latitude] format (note the order!)
- **Validation**: Use [geojsonlint.com](https://geojsonlint.com) to check your file
- **Styling**: Add `color`, `width`, and `fillOpacity` properties to control appearance

## Example Use Cases

- Overlay your own property boundaries
- Add custom points of interest
- Show planning areas or zones
- Display survey data
- Highlight specific infrastructure

## Troubleshooting

**"Unable to add layer - invalid GeoJSON"**
- Check your file syntax at geojsonlint.com
- Ensure coordinates are in [longitude, latitude] order
- Verify the file extension is .geojson or .json

**Layer doesn't appear**
- Check that you selected the correct city
- Verify coordinates are within the map bounds
- Try zooming out or clicking "Fit Map to Features"

**Need help?**
- Open an issue on the project repository
- Check the sample-data.geojson file for a working example
