import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { LatLngTuple } from 'leaflet'

import { DEFAULT_AUTHORIZATION_ZOOM } from '@/constants/constants'
import { setZoomPosition } from '@/features/map/map-slice'
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
