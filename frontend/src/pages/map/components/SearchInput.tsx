import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Autocomplete, InputAdornment, TextField } from '@mui/material'
import { LatLngTuple } from 'leaflet'

import { RootState } from '@/app/store'
import { searchAuthorizationsByTextFilter } from '@/features/omrr/omrr-slice'
import { MIN_SEARCH_LENGTH } from '@/features/omrr/omrr-utils'
import { setZoomPosition } from '@/features/map/map-slice'
import { SearchOption } from '@/interfaces/search-option'
import { getAutocompleteOptions } from '@/utils/autocomplete'
import { SearchResultItem } from './SearchResultItem'
import { usePlaceNames } from '../hooks/usePlaceNames'

import SearchIcon from '@/assets/svgs/fa-search.svg?react'

import './SearchInput.css'

const styles = {
  width: {
    xxl: '632px',
    xl: '542px',
    lg: '452px',
  },
}

const componentProps = {
  popper: {
    modifiers: [
      {
        name: 'offset',
        options: { offset: [0, 6] },
      },
    ],
  },
}

const SEARCH_DELAY = 300

export function SearchInput() {
  const dispatch = useDispatch()
  const { filteredResults, searchTextFilter } = useSelector(
    (state: RootState) => state.omrr,
  )
  const [value, setValue] = useState<string>(searchTextFilter)
  const timeoutRef = useRef<any>(0)
  const [options, setOptions] = useState<SearchOption[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const currentValueRef = useRef<string>(value)
  const lastValueRef = useRef<string>(value)
  const { loading, places } = usePlaceNames()

  // When the filtered results change - then update the autocomplete options
  useEffect(() => {
    const currentText = currentValueRef.current
    const lastText = lastValueRef.current
    const textChanged = currentText !== lastText
    lastValueRef.current = currentText

    // convert the filtered results into autocomplete options
    const newOptions: SearchOption[] = getAutocompleteOptions(
      filteredResults,
      places,
      currentText,
    )
    setOptions(newOptions)

    // Open the Autocomplete when there is search text and it has changed
    setOpen(currentText.length >= MIN_SEARCH_LENGTH && textChanged)
  }, [filteredResults])

  // Delay the search to allow multiple characters to be typed
  const delayedSearch = (newText: string) => {
    clearTimeout(timeoutRef.current)
    // Search immediately when text is cleared
    const delay = newText ? SEARCH_DELAY : 0
    timeoutRef.current = setTimeout(() => {
      dispatch(searchAuthorizationsByTextFilter(newText))
    }, delay)
  }

  const onTextChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const newValue = ev.target.value
    setValue(newValue)
    currentValueRef.current = newValue
    delayedSearch(newValue)
  }

  const onAutocompleteChange = (
    _ev: any,
    value: string | SearchOption | null,
  ) => {
    // When the user selects an option from the autocomplete list
    if (value) {
      if (typeof value === 'string') {
        setOptions([])
      } else {
        const option: SearchOption = value
        // Zoom to the facility or place's location on the map
        let latlng: LatLngTuple | undefined
        if (option.place) {
          latlng = option.place.pos
        } else if (option.item) {
          latlng = [option.item.Latitude, option.item.Longitude]
        }
        if (latlng) {
          dispatch(setZoomPosition({ position: latlng, zoom: 13 }))
        }
      }
    }
  }

  return (
    <Autocomplete
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon title="Search icon" className="map-search-icon" />
                </InputAdornment>
              ),
            }}
            placeholder="Search"
            variant="outlined"
            className="map-search-input"
            sx={styles}
            value={value}
            onChange={onTextChange}
          />
        )
      }}
      options={options}
      loading={loading}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      filterOptions={(options: SearchOption[]) => options}
      getOptionKey={(option: string | SearchOption) =>
        typeof option === 'string' ? option : option.id
      }
      getOptionLabel={(option: string | SearchOption) =>
        typeof option === 'string' ? option : option.text
      }
      freeSolo
      renderOption={(props, option) => {
        const { key, ...optionProps } = props
        return <SearchResultItem key={key} option={option} {...optionProps} />
      }}
      componentsProps={componentProps}
      onChange={onAutocompleteChange}
    />
  )
}
