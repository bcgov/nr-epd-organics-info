import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'
import { Button } from '@mui/material'

import ChevronLeft from '@/assets/svgs/fa-chevron-left.svg?react'

export function DetailsBackButton() {
  const navigate = useNavigate()
  const location = useLocation()
  const { previousPath = '/search' } = location.state || {}
  const searchType = previousPath === '/map' ? 'Map Search' : 'Text Search'

  const onClick = () => {
    navigate(previousPath) // reset the state
  }

  return (
    <Button
      color="primary"
      variant="contained"
      size="medium"
      startIcon={<ChevronLeft width={8} />}
      onClick={onClick}
    >
      Back to {searchType}
    </Button>
  )
}
