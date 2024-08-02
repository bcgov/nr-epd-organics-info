import { useMap } from 'react-leaflet'
import { IconButton } from '@mui/material'

import PlusIcon from '@/assets/svgs/fa-plus.svg?react'
import MinusIcon from '@/assets/svgs/fa-minus.svg?react'

export function ZoomInOutControl() {
  const map = useMap()

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
