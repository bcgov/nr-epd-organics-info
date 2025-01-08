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
    const switcher = new L.basemapsSwitcher(
      [
        {
          layer: L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            },
          ), //DEFAULT MAP
          icon: './assets/images/img1.PNG',
          name: 'Map one',
        },
        {
          layer: L.tileLayer(
            'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
            {
              attribution:
                '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            },
          ).addTo(map),
          icon: './assets/images/img2.PNG',
          name: 'Map two',
        },
        {
          layer: L.tileLayer(
            'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
            {
              attribution:
                'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
            },
          ),
          icon: './assets/images/img3.PNG',
          name: 'Map three',
        },
      ],
      { position: 'bottomright' },
    ).addTo(map)
    console.log('basemap control', switcher)

    // Cleanup function to remove the control when component unmounts
    return () => {
      map.removeControl(switcher as unknown as L.Control)
    }
  }, [map]) // Only run effect when map instance changes

  return null
}
