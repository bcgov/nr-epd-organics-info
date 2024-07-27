import { useDispatch } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import {
  setActiveTool,
  setDrawerExpanded,
  useActiveTool,
} from '@/features/map/map-slice'
import { useMapDrawerState } from '../hooks/useMapDrawerState'
import { MapBottomDrawer } from './MapBottomDrawer'
import { MapSidebar } from './MapSidebar'
import { useCalculateSidebarWidth } from '../hooks/useCalculateSidebarWidth'

import './MapDrawer.css'
import { useEffect, useRef } from 'react'
import { ActiveToolEnum } from '@/constants/constants'

export function MapDrawer() {
  const dispatch = useDispatch()
  const theme = useTheme()
  // If the screen width is small or medium - shown drawer below
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'))
  const { isVisible, isDrawerExpanded } = useMapDrawerState(isSmallScreen)
  // This hook calculates the sidebar width based on screen size
  // and sets the sidebarWidth state which other components use
  useCalculateSidebarWidth()
  const activeTool = useActiveTool()
  const activeToolRef = useRef<ActiveToolEnum | undefined>(activeTool)

  // Expand the bottom drawer when the active tool changes (or collapse when no tool is active)
  useEffect(() => {
    const toolChanged = activeTool !== activeToolRef.current
    activeToolRef.current = activeTool
    if (isSmallScreen && toolChanged) {
      dispatch(setDrawerExpanded(Boolean(activeTool)))
    }
  }, [activeTool, isSmallScreen])

  if (!isVisible) {
    return null
  }

  const setExpanded = (expanded: boolean) => {
    dispatch(setDrawerExpanded(expanded))
    if (isSmallScreen && !expanded) {
      dispatch(setActiveTool(undefined))
    }
  }

  return isSmallScreen ? (
    <MapBottomDrawer isExpanded={isDrawerExpanded} setExpanded={setExpanded} />
  ) : (
    <MapSidebar isExpanded={isDrawerExpanded} setExpanded={setExpanded} />
  )
}
