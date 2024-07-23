import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormGroupProps,
} from '@mui/material'

import {
  resetFilters,
  selectFilters,
  updateFilter,
} from '@/features/omrr/omrr-slice'
import { OmrrFilter } from '@/interfaces/omrr-filter'
import { flattenFilters } from '@/features/omrr/omrr-utils'

const styles = {
  resetButton: {
    alignSelf: 'flex-start',
    marginTop: '0.75rem',
    color: 'var(--typography-color-primary)',
    borderColor: 'var(--surface-color-border-dark)',
  },
}

interface Props extends FormGroupProps {}

export function FilterByCheckboxGroup(props: Readonly<Props>) {
  const dispatch = useDispatch()
  const filters = useSelector(selectFilters)

  const onChange = (filter: OmrrFilter) => {
    dispatch(updateFilter(filter))
  }

  const onReset = () => {
    dispatch(resetFilters())
  }

  const flatFilters = flattenFilters(filters)
  const showResetButton = flatFilters.some((f) => f.on)

  return (
    <>
      <FormGroup {...props}>
        {flatFilters.map((filter: OmrrFilter) => (
          <FormControlLabel
            key={`filterByCheckBox-${filter.value}`}
            control={<Checkbox />}
            checked={filter.on}
            label={filter.label}
            disabled={filter.disabled}
            onChange={() => onChange(filter)}
          />
        ))}
      </FormGroup>
      {showResetButton && (
        <Button
          variant="outlined"
          onClick={onReset}
          sx={styles.resetButton}
          className="filter-checkbox-reset-button"
        >
          Reset Filters
        </Button>
      )}
    </>
  )
}
