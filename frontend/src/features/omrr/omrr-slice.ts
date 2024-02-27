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

export interface OmrrSliceState {
  value: OmrrData[]
  status: 'idle' | 'loading' | 'failed' | 'succeeded'
  error: string | null | undefined | object
  mapValue: OmrrData[]
  mapPopupValue: any[]
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
  mapValue: [],
  mapPopupValue: [],
  // The status of the API call
  status: 'idle',
  // The error message if any
  error: null,
}

export const omrrSlice = createSlice({
  name: 'omrr',
  initialState,
  reducers: {
    setOmrrData: (state, action: PayloadAction<OmrrData[]>) => {
      state.value = action.payload
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
export const { setOmrrData } = omrrSlice.actions
export default omrrSlice.reducer
