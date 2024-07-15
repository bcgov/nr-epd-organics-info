import { useDispatch, useSelector } from 'react-redux'
import { InputAdornment, TextField } from '@mui/material'

import { RootState } from '@/app/store'
import { searchAuthorizationsByGlobalFilter } from '@/features/omrr/omrr-slice'

import SearchIcon from '@/assets/svgs/fa-search.svg?react'

import './SearchInput.css'

export function SearchInput() {
  const dispatch = useDispatch()
  const { globalTextSearchFilter } = useSelector(
    (state: RootState) => state.omrr,
  )

  return (
    <TextField
      InputProps={{
        type: 'search',
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon title="Search icon" className="map-search-icon" />
          </InputAdornment>
        ),
      }}
      placeholder="Search"
      variant="outlined"
      className="map-search-input"
      sx={{
        width: {
          xxl: '632px',
          xl: '542px',
          lg: '452px',
        },
      }}
      value={globalTextSearchFilter}
      onChange={(ev) =>
        dispatch(searchAuthorizationsByGlobalFilter(ev.target.value))
      }
    />
  )
}
