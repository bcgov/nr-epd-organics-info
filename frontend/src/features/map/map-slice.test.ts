import { configureStore } from '@reduxjs/toolkit'
import { LatLngBoundsLiteral, LatLngTuple } from 'leaflet'

import {
  clearActiveTool,
  clearSearchAndResults,
  initialState,
  mapSlice,
  resetDataLayers,
  setBottomDrawerHeight,
  setMyLocationVisible,
  setRadiusActive,
  setSelectedItem,
  setSidebarWidth,
  setZoomBounds,
  setZoomPosition,
  toggleActiveTool,
  toggleDataLayer,
} from './map-slice'

const mapReducer = mapSlice.reducer
import omrrReducer, { setSearchTextFilter } from '@/features/omrr/omrr-slice'
import { ActiveToolEnum } from '@/constants/constants'
import { DataLayer } from '@/interfaces/data-layers'
import { mockOmrrData } from '@/mocks/mock-omrr-data'

describe('mapSlice', () => {
  it('clears zoomBounds when zoomPosition is set and vice versa', () => {
    const pos: LatLngTuple = [48.4284, -123.3656]
    const bounds: LatLngBoundsLiteral = [
      [48.0, -124.0],
      [49.0, -123.0],
    ]

    let state = mapReducer(initialState, setZoomPosition({ position: pos, zoom: 10 }))
    expect(state.zoomPosition).toEqual({ position: pos, zoom: 10 })
    expect(state.zoomBounds).toBeUndefined()

    state = mapReducer(state, setZoomBounds(bounds))
    expect(state.zoomBounds).toEqual(bounds)
    expect(state.zoomPosition).toBeUndefined()
  })

  it('toggles data layers by reference or cloned name and resets them', () => {
    const layer: DataLayer = {
      name: 'ALC Agricultural Land Reserve Lines',
      url: 'https://example.com/ows',
      layers: 'pub:ALR',
      styles: '1',
      webUrl: 'https://example.com/dataset',
    }
    const clonedLayer: DataLayer = { ...layer }

    let state = mapReducer(initialState, toggleDataLayer(layer))
    expect(state.dataLayers).toHaveLength(1)

    state = mapReducer(state, toggleDataLayer(clonedLayer))
    expect(state.dataLayers).toHaveLength(0)

    state = mapReducer(state, toggleDataLayer(layer))
    state = mapReducer(state, resetDataLayers())
    expect(state.dataLayers).toEqual([])
  })

  it('tracks active tool, selected item timestamp, UI dimensions, and radius drawer height', () => {
    let state = mapReducer(initialState, setMyLocationVisible(true))
    expect(state.isMyLocationVisible).toBe(true)

    state = mapReducer(state, setSidebarWidth(360))
    state = mapReducer(state, setBottomDrawerHeight(250))
    expect(state.sidebarWidth).toBe(360)
    expect(state.bottomDrawerHeight).toBe(250)

    state = mapReducer(state, setSelectedItem(mockOmrrData[0]))
    expect(state.selectedItem).toEqual(mockOmrrData[0])
    expect(state.selectedItemTime).toEqual(expect.any(Number))

    state = mapReducer(state, setSelectedItem(undefined))
    expect(state.selectedItem).toBeUndefined()
    expect(state.selectedItemTime).toBeUndefined()

    state = mapReducer(state, toggleActiveTool(ActiveToolEnum.polygonSearch))
    expect(state.activeTool).toBe(ActiveToolEnum.polygonSearch)
    state = mapReducer(state, toggleActiveTool(ActiveToolEnum.polygonSearch))
    expect(state.activeTool).toBeUndefined()

    state = mapReducer(state, toggleActiveTool(ActiveToolEnum.pointSearch))
    state = mapReducer(state, clearActiveTool())
    expect(state.activeTool).toBeUndefined()

    state = mapReducer(state, setRadiusActive(true))
    expect(state.isRadiusActive).toBe(true)
    expect(state.bottomDrawerHeight).toBe(500)

    state = mapReducer(state, setRadiusActive(false))
    expect(state.isRadiusActive).toBe(false)
    expect(state.bottomDrawerHeight).toBe(300)
  })

  it('clears search text filter via clearSearchAndResults thunk', async () => {
    const store = configureStore({
      reducer: {
        map: mapReducer,
        omrr: omrrReducer,
      },
    })

    store.dispatch(setSearchTextFilter('Victoria'))
    expect(store.getState().omrr.searchTextFilter).toBe('Victoria')

    await store.dispatch(clearSearchAndResults())
    expect(store.getState().omrr.searchTextFilter).toBe('')
    expect(store.getState().map.searchResults).toEqual([])
  })
})
