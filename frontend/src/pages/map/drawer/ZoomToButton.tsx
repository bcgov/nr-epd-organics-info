import { ReactNode } from 'react'
import { Button } from '@mui/material'

import OmrrData from '@/interfaces/omrr'
import { useZoomToAuthorizations } from '../hooks/useZoomTo'

import ZoomInIcon from '@/assets/svgs/fa-magnifying-glass-plus.svg?react'

interface Props {
  items: OmrrData[]
  children?: ReactNode
}

export function ZoomToButton({ items, children = 'Zoom To' }: Readonly<Props>) {
  const zoomTo = useZoomToAuthorizations()

  const onZoomIn = () => {
    zoomTo(items)
  }

  return (
    <Button
      variant="outlined"
      onClick={onZoomIn}
      size="medium"
      startIcon={<ZoomInIcon />}
      sx={{ color: '#2d2d2d' }}
      className="zoom-to-button"
    >
      {children}
    </Button>
  )
}
