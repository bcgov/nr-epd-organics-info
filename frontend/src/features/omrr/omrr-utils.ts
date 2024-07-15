import { matchSorter, MatchSorterOptions } from 'match-sorter'

import OmrrData from '@/interfaces/omrr'
import { OmrrFilter } from '@/interfaces/omrr-filter'
import { OmrrSliceState } from '@/features/omrr/omrr-slice'
import { extractPostalCode, isDigits, isPostalCodeStart } from '@/utils/utils'

/**
 * Filters items by authorization status (all, active, inactive)
 */
const authorizationStatusFilter = (item: OmrrData, status: string): boolean => {
  if (status === 'inactive' || status === 'active') {
    return item['Authorization Status']?.toLowerCase() === status
  }
  return true
}

export function filterByAuthorizationState(state: OmrrSliceState): OmrrData[] {
  const { allResults, searchBy } = state
  return allResults.filter((item) => authorizationStatusFilter(item, searchBy))
}

export const MIN_SEARCH_LENGTH = 3

export type OmrrSortOptions = MatchSorterOptions<OmrrData> & {
  keys: (keyof OmrrData)[]
}
export const DEFAULT_SORT_OPTIONS: OmrrSortOptions = {
  keys: ['Regulated Party', 'Facility Location'],
}

/**
 * Filters items based on the search text.
 * It does a special checks for postal codes and authorization number.
 * By default, it will filter the data to keep items that match on the
 * Regulated Party and Facility Location fields.
 *
 * Uses the match-sorter library for filtering and sorting.
 * @https://github.com/kentcdodds/match-sorter
 */
function filterByTextSearch(
  data: OmrrData[],
  searchText: string,
  maxResults = -1,
): OmrrData[] {
  let matchingItems: OmrrData[] = data
  const filterText = searchText.trim().toLowerCase()
  if (filterText.length >= MIN_SEARCH_LENGTH) {
    if (isPostalCodeStart(filterText)) {
      // Match start of the postal code (V#X etc)
      matchingItems = filterByPostalCodeStart(data, filterText)
    } else if (isDigits(filterText)) {
      // Match start of Authorization Number
      matchingItems = filterByAuthorizationNumberStart(data, filterText)
    } else {
      // Match by Regulated Party or Facility Location
      matchingItems = matchSorter(data, filterText, DEFAULT_SORT_OPTIONS)
    }
    if (maxResults > 0 && matchingItems.length > maxResults) {
      matchingItems = matchingItems.slice(0, maxResults)
    }
  }
  return matchingItems
}

/**
 * Filters items based on one field in the OmrrData object.
 */
const ommrDataFieldFilter = (
  item: OmrrData,
  field: keyof OmrrData,
  value: string,
): boolean => item[field]?.toString()?.toLowerCase() === value

/**
 * Applies all the filters that are currently on.
 */
function applyFilters(item: OmrrData, filters: OmrrFilter[]): boolean {
  // Only include enabled and active filters
  const activeFilters = filters.filter(({ on, disabled }) => on && !disabled)
  // If there are no filters - then include the item
  if (activeFilters.length === 0) {
    return true
  }
  // Test if the item passes the filter
  return activeFilters.some(({ field, value }: OmrrFilter) =>
    ommrDataFieldFilter(item, field, value),
  )
}

/**
 * Filter the results by facility type and by global text search
 */
export function filterData(state: OmrrSliceState): OmrrData[] {
  const { searchByFilteredResults, filters, searchTextFilter } = state
  // Iterate through the results and apply the filters
  let filteredData: OmrrData[] = searchByFilteredResults.filter(
    (item: OmrrData) => applyFilters(item, filters),
  )
  // Now apply global text search
  filteredData = filterByTextSearch(filteredData, searchTextFilter)
  return filteredData
}

/**
 * Filters the input array to return any matching items that have a postal code
 * that starts with the inputText string.
 */
function filterByPostalCodeStart(
  data: OmrrData[],
  inputText: string,
): OmrrData[] {
  let inputPostalCode = inputText.toUpperCase()
  if (inputPostalCode.length > 3 && inputPostalCode.charAt(3) !== ' ') {
    // Insert space in the middle if missing
    inputPostalCode = `${inputPostalCode.substring(0, 3)} ${inputPostalCode.substring(3)}`
  }
  return data.filter((item: OmrrData) => {
    const postalCode = item['Postal Code']
    return postalCode ? postalCode.startsWith(inputPostalCode) : false
  })
}

/**
 * Filters the input array to return any matching items that have an
 * Authorization Number that starts with the given inputText.
 */
function filterByAuthorizationNumberStart(
  data: OmrrData[],
  // This will be a number in string form
  inputText: string,
): OmrrData[] {
  return data.filter((item: OmrrData) =>
    String(item['Authorization Number']).startsWith(inputText),
  )
}

/**
 * Converts all string [Yes|Y|No|N] values into proper booleans.
 * Removes null and undefined values.
 * Attempts to extract the postal code from the Facility Location field.
 */
export function convertData(data: OmrrData[]): OmrrData[] {
  return data.map((original) => {
    const address = original['Facility Location']
    const item: OmrrData = {
      ...original,
      // Extract postal code from the address if possible
      'Postal Code': extractPostalCode(address),
    }

    // Remove null/undefined values, and convert booleans
    let key: keyof typeof item
    for (key in item) {
      const value = item[key]
      if (value === undefined || value === null) {
        delete item[key]
      } else if (value === 'Y' || value === 'Yes') {
        // @ts-ignore
        item[key] = true
      } else if (value === 'N' || value === 'No') {
        // @ts-ignore
        item[key] = false
      }
    }
    return item
  })
}
