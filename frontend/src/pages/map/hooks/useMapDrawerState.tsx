import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  useAllResultsShowing,
  useLastSearchTime,
} from '@/features/omrr/omrr-slice'
import {
  clearSelectedItem,
  setDrawerExpanded,
  useDrawerExpanded,
  useSelectedItem,
} from '@/features/map/map-slice'

/**
 * Determines the state of the map drawer.
 * The map drawer is shown when any of these are true:
 * - there are filtered results - this could be from search text,
 *   search by, filter by, or a point or polygon search is active
 * - there is a selected item
 * - (small screens only) if polygon or point search is active
 * - (small screens only) if search by or filter by is active
 */
export function useMapDrawerState(isSmallScreen: boolean) {
  const dispatch = useDispatch()
  const allResultsShowing = useAllResultsShowing()
  const isDrawerExpanded = useDrawerExpanded()
  const selectedItem = useSelectedItem()
  const lastSearchTime = useLastSearchTime()
  const [visible, setVisible] = useState<boolean>(false)
  // Keep track of whether the drawer has been expanded for the first time
  const initialExpansionRef = useRef<boolean>(false)

  useEffect(() => {
    // Show the drawer whenever there are filtered results
    // or a single item is selected
    setVisible(!allResultsShowing || Boolean(selectedItem))
    // For small screens also show the drawer when other displays like
    // point/polygon tool, search by, or filter by is active
    // if (isSmallScreen) {
    // }
  }, [allResultsShowing, selectedItem])

  // When the drawer is made visible, expand it
  // On small screens always expand when the search results change
  // On larger screens only expand the first time
  useEffect(() => {
    if (
      visible &&
      lastSearchTime &&
      (isSmallScreen || !initialExpansionRef.current)
    ) {
      initialExpansionRef.current = true
      dispatch(setDrawerExpanded(true))
    }
  }, [visible, lastSearchTime, isSmallScreen])

  // When the search results change then clear the selected item
  useEffect(() => {
    if (lastSearchTime) {
      dispatch(clearSelectedItem())
    }
  }, [lastSearchTime])

  return {
    isVisible: visible,
    isDrawerExpanded,
  }
}
