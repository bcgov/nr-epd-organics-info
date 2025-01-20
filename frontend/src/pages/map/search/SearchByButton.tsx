import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Button, Chip } from '@mui/material'

import DropdownButton from '@/components/DropdownButton'
import { SearchByRadioGroup } from '@/components/SearchByRadioGroup'
import { ActiveToolEnum } from '@/constants/constants'
import { useSearchBy } from '@/features/omrr/omrr-slice'
import { toggleActiveTool, useActiveTool } from '@/features/map/map-slice'
import { SEARCH_BY_ALL } from '@/interfaces/types'

interface Props {
  isLarge: boolean
  sx?: any // or use SxProps<Theme> from MUI for better typing
}

export function SearchByButton({ isLarge, sx }: Props) {
  const dispatch = useDispatch()
  const searchBy = useSearchBy()
  // Small screens/bottom drawer only
  const isActive = useActiveTool() === ActiveToolEnum.searchBy

  // Small screens/bottom drawer only
  const onClick = () => {
    dispatch(toggleActiveTool(ActiveToolEnum.searchBy))
  }

  const label = (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      Status
      {searchBy !== SEARCH_BY_ALL && (
        <Chip
          label={searchBy}
          size="small"
          sx={{
            position: 'absolute',
            top: '-16px',
            right: '-35px',
            height: '20px',
            backgroundColor: 'primary.main',
            color: 'white',
            fontSize: '10px',
            '& .MuiChip-label': {
              px: 1,
              textTransform: 'capitalize',
            },
          }}
        />
      )}
    </div>
  )

  if (isLarge) {
    return (
      <DropdownButton
        id="mapSearchByButton"
        variant="contained"
        color="secondary"
        size="large"
        className={clsx('map-button', 'map-button--large')}
        openClassName="map-button--active"
        dropdownContent={
          <SearchByRadioGroup
            name="map-search-by-group"
            row={false}
            sx={{ gap: '4px', paddingLeft: '8px' }}
          />
        }
      >
        {label}
      </DropdownButton>
    )
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      size="medium"
      className={clsx('map-button', isActive && 'map-button--active')}
      onClick={onClick}
      aria-label="Search By"
    >
      {label}
    </Button>
  )
}
