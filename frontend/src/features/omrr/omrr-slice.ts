import { useSelector } from 'react-redux'
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { LatLngTuple } from 'leaflet'
import { useLocation } from 'react-router-dom'
import rfdc from 'rfdc'

import { RootState } from '@/app/store'
import { MIN_CIRCLE_RADIUS, MIN_SEARCH_LENGTH } from '@/constants/constants'
import { LoadingStatusType } from '@/interfaces/loading-status'
import OmrrData from '@/interfaces/omrr'
import { facilityTypeFilters, OmrrFilter } from '@/interfaces/omrr-filter'
import { SEARCH_BY_ACTIVE } from '@/interfaces/types'
import OmrrResponse from '@/interfaces/omrr-response'
import apiService from '@/service/api-service'
import { shortDateFormat } from '@/utils/utils'
import {
  convertData,
  filterByAuthorizationStatus,
  filterData,
  flattenFilters,
} from './omrr-utils'

const deepClone = rfdc({ circles: true })

export const fetchOMRRData = createAsyncThunk(
  'data/fetchOMRRRecords',
  async () => {
    const result = await apiService.getAxiosInstance().get('/omrr')
    return result?.data
  },
)

export interface OmrrSliceState {
  lastModified: string
  status: LoadingStatusType
  error: string | null | undefined | object
  page: number
  searchBy: string
  filters: OmrrFilter[]
  userLocation?: LatLngTuple
  allResults: OmrrData[]
  searchByFilteredResults: OmrrData[]
  filteredResults: OmrrData[]
  searchTextFilter: string
  // The timestamp when the user last performed a search or filter, this is
  // used to expand the search results & clear selected item when it changes
  lastSearchTime?: number
  pointFilterCenter?: LatLngTuple
  pointFilterRadius: number
  pointFilterFinished: boolean
  polygonFilterPositions: LatLngTuple[]
  polygonFilterFinished: boolean
}

export const initialState: OmrrSliceState = {
  lastModified: '',
  // The status of the API call
  status: 'idle',
  // The error message if any
  error: null,
  page: 1,
  searchBy: SEARCH_BY_ACTIVE,
  // Array of filters to keep track of which are on and which are disabled
  filters: [...facilityTypeFilters],
  // Set to the user's location when they want to sort results by closest facilities
  userLocation: undefined,
  // The data array containing all results
  allResults: [],
  // results filtered by the search by value
  searchByFilteredResults: [],
  // final filtered results
  filteredResults: [],
  // global search text value
  searchTextFilter: '',
  // The point filter is active when the center point is defined
  pointFilterCenter: undefined,
  pointFilterRadius: MIN_CIRCLE_RADIUS,
  pointFilterFinished: false,
  // The polygon filter is active when finished is true
  polygonFilterPositions: [],
  polygonFilterFinished: false,
}

function performSearch(state: OmrrSliceState, setSearchTime = true) {
  state.filteredResults = filterData(state)
  state.page = 1
  if (setSearchTime) {
    state.lastSearchTime = Date.now()
  }
}

export const omrrSlice = createSlice({
  name: 'omrr',
  initialState,
  reducers: {
    setSearchBy: (state, action: PayloadAction<string>) => {
      state.searchBy = action.payload
      // Save the search by filtered results to speed up filtering
      state.searchByFilteredResults = filterByAuthorizationStatus(state)
      performSearch(state)
    },
    updateFilter: (state, action: PayloadAction<OmrrFilter>) => {
      const filter = action.payload
      const newOn = !filter.on

      // Need to deep clone the filters since one or more are changing
      const newFilters = deepClone(state.filters)

      // New array but same filter objects
      const flatFilters = flattenFilters(newFilters)
      // Go through all filters to find the one that is changing
      flatFilters.some((f) => {
        if (f.value === filter.value) {
          f.on = newOn
          // Update any nested filters - set the on and disabled fields
          if (Array.isArray(f.nestedFilters)) {
            f.nestedFilters.forEach((nf) => {
              // Turn it off if parent filter is off
              if (!newOn) {
                nf.on = false
              }
              // Disable it off if parent filter is off
              nf.disabled = !newOn
            })
          }
        }
      })

      state.filters = newFilters
      performSearch(state)
    },
    resetFilters: (state) => {
      state.filters = [...facilityTypeFilters]
      performSearch(state)
    },
    setUserLocation: (
      state,
      action: PayloadAction<LatLngTuple | undefined>,
    ) => {
      state.userLocation = action.payload
      performSearch(state)
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setSearchTextFilter: (state, action: PayloadAction<string>) => {
      const oldText = state.searchTextFilter
      const newText = action.payload
      state.searchTextFilter = newText
      // Only perform the search when the search text changes AND
      // when there are now 3+ characters or when there was 3+ characters
      // This prevents doing the search extra times when only 0-2 characters
      const hasSearchChanged =
        oldText !== newText &&
        (newText.length >= MIN_SEARCH_LENGTH ||
          oldText.length >= MIN_SEARCH_LENGTH)
      if (hasSearchChanged) {
        performSearch(state)
      }
    },
    addPolygonFilterPosition: (state, action: PayloadAction<LatLngTuple>) => {
      // Adds a new polygon position, but don't perform search
      state.polygonFilterPositions = [
        ...state.polygonFilterPositions,
        action.payload,
      ]
    },
    deleteLastPolygonFilterPosition: (state) => {
      // Removes the last polygon position
      if (state.polygonFilterPositions.length > 0) {
        const newPositions = [...state.polygonFilterPositions]
        newPositions.pop()
        state.polygonFilterPositions = newPositions
      }
    },
    resetPolygonFilter: (state) => {
      // Resets the polygon filter, also performs the search again
      state.polygonFilterPositions = []
      if (state.polygonFilterFinished) {
        state.polygonFilterFinished = false
        performSearch(state, false)
      }
    },
    setPolygonFilterFinished: (state) => {
      // Marks the polygon filter as finished, and performs the search
      if (!state.polygonFilterFinished) {
        state.polygonFilterFinished = true
        // Reset point filter
        state.pointFilterCenter = undefined
        state.pointFilterRadius = MIN_CIRCLE_RADIUS
        performSearch(state)
      }
    },
    setPointFilterCenter: (state, action: PayloadAction<LatLngTuple>) => {
      state.pointFilterCenter = action.payload
      // Reset polygon filter
      state.polygonFilterPositions = []
      state.polygonFilterFinished = false
      performSearch(state)
    },
    setPointFilterRadius: (state, action: PayloadAction<number>) => {
      const newRadius = action.payload
      if (newRadius !== state.pointFilterRadius) {
        state.pointFilterRadius = newRadius
        // Only perform the search when there is a center point
        if (state.pointFilterCenter) {
          // Reset polygon filter
          state.polygonFilterPositions = []
          state.polygonFilterFinished = false
          performSearch(state)
        }
      }
    },
    resetPointFilter: (state) => {
      state.pointFilterRadius = MIN_CIRCLE_RADIUS
      state.pointFilterFinished = false
      if (state.pointFilterCenter) {
        state.pointFilterCenter = undefined
        performSearch(state, false)
      }
    },
    clearShapeFilters: (state) => {
      state.polygonFilterPositions = []
      state.pointFilterRadius = MIN_CIRCLE_RADIUS
      // Only perform search if either of these were set
      if (state.polygonFilterFinished || state.pointFilterCenter) {
        state.polygonFilterFinished = false
        state.pointFilterCenter = undefined
        performSearch(state, false)
      }
    },
    setPointFilterFinished: (state) => {
      if (!state.pointFilterFinished && state.pointFilterCenter) {
        state.pointFilterFinished = true
        performSearch(state)
      }
    },
    setPointFilterUnfinished: (state) => {
      if (!state.pointFilterFinished && state.pointFilterCenter) {
        state.pointFilterFinished = false
        performSearch(state)
      }
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<OmrrSliceState>) => {
    // Handle the pending action
    builder.addCase(fetchOMRRData.pending, (state, _action) => {
      state.status = 'loading'
    })
    // Handle the fulfilled action
    builder.addCase(
      fetchOMRRData.fulfilled,
      (state, action: PayloadAction<OmrrResponse>) => {
        // Make sure the data array is valid
        const { lastModified, omrrData: data } = action.payload || {}
        if (Array.isArray(data)) {
          state.status = 'succeeded'
          // format date as MMM D, YYYY
          state.lastModified = shortDateFormat(new Date(lastModified))

          // Cleanup the data and store in the state
          state.allResults = convertData(data)
          state.searchBy = SEARCH_BY_ACTIVE
          state.searchByFilteredResults = filterByAuthorizationStatus(state)
          // Don't set the last search time since this is the initial load
          performSearch(state, false)
        } else {
          state.status = 'failed'
          state.error = 'No data found'
        }
      },
    )
    // Handle the rejected action
    builder.addCase(fetchOMRRData.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  },
})

export const {
  updateFilter,
  setSearchBy,
  resetFilters,
  setUserLocation,
  setPage,
  setSearchTextFilter,
  addPolygonFilterPosition,
  deleteLastPolygonFilterPosition,
  resetPolygonFilter,
  setPolygonFilterFinished,
  setPointFilterCenter,
  setPointFilterRadius,
  resetPointFilter,
  clearShapeFilters,
  setPointFilterFinished,
  setPointFilterUnfinished,
} = omrrSlice.actions

export default omrrSlice.reducer

// Selectors
export const selectStatus = (state: RootState) => state.omrr.status
export const selectError = (state: RootState) => state.omrr.error
export const selectLastModified = (state: RootState) => state.omrr.lastModified
export const selectPage = (state: RootState) => state.omrr.page
export const selectSearchBy = (state: RootState) => state.omrr.searchBy
export const useSearchBy = () => useSelector(selectSearchBy)

export const selectFilters = (state: RootState) => state.omrr.filters
export const useFilters = () => useSelector(selectFilters)
export const useHasFiltersOn = () =>
  flattenFilters(useFilters()).some(({ on, disabled }) => on && !disabled)

export const selectUserLocation = (state: RootState) => state.omrr.userLocation
export const useUserLocation = () => useSelector(selectUserLocation)

export const selectSearchTextFilter = (state: RootState) =>
  state.omrr.searchTextFilter
export const useSearchTextFilter = () => useSelector(selectSearchTextFilter)
export const useHasSearchTextFilter = () =>
  useSearchTextFilter().length >= MIN_SEARCH_LENGTH

export const selectAllResults = (state: RootState) => state.omrr.allResults

export const selectFilteredResults = (state: RootState) =>
  state.omrr.filteredResults
export const selectFilteredResultsCount = (state: RootState) =>
  state.omrr.filteredResults.length
export const useFilteredResults = () => useSelector(selectFilteredResults)

export const useFindByAuthorizationNumber = (
  authorizationNumber: number,
): OmrrData | undefined => {
  const location = useLocation()
  const allResults = useSelector(selectAllResults)
  if (authorizationNumber > 0) {
    // Try to find it in the location state data first
    const locationData = location.state?.data
    if (locationData?.['Authorization Number'] === authorizationNumber) {
      return locationData
    }
    // Fallback to finding the matching item in all the results
    // If someone bookmarks the page then the above state won't be set
    return allResults.find(
      (item: OmrrData) => item['Authorization Number'] === authorizationNumber,
    )
  }
  return undefined
}

const selectLastSearchTime = (state: RootState) => state.omrr.lastSearchTime
export const useLastSearchTime = () => useSelector(selectLastSearchTime)

const selectPolygonFilterPositions = (state: RootState) =>
  state.omrr.polygonFilterPositions
const selectPolygonFilterFinished = (state: RootState) =>
  state.omrr.polygonFilterFinished
export const usePolygonFilterPositions = () =>
  useSelector(selectPolygonFilterPositions)
export const usePolygonFilterFinished = () =>
  useSelector(selectPolygonFilterFinished)

const selectPointFilterCenter = (state: RootState) =>
  state.omrr.pointFilterCenter
const selectPointFilterRadius = (state: RootState) =>
  state.omrr.pointFilterRadius
export const usePointFilterCenter = () => useSelector(selectPointFilterCenter)
export const usePointFilterRadius = () => useSelector(selectPointFilterRadius)

// Add a new selector to check if point filter is active
export const usePointFilterActive = () => {
  return useSelector(
    (state: RootState) => state.omrr.pointFilterCenter !== undefined,
  )
}

export const usePointFilterFinished = () =>
  useSelector((state: RootState) => state.omrr.pointFilterFinished)
