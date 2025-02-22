import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

import {
  setSearchTextFilter,
  useSearchTextFilter,
} from '@/features/omrr/omrr-slice'
import { SearchInput } from '@/components/SearchInput'

export function ListSearchInput(props: { isMobile?: boolean }) {
  const dispatch = useDispatch()
  const value = useSearchTextFilter()

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTextFilter(ev.target.value))
  }

  const onClear = () => {
    dispatch(setSearchTextFilter(''))
  }

  return (
    <SearchInput
      placeholder="Search"
      className="list-search-input"
      value={value}
      onChange={onChange}
      showLocationIcon
      onClear={onClear}
      fullWidth
      InputLabelProps={{
        sx: {
          position: 'static',
          transform: 'none',
          color: 'var(--typography-color-primary)',
          marginBottom: 'var(--layout-margin-xsmall)',
          fontSize: '12px',
        },
      }}
      data-testid={`authorization-list-search-input${props.isMobile ? '-mobile' : '-desktop'}`}
    />
  )
}
