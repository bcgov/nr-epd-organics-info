import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { LatLngBoundsLiteral, LatLngTuple } from 'leaflet'

import { DEFAULT_AUTHORIZATION_ZOOM } from '@/constants/constants'
import { setZoomBounds, setZoomPosition } from '@/features/map/map-slice'
import OmrrData from '@/interfaces/omrr'

export function useZoomTo() {
  const dispatch = useDispatch()

  return useCallback(
    (position: LatLngTuple, zoom = DEFAULT_AUTHORIZATION_ZOOM) => {
      dispatch(
        setZoomPosition({
          position,
          zoom,
        }),
      )
    },
    [dispatch],
  )
}

export function useZoomToBounds() {
  const dispatch = useDispatch()

  return useCallback(
    (bounds: LatLngBoundsLiteral) => {
      dispatch(setZoomBounds(bounds))
    },
    [dispatch],
  )
}

export function useZoomToAuthorization() {
  const zoomTo = useZoomTo()

  return useCallback(
    (item: OmrrData, delay = 0) => {
      const position: LatLngTuple = [item.Latitude, item.Longitude]
      const doZoom = () => zoomTo(position)
      const timeoutId = setTimeout(doZoom, delay)
      return () => clearTimeout(timeoutId)
    },
    [zoomTo],
  )
}

export function useZoomToAuthorizations() {
  const zoomToAuthorization = useZoomToAuthorization()
  const zoomToBounds = useZoomToBounds()

  return useCallback(
    (items: OmrrData[], delay = 0) => {
      if (items.length > 1) {
        const bounds: LatLngBoundsLiteral = items.map(
          ({ Latitude, Longitude }) => [Latitude, Longitude],
        )
        const doZoom = () => zoomToBounds(bounds)
        const timeoutId = setTimeout(doZoom, delay)
        return () => clearTimeout(timeoutId)
      } else if (items.length === 1) {
        zoomToAuthorization(items[0])
      }
    },
    [zoomToAuthorization, zoomToBounds],
  )
}
