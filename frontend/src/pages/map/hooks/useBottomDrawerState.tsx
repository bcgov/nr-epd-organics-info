import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  useLastSearchTime,
  usePointFilterCenter,
  usePolygonFilterFinished,
} from '@/features/omrr/omrr-slice'
import {
  setBottomDrawerHeight,
  useActiveTool,
  useSelectedItem,
  useSelectedItemTime,
} from '@/features/map/map-slice'
import {
  ActiveToolEnum,
  MAP_BOTTOM_DRAWER_HEIGHT,
  MAP_BOTTOM_DRAWER_HEIGHT_SMALL,
} from '@/constants/constants'

/**
 * Determines the state of the map bottom drawer.
 * The bottom drawer is automatically expanded when:
 * - the search results change (could be from search text,
 *   search by, filter by, or a point or polygon search)
 * - there is a selected item
 * - if polygon or point search is active
 * - if search by or filter by is active
 */
export function useBottomDrawerState() {
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState<boolean>(false)
  const selectedItem = useSelectedItem()
  const selectedItemTime = useSelectedItemTime()
  const lastSearchTime = useLastSearchTime()
  const lastSearchTimeRef = useRef<number | undefined>(lastSearchTime)
  const activeTool = useActiveTool()
  const activeToolRef = useRef<ActiveToolEnum | undefined>(undefined)
  const heightRef = useRef<number>(0)
  const polygonFilterFinished = usePolygonFilterFinished()
  const pointFilterReady = Boolean(usePointFilterCenter())

  const isDataLayersVisible = activeTool === ActiveToolEnum.dataLayers
  const isSearchByVisible = activeTool === ActiveToolEnum.searchBy
  const isFilterByVisible = activeTool === ActiveToolEnum.filterBy
  const isPointSearchVisible = activeTool === ActiveToolEnum.pointSearch
  const isPolygonSearchVisible = activeTool === ActiveToolEnum.polygonSearch

  // Show search results whenever there isn't an active tool
  // or when polygon/point search are finished/ready
  const isSearchResultsVisible =
    !activeTool || polygonFilterFinished || pointFilterReady

  // Expand bottom drawer when the active tool changes
  useEffect(() => {
    if (activeTool && activeTool !== activeToolRef.current) {
      setExpanded(Boolean(activeTool))
    }
    activeToolRef.current = activeTool
  }, [activeTool])

  // Always expand when there is a selected item
  useEffect(() => {
    if (selectedItem) {
      setExpanded(true)
    }
  }, [selectedItem, selectedItemTime])

  // Expand when the search time changes (but not when there is an active tool)
  useEffect(() => {
    if (!activeTool && lastSearchTime !== lastSearchTimeRef.current) {
      lastSearchTimeRef.current = lastSearchTime
      setExpanded(true)
    }
  }, [lastSearchTime, activeTool])

  // Determine the height of the bottom drawer
  let height = 0
  if (expanded) {
    height = MAP_BOTTOM_DRAWER_HEIGHT
    // Use small height when polygon/point filters are not finished or search by is active
    if (
      (isPolygonSearchVisible && !polygonFilterFinished) ||
      (isPointSearchVisible && !pointFilterReady) ||
      isSearchByVisible
    ) {
      height = MAP_BOTTOM_DRAWER_HEIGHT_SMALL
    }
  }

  // Set the bottom drawer height so other components can use it
  useEffect(() => {
    if (height !== heightRef.current) {
      heightRef.current = height
      dispatch(setBottomDrawerHeight(height))
    }
  }, [height])

  return {
    isExpanded: expanded,
    setExpanded,
    height,
    activeTool,
    hasSelectedItem: Boolean(selectedItem),
    isSearchResultsVisible,
    isDataLayersVisible,
    isSearchByVisible,
    isFilterByVisible,
    isPointSearchVisible,
    isPolygonSearchVisible,
  }
}
