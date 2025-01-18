import { useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import {
  MAP_CONTROLS_BOTTOM_LG,
  MAP_CONTROLS_BOTTOM_SM,
  MAP_CONTROLS_RIGHT_LG,
  MAP_CONTROLS_RIGHT_SM,
  MAP_CONTROLS_RIGHT_XL,
} from '@/constants/constants'
import {
  useBottomDrawerHeight,
  useSidebarWidth,
} from '@/features/map/map-slice'
import { Control } from './Control'
import { DataLayersControl } from './DataLayersControl'
import { FindMeControl } from './FindMeControl'
import { ZoomInOutControl } from './ZoomInOutControl'
import { ZoomToResultsControl } from './ZoomToResultsControl'
import { BasemapControlButton } from './BasemapControl'

import './MapControls.css'

export function MapControls() {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))
  const isMedium = useMediaQuery(theme.breakpoints.down('lg'))
  const isLarge = useMediaQuery(theme.breakpoints.down('xl'))
  const sidebarWidth = useSidebarWidth()
  const bottomDrawerHeight = useBottomDrawerHeight()

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

  if (sidebarWidth > 0) {
    // Sidebar is expanded - shift controls left
    right = sidebarWidth + right
  } else if (isMedium && !isSmall && bottomDrawerHeight > 0) {
    // medium devices only - shift the controls up bottom drawer height
    bottom = bottomDrawerHeight + bottom
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
      <BasemapControlButton />
      <ZoomToResultsControl />
      {isSmall ? null : <ZoomInOutControl />}
    </Control>
  )
}
