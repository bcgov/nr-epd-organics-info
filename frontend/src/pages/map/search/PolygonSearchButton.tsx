import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import clsx from 'clsx'

import { ActiveToolEnum } from '@/constants/constants'
import { toggleActiveTool } from '@/features/map/map-slice'
import { clearShapeFilters } from '@/features/omrr/omrr-slice'

import PolygonIcon from '@/assets/svgs/fa-polygon.svg?react'

interface Props {
  isActive: boolean
}

export function PolygonSearchButton({ isActive }: Readonly<Props>) {
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(toggleActiveTool(ActiveToolEnum.polygonSearch))
    if (isActive) {
      dispatch(clearShapeFilters())
    }
  }

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
      onClick={onClick}
    >
      Polygon Search
    </Button>
  )
}
