import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { LatLngBounds, LatLngBoundsLiteral } from 'leaflet'
import { useMap } from 'react-leaflet'

import {
  selectZoomBounds,
  selectZoomPosition,
  ZoomPosition,
} from '@/features/map/map-slice'

const OPTIONS = { animate: true, duration: 1 }

/**
 * This component renders nothing, but watches the zoomPosition and zoomBounds
 * state and will flyTo them when they change.
 * @return null
 */
export function MapZoom() {
  const map = useMap()
  const zoomPosition: ZoomPosition | undefined = useSelector(selectZoomPosition)
  const zoomBounds: LatLngBoundsLiteral | undefined =
    useSelector(selectZoomBounds)

  useEffect(() => {
    if (zoomPosition) {
      const { zoom = map.getZoom(), position } = zoomPosition
      map.flyTo(position, Math.max(zoom, map.getZoom()), OPTIONS)
    } else if (Array.isArray(zoomBounds) && zoomBounds.length >= 2) {
      const bounds = new LatLngBounds([])
      zoomBounds.forEach((pos) => {
        bounds.extend(pos)
      })
      if (bounds.isValid()) {
        map.flyToBounds(bounds, OPTIONS)
      }
    }
  }, [map, zoomPosition, zoomBounds])

  return null
}
