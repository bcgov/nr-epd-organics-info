import { MouseEventHandler } from 'react'
import { Button } from '@mui/material'
import clsx from 'clsx'

import PolygonIcon from '@/assets/svgs/fa-polygon.svg?react'

interface Props {
  isActive?: boolean
  onClick?: MouseEventHandler
}

export function PolygonSearchButton({
  isActive = false,
  onClick,
}: Readonly<Props>) {
  return (
    <Button
      color="secondary"
      size="medium"
      variant="contained"
      className={clsx(
        'map-button map-button--medium',
        isActive && 'map-button--active',
      )}
      startIcon={
        <PolygonIcon
          title="Polygon search icon"
          className="polygon-search-icon"
        />
      }
      disabled
      onClick={onClick}
    >
      Polygon Search
    </Button>
  )
}
