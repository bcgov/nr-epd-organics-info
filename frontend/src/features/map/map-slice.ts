import { useSelector } from 'react-redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LatLngBoundsLiteral, LatLngTuple } from 'leaflet'

import { RootState } from '@/app/store'
import OmrrData from '@/interfaces/omrr'

export interface ZoomPosition {
  position: LatLngTuple
  zoom?: number
}

export interface MapSliceState {
  isMyLocationVisible: boolean
  zoomPosition?: ZoomPosition
  zoomBounds?: LatLngBoundsLiteral
  // Whether the search results sidebar OR bottom drawer is expanded
  isDrawerExpanded?: boolean
  // The right sidebar width
  sidebarWidth: number
  // Keep track of if a single item has been selected
  selectedItem?: OmrrData
}

export const initialState: MapSliceState = {
  isMyLocationVisible: false,
  zoomPosition: undefined,
  zoomBounds: undefined,
  isDrawerExpanded: false,
  sidebarWidth: 0,
  selectedItem: undefined,
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
    setZoomBounds: (state, action: PayloadAction<LatLngBoundsLiteral>) => {
      state.zoomBounds = action.payload
    },
    setDrawerExpanded: (state, action: PayloadAction<boolean>) => {
      state.isDrawerExpanded = action.payload
    },
    setSidebarWidth: (state, action: PayloadAction<number>) => {
      state.sidebarWidth = action.payload
    },
    setSelectedItem: (state, action: PayloadAction<OmrrData>) => {
      state.selectedItem = action.payload
      // Also expand drawer
      state.isDrawerExpanded = true
    },
    clearSelectedItem: (state) => {
      state.selectedItem = undefined
    },
  },
})

export const {
  setMyLocationVisible,
  setZoomPosition,
  setZoomBounds,
  setDrawerExpanded,
  setSidebarWidth,
  setSelectedItem,
  clearSelectedItem,
} = mapSlice.actions

// Selectors
const selectMyLocationVisible = (state: RootState) =>
  state.map.isMyLocationVisible
export const useMyLocationVisible = () => useSelector(selectMyLocationVisible)

export const selectZoomPosition = (state: RootState) => state.map.zoomPosition
export const selectZoomBounds = (state: RootState) => state.map.zoomBounds

const selectDrawerExpanded = (state: RootState) => state.map.isDrawerExpanded
export const useDrawerExpanded = () => useSelector(selectDrawerExpanded)

const selectSidebarWidth = (state: RootState) => state.map.sidebarWidth
export const useSidebarWidth = () => useSelector(selectSidebarWidth)

const selectSelectedItem = (state: RootState) => state.map.selectedItem
export const useSelectedItem = () => useSelector(selectSelectedItem)
