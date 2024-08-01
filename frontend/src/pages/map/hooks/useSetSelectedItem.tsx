import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import OmrrData from '@/interfaces/omrr'
import { setSelectedItem } from '@/features/map/map-slice'
import { useZoomToAuthorization } from './useZoomTo'

/**
 * Selects a single OmrrData item.
 * It will set the filteredResults to be that one item
 * and also set the map selectedItem state.
 */
export function useSetSelectedItem() {
  const dispatch = useDispatch()
  const zoomTo = useZoomToAuthorization()

  return useCallback(
    (item: OmrrData) => {
      // Mark that this single item was selected (show full details)
      dispatch(setSelectedItem(item))
      // Make sure this item is visible on the map
      // Delay the map zoom until the sidebar/bottom drawer finish expanding
      zoomTo(item, 300)
    },
    [dispatch],
  )
}
