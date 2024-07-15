import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import clsx from 'clsx'

import { RootState } from '@/app/store'
import { setMyLocationVisible } from '@/features/map/map-slice'

import FindMeIcon from '@/assets/svgs/fa-gps.svg?react'

export function FindMeButton() {
  const dispatch = useDispatch()
  const isMarkerVisible = useSelector(
    (state: RootState) => state.map.isMyLocationVisible,
  )

  const onClick = () => {
    dispatch(setMyLocationVisible(!isMarkerVisible))
  }

  return (
    <Button
      variant="contained"
      size="large"
      color="secondary"
      className={clsx(
        'map-button',
        'map-button--large',
        isMarkerVisible && 'map-button--active',
      )}
      startIcon={<FindMeIcon title="Find me icon" className="find-me-icon" />}
      onClick={onClick}
    >
      Find Me
    </Button>
  )
}
