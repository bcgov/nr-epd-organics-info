import { MouseEventHandler } from 'react'
import { Button } from '@mui/material'
import clsx from 'clsx'

import searchIcon from '@/assets/svgs/fa-search.svg'

interface Props {
  isActive?: boolean
  onClick?: MouseEventHandler
}

export function SearchButton({ isActive = false, onClick }: Props) {
  return (
    <Button
      variant="contained"
      color="secondary"
      size="medium"
      className={clsx(
        'map-button',
        'map-button--medium',
        isActive && 'map-button--active',
      )}
      startIcon={<img src={searchIcon} alt="Search icon" />}
      onClick={onClick}
    >
      Search
    </Button>
  )
}
