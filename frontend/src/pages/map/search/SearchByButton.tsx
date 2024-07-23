import clsx from 'clsx'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { useSearchBy } from '@/features/omrr/omrr-slice'
import DropdownButton from '@/components/DropdownButton'
import { SearchByRadioGroup } from '@/components/SearchByRadioGroup'

export function SearchByButton() {
  const searchBy = useSearchBy()
  const theme = useTheme()
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))

  const content = (
    <SearchByRadioGroup
      name="map-search-by-group"
      row={false}
      sx={{ gap: '0.25rem', paddingLeft: '0.5rem' }}
    />
  )

  return (
    <DropdownButton
      id="mapSearchByButton"
      variant="contained"
      color="secondary"
      size="medium"
      className={clsx('map-button', 'map-button--medium')}
      openClassName="map-button--active"
      dropdownContent={content}
      showArrow={isLarge}
    >
      <span>
        Search By: <b style={{ textTransform: 'capitalize' }}>{searchBy}</b>
      </span>
    </DropdownButton>
  )
}
