import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import {
  setBottomDrawerHeight,
  setSelectedItem,
  setSidebarWidth,
} from '@/features/map/map-slice'
import { useLastSearchTime } from '@/features/omrr/omrr-slice'
import { MapBottomDrawer } from './MapBottomDrawer'
import { MapSidebar } from './MapSidebar'

import './MapDrawer.css'

export function MapDrawer() {
  const dispatch = useDispatch()
  const theme = useTheme()
  // If the screen width is small or medium - shown drawer below
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'))
  const isSmallScreenRef = useRef<boolean>(isSmallScreen)
  const lastSearchTime = useLastSearchTime()

  // When the screen size changes - collapse both sidebar and bottom drawer
  useEffect(() => {
    if (isSmallScreen !== isSmallScreenRef.current) {
      isSmallScreenRef.current = isSmallScreen
      dispatch(setSidebarWidth(0))
      dispatch(setBottomDrawerHeight(0))
    }
  }, [isSmallScreen])

  // When the search changes - clear the selected item
  useEffect(() => {
    if (lastSearchTime) {
      dispatch(setSelectedItem(undefined))
    }
  }, [lastSearchTime])

  return isSmallScreen ? <MapBottomDrawer /> : <MapSidebar />
}
