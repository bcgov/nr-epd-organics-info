import { useEffect } from 'react'
import L from 'leaflet'

export function useMapCrosshairsCursor(map: L.Map) {
  // Show crosshairs cursor
  useEffect(() => {
    // @ts-ignore
    const container = map._container
    if (container) {
      L.DomUtil.addClass(container, 'crosshairs-cursor')
      return () => {
        L.DomUtil.removeClass(container, 'crosshairs-cursor')
      }
    }
  }, [map])

  return null
}
