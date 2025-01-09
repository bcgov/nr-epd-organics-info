import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import 'leaflet-switch-basemap'
import 'leaflet-switch-basemap/src/L.switchBasemap.css'

declare module 'leaflet' {
  class basemapsSwitcher {
    constructor(basemaps: any[], options?: any)
    addTo(map: any): this
  }
}

// TODO: Replace with a more permanent key if we choose to use a MapTiler basemap.
const key = import.meta.env.VITE_MAPTILER_KEY

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
      {
        layer: L.tileLayer(
          `https://api.maptiler.com/maps/backdrop/{z}/{x}/{y}.png?key=${key}`,
          {
            attribution: 'Tiles &copy; MapTiler',
            crossOrigin: 'anonymous',
          },
        ),
        name: 'Custom 1',
        icon: './custom-1.png',
      },
      {
        layer: L.tileLayer(
          `https://api.maptiler.com/maps/topo-v2/{z}/{x}/{y}.png?key=${key}`,
          {
            attribution: 'Tiles &copy; MapTiler',
            crossOrigin: 'anonymous',
          },
        ),
        name: 'Custom 2',
        icon: './custom-2.png',
      },
      {
        layer: L.tileLayer(
          `https://api.maptiler.com/maps/landscape/{z}/{x}/{y}.png?key=${key}`,
          {
            attribution: 'Tiles &copy; MapTiler',
            crossOrigin: 'anonymous',
          },
        ),
        name: 'Custom 3',
        icon: './custom-3.png',
      },
      {
        layer: L.tileLayer(
          `https://api.maptiler.com/maps/dataviz/{z}/{x}/{y}.png?key=${key}`,
          {
            attribution: 'Tiles &copy; MapTiler',
            crossOrigin: 'anonymous',
          },
        ),
        name: 'Custom 4',
        icon: './custom-4.png',
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
      position: 'bottomleft',
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
