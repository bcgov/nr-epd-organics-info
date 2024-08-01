import { useDispatch } from 'react-redux'
import { IconButton } from '@mui/material'
import clsx from 'clsx'

import { toggleActiveTool, useActiveTool } from '@/features/map/map-slice'
import { ActiveToolEnum } from '@/constants/constants'

import LayersIcon from '@/assets/svgs/fa-layers.svg?react'

export function DataLayersControl() {
  const dispatch = useDispatch()
  const isActive = useActiveTool() === ActiveToolEnum.dataLayers

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
      <LayersIcon />
    </IconButton>
  )
}
