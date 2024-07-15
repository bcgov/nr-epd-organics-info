import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface MapState {
  isMyLocationVisible: boolean
}

export const initialState: MapState = {
  isMyLocationVisible: false,
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMyLocationVisible: (state, action: PayloadAction<boolean>) => {
      state.isMyLocationVisible = action.payload
    },
  },
})

export const { setMyLocationVisible } = mapSlice.actions
