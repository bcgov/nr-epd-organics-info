import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LatLngBounds, LatLngTuple } from 'leaflet'

export interface ZoomPosition {
  position: LatLngTuple
  zoom?: number
}

export interface MapState {
  isMyLocationVisible: boolean
  zoomPosition?: ZoomPosition
  zoomBounds?: LatLngBounds
}

export const initialState: MapState = {
  isMyLocationVisible: false,
  zoomPosition: undefined,
  zoomBounds: undefined,
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMyLocationVisible: (state, action: PayloadAction<boolean>) => {
      state.isMyLocationVisible = action.payload
    },
    setZoomPosition: (state, action: PayloadAction<ZoomPosition>) => {
      state.zoomPosition = action.payload
    },
    setZoomBounds: (state, action: PayloadAction<LatLngBounds>) => {
      state.zoomBounds = action.payload
    },
  },
})

export const { setMyLocationVisible, setZoomPosition, setZoomBounds } =
  mapSlice.actions
