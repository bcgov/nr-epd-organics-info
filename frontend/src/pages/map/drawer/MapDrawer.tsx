import { useDispatch } from 'react-redux'

import { setDrawerExpanded } from '@/features/map/map-slice'
import { useMapDrawerState } from '../hooks/useMapDrawerState'
import { MapBottomDrawer } from './MapBottomDrawer'
import { MapSidebar } from './MapSidebar'
import { SearchResultsList } from './SearchResultsList'

import './MapDrawer.css'

interface Props {
  isSmallScreen: boolean
}

export function MapDrawer({ isSmallScreen }: Props) {
  const dispatch = useDispatch()
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
