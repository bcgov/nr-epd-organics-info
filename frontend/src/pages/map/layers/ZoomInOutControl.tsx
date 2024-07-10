import { useMap } from 'react-leaflet'
import { IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import PlusIcon from '@/assets/svgs/fa-plus.svg?react'
import MinusIcon from '@/assets/svgs/fa-minus.svg?react'

export function ZoomInOutControl() {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))
  const map = useMap()

  if (isSmall) {
    return null
  }

  return (
    <>
      <IconButton
        className="map-control-button"
        onClick={() => map.zoomIn()}
        title="Zoom in"
      >
        <PlusIcon />
      </IconButton>
      <IconButton
        className="map-control-button"
        onClick={() => map.zoomOut()}
        title="Zoom out"
      >
        <MinusIcon />
      </IconButton>
    </>
  )
}
