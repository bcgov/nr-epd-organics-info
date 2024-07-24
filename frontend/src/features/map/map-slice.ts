import { useSelector } from 'react-redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LatLngBoundsLiteral, LatLngTuple } from 'leaflet'

import { RootState } from '@/app/store'
import OmrrData from '@/interfaces/omrr'
import { DataLayer } from '@/interfaces/data-layers'
import { useCallback } from 'react'
import { BottomDrawerContentEnum } from '@/constants/constants'

export interface ZoomPosition {
  position: LatLngTuple
  zoom?: number
}

export interface MapSliceState {
  isMyLocationVisible: boolean
  zoomPosition?: ZoomPosition
  zoomBounds?: LatLngBoundsLiteral
  // Whether the search results sidebar OR bottom drawer is expanded
  isDrawerExpanded: boolean
  // The right sidebar width
  sidebarWidth: number
  // Keep track of if a single item has been selected
  selectedItem?: OmrrData
  // Selected data layers
  dataLayers: DataLayer[]
  // On small screens - defines which type of content is shown in the bottom drawer
  bottomDrawerContentType?: BottomDrawerContentEnum
}

export const initialState: MapSliceState = {
  isMyLocationVisible: false,
  zoomPosition: undefined,
  zoomBounds: undefined,
  isDrawerExpanded: false,
  sidebarWidth: 0,
  selectedItem: undefined,
  dataLayers: [],
  bottomDrawerContentType: undefined,
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
    setBottomDrawerContent: (
      state,
      action: PayloadAction<BottomDrawerContentEnum | undefined>,
    ) => {
      state.bottomDrawerContentType = action.payload
      state.isDrawerExpanded = Boolean(action.payload)
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
  toggleDataLayer,
  resetDataLayers,
  setBottomDrawerContent,
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

const selectBottomDrawerContentType = (state: RootState) =>
  state.map.bottomDrawerContentType
export const useBottomDrawerContentType = () =>
  useSelector(selectBottomDrawerContentType)
