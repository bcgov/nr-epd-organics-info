import React from 'react'
import { useDispatch } from 'react-redux'
import { IconButton } from '@mui/material'

import { sortFilteredResultsByPosition } from '@/features/omrr/omrr-slice'
import { getMyLocation } from '@/utils/utils'

import GpsIcon from '@/assets/svgs/fa-gps.svg?react'

export function LocationIconButton() {
  const dispatch = useDispatch()

  const onClick = () => {
    // Load user's location, then sort the filtered results by distance (closest first)
    getMyLocation(({ position }) => {
      if (position) {
        dispatch(sortFilteredResultsByPosition(position))
      }
    })
  }

  return (
    <IconButton onClick={onClick} title="Search by my location">
      <GpsIcon className="search-input-icon search-input-icon--location" />
    </IconButton>
  )
}
