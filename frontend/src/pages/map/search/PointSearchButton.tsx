import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import clsx from 'clsx'

import { setActiveTool } from '@/features/map/map-slice'
import { ActiveToolEnum } from '@/constants/constants'

import PointIcon from '@/assets/svgs/fa-point.svg?react'

interface Props {
  isActive: boolean
}

export function PointSearchButton({ isActive }: Readonly<Props>) {
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(setActiveTool(ActiveToolEnum.pointSearch))
  }

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
      onClick={onClick}
      startIcon={
        <PointIcon title="Point search icon" className="point-search-icon" />
      }
    >
      Point Search
    </Button>
  )
}
