import L, { LatLngTuple } from 'leaflet'
import { matchSorter, MatchSorterOptions } from 'match-sorter'

import { MIN_SEARCH_LENGTH } from '@/constants/constants'
import { OmrrSliceState } from '@/features/omrr/omrr-slice'
import OmrrData, { omrrDataBooleanFields } from '@/interfaces/omrr'
import { OmrrFilter } from '@/interfaces/omrr-filter'
import {
  extractPostalCode,
  isDigits,
  isPostalCodeStart,
  truncateDate,
} from '@/utils/utils'
import { distanceTo, isPointInsidePolygon } from '@/utils/map-utils'

/**
 * Filters items by authorization status (all, active, inactive)
 */
const authorizationStatusFilter = (item: OmrrData, status: string): boolean => {
  if (status === 'inactive' || status === 'active') {
    return item['Authorization Status']?.toLowerCase() === status
  }
  return true
}

export function filterByAuthorizationStatus(state: OmrrSliceState): OmrrData[] {
  const { allResults, searchBy } = state
  return allResults.filter((item) => authorizationStatusFilter(item, searchBy))
}

type OmrrSortOptions = MatchSorterOptions<OmrrData> & {
  keys: (keyof OmrrData)[]
}
const DEFAULT_SORT_OPTIONS: OmrrSortOptions = {
  keys: ['Regulated Party', 'Facility Location'],
  // Remove simple matches and acronyms as they are a bit too
  // confusing to understand why something matches
  threshold: matchSorter.rankings.CONTAINS,
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
function dataFieldFilter(
  item: OmrrData,
  field: keyof OmrrData,
  value: string,
  startsWith: boolean,
  ignoreCase = true,
): boolean {
  let string = item[field]?.toString() ?? ''
  if (ignoreCase) {
    string = string.toLowerCase()
    value = value.toLowerCase()
  }
  return startsWith ? string.startsWith(value) : string === value
}

/**
 * Applies all the filters that are currently on.
 * If no filters are on, then true is returned.
 * Also applies any nested filters.
 */
function applyFilters(item: OmrrData, filters: OmrrFilter[]): boolean {
  // Only include enabled and active filters
  const activeFilters = filters.filter(({ on, disabled }) => on && !disabled)
  // If there are no filters - then include the item
  if (activeFilters.length === 0) {
    return true
  }
  // Test if the item passes the filter
  return activeFilters.some(
    ({ field, value, startsWith = false, nestedFilters }: OmrrFilter) => {
      let pass = dataFieldFilter(item, field, value, startsWith)
      // Iterate over nested filters too
      if (pass && Array.isArray(nestedFilters)) {
        pass = applyFilters(item, nestedFilters)
      }
      return pass
    },
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
  // Apply polygon or point filters
  if (state.polygonFilterFinished) {
    const positions = state.polygonFilterPositions
    filteredData = filterDataInsidePolygon(filteredData, positions)
  } else if (state.pointFilterCenter) {
    const center = state.pointFilterCenter
    const radius = state.pointFilterRadius
    filteredData = filterDataInsideCircle(filteredData, center, radius)
  }
  // Sort data by closest to user's location
  if (state.userLocation) {
    filteredData = sortDataByPosition(filteredData, state.userLocation)
  }

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
 * Filters the data points that are within the given radius, and sorts by closest to the position.
 */
function filterAndSortByDistance(
  data: OmrrData[],
  position: LatLngTuple,
  radius: number | undefined = undefined,
): OmrrData[] {
  const latlng = L.latLng(position)
  // Cache the distance calculations
  const map = new Map<OmrrData, number>()
  // Calculate the distance (in meters) between the position and the given item
  const getDistance = (item: OmrrData) => {
    let distance = map.get(item)
    if (distance === undefined) {
      distance = distanceTo(latlng, [item.Latitude, item.Longitude])
      map.set(item, distance)
    }
    return distance
  }

  let newData: OmrrData[] = [...data]

  // Filter data that is within the given radius
  if (radius !== undefined && radius > 0) {
    newData = newData.filter((item: OmrrData) => {
      const distance = getDistance(item)
      return distance <= radius
    })
  }

  // Sort by closest to position
  newData.sort((item1, item2) => {
    const dist1 = getDistance(item1)
    const dist2 = getDistance(item2)
    return dist1 - dist2
  })
  return newData
}

/**
 * Creates a new array and sorts it by the distance away from the given position,
 * the closest items are first in the array.
 */
function sortDataByPosition(
  data: OmrrData[],
  position: LatLngTuple,
): OmrrData[] {
  return filterAndSortByDistance(data, position)
}

/**
 * Filters the data points that are within the given radius from the center point.
 */
export function filterDataInsideCircle(
  data: OmrrData[],
  center: LatLngTuple,
  radius: number,
): OmrrData[] {
  return filterAndSortByDistance(data, center, radius)
}

export function filterDataInsidePolygon(
  data: OmrrData[],
  positions: LatLngTuple[],
): OmrrData[] {
  return data.filter((item: OmrrData) =>
    isPointInsidePolygon([item.Latitude, item.Longitude], positions),
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
    const lastAmendmentDate = original['Last Amendment Date']
    const item: OmrrData = {
      ...original,
      // Remove the time portion of the dates
      'Effective/Issue Date': truncateDate(original['Effective/Issue Date']),
      'Last Amendment Date': lastAmendmentDate
        ? truncateDate(lastAmendmentDate)
        : undefined,
      // Extract postal code from the address if possible
      'Postal Code': extractPostalCode(address),
    }

    // Remove null/undefined values, and convert booleans
    let key: keyof typeof item
    for (key in item) {
      const value = item[key]
      if (value === undefined || value === null) {
        delete item[key]
      } else if (
        omrrDataBooleanFields.includes(key) &&
        typeof value === 'string'
      ) {
        // @ts-ignore convert Yes and No values into booleans
        item[key] = value === 'Yes'
      }
    }
    return item
  })
}

/**
 * Creates a flat array of filters that includes any nested filters
 * (only one level deep).
 */
export function flattenFilters(filters: OmrrFilter[]): OmrrFilter[] {
  const allFilters: OmrrFilter[] = []
  filters.forEach((f) => {
    allFilters.push(f)
    if (Array.isArray(f.nestedFilters)) {
      f.nestedFilters.forEach((nf) => {
        allFilters.push(nf)
      })
    }
  })
  return allFilters
}
