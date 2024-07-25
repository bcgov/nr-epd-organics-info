import React, { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { RadioGroupProps } from '@mui/material/RadioGroup/RadioGroup'

import {
  SEARCH_BY_ACTIVE,
  SEARCH_BY_ALL,
  SEARCH_BY_INACTIVE,
} from '@/interfaces/types'
import { setSearchBy, useSearchBy } from '@/features/omrr/omrr-slice'
import clsx from 'clsx'

interface Props extends Omit<RadioGroupProps, 'value'> {
  defaultValue?: string
}

export function SearchByRadioGroup({
  defaultValue = SEARCH_BY_ALL,
  onChange,
  row = true,
  className,
  sx,
  ...rest
}: Readonly<Props>) {
  const dispatch = useDispatch()
  const searchBy = useSearchBy()

  const onChangeWrapper = (
    ev: ChangeEvent<HTMLInputElement>,
    newValue: string,
  ) => {
    dispatch(setSearchBy(newValue))
    if (onChange) {
      onChange(ev, newValue)
    }
  }

  return (
    <RadioGroup
      {...rest}
      className={clsx('search-by-radio-group', className)}
      defaultValue={defaultValue}
      name="search-by-group"
      value={searchBy}
      onChange={onChangeWrapper}
      row={row}
      sx={sx}
    >
      <FormControlLabel value={SEARCH_BY_ALL} control={<Radio />} label="All" />
      <FormControlLabel
        value={SEARCH_BY_ACTIVE}
        control={<Radio />}
        label="Active"
      />
      <FormControlLabel
        value={SEARCH_BY_INACTIVE}
        control={<Radio />}
        label="Inactive"
      />
    </RadioGroup>
  )
}
