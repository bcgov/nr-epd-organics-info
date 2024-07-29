import { useSelector } from 'react-redux'
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

import { RootState } from '@/app/store'
import { LoadingStatusType } from '@/interfaces/loading-status'
import apiService from '@/service/api-service'
import {
  OmrrAuthzDocs,
  OmrrAuthzDocsResponse,
} from '@/interfaces/omrr-documents'

export const fetchOmrrDocuments = createAsyncThunk(
  'data/fetchOmrrDocuments',
  async () => {
    const result = await apiService
      .getAxiosInstance()
      .get('/omrr/authorization-docs')
    return result?.data
  },
)

export interface DocumentsSliceState {
  status: LoadingStatusType
  error?: string
  allDocuments: OmrrAuthzDocsResponse[]
}

export const initialState: DocumentsSliceState = {
  status: 'idle',
  error: undefined,
  allDocuments: [],
}

export const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DocumentsSliceState>) => {
    builder.addCase(fetchOmrrDocuments.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(
      fetchOmrrDocuments.fulfilled,
      (state, action: PayloadAction<OmrrAuthzDocsResponse[]>) => {
        const data: OmrrAuthzDocsResponse[] = action.payload
        if (Array.isArray(data) && data.length > 0) {
          state.status = 'succeeded'
          state.allDocuments = data
        } else {
          state.status = 'failed'
          state.error = 'No data found'
          console.log('No authorization documents loaded.')
        }
      },
    )
    builder.addCase(fetchOmrrDocuments.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
      console.error(
        'Failed to load authorization documents',
        action.error.message,
      )
    })
  },
})

// Selectors
export const selectStatus = (state: RootState) => state.documents.status
export const useDocumentsStatus = () => useSelector(selectStatus)

export const selectAllDocuments = (state: RootState) =>
  state.documents.allDocuments

export const useFindAuthorizationDocuments = (
  authorizationNumber: number,
): OmrrAuthzDocs[] | undefined => {
  const allDocuments = useSelector(selectAllDocuments)
  if (authorizationNumber > 0) {
    const response = allDocuments.find(
      (response: OmrrAuthzDocsResponse) =>
        response['Authorization Number'] === authorizationNumber,
    )
    if (response) {
      return response.doc_links
    }
  }
  return undefined
}
