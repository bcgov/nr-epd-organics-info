import { useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { MAP_BOTTOM_DRAWER_HEIGHT } from '@/constants/constants'
import { useDrawerExpanded, useSidebarWidth } from '@/features/map/map-slice'
import { DataLayersControl } from './DataLayersControl'
import { FindMeControl } from './FindMeControl'
import { ZoomInOutControl } from './ZoomInOutControl'
import { Control } from './Control'

import './MapControls.css'

export function MapControls() {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))
  const sidebarWidth = useSidebarWidth()
  const isExpanded = useDrawerExpanded()

  const style = useMemo(() => {
    if (sidebarWidth > 0 && isExpanded) {
      // Sidebar is expanded - shift controls left
      return {
        marginRight: `${sidebarWidth + 10}px`,
      }
    } else if (isMedium && !isSmall && isExpanded) {
      // medium devices only - shift the controls up 320px
      return {
        marginBottom: `${MAP_BOTTOM_DRAWER_HEIGHT + 10}px`,
      }
    }
  }, [sidebarWidth, isExpanded, isSmall, isMedium])

  return (
    <Control position="bottomright" className="map-controls" style={style}>
      <DataLayersControl />
      <FindMeControl />
      <ZoomInOutControl />
    </Control>
  )
}
