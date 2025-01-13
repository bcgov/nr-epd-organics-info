import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import 'leaflet-switch-basemap'
import 'leaflet-switch-basemap/src/L.switchBasemap.css'
import './BasemapControl.css'

declare module 'leaflet' {
  class basemapsSwitcher {
    constructor(basemaps: any[], options?: any)
    addTo(map: any): this
  }
}

export function BasemapControl() {
  const map = useMap()

  useEffect(() => {
    // Keep track of the current active layer
    let activeLayer: L.TileLayer | null = null

    const basemaps = [
      {
        layer: L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution: '&copy; OpenStreetMap contributors',
            crossOrigin: 'anonymous',
            className: 'osm--grayscale',
          },
        ),
        icon: './pale-osm.png',
        name: 'Pale OSM',
      },
      {
        layer: L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: 'Tiles &copy; Esri',
            crossOrigin: 'anonymous',
          },
        ),
        icon: './imagery.png',
        name: 'Imagery',
      },
      {
        layer: L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: 'Tiles &copy; Esri',
            crossOrigin: 'anonymous',
          },
        ),
        icon: './streets.png',
        name: 'Streets',
      },
    ]

    // Set initial active layer
    activeLayer = basemaps[0].layer
    activeLayer.addTo(map)

    // Add event listener to handle layer changes
    map.on('baselayerchange', (e: any) => {
      if (activeLayer) {
        map.removeLayer(activeLayer)
      }
      activeLayer = e.layer
    })

    const switcher = new L.basemapsSwitcher(basemaps, {
      position: 'bottomright',
    }).addTo(map)

    // Cleanup
    return () => {
      if (activeLayer) {
        map.removeLayer(activeLayer)
      }
      map.removeControl(switcher as unknown as L.Control)
      map.off('baselayerchange')
    }
  }, [map])

  return null
}
