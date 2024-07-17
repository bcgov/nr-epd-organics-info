import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { setSearchBy } from '@/features/omrr/omrr-slice'
import {
  SEARCH_BY_ACTIVE,
  SEARCH_BY_ALL,
  SEARCH_BY_INACTIVE,
} from '@/interfaces/types'
import DropdownButton from '@/components/DropdownButton'
import { RootState } from '@/app/store'

export function SearchByButton() {
  const dispatch = useDispatch()
  const { searchBy } = useSelector((state: RootState) => state.omrr)
  const theme = useTheme()
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))

  const onChange = (_ev: ChangeEvent<HTMLInputElement>, newValue: string) => {
    dispatch(setSearchBy(newValue))
  }

  const content = (
    <RadioGroup
      defaultValue={SEARCH_BY_ALL}
      name="search-by-group"
      value={searchBy}
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
        Search By: <b style={{ textTransform: 'capitalize' }}>{searchBy}</b>
      </span>
    </DropdownButton>
  )
}
