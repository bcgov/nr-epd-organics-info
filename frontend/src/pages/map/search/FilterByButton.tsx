import clsx from 'clsx'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import DropdownButton from '@/components/DropdownButton'
import { FilterByCheckboxGroup } from '@/components/FilterByCheckboxGroup'

export function FilterByButton() {
  const theme = useTheme()
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <DropdownButton
      id="mapFilterByButton"
      variant="contained"
      color="secondary"
      size="medium"
      className={clsx('map-button', 'map-button--medium')}
      openClassName="map-button--active"
      dropdownContent={
        <FilterByCheckboxGroup sx={{ gap: '8px', paddingLeft: '8px' }} />
      }
      showArrow={isLarge}
    >
      Filter by Facility Type
    </DropdownButton>
  )
}
