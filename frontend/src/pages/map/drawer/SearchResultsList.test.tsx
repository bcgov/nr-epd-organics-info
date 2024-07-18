import React from 'react'
import { screen } from '@testing-library/react'

import { render } from '@/test-utils'
import { mockOmrrData } from '@/mocks/mock-omrr-data'
import { SearchResultsList } from './SearchResultsList'
import {
  initialState as omrrInitialState,
  OmrrSliceState,
  useFilteredResults,
  useFilters,
  useHasFiltersOn,
  useSearchTextFilter,
} from '@/features/omrr/omrr-slice'
import {
  initialState as mapInitialState,
  MapSliceState,
  useSelectedItem,
} from '@/features/map/map-slice'
import OmrrData from '@/interfaces/omrr'
import { facilityTypeFilters, OmrrFilter } from '@/interfaces/omrr-filter'
import { formatLatOrLng, truncateDate } from '@/utils/utils'
import { SEARCH_BY_ALL } from '@/interfaces/types'

interface State {
  filteredResults: OmrrData[]
  searchTextFilter: string
  filters: OmrrFilter[]
  hasFiltersOn: boolean
  selectedItem?: OmrrData
}

describe('Test suite for SearchResultsList', () => {
  const allResults: OmrrData[] = mockOmrrData

  function renderComponent(
    omrrState: Partial<OmrrSliceState> = {},
    mapState: Partial<MapSliceState> = {},
    pageSize = 2,
  ) {
    // Store the state values which we can test
    const state: State = {
      filteredResults: [],
      searchTextFilter: '',
      filters: [],
      hasFiltersOn: false,
    }

    // Using a test component allows monitoring state changes
    const TestComponent = () => {
      Object.assign(state, {
        filteredResults: useFilteredResults(),
        searchTextFilter: useSearchTextFilter(),
        filters: useFilters(),
        hasFiltersOn: useHasFiltersOn(),
        selectedItem: useSelectedItem(),
      })
      return <SearchResultsList pageSize={pageSize} />
    }

    const { user } = render(<TestComponent />, {
      withRouter: true,
      withStateProvider: true,
      initialState: {
        omrr: {
          ...omrrInitialState,
          searchBy: SEARCH_BY_ALL,
          allResults,
          searchByFilteredResults: [...allResults],
          ...omrrState,
        },
        map: {
          ...mapInitialState,
          ...mapState,
        },
      },
    })

    return { user, state }
  }

  it('should render empty SearchResultsList with search text', async () => {
    const searchTextFilter = 'zzzzzz'
    const { user, state } = renderComponent({ searchTextFilter })

    screen.getByText('There are no matching authorizations.')
    screen.getByRole('list')
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()

    expect(state.filteredResults).toHaveLength(0)
    expect(state.searchTextFilter).toBe(searchTextFilter)

    // There is search text
    const btn = screen.getByRole('button', { name: 'Clear Search Text' })
    expect(screen.queryByText('Reset Filters')).not.toBeInTheDocument()

    // Clear the search text
    await user.click(btn)

    // The search text will be cleared and all results shown
    expect(state.searchTextFilter).toHaveLength(0)
    expect(state.filteredResults).toHaveLength(allResults.length)
    expect(screen.queryByText('Clear Search Text')).not.toBeInTheDocument()
  })

  it('should render empty SearchResultsList with search text and filters', async () => {
    const searchTextFilter = 'zzzzzz'
    const filters = [...facilityTypeFilters]
    filters[0] = { ...filters[0], on: true }
    const { user, state } = renderComponent({ searchTextFilter, filters })

    screen.getByText('There are no matching authorizations.')
    expect(state.filteredResults).toHaveLength(0)
    expect(state.searchTextFilter).toBe(searchTextFilter)
    expect(state.hasFiltersOn).toBe(true)

    // There is search text AND active filters - both buttons showing
    screen.getByRole('button', { name: 'Clear Search Text' })
    const btn = screen.getByRole('button', { name: 'Reset Filters' })
    // Reset filters
    await user.click(btn)

    // Search text will remain set, but filters will be cleared
    expect(state.searchTextFilter).toBe(searchTextFilter)
    expect(state.hasFiltersOn).toBe(false)

    expect(screen.queryByText('Reset Filters')).not.toBeInTheDocument()
    // Clear button is still visible
    screen.getByRole('button', { name: 'Clear Search Text' })
  })

  it('should render SearchResultsList with single item selected', async () => {
    const selectedItem = allResults[0]
    const { user, state } = renderComponent(
      { filteredResults: [...allResults] },
      { selectedItem },
    )

    expect(state.selectedItem).toBe(selectedItem)

    // There should be one listitem
    screen.getByRole('listitem')

    const {
      'Regulated Party': name,
      'Authorization Number': number,
      'Authorization Type': type,
      'Authorization Status': status,
      Latitude: lat,
      Longitude: lng,
      'Facility Location': address,
      'Effective/Issue Date': issueDate,
      'Last Amendment Date': lastDate,
    } = selectedItem

    screen.getByText('Authorization #:')
    screen.getByText(number)
    screen.getByText(name)
    screen.getByText('Authorization Type')
    screen.getByText(type)
    screen.getByText('Status:')
    screen.getByText(status)

    const btn = screen.getByRole('button', { name: 'View Facility Details' })

    // Details
    screen.getByText('Effective/Issue Date')
    screen.getByText(truncateDate(issueDate))
    screen.getByText('Last Amendment Date')
    screen.getByText(truncateDate(lastDate))
    screen.getByText('Facility Location')
    screen.getByText(address)
    screen.getByText('Latitude')
    screen.getByText(formatLatOrLng(lat))
    screen.getByText('Longitude')
    screen.getByText(formatLatOrLng(lng))

    await user.click(btn)
    expect(location.href).toContain(`/authorization/${number}`)
  })

  it('should render SearchResultsList with 3 items', async () => {
    const { user, state } = renderComponent({
      filteredResults: [...allResults],
    })

    expect(state.selectedItem).toBeUndefined()
    expect(state.filteredResults).toHaveLength(3)

    // The first 2 items should be shown (paginated with 2 items per page)
    const [item1, item2, item3] = allResults

    screen.getByText(item1['Regulated Party'])
    screen.getByText(item1['Authorization Number'])
    screen.getByText(item2['Regulated Party'])
    screen.getByText(item2['Authorization Number'])
    // Paginated
    expect(screen.queryByText(item3['Regulated Party'])).not.toBeInTheDocument()

    expect(
      screen.getAllByRole('button', { name: 'View Facility Details' }),
    ).toHaveLength(2)

    // Should be no details
    expect(screen.queryByText('Effective/Issue Date')).not.toBeInTheDocument()
    expect(screen.queryByText('Last Amendment Date')).not.toBeInTheDocument()
    expect(screen.queryByText('Facility Location')).not.toBeInTheDocument()
    expect(screen.queryByText('Latitude')).not.toBeInTheDocument()
    expect(screen.queryByText('Longitude')).not.toBeInTheDocument()

    // Pagination
    // MUI adds aria-label 'page #' attribute on the selected page
    screen.getByRole('button', { name: 'page 1' })
    // MUI adds aria-label 'Go to page #' attribute on non-selected pages
    const pageTwo = screen.getByRole('button', { name: 'Go to page 2' })

    await user.click(pageTwo)

    screen.getByText(item3['Regulated Party'])
    screen.getByText(item3['Authorization Number'])

    screen.getByRole('button', { name: 'View Facility Details' })
  })
})
