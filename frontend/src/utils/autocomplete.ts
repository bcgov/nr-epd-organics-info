import { matchSorter } from 'match-sorter'

import OmrrData from '@/interfaces/omrr'
import { SearchOption } from '@/interfaces/search-option'
import { Place } from '@/interfaces/place'
import { MIN_SEARCH_LENGTH } from '@/constants/constants'
import { isDigits, isPostalCodeStart } from '@/utils/utils'

const PLACE_SORT_OPTIONS = {
  keys: ['name'],
}

function getMatchingPlaces(
  places: Place[],
  searchText: string,
  maxPlaces: number,
): SearchOption[] {
  const matchingPlaces: Place[] = matchSorter(
    places,
    searchText,
    PLACE_SORT_OPTIONS,
  )
  return matchingPlaces.slice(0, maxPlaces).map((place: Place) => ({
    // Place name is not unique, need to include the latlng
    id: `place-${place.name}-${place.pos[0]}-${place.pos[1]}`,
    text: place.name,
    place,
    matchType: 'place',
  }))
}

function getMatchingPostalCodes(
  data: OmrrData[],
  maxOptions: number,
): SearchOption[] {
  // Convert into search options, remove duplicates
  const seen = new Set<string>()
  let options: SearchOption[] = []
  data.some((item) => {
    const { 'Postal Code': postalCode = '' } = item
    const id = `postalCode-${postalCode}`
    if (postalCode && !seen.has(id)) {
      seen.add(id)
      options.push({
        id,
        text: postalCode,
        item,
        matchType: 'postalCode',
      })
    }
    // Stop when we've got enough options
    return options.length >= maxOptions
  })
  return options
}

function getMatchingFacilities(
  data: OmrrData[],
  maxOptions: number,
): SearchOption[] {
  // Convert into search options, remove duplicates
  const seen = new Set<string>()
  let options: SearchOption[] = []
  data.some((item) => {
    const { 'Authorization Number': number, 'Regulated Party': name } = item
    const id = `name-${number}`
    if (name && !seen.has(id)) {
      seen.add(id)
      options.push({
        id,
        text: name,
        item,
        matchType: 'name',
      })
    }
    // Stop when we've got enough options
    return options.length >= maxOptions
  })
  return options
}

/**
 * Creates autocomplete options for the given OmrrData items
 * as well as any matching place names.
 * It limits the number of options to return (defaults to 6)
 * of which 3 can either be postal codes or place names.
 */
export function getAutocompleteOptions(
  data: OmrrData[],
  places: Place[],
  searchText: string,
  maxOptions = 6,
  maxPostalCodes = 3,
  maxPlaces = 3,
): SearchOption[] {
  let options: SearchOption[] = []
  const filterText = searchText.trim().toLowerCase()
  if (filterText.length >= MIN_SEARCH_LENGTH) {
    const isPostalCode = isPostalCodeStart(filterText)
    const isAuthNumber = isDigits(filterText)

    // Collect the 3 kinds of options - facilities, postal codes, and places
    const matchingFacilities = getMatchingFacilities(data, maxOptions)
    let matchingPostalCodes: SearchOption[] = []
    let matchingPlaces: SearchOption[] = []
    if (isPostalCode) {
      matchingPostalCodes = getMatchingPostalCodes(data, maxPostalCodes)
    } else if (!isAuthNumber) {
      matchingPlaces = getMatchingPlaces(places, searchText, maxPlaces)
    }

    // Put places and postal codes first, then facilities to ensure they are included
    // Also limit number of options again before sorting
    options = [
      ...matchingPostalCodes,
      ...matchingPlaces,
      ...matchingFacilities,
    ].slice(0, maxOptions)

    // Sort options - names first, then places, postal codes last
    options.sort((o1, o2) => {
      return o1.matchType.localeCompare(o2.matchType)
    })
  }
  return options
}
