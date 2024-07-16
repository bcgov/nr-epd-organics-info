import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { useMap } from 'react-leaflet'
import { useEffect } from 'react'

const OPTIONS = { animate: true, duration: 1 }

/**
 * This component renders nothing, but watches the zoomPosition and zoomBounds
 * state and will flyTo them when they change.
 * @return null
 */
export function MapZoom() {
  const map = useMap()
  const { zoomPosition, zoomBounds } = useSelector(
    (state: RootState) => state.map,
  )

  useEffect(() => {
    if (zoomPosition) {
      const { zoom = map.getZoom(), position } = zoomPosition
      map.flyTo(position, zoom, OPTIONS)
    } else if (zoomBounds && zoomBounds.isValid()) {
      map.flyToBounds(zoomBounds, OPTIONS)
    }
  }, [map, zoomPosition, zoomBounds])

  return null
}
