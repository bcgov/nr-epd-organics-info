import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-switch-basemap'

declare module 'leaflet' {
  function basemapsSwitcher(options: any): any
}

export function BasemapControl() {
  const map = useMap()

  // Your control logic here using `map`
  console.log('inside the basemap control', map)
  console.log('basemap switcher', L.basemapsSwitcher)

  return null
}
