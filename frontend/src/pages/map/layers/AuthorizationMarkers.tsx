import { useCallback } from 'react'
import { useSelector, useStore } from 'react-redux'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { selectStatus, useFilteredResults } from '@/features/omrr/omrr-slice'
import OmrrData from '@/interfaces/omrr'
import { AuthorizationMarker } from './AuthorizationMarker'
import { useSetSelectedItem } from '../hooks/useSetSelectedItem'
import { RootState } from '@/app/store'
import { ActiveToolEnum } from '@/constants/constants'

/**
 * Looks at the activeTool value (map slice) and
 * polygon filter and point filter values (omrr slice) to
 * determine if a polygon or point search is in progress.
 * This is not reactive, and is intended for use inside an event handler.
 * This is safe according to the Redux docs:
 * @see https://react-redux.js.org/api/hooks#usestore
 */
function useShapeFilterInProgress() {
  const store = useStore<RootState>()

  return useCallback((): boolean => {
    const { omrr, map } = store.getState()
    const { activeTool } = map
    const { polygonFilterFinished, pointFilterCenter } = omrr
    if (activeTool === ActiveToolEnum.polygonSearch) {
      // When the polygon search tool is active but not finished
      return !polygonFilterFinished
    }
    // When the point search tool is active, but the center point isn't defined
    if (activeTool === ActiveToolEnum.pointSearch) {
      return !pointFilterCenter
    }
    return false
  }, [store])
}

export function AuthorizationMarkers() {
  const values = useFilteredResults()
  const status = useSelector(selectStatus)
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const selectItem = useSetSelectedItem()
  const isShapeSearchInProgressFn = useShapeFilterInProgress()

  const hasMarkers =
    status === 'succeeded' && Array.isArray(values) && values.length > 0

  const onClick = (item: OmrrData) => {
    // Disable clicks on markers when polygon/point search are in progress
    const shapeSearchInProgress = isShapeSearchInProgressFn()
    if (!shapeSearchInProgress) {
      selectItem(item)
    }
  }

  return hasMarkers ? (
    <MarkerClusterGroup
      chunkedLoading
      maxClusterRadius={20}
      spiderfyOnMaxZoom
      showCoverageOnHover
    >
      {values.map((item: OmrrData) => (
        <AuthorizationMarker
          key={`AuthorizationMarker-${item['Authorization Number']}`}
          item={item}
          isSmall={isSmall}
          onClick={() => onClick(item)}
        />
      ))}
    </MarkerClusterGroup>
  ) : null
}
