import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Autocomplete, InputAdornment, TextField } from '@mui/material'

import { MIN_SEARCH_LENGTH } from '@/constants/constants'
import {
  setSearchTextFilter,
  useFilteredResults,
  useSearchTextFilter,
} from '@/features/omrr/omrr-slice'
import { SearchOption } from '@/interfaces/search-option'
import { getAutocompleteOptions } from '@/utils/autocomplete'
import { AutocompleteItem } from './AutocompleteItem'
import { usePlaceNames } from '../hooks/usePlaceNames'
import { useSetSelectedItem } from '../hooks/useSetSelectedItem'
import { useSetSelectedPlace } from '../hooks/useSetSelectedPlace'

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
  const filteredResults = useFilteredResults()
  const searchTextFilter = useSearchTextFilter()
  const [value, setValue] = useState<string>(searchTextFilter)
  const timeoutRef = useRef<any>(0)
  const [options, setOptions] = useState<SearchOption[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const currentValueRef = useRef<string>(value)
  const lastValueRef = useRef<string>(value)
  const { loading, places } = usePlaceNames()
  const selectItem = useSetSelectedItem()
  const selectPlace = useSetSelectedPlace()

  // If the search text gets cleared or changed elsewhere - keep it in sync
  useEffect(() => {
    setValue(searchTextFilter)
  }, [searchTextFilter])

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
      dispatch(setSearchTextFilter(newText))
    }, delay)
  }

  const onTextChange = (_ev: any, newValue: string) => {
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
        // Zoom to the authorization or place's location on the map
        if (option.place) {
          selectPlace(option.place)
        } else if (option.item) {
          selectItem(option.item)
        }
      }
    }
  }

  return (
    <Autocomplete
      renderInput={(params) => (
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
        />
      )}
      value={value}
      options={options}
      loading={loading}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onInputChange={onTextChange}
      onChange={onAutocompleteChange}
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
        return <AutocompleteItem key={key} option={option} {...optionProps} />
      }}
      componentsProps={componentProps}
      className="search-autocomplete"
    />
  )
}
