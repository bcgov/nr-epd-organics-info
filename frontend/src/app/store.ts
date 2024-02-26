import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/features/counter/counter-slice'
import { omrrSlice } from '@/features/omrr/omrr-slice'
export const store = configureStore({
  reducer: { counter: counterReducer, omrr: omrrSlice.reducer},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
