import { useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import {
  BottomDrawerContentEnum,
  MAP_BOTTOM_DRAWER_HEIGHT,
  MAP_BOTTOM_DRAWER_HEIGHT_SEARCH_BY,
  MAP_CONTROLS_BOTTOM_LG,
  MAP_CONTROLS_BOTTOM_SM,
  MAP_CONTROLS_RIGHT_LG,
  MAP_CONTROLS_RIGHT_SM,
  MAP_CONTROLS_RIGHT_XL,
} from '@/constants/constants'
import {
  useBottomDrawerContentType,
  useDrawerExpanded,
  useSidebarWidth,
} from '@/features/map/map-slice'
import { DataLayersControl } from './DataLayersControl'
import { FindMeControl } from './FindMeControl'
import { ZoomInOutControl } from './ZoomInOutControl'
import { Control } from './Control'

import './MapControls.css'

export function MapControls() {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.down('lg'))
  const isLarge = useMediaQuery(theme.breakpoints.down('xl'))
  const sidebarWidth = useSidebarWidth()
  const isExpanded = useDrawerExpanded()
  const contentType = useBottomDrawerContentType()
  const isSearchBy = contentType === BottomDrawerContentEnum.searchBy

  // Shift the controls based on screen size and whether the sidebar or bottom drawer is expanded
  let right = MAP_CONTROLS_RIGHT_XL
  if (isSmall) {
    right = MAP_CONTROLS_RIGHT_SM
  } else if (isLarge) {
    right = MAP_CONTROLS_RIGHT_LG
  }
  let bottom = MAP_CONTROLS_BOTTOM_LG
  if (isSmall) {
    bottom = MAP_CONTROLS_BOTTOM_SM
  }

  if (sidebarWidth > 0 && isExpanded) {
    // Sidebar is expanded - shift controls left
    right = sidebarWidth + right
  } else if (isMedium && !isSmall && isExpanded) {
    // medium devices only - shift the controls up bottom drawer height
    let height = MAP_BOTTOM_DRAWER_HEIGHT
    if (isSearchBy) {
      height = MAP_BOTTOM_DRAWER_HEIGHT_SEARCH_BY
      bottom = height + bottom
    }
  }

  const style = useMemo(
    () => ({
      marginRight: `${right}px`,
      marginBottom: `${bottom}px`,
    }),
    [right, bottom],
  )

  return (
    <Control position="bottomright" className="map-controls" style={style}>
      {isMedium && (
        <>
          <DataLayersControl />
          <FindMeControl />
        </>
      )}
      <ZoomInOutControl />
    </Control>
  )
}
