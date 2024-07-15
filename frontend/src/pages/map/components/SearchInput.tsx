import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Autocomplete, InputAdornment, TextField } from '@mui/material'

import { RootState } from '@/app/store'
import { searchAuthorizationsByTextFilter } from '@/features/omrr/omrr-slice'
import { MIN_SEARCH_LENGTH } from '@/features/omrr/omrr-utils'
import { SearchOption } from '@/interfaces/search-option'
import { getAutocompleteOptions } from '@/utils/autocomplete'
import { SearchResultItem } from './SearchResultItem'

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
        options: {
          offset: [0, 6],
        },
      },
    ],
  },
}

const SEARCH_DELAY = 300
const MAX_RESULTS = 5

export function SearchInput() {
  const dispatch = useDispatch()
  const { filteredResults, searchTextFilter } = useSelector(
    (state: RootState) => state.omrr,
  )
  const [value, setValue] = useState<string>(searchTextFilter)
  const timeoutRef = useRef<any>(0)
  const [options, setOptions] = useState<SearchOption[]>([])
  const [loading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const currentValueRef = useRef<string>(value)
  const lastValueRef = useRef<string>(value)

  // When the filtered results change - then update the autocomplete options
  useEffect(() => {
    // TODO also need to autocomplete on city names
    // setLoading(true)

    const currentText = currentValueRef.current
    const lastText = lastValueRef.current
    const textChanged = currentText !== lastText
    lastValueRef.current = currentText

    // convert the filtered results into autocomplete options
    const newOptions: SearchOption[] = getAutocompleteOptions(
      filteredResults,
      currentText,
      MAX_RESULTS,
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
        setOptions([value as SearchOption])
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
      renderOption={(props, option, state) => {
        const { key, ...optionProps } = props
        return (
          <SearchResultItem
            key={`SearchResultItem-${option.id}`}
            option={option}
            inputValue={state.inputValue}
            {...optionProps}
          />
        )
      }}
      componentsProps={componentProps}
      onChange={onAutocompleteChange}
    />
  )
}
