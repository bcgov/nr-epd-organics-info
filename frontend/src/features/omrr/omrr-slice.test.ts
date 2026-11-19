import { configureStore } from '@reduxjs/toolkit'
import { LatLngTuple } from 'leaflet'

import omrrReducer, {
  addPolygonFilterPosition,
  clearShapeFilters,
  deleteLastPolygonFilterPosition,
  fetchOMRRData,
  initialState,
  resetFilters,
  resetPointFilter,
  resetPolygonFilter,
  setPage,
  setPointFilterCenter,
  setPointFilterFinished,
  setPointFilterRadius,
  setPointFilterUnfinished,
  setPolygonFilterFinished,
  setSearchBy,
  setSearchTextFilter,
  setUserLocation,
  updateFilter,
} from './omrr-slice'
import OmrrData from '@/interfaces/omrr'
import { SEARCH_BY_ALL, SEARCH_BY_INACTIVE } from '@/interfaces/types'
import { mockOmrrData } from '@/mocks/mock-omrr-data'
import { mswServer, errorHandlers } from '@/test-setup'

function createOmrrStore() {
  return configureStore({
    reducer: {
      omrr: omrrReducer,
    },
  })
}

const rawRecords: OmrrData[] = [
  {
    ...mockOmrrData[0], // Inactive Notification, 11123, WYNDLOW
    'Effective/Issue Date': '2002-02-04T00:00:00.000Z',
    'Last Amendment Date': '1996-04-11T00:00:00.000Z',
  },
  {
    ...mockOmrrData[3], // Active Notification, 14517, RIVER MEADOW FARMS, Courtenay V9N 7J3
    'Effective/Issue Date': '2003-05-12T00:00:00.000Z',
    'Last Amendment Date': '2003-05-12T00:00:00.000Z',
  },
  {
    ...mockOmrrData[4], // Active Permit, 108485, HALTON RECYCLING, Cache Creek V0H 1K0
    'Effective/Issue Date': '2018-01-16T00:00:00.000Z',
    'Last Amendment Date': undefined,
  },
]

describe('omrrSlice', () => {
  it('fetches OMRR data via thunk and initializes active sorted results', async () => {
    const store = createOmrrStore()

    await store.dispatch(fetchOMRRData())
    const state = store.getState().omrr

    expect(state.status).toBe('succeeded')
    expect(state.allResults.length).toBe(mockOmrrData.length)
    expect(state.lastModified).toBeTruthy()
    expect(state.filteredResults.length).toBeLessThanOrEqual(
      state.allResults.length,
    )
    expect(
      state.filteredResults.every(
        (item) => item['Authorization Status'] === 'Active',
      ),
    ).toBe(true)
  })

  it('sets failed status when fetchOMRRData resolves with invalid payload', () => {
    const state = omrrReducer(
      initialState,
      fetchOMRRData.fulfilled(
        { lastModified: '', omrrData: null as unknown as OmrrData[] },
        'req-1',
        undefined,
      ),
    )

    expect(state.status).toBe('failed')
    expect(state.error).toBe('No data found')
  })

  it('sets failed status when fetchOMRRData fails over HTTP', async () => {
    mswServer.use(...errorHandlers)
    const store = createOmrrStore()

    await store.dispatch(fetchOMRRData())
    const state = store.getState().omrr

    expect(state.status).toBe('failed')
    expect(state.error).toContain('500')
  })

  it('filters by authorization status, text search, postal code, and auth number', () => {
    let state = omrrReducer(
      initialState,
      fetchOMRRData.fulfilled(
        { lastModified: '2026-01-01T00:00:00.000Z', omrrData: rawRecords },
        'req-2',
        undefined,
      ),
    )

    // Defaults to Active only (2 active out of 3: 14517 and 108485)
    expect(state.filteredResults).toHaveLength(2)
    expect(state.allResults[0]?.['Effective/Issue Date']).toBe('2002-02-04')

    // Ignoring search shorter than 3 chars preserves filtered results
    state = omrrReducer(state, setSearchTextFilter('ri'))
    expect(state.filteredResults).toHaveLength(2)

    // Searching by regulated party name narrows results
    state = omrrReducer(state, setSearchTextFilter('river meadow'))
    expect(state.filteredResults).toHaveLength(1)
    expect(state.filteredResults[0]?.['Authorization Number']).toBe(14517)

    // Searching by authorization number prefix
    state = omrrReducer(state, setSearchTextFilter('108'))
    expect(state.filteredResults).toHaveLength(1)
    expect(state.filteredResults[0]?.['Authorization Number']).toBe(108485)

    // Searching by postal code without space normalizes and matches V9N 7J3
    state = omrrReducer(state, setSearchTextFilter('v9n7'))
    expect(state.filteredResults).toHaveLength(1)
    expect(state.filteredResults[0]?.['Authorization Number']).toBe(14517)

    // Switching to Inactive includes authorization 11123 once search is cleared
    state = omrrReducer(state, setSearchTextFilter(''))
    state = omrrReducer(state, setSearchBy(SEARCH_BY_INACTIVE))
    expect(state.filteredResults).toHaveLength(1)
    expect(state.filteredResults[0]?.['Authorization Number']).toBe(11123)

    state = omrrReducer(state, setSearchBy(SEARCH_BY_ALL))
    expect(state.filteredResults).toHaveLength(3)
  })

  it('toggles parent and nested filters and resets filters', () => {
    let state = omrrReducer(
      initialState,
      fetchOMRRData.fulfilled(
        { lastModified: '2026-01-01T00:00:00.000Z', omrrData: rawRecords },
        'req-3',
        undefined,
      ),
    )
    state = omrrReducer(state, setSearchBy(SEARCH_BY_ALL))

    // Enable Notification parent filter (enables nested filters)
    const notificationFilter = state.filters[0]
    state = omrrReducer(state, updateFilter(notificationFilter))
    expect(state.filters[0]?.on).toBe(true)
    expect(
      state.filters[0]?.nestedFilters?.every((nf) => nf.disabled === false),
    ).toBe(true)
    expect(
      state.filteredResults.every(
        (item) => item['Authorization Type'] === 'Notification',
      ),
    ).toBe(true)

    // Disabling parent resets nested on flags too
    const enabledCompostNested = state.filters[0]?.nestedFilters?.[0]
    expect(enabledCompostNested).toBeDefined()
    if (enabledCompostNested) {
      state = omrrReducer(state, updateFilter(enabledCompostNested))
      expect(state.filters[0]?.nestedFilters?.[0]?.on).toBe(true)
    }

    state = omrrReducer(state, updateFilter(state.filters[0]))
    expect(state.filters[0]?.on).toBe(false)
    expect(
      state.filters[0]?.nestedFilters?.every(
        (nf) => nf.on === false && nf.disabled === true,
      ),
    ).toBe(true)

    // Permit filter + resetFilters
    state = omrrReducer(state, updateFilter(state.filters[1]))
    expect(state.filteredResults).toHaveLength(1)
    expect(state.filteredResults[0]?.['Authorization Number']).toBe(108485)

    state = omrrReducer(state, resetFilters())
    expect(state.filteredResults).toHaveLength(3)
  })

  it('applies point/radius, polygon, userLocation proximity sorting, and clearShapeFilters', () => {
    let state = omrrReducer(
      initialState,
      fetchOMRRData.fulfilled(
        { lastModified: '2026-01-01T00:00:00.000Z', omrrData: rawRecords },
        'req-4',
        undefined,
      ),
    )
    state = omrrReducer(state, setSearchBy(SEARCH_BY_ALL))

    const courtenayCenter: LatLngTuple = [
      mockOmrrData[3].Latitude,
      mockOmrrData[3].Longitude,
    ]
    state = omrrReducer(state, setPointFilterCenter(courtenayCenter))
    state = omrrReducer(state, setPointFilterRadius(5000))
    state = omrrReducer(state, setPointFilterFinished())
    expect(state.filteredResults.map((r) => r['Authorization Number'])).toEqual([
      14517,
    ])

    state = omrrReducer(state, setPointFilterUnfinished())
    state = omrrReducer(state, resetPointFilter())
    expect(state.filteredResults).toHaveLength(3)

    // Polygon around Cache Creek facility (108485)
    const lat = mockOmrrData[4].Latitude
    const lng = mockOmrrData[4].Longitude
    state = omrrReducer(state, addPolygonFilterPosition([lat - 0.05, lng - 0.05]))
    state = omrrReducer(state, addPolygonFilterPosition([lat + 0.05, lng - 0.05]))
    state = omrrReducer(state, addPolygonFilterPosition([lat + 0.05, lng + 0.05]))
    state = omrrReducer(state, addPolygonFilterPosition([lat - 0.05, lng + 0.05]))
    state = omrrReducer(state, addPolygonFilterPosition([lat, lng]))
    state = omrrReducer(state, deleteLastPolygonFilterPosition())
    state = omrrReducer(state, setPolygonFilterFinished())

    expect(state.filteredResults.map((r) => r['Authorization Number'])).toEqual([
      108485,
    ])

    state = omrrReducer(state, clearShapeFilters())
    expect(state.filteredResults).toHaveLength(3)

    state = omrrReducer(state, resetPolygonFilter())
    state = omrrReducer(state, setPage(2))
    expect(state.page).toBe(2)

    // User location near Courtenay puts 14517 first
    state = omrrReducer(state, setUserLocation(courtenayCenter))
    expect(state.filteredResults[0]?.['Authorization Number']).toBe(14517)
    expect(state.page).toBe(1)
  })
})
