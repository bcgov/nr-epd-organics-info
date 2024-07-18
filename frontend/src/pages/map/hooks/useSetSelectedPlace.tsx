import { useCallback } from 'react'

import { DEFAULT_PLACE_ZOOM } from '@/constants/constants'
import { Place } from '@/interfaces/place'
import { useZoomTo } from './useZoomTo'

export function useSetSelectedPlace() {
  const zoomTo = useZoomTo()

  return useCallback(
    (place: Place) => {
      // Make sure this item is visible on the map
      zoomTo(place.pos, DEFAULT_PLACE_ZOOM)
    },
    [zoomTo],
  )
}
