import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'

import { setSearchBy } from '@/features/omrr/omrr-slice'
import {
  SEARCH_BY_ACTIVE,
  SEARCH_BY_ALL,
  SEARCH_BY_INACTIVE,
  SearchByType,
} from '@/interfaces/types'
import DropdownButton from '@/components/DropdownButton'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

export function SearchByButton() {
  const dispatch = useDispatch()
  const [value, setValue] = useState<SearchByType>(SEARCH_BY_ALL)
  const theme = useTheme()
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))

  const onChange = (_ev: ChangeEvent<HTMLInputElement>, newValue: string) => {
    setValue(newValue as SearchByType)
    dispatch(setSearchBy(newValue))
  }

  const content = (
    <RadioGroup
      defaultValue={SEARCH_BY_ALL}
      name="search-by-group"
      value={value}
      onChange={onChange}
      sx={{ gap: '0.25rem', paddingLeft: '0.5rem' }}
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
        Search By: <b style={{ textTransform: 'capitalize' }}>{value}</b>
      </span>
    </DropdownButton>
  )
}