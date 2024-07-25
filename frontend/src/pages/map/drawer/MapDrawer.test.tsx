import { useSelector } from 'react-redux'
import { LatLngBoundsLiteral } from 'leaflet'
import { screen } from '@testing-library/react'

import { render } from '@/test-utils'
import { mockActiveOmrrData, mockOmrrData } from '@/mocks/mock-omrr-data'
import OmrrData from '@/interfaces/omrr'
import {
  SEARCH_BY_ACTIVE,
  SEARCH_BY_ALL,
  SearchByType,
} from '@/interfaces/types'
import { initialState as omrrState } from '@/features/omrr/omrr-slice'
import {
  initialState as mapState,
  selectZoomBounds,
  selectZoomPosition,
  useDrawerExpanded,
  ZoomPosition,
} from '@/features/map/map-slice'
import { MapDrawer } from './MapDrawer'
import { DEFAULT_AUTHORIZATION_ZOOM } from '@/constants/constants'
import { themeBreakpointValues } from '@/theme'

interface State {
  isExpanded: boolean
  zoomPosition?: ZoomPosition
  zoomBounds?: LatLngBoundsLiteral
}

interface Props {
  screenWidth?: number
  filteredResults?: OmrrData[]
  searchBy?: SearchByType
  selectedItem?: OmrrData
  isDrawerExpanded?: boolean
}

describe('Test suite for MapDrawer', () => {
  function renderComponent({
    screenWidth = 1320,
    filteredResults = [],
    searchBy = SEARCH_BY_ACTIVE,
    selectedItem = undefined,
    isDrawerExpanded = false,
  }: Readonly<Props> = {}) {
    const state: State = {
      isExpanded: false,
    }

    const TestComponent = () => {
      const isExpanded = useDrawerExpanded()
      const zoomPosition = useSelector(selectZoomPosition)
      const zoomBounds = useSelector(selectZoomBounds)
      Object.assign(state, { isExpanded, zoomBounds, zoomPosition })

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
          isDrawerExpanded,
          selectedItem,
        },
      },
    })

    return { user, state }
  }

  it('should render MapDrawer with search results showing in right sidebar', async () => {
    const filteredResults = mockActiveOmrrData
    const { user, state } = renderComponent({ filteredResults })

    expect(state.isExpanded).toBe(false)
    screen.getByTestId('map-sidebar')
    expect(screen.queryByTestId('map-bottom-drawer')).not.toBeInTheDocument()
    const showResults = screen.getByText('Show Results')
    await user.click(showResults)
    expect(state.isExpanded).toBe(true)

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
    expect(state.isExpanded).toBe(false)
    screen.getByText('Show Results')
  })

  it('should render MapDrawer with a selected item showing in right sidebar', async () => {
    const filteredResults = mockActiveOmrrData
    const [selectedItem] = filteredResults
    const { user, state } = renderComponent({ filteredResults, selectedItem })

    const showResults = screen.getByText('Show Results')
    await user.click(showResults)

    expect(screen.queryByText('Search Results')).not.toBeInTheDocument()

    const zoomToBtn = screen.getByRole('button', { name: 'Zoom To' })
    expect(state.zoomPosition).toBeUndefined()
    await user.click(zoomToBtn)
    expect(state.zoomPosition).toEqual({
      position: [selectedItem.Latitude, selectedItem.Longitude],
      zoom: DEFAULT_AUTHORIZATION_ZOOM,
    })
  })

  it('should not render MapDrawer in right sidebar if all results are showing', async () => {
    const filteredResults = mockOmrrData
    renderComponent({ filteredResults, searchBy: SEARCH_BY_ALL })

    expect(screen.queryByText('Show Results')).not.toBeInTheDocument()
  })

  it('should render MapDrawer with search results showing in bottom sidebar', async () => {
    const filteredResults = mockActiveOmrrData
    const { user, state } = renderComponent({
      filteredResults,
      screenWidth: themeBreakpointValues.sm - 10,
      isDrawerExpanded: true,
    })

    expect(state.isExpanded).toBe(true)
    screen.getByTestId('map-bottom-drawer')
    expect(screen.queryByTestId('map-sidebar')).not.toBeInTheDocument()
    expect(screen.queryByText('Show Results')).not.toBeInTheDocument()
    screen.getByText('Search Results')
    screen.getByText(`${filteredResults.length} matching results`)

    let fullHeightToggle = screen.getByTitle('Expand')
    await user.click(fullHeightToggle)

    fullHeightToggle = screen.getByTitle('Collapse')
    await user.click(fullHeightToggle)

    const closeBtn = screen.getByTitle('Close')
    await user.click(closeBtn)
    expect(state.isExpanded).toBe(false)
    expect(screen.queryByText('Zoom To Results')).not.toBeInTheDocument()
  })
})
