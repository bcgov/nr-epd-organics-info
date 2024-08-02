import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'

import { setSelectedItem } from '@/features/map/map-slice'
import { useFilteredResults } from '@/features/omrr/omrr-slice'

import ChevronLeft from '@/assets/svgs/fa-chevron-left.svg?react'

export function ClearSelectedItemButton() {
  const dispatch = useDispatch()
  const filteredResults = useFilteredResults()

  if (filteredResults.length === 0) {
    return null
  }

  const onClick = () => {
    dispatch(setSelectedItem(undefined))
  }

  return (
    <Button
      color="primary"
      variant="contained"
      size="medium"
      onClick={onClick}
      startIcon={<ChevronLeft width={8} />}
    >
      Back to Search Results
    </Button>
  )
}
