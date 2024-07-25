import { useDispatch } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import {
  setBottomDrawerContent,
  setDrawerExpanded,
} from '@/features/map/map-slice'
import { useMapDrawerState } from '../hooks/useMapDrawerState'
import { MapBottomDrawer } from './MapBottomDrawer'
import { MapSidebar } from './MapSidebar'
import { useCalculateSidebarWidth } from '../hooks/useCalculateSidebarWidth'

import './MapDrawer.css'

export function MapDrawer() {
  const dispatch = useDispatch()
  const theme = useTheme()
  // If the screen width is small or medium - shown drawer below
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'))
  const { isVisible, isDrawerExpanded } = useMapDrawerState(isSmallScreen)
  // This hook calculates the sidebar width based on screen size
  // and sets the sidebarWidth state which other components use
  useCalculateSidebarWidth()

  if (!isVisible) {
    return null
  }

  const setExpanded = (expanded: boolean) => {
    dispatch(setDrawerExpanded(expanded))
    if (isSmallScreen && !expanded) {
      dispatch(setBottomDrawerContent(undefined))
    }
  }

  return isSmallScreen ? (
    <MapBottomDrawer isExpanded={isDrawerExpanded} setExpanded={setExpanded} />
  ) : (
    <MapSidebar isExpanded={isDrawerExpanded} setExpanded={setExpanded} />
  )
}
