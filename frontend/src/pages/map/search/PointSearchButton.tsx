import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import clsx from 'clsx'

import { ActiveToolEnum } from '@/constants/constants'
import {
  resetPointFilter,
  resetPolygonFilter,
  usePointFilterActive,
} from '@/features/omrr/omrr-slice'
import { toggleActiveTool } from '@/features/map/map-slice'

import PointIcon from '@/assets/svgs/fa-point.svg?react'

interface Props {
  isActive: boolean
}

export function PointSearchButton({ isActive }: Readonly<Props>) {
  const dispatch = useDispatch()
  const isFilterActive = usePointFilterActive()

  const onClick = () => {
    if (isActive) {
      // Turn off point search
      dispatch(resetPointFilter())
    } else {
      // starting point search - make sure the polygon filter is turned off
      dispatch(resetPolygonFilter())
    }
    dispatch(toggleActiveTool(ActiveToolEnum.pointSearch))
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
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <PointIcon title="Radius search icon" className="point-search-icon" />
          {isFilterActive && (
            <div
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-12px',
                width: '6px',
                height: '6px',
                backgroundColor:
                  'var(--surface-color-primary-dangerButton-default, #ce3e39)',
                borderRadius: '50%',
              }}
            />
          )}
        </div>
      }
    >
      Radius Search
    </Button>
  )
}
