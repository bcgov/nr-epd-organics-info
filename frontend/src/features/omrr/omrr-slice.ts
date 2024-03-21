import OmrrData from '@/interfaces/omrr'
import {
  createAsyncThunk,
  PayloadAction,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import apiService from '@/service/api-service'
import { DateTimeFormatter, nativeJs } from '~/@js-joda/core'
import { Location } from '@/interfaces/location'
import { deepClone } from '~/@mui/x-data-grid/utils/utils'
export interface OmrrSliceState {
  value: OmrrData[]
  status: 'idle' | 'loading' | 'failed' | 'succeeded'
  error: string | null | undefined | object
  filteredValue: OmrrData[]
  searchBy: string | null
  expand: boolean
  location: Location | null
  omrrFilter: boolean
  permitFilter: boolean
  approvalFilter: boolean
  operationalCertificateFilter: boolean
  compostFacilityFilter: boolean
  landApplicationBioSolidsFilter: boolean
  page: number
  searchByFilteredValue: OmrrData[]
  globalTextSearchFilter: string
}
export const fetchOMRRData = createAsyncThunk(
  'data/fetchOMRRRecords',
  async () => {
    const result = await apiService.getAxiosInstance().get('/omrr')

    return result.data
  },
)

export const initialState: OmrrSliceState = {
  // The data array
  value: [],
  filteredValue: [],
  // The status of the API call
  status: 'idle',
  // The error message if any
  error: null,
  searchBy: 'all',
  expand: false,
  location: null,
  omrrFilter: false,
  permitFilter: false,
  approvalFilter: false,
  operationalCertificateFilter: false,
  compostFacilityFilter: false,
  landApplicationBioSolidsFilter: false,
  page: 1,
  searchByFilteredValue: [],
  globalTextSearchFilter: '',
}

function filterDataBasedOnDifferentFilters(state: OmrrSliceState) {
  let finalFilteredOMRRList: OmrrData[] = []
  if (
    state.globalTextSearchFilter &&
    state.globalTextSearchFilter?.length > 0
  ) {
    state.filteredValue = state.searchByFilteredValue.filter(
      (item: OmrrData) => {
        return Object.values(item).some((value) => {
          return value
            ?.toLowerCase()
            .includes(state.globalTextSearchFilter.toLowerCase())
        })
      },
    )
  }
  if (state.approvalFilter) {
    const filteredItems = state.filteredValue.filter(
      (item: OmrrData) =>
        item['Authorization Type']?.toLowerCase() === 'approval',
    )
    finalFilteredOMRRList = [...finalFilteredOMRRList, ...filteredItems]
  }
  if (state.omrrFilter) {
    const filteredItems = state.filteredValue.filter(
      (item: OmrrData) => item['Authorization Type']?.toLowerCase() === 'Organic Matter Recycling Regulation'.toLowerCase(),
    )
    finalFilteredOMRRList = [...finalFilteredOMRRList, ...filteredItems]
  }
  if (state.permitFilter) {
    const filteredItems = state.filteredValue.filter(
      (item: OmrrData) =>
        item['Authorization Type']?.toLowerCase() === 'permit',
    )
    finalFilteredOMRRList = [...finalFilteredOMRRList, ...filteredItems]
  }
  if (state.operationalCertificateFilter) {
    const filteredItems = state.filteredValue.filter(
      (item: OmrrData) =>
        item['Authorization Type']?.toLowerCase() === 'operational certificate',
    )
    finalFilteredOMRRList = [...finalFilteredOMRRList, ...filteredItems]
  }
  if (state.compostFacilityFilter) {
    const filteredItems = state.filteredValue.filter(
      (item: OmrrData) =>
        item['Authorization Type']?.toLowerCase() === 'compost facility',
    )
    finalFilteredOMRRList = [...finalFilteredOMRRList, ...filteredItems]
  }
  if (state.landApplicationBioSolidsFilter) {
    const filteredItems = state.filteredValue.filter(
      (item: OmrrData) =>
        item['Authorization Type']?.toLowerCase() ===
        'land application biosolids',
    )
    finalFilteredOMRRList = [...finalFilteredOMRRList, ...filteredItems]
  }
  if (finalFilteredOMRRList.length > 0) {
    state.filteredValue = finalFilteredOMRRList
  }
  // if any of check boxes are checked and there is no data in the finalFilteredOMRRList then we need to show no data found
  if (
    (state.approvalFilter ||
      state.omrrFilter ||
      state.permitFilter ||
      state.operationalCertificateFilter ||
      state.landApplicationBioSolidsFilter ||
      state.compostFacilityFilter) &&
    finalFilteredOMRRList.length === 0
  ) {
    state.filteredValue = []
  }
}

export const omrrSlice = createSlice({
  name: 'omrr',
  initialState,
  reducers: {
    setOmrrData: (state, action: PayloadAction<OmrrData[]>) => {
      state.value = action.payload
    },
    setExpand: (state, action: PayloadAction<boolean>) => {
      state.expand = action.payload
    },
    setLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload
    },
    setSearchBy: (state, action: PayloadAction<string>) => {
      state.searchBy = action.payload
      state.page = 1
      switch (action.payload) {
        case 'all':
          state.searchByFilteredValue = state.value
          state.filteredValue = state.searchByFilteredValue
          filterDataBasedOnDifferentFilters(state)
          break
        case 'inactive':
          state.searchByFilteredValue = state.value.filter(
            (item: OmrrData) => item['Authorization Status'] === 'Inactive',
          )
          state.filteredValue = state.searchByFilteredValue
          filterDataBasedOnDifferentFilters(state)
          break
        case 'active':
          state.searchByFilteredValue = state.value.filter(
            (item: OmrrData) => item['Authorization Status'] === 'Active',
          )
          state.filteredValue = state.searchByFilteredValue
          filterDataBasedOnDifferentFilters(state)
          break
        default:
          state.searchByFilteredValue = deepClone(state.value)
          state.filteredValue = deepClone(state.searchByFilteredValue)
          filterDataBasedOnDifferentFilters(state)
          break
      }
    },
    setFilters: (state, action: PayloadAction<string>) => {
      state.filteredValue = state.searchByFilteredValue
      if (action.payload === 'omrr') {
        state.omrrFilter = !state.omrrFilter
      }
      if (action.payload === 'permit') {
        state.permitFilter = !state.permitFilter
      }
      if (action.payload === 'approval') {
        state.approvalFilter = !state.approvalFilter
      }
      if (action.payload === 'operationalCertificate') {
        state.operationalCertificateFilter = !state.operationalCertificateFilter
      }
      if (action.payload === 'compostFacility') {
        state.compostFacilityFilter = !state.compostFacilityFilter
      }
      if (action.payload === 'landApplicationBioSolids') {
        state.landApplicationBioSolidsFilter =
          !state.landApplicationBioSolidsFilter
      }
      filterDataBasedOnDifferentFilters(state)
    },
    resetFilters: (state) => {
      state.omrrFilter = false
      state.permitFilter = false
      state.approvalFilter = false
      state.operationalCertificateFilter = false
      state.compostFacilityFilter = false
      state.landApplicationBioSolidsFilter = false
      filterDataBasedOnDifferentFilters(state)
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    searchAuthorizationsByGlobalFilter: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.globalTextSearchFilter = action.payload
      state.page = 1
      state.filteredValue = state.searchByFilteredValue
      filterDataBasedOnDifferentFilters(state)
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<OmrrSliceState>) => {
    // Handle the pending action
    builder.addCase(fetchOMRRData.pending, (state, action) => {
      // Set the status to loading
      state.status = 'loading'
    })
    // Handle the fulfilled action
    builder.addCase(fetchOMRRData.fulfilled, (state, action) => {
      console.log('received omrr data')
      // Set the status to succeeded
      state.status = 'succeeded'
      // Store the data in the state

      let omrrData = []
      for (const item of action.payload) {
        const individualData = {
          ...item,
        }
        if (individualData['Effective/Issue Date']) {
          const date = new Date(item['Effective/Issue Date'])
          individualData['Effective/Issue Date'] = nativeJs(date).format(
            DateTimeFormatter.ISO_LOCAL_DATE,
          )
        } else {
          individualData['Effective/Issue Date'] = undefined
        }
        if (item['Last Amendment Date']) {
          const date = new Date(item['Last Amendment Date'])
          individualData['Last Amendment Date'] = nativeJs(date).format(
            DateTimeFormatter.ISO_LOCAL_DATE,
          )
        } else {
          individualData['Last Amendment Date'] = undefined
        }

        omrrData.push(individualData)
      }
      state.value = omrrData
      state.searchByFilteredValue = deepClone(state.value)
      state.filteredValue = deepClone(state.searchByFilteredValue)
    })
    // Handle the rejected action
    builder.addCase(fetchOMRRData.rejected, (state, action) => {
      // Set the status to failed
      state.status = 'failed'
      // Store the error message in the state
      state.error = action.error.message
    })
  },
})
export const omrrData = (state: RootState) => state.omrr.value
export const {
  setOmrrData,
  setFilters,
  setExpand,
  setLocation,
  setSearchBy,
  resetFilters,
  setPage,
  searchAuthorizationsByGlobalFilter,
} = omrrSlice.actions
export default omrrSlice.reducer
