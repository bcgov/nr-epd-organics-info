import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { RootState } from '@/app/store'
import { resetFilters, updateFilter } from '@/features/omrr/omrr-slice'
import DropdownButton from '@/components/DropdownButton'
import { OmrrFilter } from '@/interfaces/omrr-filter'

const styles = {
  resetButton: {
    alignSelf: 'flex-start',
    marginTop: '0.75rem',
    color: 'var(--typography-color-primary)',
    borderColor: 'var(--surface-color-border-dark)',
  },
}

export function FilterByButton() {
  const dispatch = useDispatch()
  const { filters } = useSelector((state: RootState) => state.omrr)
  const theme = useTheme()
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))

  const onChange = (filter: OmrrFilter) => {
    dispatch(updateFilter(filter))
  }

  const onReset = () => {
    dispatch(resetFilters())
  }

  const showResetButton = filters.some((f) => f.on)

  const content = (
    <FormGroup sx={{ gap: '0.5rem', paddingLeft: '0.5em' }}>
      {filters.map((filter: OmrrFilter) => (
        <FormControlLabel
          key={`filterByCheckBox-${filter.value}`}
          control={<Checkbox />}
          checked={filter.on}
          label={filter.label}
          disabled={filter.disabled}
          onChange={() => onChange(filter)}
        />
      ))}
      {showResetButton && (
        <Button variant="outlined" onClick={onReset} sx={styles.resetButton}>
          Reset Filters
        </Button>
      )}
    </FormGroup>
  )

  return (
    <DropdownButton
      id="mapFilterByButton"
      variant="contained"
      color="secondary"
      size="medium"
      className={clsx('map-button', 'map-button--medium')}
      openClassName="map-button--active"
      dropdownContent={content}
      showArrow={isLarge}
    >
      Filter by Facility Type
    </DropdownButton>
  )
}
