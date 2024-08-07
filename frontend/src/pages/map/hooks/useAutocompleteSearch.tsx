import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { MIN_SEARCH_LENGTH, SEARCH_DELAY } from '@/constants/constants'
import {
  setSearchTextFilter,
  useFilteredResults,
  useSearchTextFilter,
} from '@/features/omrr/omrr-slice'
import { AutocompleteOption } from '@/interfaces/autocomplete-option'
import { getAutocompleteOptions } from '@/utils/autocomplete'
import { usePlaceNames } from './usePlaceNames'
import { useSetSelectedItem } from './useSetSelectedItem'
import { useSetSelectedPlace } from './useSetSelectedPlace'

export function useAutocompleteSearch() {
  const dispatch = useDispatch()
  const filteredResults = useFilteredResults()
  const searchTextFilter = useSearchTextFilter()
  const [value, setValue] = useState<string>(searchTextFilter)
  const currentValueRef = useRef<string>(value)
  const timeoutRef = useRef<any>(0)
  const [options, setOptions] = useState<AutocompleteOption[]>([])
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

    // convert the filtered results into autocomplete options
    const newOptions: AutocompleteOption[] = getAutocompleteOptions(
      filteredResults,
      places,
      currentText,
    )
    setOptions(newOptions)
  }, [places, filteredResults])

  // Delay the search to allow multiple characters to be typed
  const performSearch = useCallback(
    (newText: string) => {
      setValue(newText)
      currentValueRef.current = newText
      clearTimeout(timeoutRef.current)

      // Search immediately when text is cleared
      const delay = newText ? SEARCH_DELAY : 0
      timeoutRef.current = setTimeout(() => {
        dispatch(setSearchTextFilter(newText))
      }, delay)
    },
    [dispatch],
  )

  const selectOption = useCallback(
    (value: AutocompleteOption | string | null) => {
      // When the user selects an option from the autocomplete list
      if (value) {
        if (typeof value === 'string') {
          setOptions([])
        } else {
          const option: AutocompleteOption = value
          // Zoom to the authorization or place's location on the map
          if (option.place) {
            selectPlace(option.place)
          } else if (option.item) {
            selectItem(option.item)
          }
          // Also ensure that the search text is set the the value
          if (option.text !== currentValueRef.current) {
            performSearch(option.text)
          }
        }
      }
    },
    [setOptions, selectPlace, selectItem, performSearch],
  )

  return {
    loading,
    value,
    options,
    performSearch,
    hasSearchText: searchTextFilter.length >= MIN_SEARCH_LENGTH,
    searchTextFilter,
    selectOption,
  }
}
