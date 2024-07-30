import { useSelector } from 'react-redux'
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

import { RootState } from '@/app/store'
import { LoadingStatusType } from '@/interfaces/loading-status'
import { OmrrApplicationStatus } from '@/interfaces/omrr-application-status'
import apiService from '@/service/api-service'
import { truncateDate } from '@/utils/utils'

export const fetchOmrrApplicationStatus = createAsyncThunk(
  'data/fetchOmrrApplicationStatus',
  async () => {
    const result = await apiService
      .getAxiosInstance()
      .get('/omrr/application-status')
    return result?.data
  },
)

export interface ApplicationsSliceState {
  status: LoadingStatusType
  error?: string
  allApplications: OmrrApplicationStatus[]
}

export const initialState: ApplicationsSliceState = {
  status: 'idle',
  error: undefined,
  allApplications: [],
}

export const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ApplicationsSliceState>) => {
    builder.addCase(fetchOmrrApplicationStatus.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(
      fetchOmrrApplicationStatus.fulfilled,
      (state, action: PayloadAction<OmrrApplicationStatus[]>) => {
        const data: OmrrApplicationStatus[] = action.payload
        if (Array.isArray(data) && data.length > 0) {
          state.status = 'succeeded'
          state.allApplications = data.map(
            (appStatus): OmrrApplicationStatus => ({
              ...appStatus,
              'Received Date': truncateDate(appStatus['Received Date']),
            }),
          )
        } else {
          state.status = 'failed'
          state.error = 'No data found'
          console.error('Failed to load application statuses', 'No data found')
        }
      },
    )
    builder.addCase(fetchOmrrApplicationStatus.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
      console.error('Failed to load application statuses', action.error.message)
    })
  },
})

// Selectors
export const selectStatus = (state: RootState) => state.applications.status
//export const selectError = (state: RootState) => state.applicationStatus.error
export const selectAllApplications = (state: RootState) =>
  state.applications.allApplications

// Find all applications by authorization number
export const useFindApplications = (
  authorizationNumber: number,
): OmrrApplicationStatus[] => {
  const allApplications = useSelector(selectAllApplications)
  if (authorizationNumber > 0) {
    return allApplications.filter(
      (item: OmrrApplicationStatus) =>
        item['Authorization Number'] === authorizationNumber,
    )
  }
  return []
}
