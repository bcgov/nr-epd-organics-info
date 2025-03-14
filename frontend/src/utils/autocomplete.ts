import { matchSorter } from 'match-sorter'

import OmrrData from '@/interfaces/omrr'
import { AutocompleteOption } from '@/interfaces/autocomplete-option'
import { Place } from '@/interfaces/place'
import { MIN_SEARCH_LENGTH } from '@/constants/constants'
import { isDigits, isPostalCodeStart } from '@/utils/utils'

const PLACE_SORT_OPTIONS = {
  keys: ['name'],
  // Remove simple matches and acronyms for places to make it less confusing
  // otherwise 'waste' matches 'Newcastle' for example
  threshold: matchSorter.rankings.CONTAINS,
}

function getMatchingPlaces(
  places: Place[],
  searchText: string,
  maxPlaces: number,
): AutocompleteOption[] {
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
): AutocompleteOption[] {
  // Convert into search options, remove duplicates
  const seen = new Set<string>()
  let options: AutocompleteOption[] = []
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
): AutocompleteOption[] {
  // Convert into search options, remove duplicates
  const seen = new Set<string>()
  let options: AutocompleteOption[] = []
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
): AutocompleteOption[] {
  let options: AutocompleteOption[] = []
  const filterText = searchText.trim().toLowerCase()
  if (filterText.length >= MIN_SEARCH_LENGTH) {
    const isPostalCode = isPostalCodeStart(filterText)
    const isAuthNumber = isDigits(filterText)

    // Collect the 3 kinds of options - facilities, postal codes, and places
    const matchingFacilities = getMatchingFacilities(data, maxOptions)
    let matchingPostalCodes: AutocompleteOption[] = []
    let matchingPlaces: AutocompleteOption[] = []
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

    // Sort options - places first, then names, then postal codes last
    options.sort((o1, o2) => {
      const order = { place: 1, name: 2, postalCode: 3 }
      return (order[o1.matchType] || 0) - (order[o2.matchType] || 0)
    })
  }
  return options
}
