import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { fetchOMRRData, omrrSlice } from '@/features/omrr/omrr-slice'
import { mapSlice } from '@/features/map/map-slice'
import {
  applicationsSlice,
  fetchOmrrApplicationStatus,
} from '@/features/omrr/applications-slice'
import {
  documentsSlice,
  fetchOmrrDocuments,
} from '@/features/omrr/documents-slice'

const rootReducer = combineReducers({
  omrr: omrrSlice.reducer,
  applications: applicationsSlice.reducer,
  documents: documentsSlice.reducer,
  map: mapSlice.reducer,
})

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export const store = setupStore()

// Load initial data from the API
export function loadApiData() {
  store.dispatch(fetchOMRRData())
  store.dispatch(fetchOmrrApplicationStatus())
  store.dispatch(fetchOmrrDocuments())
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
