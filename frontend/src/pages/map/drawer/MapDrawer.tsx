import { useDispatch } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { setDrawerExpanded } from '@/features/map/map-slice'
import { useMapDrawerState } from '../hooks/useMapDrawerState'
import { MapBottomDrawer } from './MapBottomDrawer'
import { MapSidebar } from './MapSidebar'
import { SearchResultsList } from './SearchResultsList'

import './MapDrawer.css'

export function MapDrawer() {
  const dispatch = useDispatch()
  const theme = useTheme()
  // If the screen width is small or medium - shown drawer below
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'))
  const { isVisible, isDrawerExpanded } = useMapDrawerState(isSmallScreen)

  if (!isVisible) {
    return null
  }

  const setExpanded = (expanded: boolean) => {
    dispatch(setDrawerExpanded(expanded))
  }

  return (
    <>
      {isSmallScreen ? (
        <MapBottomDrawer
          isExpanded={isDrawerExpanded}
          setExpanded={setExpanded}
        >
          <SearchResultsList pageSize={5} scrollBars={false} />
          {/* Add more contents like point/polygon search */}
        </MapBottomDrawer>
      ) : (
        <MapSidebar isExpanded={isDrawerExpanded} setExpanded={setExpanded}>
          <SearchResultsList />
        </MapSidebar>
      )}
    </>
  )
}
