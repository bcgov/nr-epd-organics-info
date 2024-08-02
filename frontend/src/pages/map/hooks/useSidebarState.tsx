import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import {
  setSidebarWidth,
  useSelectedItem,
  useSelectedItemTime,
} from '@/features/map/map-slice'
import { useLastSearchTime } from '@/features/omrr/omrr-slice'

// From figma file
const sidebarWidths = {
  xs: 0,
  lg: 500,
  xl: 439,
  xxl: 489,
}

/**
 * The right sidebar width varies based on the screen size.
 * When the screen size changes, the sidebar width is calculated,
 * stored in the state, and returned.
 */
export function useSidebarState() {
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState<boolean>(false)
  const theme = useTheme()
  // Sidebar is only shown in L/XL/XXL
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
  const isXL = useMediaQuery(theme.breakpoints.up('xl'))
  const isXXL = useMediaQuery(theme.breakpoints.up('xxl'))

  const selectedItem = useSelectedItem()
  const selectedItemTime = useSelectedItemTime()
  const lastSearchTime = useLastSearchTime()
  const lastSearchTimeRef = useRef<number | undefined>(lastSearchTime)
  const initialExpandRef = useRef<boolean>(false)
  const widthRef = useRef<number>(0)

  // Only expand the sidebar once after the first search is performed
  useEffect(() => {
    if (
      lastSearchTime &&
      lastSearchTime !== lastSearchTimeRef.current &&
      !initialExpandRef.current
    ) {
      initialExpandRef.current = true
      setExpanded(true)
    }
    lastSearchTimeRef.current = lastSearchTime
  }, [lastSearchTime])

  // Always expand when there is a selected item
  useEffect(() => {
    if (selectedItem) {
      setExpanded(true)
    }
  }, [selectedItem, selectedItemTime])

  // The actual width of the sidebar
  let width = 0
  // The width of the sidebar when it is expanded
  let expandedWidth = 0
  if (isXXL) {
    expandedWidth = sidebarWidths.xxl
  } else if (isXL) {
    expandedWidth = sidebarWidths.xl
  } else if (isLarge) {
    expandedWidth = sidebarWidths.lg
  }

  if (expanded) {
    width = expandedWidth
  }

  // Set the sidebar width in the redux state so other components can use it
  useEffect(() => {
    if (width !== widthRef.current) {
      widthRef.current = width
      dispatch(setSidebarWidth(width))
    }
  }, [width])

  return {
    isExpanded: expanded,
    setExpanded,
    width,
    expandedWidth,
    selectedItem,
  }
}
