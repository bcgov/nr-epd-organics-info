import { useDispatch } from 'react-redux'
import { IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import clsx from 'clsx'

import {
  setMyLocationVisible,
  useMyLocationVisible,
} from '@/features/map/map-slice'

import GpsIcon from '@/assets/svgs/fa-gps.svg?react'

export function FindMeControl() {
  const dispatch = useDispatch()
  const isMarkerVisible = useMyLocationVisible()
  const theme = useTheme()
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))

  if (isLarge) {
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
