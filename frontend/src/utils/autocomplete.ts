import OmrrData from '@/interfaces/omrr'
import { SearchOption } from '@/interfaces/search-option'
import { MIN_SEARCH_LENGTH } from '@/features/omrr/omrr-utils'
import { isPostalCodeStart } from '@/utils/utils'

/**
 * Creates autocomplete options for the given OmrrData items.
 * Optionally limits the number of options to return.
 */
export function getAutocompleteOptions(
  data: OmrrData[],
  searchText: string,
  maxOptions = -1,
): SearchOption[] {
  let options: SearchOption[] = []
  const filterText = searchText.trim().toLowerCase()
  if (filterText.length >= MIN_SEARCH_LENGTH) {
    const isPostalCode = isPostalCodeStart(filterText)

    let matchingItems = data
    if (maxOptions >= 1 && data.length > maxOptions) {
      matchingItems = data.slice(0, maxOptions)
    }

    // Convert into search options, remove duplicates
    const seen = new Set<string>()
    matchingItems.forEach((item: OmrrData) => {
      const {
        'Authorization Number': number,
        'Regulated Party': name,
        'Postal Code': postalCode = '',
      } = item
      if (isPostalCode) {
        const id = `postalCode-${postalCode}`
        if (!seen.has(id)) {
          seen.add(id)
          options.push({
            id,
            text: postalCode,
            item,
            matchType: 'postalCode',
          })
        }
      }
      // Also add the facilities
      const id = `name-${number}`
      if (!seen.has(id)) {
        seen.add(id)
        options.push({
          id,
          text: name,
          item,
          matchType: 'name',
        })
      }
    })

    // Sort options - names first, postal codes second
    options.sort((o1, o2) => {
      return o1.matchType.localeCompare(o2.matchType)
    })
    // Limit number of options again
    if (options.length > maxOptions) {
      options = options.slice(0, maxOptions)
    }
  }
  return options
}
