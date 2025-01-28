import { useSelector } from 'react-redux'
import { LatLngBoundsLiteral } from 'leaflet'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import { render } from '@/test-utils'
import { mockActiveOmrrData, mockOmrrData } from '@/mocks/mock-omrr-data'
import OmrrData from '@/interfaces/omrr'
import { SEARCH_BY_ACTIVE, SearchByType } from '@/interfaces/types'
import { initialState as omrrState } from '@/features/omrr/omrr-slice'
import {
  initialState as mapState,
  selectZoomBounds,
  selectZoomPosition,
  useActiveTool,
  useBottomDrawerHeight,
  useSelectedItem,
  useSidebarWidth,
  ZoomPosition,
} from '@/features/map/map-slice'
import {
  ActiveToolEnum,
  DEFAULT_AUTHORIZATION_ZOOM,
  MAP_BOTTOM_DRAWER_HEIGHT,
  MAP_BOTTOM_DRAWER_HEIGHT_SMALL,
} from '@/constants/constants'
import { themeBreakpointValues } from '@/theme'
import { MapDrawer } from './MapDrawer'

interface State {
  sidebarWidth: number
  bottomDrawerHeight: number
  activeTool?: ActiveToolEnum
  selectedItem?: OmrrData
  zoomPosition?: ZoomPosition
  zoomBounds?: LatLngBoundsLiteral
}

interface Props {
  screenWidth?: number
  filteredResults?: OmrrData[]
  searchBy?: SearchByType
  selectedItem?: OmrrData
  bottomDrawerHeight?: number
  activeTool?: ActiveToolEnum
}

describe('Test suite for MapDrawer', () => {
  function renderComponent({
    screenWidth = 1320,
    filteredResults = [],
    searchBy = SEARCH_BY_ACTIVE,
    selectedItem = undefined,
    bottomDrawerHeight = 0,
    activeTool = undefined,
  }: Readonly<Props> = {}) {
    const state: State = {
      sidebarWidth: 0,
      bottomDrawerHeight,
    }

    const TestComponent = () => {
      Object.assign(state, {
        sidebarWidth: useSidebarWidth(),
        bottomDrawerHeight: useBottomDrawerHeight(),
        activeTool: useActiveTool(),
        selectedItem: useSelectedItem(),
        zoomPosition: useSelector(selectZoomPosition),
        zoomBounds: useSelector(selectZoomBounds),
      })

      return <MapDrawer />
    }

    const { user } = render(<TestComponent />, {
      screenWidth,
      withRouter: true,
      withStateProvider: true,
      initialState: {
        omrr: {
          ...omrrState,
          searchBy,
          allResults: mockOmrrData,
          searchByFilteredResults: mockOmrrData.filter(
            (item) => item['Authorization Status'] === searchBy,
          ),
          filteredResults,
        },
        map: {
          ...mapState,
          selectedItem,
          bottomDrawerHeight,
          activeTool,
        },
      },
    })

    return { user, state }
  }

  it('should render MapDrawer with search results showing in right sidebar', async () => {
    const filteredResults = mockActiveOmrrData
    const { user, state } = renderComponent({ filteredResults })

    expect(state.sidebarWidth).toBe(0)
    screen.getByTestId('map-sidebar')
    expect(screen.queryByTestId('map-bottom-drawer')).not.toBeInTheDocument()
    const showResults = screen.getByText('Show Results')
    await user.click(showResults)
    expect(state.sidebarWidth > 0).toBe(true)

    screen.getByText('Hide Results')

    screen.getByText('Search Results')
    const closeBtn = screen.getByTitle('Close')
    screen.getByText(`${filteredResults.length} matching results`)

    const zoomToResults = screen.getByRole('button', {
      name: 'Zoom To Results',
    })
    expect(state.zoomBounds).toBeUndefined()
    await user.click(zoomToResults)
    expect(state.zoomBounds).toBeDefined()

    await user.click(closeBtn)
    expect(state.sidebarWidth).toBe(0)
    screen.getByText('Show Results')
  })

  it('should render MapDrawer with a selected item showing in right sidebar', async () => {
    const filteredResults = mockActiveOmrrData
    const [selectedItem] = filteredResults
    const { user, state } = renderComponent({ filteredResults, selectedItem })

    // Should already be expanded since there is a selected item
    await screen.findByText('Hide Results')
    expect(state.selectedItem).toBe(selectedItem)

    expect(screen.queryByText('Search Results')).not.toBeInTheDocument()

    const zoomToBtn = screen.getByRole('button', { name: 'Zoom To' })
    expect(state.zoomPosition).toBeUndefined()
    await user.click(zoomToBtn)

    expect(state.zoomPosition).toEqual({
      position: [selectedItem.Latitude, selectedItem.Longitude],
      zoom: DEFAULT_AUTHORIZATION_ZOOM,
    })

    const backToResultsBtn = screen.getByRole('button', {
      name: 'Back to Search Results',
    })
    await user.click(backToResultsBtn)
    expect(state.selectedItem).toBeUndefined()
    screen.getByText('Search Results')
  })

  it('should render MapDrawer with selected item showing in bottom drawer', async () => {
    const filteredResults = mockActiveOmrrData
    const [selectedItem] = filteredResults
    const { user, state } = renderComponent({
      filteredResults,
      selectedItem,
      screenWidth: themeBreakpointValues.sm - 10,
    })

    const div = screen.getByTestId('map-bottom-drawer')
    // It will get expanded since selected item is set
    await waitFor(() => expect(div).toHaveClass('map-bottom-drawer--expanded'))
    expect(state.bottomDrawerHeight).toBe(MAP_BOTTOM_DRAWER_HEIGHT)
    expect(screen.queryByTestId('map-sidebar')).not.toBeInTheDocument()
    expect(screen.queryByText('Show Results')).not.toBeInTheDocument()
    expect(screen.queryByText('Search Results')).not.toBeInTheDocument()

    let fullHeightToggle = screen.getByTitle('Expand')
    await user.click(fullHeightToggle)

    fullHeightToggle = screen.getByTitle('Collapse')
    await user.click(fullHeightToggle)

    const backToResultsBtn = screen.getByRole('button', {
      name: 'Back to Search Results',
    })
    await user.click(backToResultsBtn)

    screen.getByText('Search Results')
    screen.getByText(`${filteredResults.length} matching results`)

    const closeBtn = screen.getByTitle('Close')
    await user.click(closeBtn)
    expect(state.bottomDrawerHeight).toBe(0)
    expect(screen.queryByText('Zoom To Results')).not.toBeInTheDocument()
  })

  it('should render MapDrawer with polygon tool showing in bottom drawer', async () => {
    const filteredResults = mockActiveOmrrData
    const { user, state } = renderComponent({
      filteredResults,
      screenWidth: themeBreakpointValues.sm - 10,
      activeTool: ActiveToolEnum.polygonSearch,
    })

    const div = screen.getByTestId('map-bottom-drawer')
    // It will get expanded since there is an active tool
    await waitFor(() => expect(div).toHaveClass('map-bottom-drawer--expanded'))
    expect(state.bottomDrawerHeight).toBe(MAP_BOTTOM_DRAWER_HEIGHT_SMALL)
    expect(state.activeTool).toBe(ActiveToolEnum.polygonSearch)
    screen.getByText('Polygon Search')
    const deleteBtn = screen.getByRole('button', { name: 'Delete Last Point' })
    expect(deleteBtn).toBeDisabled()
    const finishBtn = screen.getByRole('button', { name: 'Finish Shape' })
    expect(finishBtn).toBeDisabled()

    const closeBtn = screen.getByTitle('Close')
    await user.click(closeBtn)
    expect(state.bottomDrawerHeight).toBe(0)
    expect(state.activeTool).toBeUndefined()
  })

  it('should render MapDrawer with point tool showing in bottom drawer', async () => {
    const filteredResults = mockActiveOmrrData
    const { state } = renderComponent({
      filteredResults,
      screenWidth: themeBreakpointValues.sm - 1,
      activeTool: ActiveToolEnum.pointSearch,
    })

    const div = screen.getByTestId('map-bottom-drawer')
    await waitFor(() => expect(div).toHaveClass('map-bottom-drawer--expanded'))
    expect(state.bottomDrawerHeight).toBe(MAP_BOTTOM_DRAWER_HEIGHT_SMALL)
    expect(state.activeTool).toBe(ActiveToolEnum.pointSearch)
    screen.getByText('Radius Search')
    screen.getByRole('slider', { name: 'Search radius' })

    // Swipe up to make full height
    fireEvent.touchStart(div, {
      changedTouches: [{ clientX: 0, clientY: 50 }],
    })
    fireEvent.touchEnd(div, {
      changedTouches: [{ clientX: 0, clientY: 10 }],
    })
    await screen.findByTitle('Collapse')

    // Swipe down - collapse to normal height
    fireEvent.touchStart(div, {
      changedTouches: [{ clientX: 0, clientY: 10 }],
    })
    fireEvent.touchEnd(div, {
      changedTouches: [{ clientX: 0, clientY: 100 }],
    })
    await screen.findByTitle('Expand')

    // Swipe down again - close
    fireEvent.touchStart(div, {
      changedTouches: [{ clientX: 0, clientY: 10 }],
    })
    fireEvent.touchEnd(div, {
      changedTouches: [{ clientX: 0, clientY: 100 }],
    })
    expect(state.bottomDrawerHeight).toBe(0)
    expect(state.activeTool).toBeUndefined()
  })
})
