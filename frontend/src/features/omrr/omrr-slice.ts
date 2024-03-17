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
export interface OmrrSliceState {
  value: OmrrData[]
  status: 'idle' | 'loading' | 'failed' | 'succeeded'
  error: string | null | undefined | object
  mapValue: OmrrData[],
  filteredValue: OmrrData[],
  mapPopupValue: any[],
  searchBy: string | null
  expand: boolean,
  location: Location | null,
  omrrFilter: boolean,
  permitFilter: boolean,
  approvalFilter: boolean,
  operationalCertificateFilter: boolean,
  compostFacilityFilter: boolean,
  landApplicationBioSolidsFilter: boolean,
  page: number
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
  mapValue: [],
  mapPopupValue: [],
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
      switch (action.payload) {
        case 'all':
          state.filteredValue = state.value
          break
        case 'inactive':
          state.filteredValue = state.value.filter(
            (item: OmrrData) => item['Authorization Status'] === 'Inactive',
          )
          break
        case 'active':
          state.filteredValue = state.value.filter(
            (item: OmrrData) => item['Authorization Status'] === 'Active',
          )
          break
        default:
          state.filteredValue = state.value
          break

      }
    },
    setFilters: (state, action: PayloadAction<string>) => {
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
        state.landApplicationBioSolidsFilter = !state.landApplicationBioSolidsFilter
      }
    },
    resetFilters: (state) => {
      state.omrrFilter = false
      state.permitFilter = false
      state.approvalFilter = false
      state.operationalCertificateFilter = false
      state.compostFacilityFilter = false
      state.landApplicationBioSolidsFilter = false
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
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
      state.mapValue = state.value?.filter(
        (item: OmrrData) => item.Latitude && item.Longitude,
      )
      state.mapPopupValue = state.mapValue?.map((item: OmrrData) => {
        return {
          position: [item?.Latitude, item?.Longitude],
          details: {
            'Authorization Number': item['Authorization Number'],
            'Authorization Type': item['Authorization Type'],
            'Operation Type': item['Operation Type'],
            'Authorization Status': item['Authorization Status'],
            'Regulated Party': item['Regulated Party'],
            'Facility Location': item['Facility Location'],
          },
        }
      })
      state.filteredValue = state.value
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
export const { setOmrrData, setFilters,setExpand,setLocation,setSearchBy, resetFilters, setPage } = omrrSlice.actions
export default omrrSlice.reducer
