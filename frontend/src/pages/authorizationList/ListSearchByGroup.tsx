import { useState } from 'react'
import { Button, Menu, MenuItem, Radio } from '@mui/material'
import DownArrow from '@/assets/svgs/fa-caret-down.svg?react'
import { useDispatch } from 'react-redux'
import {
  SEARCH_BY_ACTIVE,
  SEARCH_BY_ALL,
  SEARCH_BY_INACTIVE,
} from '@/interfaces/types'
import { setSearchBy, useSearchBy } from '@/features/omrr/omrr-slice'

export function ListSearchByGroup({ isMobile }: { isMobile?: boolean }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const dispatch = useDispatch()
  const searchBy = useSearchBy()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (value: string) => {
    dispatch(setSearchBy(value))
    handleClose()
  }

  const getDisplayText = () => {
    switch (searchBy) {
      case SEARCH_BY_ACTIVE:
        return 'Active'
      case SEARCH_BY_INACTIVE:
        return 'Inactive'
      default:
        return 'All'
    }
  }

  return (
    <div>
      <Button
        data-testid="list-page-search-by-button"
        color={isMobile ? 'primary' : 'secondary'}
        variant="contained"
        sx={{
          textTransform: 'none',
          justifyContent: 'space-between',
        }}
        onClick={handleClick}
        endIcon={
          <DownArrow
            width={10}
            style={{
              transform: `rotate(${Boolean(anchorEl) ? 180 : 0}deg)`,
              transition: 'transform 0.2s linear',
            }}
          />
        }
      >
        Status
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          data-testid="list-page-search-by-button-all"
          onClick={() => handleSelect(SEARCH_BY_ALL)}
        >
          <Radio checked={searchBy === SEARCH_BY_ALL} size="small" />
          All
        </MenuItem>
        <MenuItem
          data-testid="list-page-search-by-button-active"
          onClick={() => handleSelect(SEARCH_BY_ACTIVE)}
        >
          <Radio checked={searchBy === SEARCH_BY_ACTIVE} size="small" />
          Active
        </MenuItem>
        <MenuItem
          data-testid="list-page-search-by-button-inactive"
          onClick={() => handleSelect(SEARCH_BY_INACTIVE)}
        >
          <Radio checked={searchBy === SEARCH_BY_INACTIVE} size="small" />
          Inactive
        </MenuItem>
      </Menu>
    </div>
  )
}
