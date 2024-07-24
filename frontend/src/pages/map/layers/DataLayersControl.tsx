import { useDispatch } from 'react-redux'
import { IconButton } from '@mui/material'
import clsx from 'clsx'

import {
  setBottomDrawerContent,
  useBottomDrawerContentType,
} from '@/features/map/map-slice'
import { BottomDrawerContentEnum } from '@/constants/constants'

import LayersIcon from '@/assets/svgs/fa-layers.svg?react'

export function DataLayersControl() {
  const dispatch = useDispatch()
  const isActive =
    useBottomDrawerContentType() === BottomDrawerContentEnum.dataLayers

  const onClick = () => {
    dispatch(
      setBottomDrawerContent(
        isActive ? undefined : BottomDrawerContentEnum.dataLayers,
      ),
    )
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
