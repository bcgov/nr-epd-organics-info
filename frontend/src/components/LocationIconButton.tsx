import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { IconButton } from '@mui/material'
import clsx from 'clsx'

import { setUserLocation, useUserLocation } from '@/features/omrr/omrr-slice'
import { getMyLocation } from '@/utils/utils'
import { useGeolocationPermission } from '@/hooks/useMyLocation'

import GpsIcon from '@/assets/svgs/fa-gps.svg?react'

export function LocationIconButton() {
  const dispatch = useDispatch()
  const state = useGeolocationPermission()
  const [visible, setVisible] = useState<boolean>(false)
  const userLocation = useUserLocation()

  // Only show this button if the user hasn't denied the permission
  useEffect(() => {
    setVisible(state === 'prompt' || state === 'granted')
  }, [state])

  if (!visible) {
    return null
  }

  const onClick = () => {
    if (userLocation) {
      dispatch(setUserLocation(undefined))
    } else {
      // Load user's location, then sort the filtered results by distance (closest first)
      getMyLocation(
        ({ position }) => {
          dispatch(setUserLocation(position))
        },
        (err) => {
          // User denied the permission
          console.log('Geolocation error', err.message)
          setVisible(false)
        },
      )
    }
  }

  return (
    <IconButton onClick={onClick} title="Sort results by my location">
      <GpsIcon
        className={clsx(
          'search-input-icon search-input-icon--location',
          Boolean(userLocation) && 'search-input-icon--active',
        )}
        title="My location icon"
      />
    </IconButton>
  )
}
