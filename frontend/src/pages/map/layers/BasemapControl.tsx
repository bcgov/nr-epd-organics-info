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

const key = 'gQbpOrAFVSVRriPYf9Zs'

export function BasemapControl() {
  const map = useMap()

  useEffect(() => {
    // Keep track of the current active layer
    let activeLayer: L.TileLayer | null = null

    const basemaps = [
      {
        layer: L.tileLayer(
          'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>...',
          },
        ),
        icon: './assets/images/img2.PNG',
        name: 'Pale OSM',
      },
      {
        layer: L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        ),
        icon: './assets/images/img1.PNG',
        name: 'Imagery',
      },
      {
        layer: L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        ),
        icon: './assets/images/img1.PNG',
        name: 'Streets',
      },
      {
        layer: L.tileLayer(
          `https://api.maptiler.com/maps/backdrop/{z}/{x}/{y}.png?key=${key}`,
        ),
        name: 'Custom 1',
        icon: './assets/images/img1.PNG',
      },
      {
        layer: L.tileLayer(
          `https://api.maptiler.com/maps/topo-v2/{z}/{x}/{y}.png?key=${key}`,
        ),
        name: 'Custom 2',
        icon: './assets/images/img1.PNG',
      },
      {
        layer: L.tileLayer(
          `https://api.maptiler.com/maps/landscape/{z}/{x}/{y}.png?key=${key}`,
        ),
        name: 'Custom 3',
        icon: './assets/images/img1.PNG',
      },
      {
        layer: L.tileLayer(
          `https://api.maptiler.com/maps/dataviz/{z}/{x}/{y}.png?key=${key}`,
        ),
        name: 'Custom 4',
        icon: './assets/images/img1.PNG',
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
