import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useMap } from 'react-leaflet'

import { selectZoomBounds, selectZoomPosition } from '@/features/map/map-slice'

const OPTIONS = { animate: true, duration: 1 }

/**
 * This component renders nothing, but watches the zoomPosition and zoomBounds
 * state and will flyTo them when they change.
 * @return null
 */
export function MapZoom() {
  const map = useMap()
  const zoomPosition = useSelector(selectZoomPosition)
  const zoomBounds = useSelector(selectZoomBounds)

  useEffect(() => {
    if (zoomPosition) {
      const { zoom = map.getZoom(), position } = zoomPosition
      map.flyTo(position, Math.max(zoom, map.getZoom()), OPTIONS)
    } else if (zoomBounds?.isValid()) {
      map.flyToBounds(zoomBounds, OPTIONS)
    }
  }, [map, zoomPosition, zoomBounds])

  return null
}
