import { Button } from '@mui/material'

import OmrrData from '@/interfaces/omrr'
import { useZoomToAuthorization } from '../hooks/useZoomTo'

import ZoomInIcon from '@/assets/svgs/fa-magnifying-glass-plus.svg?react'

interface Props {
  item: OmrrData
}

export function ZoomToButton({ item }: Props) {
  const zoomTo = useZoomToAuthorization()

  const onZoomIn = () => {
    zoomTo(item)
  }

  return (
    <Button
      variant="outlined"
      onClick={onZoomIn}
      size="medium"
      startIcon={<ZoomInIcon className="zoom-to-icon" />}
      sx={{ color: '#2d2d2d' }}
    >
      Zoom To
    </Button>
  )
}
