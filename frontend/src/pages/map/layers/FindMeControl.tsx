import { useDispatch } from 'react-redux'
import { IconButton } from '@mui/material'
import clsx from 'clsx'

import {
  setMyLocationVisible,
  useMyLocationVisible,
} from '@/features/map/map-slice'
import { useGeolocationPermission } from '@/hooks/useMyLocation'

import GpsIcon from '@/assets/svgs/fa-gps.svg?react'

export function FindMeControl() {
  const dispatch = useDispatch()
  const isMarkerVisible = useMyLocationVisible()
  const state = useGeolocationPermission()
  // No point in showing the button if the permission has been denied
  if (state === 'denied') {
    return null
  }

  const onClick = () => {
    dispatch(setMyLocationVisible(!isMarkerVisible))
  }

  return (
    <IconButton
      className={clsx(
        'map-control-button',
        isMarkerVisible && 'map-control-button--active',
      )}
      onClick={onClick}
      title="Show my location on the map"
    >
      <GpsIcon />
    </IconButton>
  )
}
