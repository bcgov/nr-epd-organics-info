import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import clsx from 'clsx'

import { ActiveToolEnum } from '@/constants/constants'
import { toggleActiveTool } from '@/features/map/map-slice'
import {
  resetPointFilter,
  resetPolygonFilter,
  usePolygonFilterPositions,
} from '@/features/omrr/omrr-slice'

import PolygonIcon from '@/assets/svgs/fa-polygon.svg?react'

interface Props {
  isActive: boolean
}

export function PolygonSearchButton({ isActive }: Readonly<Props>) {
  const dispatch = useDispatch()
  const positions = usePolygonFilterPositions()
  const isFilterActive = positions.length > 0

  const onClick = () => {
    if (isActive) {
      // Turn off polygon filter
      dispatch(resetPolygonFilter())
    } else {
      // starting point search - make sure point filter is turned off
      dispatch(resetPointFilter())
    }
    dispatch(toggleActiveTool(ActiveToolEnum.polygonSearch))
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
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <PolygonIcon
            title="Polygon search icon"
            className="polygon-search-icon"
          />
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
      onClick={onClick}
    >
      Polygon Search
    </Button>
  )
}
