import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { omrrSlice } from '@/features/omrr/omrr-slice'

const rootReducer = combineReducers({
  omrr: omrrSlice.reducer,
})

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export const store = setupStore()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
