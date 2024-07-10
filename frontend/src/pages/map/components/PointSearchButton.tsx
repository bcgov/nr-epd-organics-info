import { MouseEventHandler } from 'react'
import { Button } from '@mui/material'
import clsx from 'clsx'

import PointIcon from '@/assets/svgs/fa-point.svg?react'

interface Props {
  isActive?: boolean
  onClick?: MouseEventHandler
}

export function PointSearchButton({ isActive = false, onClick }: Props) {
  return (
    <Button
      variant="contained"
      color="secondary"
      size="medium"
      className={clsx(
        'map-button',
        'map-button--medium',
        'point-search-button',
        isActive && 'map-button--active',
      )}
      startIcon={
        <PointIcon title="Point search icon" className="point-search-icon" />
      }
      disabled
      onClick={onClick}
    >
      Point Search
    </Button>
  )
}
