import { useDispatch } from 'react-redux'
import { IconButton, Badge } from '@mui/material'
import clsx from 'clsx'

import {
  toggleActiveTool,
  useActiveTool,
  useDataLayers,
} from '@/features/map/map-slice'
import { ActiveToolEnum } from '@/constants/constants'

import LayersIcon from '@/assets/svgs/fa-layers.svg?react'

export function DataLayersControl() {
  const dispatch = useDispatch()
  const isActive = useActiveTool() === ActiveToolEnum.dataLayers
  const dataLayers = useDataLayers()

  const onClick = () => {
    dispatch(toggleActiveTool(ActiveToolEnum.dataLayers))
  }

  return (
    <IconButton
      className={clsx(
        'map-control-button',
        isActive && 'map-control-button--active',
      )}
      onClick={onClick}
      title="Show the data layers"
    >
      <div className="layers-badge-wrapper">
        <Badge
          badgeContent={dataLayers.length}
          color="primary"
          invisible={dataLayers.length === 0}
          component="div"
          sx={{
            display: 'flex',
            '& .MuiBadge-badge': {
              right: -3,
              bottom: 3,
              top: 'auto',
              padding: '0 4px',
              minWidth: '16px',
              height: '16px',
              fontSize: '0.75rem',
              backgroundColor: 'var(--surface-color-primary-active-border)',
              color: 'var(--surface-color-background-white)',
            },
          }}
        >
          <LayersIcon />
        </Badge>
      </div>
    </IconButton>
  )
}
