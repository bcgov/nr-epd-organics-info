import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

import OmrrData from '@/interfaces/omrr'
import apiService from '@/service/api-service'
import { Location } from '@/interfaces/location'
import {
  AUTH_TYPE_COMPOST_FACILITY,
  AUTH_TYPE_LAND_APPLICATION,
  AUTH_TYPE_NOTIFICATION,
  facilityTypeFilters,
  OmrrFilter,
} from '@/interfaces/omrr-filter'
import { SEARCH_BY_ACTIVE } from '@/interfaces/types'
import OmrrResponse from '@/interfaces/omrr-response'
import {
  convertData,
  filterByAuthorizationState,
  filterData,
} from './omrr-utils'
import { shortDateFormat } from '@/utils/utils'

export interface OmrrSliceState {
  lastModified: string
  status: 'idle' | 'loading' | 'failed' | 'succeeded'
  error: string | null | undefined | object
  expand: boolean
  location: Location | null
  page: number
  searchBy: string
  filters: OmrrFilter[]
  allResults: OmrrData[]
  searchByFilteredResults: OmrrData[]
  filteredResults: OmrrData[]
  searchTextFilter: string
}

export const fetchOMRRData = createAsyncThunk(
  'data/fetchOMRRRecords',
  async () => {
    const result = await apiService.getAxiosInstance().get('/omrr')
    return result?.data
  },
)

export const initialState: OmrrSliceState = {
  lastModified: '',
  // The status of the API call
  status: 'idle',
  // The error message if any
  error: null,
  expand: false,
  location: null,
  page: 1,
  searchBy: SEARCH_BY_ACTIVE,
  // Array of filters to keep track of which are on and which are disabled
  filters: [...facilityTypeFilters],
  // The data array containing all results
  allResults: [],
  // results filtered by the search by value
  searchByFilteredResults: [],
  // final filtered results
  filteredResults: [],
  // global search text value
  searchTextFilter: '',
}

export const omrrSlice = createSlice({
  name: 'omrr',
  initialState,
  reducers: {
    setExpand: (state, action: PayloadAction<boolean>) => {
      state.expand = action.payload
    },
    setLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload
    },
    setSearchBy: (state, action: PayloadAction<string>) => {
      state.searchBy = action.payload
      // Save the search by filtered results to speed up filtering
      state.searchByFilteredResults = filterByAuthorizationState(state)
      state.filteredResults = filterData(state)
      state.page = 1
    },
    updateFilter: (state, action: PayloadAction<OmrrFilter>) => {
      const filter = action.payload
      const isNotification = filter.value === AUTH_TYPE_NOTIFICATION
      const newOn = !filter.on

      state.filters = state.filters.map((f) => {
        // Update the one filter that changed - need to clone the object
        if (filter.value === f.value) {
          return {
            ...f,
            on: newOn,
          }
        }
        // Update the two filters that depend on the notification filter changing
        if (
          isNotification &&
          (f.value === AUTH_TYPE_COMPOST_FACILITY ||
            f.value === AUTH_TYPE_LAND_APPLICATION)
        ) {
          return {
            ...f,
            // Turn it off if notification filter is off
            on: newOn ? f.on : false,
            // Disable it off if notification filter is off
            disabled: !newOn,
          }
        }
        return f
      })

      state.filteredResults = filterData(state)
      state.page = 1
    },
    resetFilters: (state) => {
      state.filters = [...facilityTypeFilters]
      state.filteredResults = filterData(state)
      state.page = 1
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    searchAuthorizationsByTextFilter: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.searchTextFilter = action.payload
      state.filteredResults = filterData(state)
      state.page = 1
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
          state.searchByFilteredResults = filterByAuthorizationState(state)
          state.filteredResults = filterData(state)
          state.page = 1
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
      state.allResults = []
    })
  },
})

export const {
  updateFilter,
  setExpand,
  setLocation,
  setSearchBy,
  resetFilters,
  setPage,
  searchAuthorizationsByTextFilter,
} = omrrSlice.actions

export default omrrSlice.reducer
