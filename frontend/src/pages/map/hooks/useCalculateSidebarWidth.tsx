import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { setSidebarWidth } from '@/features/map/map-slice'

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
export function useCalculateSidebarWidth() {
  const dispatch = useDispatch()
  const theme = useTheme()
  // Sidebar is only shown in L/XL/XXL
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
  const isXL = useMediaQuery(theme.breakpoints.up('xl'))
  const isXXL = useMediaQuery(theme.breakpoints.up('xxl'))
  let sidebarWidth = 0
  if (isXXL) {
    sidebarWidth = sidebarWidths.xxl
  } else if (isXL) {
    sidebarWidth = sidebarWidths.xl
  } else if (isLarge) {
    sidebarWidth = sidebarWidths.lg
  }

  useEffect(() => {
    dispatch(setSidebarWidth(sidebarWidth))
  }, [sidebarWidth])

  return sidebarWidth
}
