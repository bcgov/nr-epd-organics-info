import { useSelector } from 'react-redux'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { LatLngBoundsLiteral, LatLngTuple } from 'leaflet'

import { RootState } from '@/app/store'
import OmrrData from '@/interfaces/omrr'
import { DataLayer } from '@/interfaces/data-layers'
import { useCallback } from 'react'
import { ActiveToolEnum } from '@/constants/constants'
import { setSearchTextFilter } from '@/features/omrr/omrr-slice'

export interface ZoomPosition {
  position: LatLngTuple
  zoom?: number
}

export interface MapSliceState {
  isMyLocationVisible: boolean
  zoomPosition?: ZoomPosition
  zoomBounds?: LatLngBoundsLiteral
  // The width of the right sidebar (will be 0 when collapsed)
  sidebarWidth: number
  // The bottom drawer height (will be 0 when collapsed, does change when full height)
  bottomDrawerHeight: number
  // Keep track of if a single item has been selected
  selectedItem?: OmrrData
  // The time when it was selected
  selectedItemTime?: number
  // Selected data layers
  dataLayers: DataLayer[]
  // Keeps track of the active tool - point/polygon search (all screen sizes), and
  // data layers, search by and filter by (small screens only - shown in bottom drawer)
  activeTool?: ActiveToolEnum
  searchResults: OmrrData[]
  isRadiusActive: boolean
}

export const initialState: MapSliceState = {
  isMyLocationVisible: false,
  zoomPosition: undefined,
  zoomBounds: undefined,
  sidebarWidth: 0,
  bottomDrawerHeight: 0,
  selectedItem: undefined,
  dataLayers: [],
  activeTool: undefined,
  searchResults: [],
  isRadiusActive: false,
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
      state.zoomBounds = undefined
    },
    setZoomBounds: (state, action: PayloadAction<LatLngBoundsLiteral>) => {
      state.zoomPosition = undefined
      state.zoomBounds = action.payload
    },
    setSidebarWidth: (state, action: PayloadAction<number>) => {
      state.sidebarWidth = action.payload
    },
    setBottomDrawerHeight: (state, action: PayloadAction<number>) => {
      state.bottomDrawerHeight = action.payload
    },
    setSelectedItem: (state, action: PayloadAction<OmrrData | undefined>) => {
      state.selectedItem = action.payload
      state.selectedItemTime = action.payload ? Date.now() : undefined
    },
    toggleDataLayer: (state, action: PayloadAction<DataLayer>) => {
      const layer = action.payload
      const newLayers = [...state.dataLayers]
      // Layers are cloned - need to compare names
      const index = newLayers.findIndex(
        (dl) => dl === layer || dl.name === layer.name,
      )
      if (index === -1) {
        newLayers.push(layer)
      } else {
        newLayers.splice(index, 1)
      }
      state.dataLayers = newLayers
    },
    resetDataLayers: (state) => {
      state.dataLayers = []
    },
    toggleActiveTool: (state, action: PayloadAction<ActiveToolEnum>) => {
      // Toggle the tool
      const tool = action.payload
      state.activeTool = state.activeTool === tool ? undefined : tool
    },
    clearActiveTool: (state) => {
      state.activeTool = undefined
    },
    clearSearchResults: (state) => {
      state.searchResults = []
    },
    setRadiusActive: (state, action: PayloadAction<boolean>) => {
      state.isRadiusActive = action.payload
      if (action.payload) {
        state.bottomDrawerHeight = 500 // 300 + 200
      } else {
        state.bottomDrawerHeight = 300
      }
    },
  },
})

export const {
  setMyLocationVisible,
  setZoomPosition,
  setZoomBounds,
  setSidebarWidth,
  setBottomDrawerHeight,
  setSelectedItem,
  toggleDataLayer,
  resetDataLayers,
  toggleActiveTool,
  clearActiveTool,
  clearSearchResults,
  setRadiusActive,
} = mapSlice.actions

// Create a thunk to clear both search results and search text
export const clearSearchAndResults = createAsyncThunk(
  'map/clearSearchAndResults',
  async (_, { dispatch }) => {
    dispatch(clearSearchResults())
    dispatch(setSearchTextFilter(''))
  },
)

// Selectors
const selectMyLocationVisible = (state: RootState) =>
  state.map.isMyLocationVisible
export const useMyLocationVisible = () => useSelector(selectMyLocationVisible)

export const selectZoomPosition = (state: RootState) => state.map.zoomPosition
export const selectZoomBounds = (state: RootState) => state.map.zoomBounds

const selectSidebarWidth = (state: RootState) => state.map.sidebarWidth
export const useSidebarWidth = () => useSelector(selectSidebarWidth)

const selectBottomDrawerHeight = (state: RootState) =>
  state.map.bottomDrawerHeight
export const useBottomDrawerHeight = () => useSelector(selectBottomDrawerHeight)

const selectSelectedItem = (state: RootState) => state.map.selectedItem
export const useSelectedItem = () => useSelector(selectSelectedItem)
const selectSelectedItemTime = (state: RootState) => state.map.selectedItemTime
export const useSelectedItemTime = () => useSelector(selectSelectedItemTime)

const selectDataLayers = (state: RootState) => state.map.dataLayers
export const useDataLayers = () => useSelector(selectDataLayers)
export const useIsDataLayerOn = () => {
  const dataLayers = useSelector(selectDataLayers)
  return useCallback(
    (layer: DataLayer) => {
      return Boolean(
        dataLayers.find((dl) => dl === layer || dl.name === layer.name),
      )
    },
    [dataLayers],
  )
}
export const useHasDataLayersOn = () => useSelector(selectDataLayers).length > 0

const selectActiveTool = (state: RootState) => state.map.activeTool
export const useActiveTool = () => useSelector(selectActiveTool)

export const useRadiusActive = () =>
  useSelector((state: RootState) => state.map.isRadiusActive)
