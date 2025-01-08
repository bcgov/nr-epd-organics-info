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
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        ),
        icon: './assets/images/img1.PNG',
        name: 'Map one',
      },
      {
        layer: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution:
            'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>...',
        }),
        icon: './assets/images/img3.PNG',
        name: 'Map three',
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
