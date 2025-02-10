import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormGroupProps,
  Typography,
} from '@mui/material'
import clsx from 'clsx'

import {
  resetFilters,
  selectFilters,
  updateFilter,
} from '@/features/omrr/omrr-slice'
import { OmrrFilter } from '@/interfaces/types'
import { flattenFilters } from '@/features/omrr/omrr-utils'

import './FilterByCheckboxGroup.css'

interface Props extends FormGroupProps {
  isSmall?: boolean
}

export function FilterByCheckboxGroup({
  isSmall = false,
  className,
  ...props
}: Readonly<Props>) {
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
    <div
      className={clsx(
        'filter-by-checkbox-group',
        !isSmall && 'thin-scrollbar',
        isSmall && 'filter-by-checkbox-group--small',
        className,
      )}
    >
      {isSmall && (
        <div className="filter-by-checkbox-group-header">
          <Typography fontSize="18px" fontWeight={700}>
            Facility Type
          </Typography>
          {showResetButton && (
            <Button
              variant="text"
              size="small"
              className="filter-by-reset-link"
              onClick={onReset}
            >
              Reset
            </Button>
          )}
        </div>
      )}
      <FormGroup className="filter-by-checkbox-form-group" {...props}>
        {flatFilters.map((filter: OmrrFilter) => (
          <FormControlLabel
            key={`filterByCheckBox-${filter.value}`}
            className="filter-by-checkbox-item"
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
          className="filter-by-reset-button"
        >
          Reset Filters
        </Button>
      )}
    </div>
  )
}
