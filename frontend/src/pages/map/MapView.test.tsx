import { fireEvent, screen } from '@testing-library/react'

import { render } from '@/test-utils'
import { initialState as initialOmrrState } from '@/features/omrr/omrr-slice'
import { initialState as initialMapState } from '@/features/map/map-slice'
import { mockOmrrData } from '@/mocks/mock-omrr-data'
import { themeBreakpointValues } from '@/theme'
import MapView from './MapView'
import OmrrData from '@/interfaces/omrr'

describe('Test suite for MapView', () => {
  function renderComponent(
    screenWidth: number,
    filteredResults: OmrrData[] = mockOmrrData,
    isMyLocationVisible = false,
  ) {
    return render(<MapView />, {
      screenWidth,
      withStateProvider: true,
      withRouter: true,
      initialState: {
        omrr: {
          ...initialOmrrState,
          allResults: mockOmrrData,
          searchByFilteredResults: mockOmrrData,
          filteredResults,
          status: 'succeeded',
        },
        map: {
          ...initialMapState,
          isMyLocationVisible,
        },
      },
    })
  }
  it('should render the MapView with markers', async () => {
    const { user } = renderComponent(themeBreakpointValues.xxl)

    const mapView = screen.getByTestId('map-view')
    expect(mapView).not.toHaveClass('map-view--small')

    const markers = screen.getAllByAltText('Authorization marker')
    expect(markers.length > 0).toBe(true)

    screen.getByPlaceholderText('Search')
    await screen.findByRole('button', { name: 'Find Me' })
    expect(screen.queryByTitle('Show the data layers')).not.toBeInTheDocument()
    expect(
      screen.queryByTitle('Show my location on the map'),
    ).not.toBeInTheDocument()

    const showResults = screen.getByRole('button', { name: 'Show Results' })
    await user.click(showResults)

    const zoomToBtn = screen.getByRole('button', { name: 'Zoom To Results' })
    await user.click(zoomToBtn)

    const hideResults = screen.getByRole('button', { name: 'Hide Results' })
    await user.click(hideResults)
  })

  it('should render the MapView with no markers on a small screen', async () => {
    const { user } = renderComponent(themeBreakpointValues.sm - 10, [], true)

    const mapView = screen.getByTestId('map-view')
    expect(mapView).toHaveClass('map-view--small')
    const markers = screen.queryAllByAltText('Authorization marker')
    expect(markers).toHaveLength(0)

    const dataLayers = screen.getByTitle('Show the data layers')
    const findMeControl = screen.getByTitle('Show my location on the map')
    expect(findMeControl).toHaveClass('map-control-button--active')
    await screen.findByTitle('My location marker')

    expect(dataLayers).toBeEnabled()
    expect(dataLayers).not.toHaveClass('map-control-button--active')
    await user.click(dataLayers)

    expect(dataLayers).toHaveClass('map-control-button--active')
    await screen.findByText('Data Layers')
    screen.getByText('Available Layers')
    const closeBtn = screen.getByTitle('Close')
    await user.click(closeBtn)
    expect(screen.queryByText('Available Layers')).not.toBeInTheDocument()

    const searchBy = screen.getByRole('button', { name: 'Search By' })
    expect(searchBy).not.toHaveClass('map-button--active')
    await user.click(searchBy)

    expect(searchBy).toHaveClass('map-button--active')
    const activeCb = screen.getByLabelText('Active')
    expect(activeCb).toBeChecked()
    const inactiveCb = screen.getByLabelText('Inactive')
    expect(inactiveCb).not.toBeChecked()

    const filterBy = screen.getByRole('button', {
      name: 'Filter by Facility Type',
    })
    expect(filterBy).not.toHaveClass('map-button--active')
    await user.click(filterBy)

    expect(filterBy).toHaveClass('map-button--active')
    screen.getByText('Facility Type')
    const opCertCb = screen.getByLabelText('Operational Certificate')

    expect(screen.queryByText('Reset')).not.toBeInTheDocument()
    expect(screen.queryByText('Reset Filters')).not.toBeInTheDocument()

    await user.click(opCertCb)

    const resetLink = screen.getByRole('button', { name: 'Reset' })
    await user.click(resetLink)
    expect(screen.queryByText('Reset')).not.toBeInTheDocument()

    const searchBtn = screen.getByRole('button', { name: 'Text Search' })
    expect(searchBtn).not.toHaveClass('map-button--active')
    await user.click(searchBtn)

    expect(searchBtn).toHaveClass('map-button--active')
    screen.getByPlaceholderText('Search')
    const backBtn = screen.getByTitle('Back to the map')

    await user.click(backBtn)
    expect(screen.queryByPlaceholderText('Search')).not.toBeInTheDocument()
  })

  it('should render the MapView and test point search', async () => {
    const { user } = renderComponent(themeBreakpointValues.xxl, mockOmrrData)

    const pointSearchBtn = screen.getByRole('button', { name: 'Point Search' })
    await user.click(pointSearchBtn)

    const cancelBtn = screen.getByRole('button', { name: 'Cancel' })
    screen.getByRole('button', { name: 'Set Radius' })
    screen.getByText('Click to place center point')

    const map = document.querySelector('.leaflet-container') as HTMLElement
    await user.click(map)

    expect(document.querySelector('.point-search-circle')).toBeInTheDocument()

    await user.click(cancelBtn)

    expect(
      screen.queryByText('Click to place center point'),
    ).not.toBeInTheDocument()
  })

  it('should render the MapView and test polygon search', async () => {
    const { user } = renderComponent(themeBreakpointValues.xxl, mockOmrrData)

    const polygonSearchBtn = screen.getByRole('button', {
      name: 'Polygon Search',
    })
    await user.click(polygonSearchBtn)

    const cancelBtn = screen.getByRole('button', { name: 'Cancel' })
    const deleteBtn = screen.getByRole('button', { name: 'Delete Last Point' })
    expect(deleteBtn).toBeDisabled()
    const finishBtn = screen.getByRole('button', { name: 'Finish Shape' })
    expect(finishBtn).toBeDisabled()
    screen.getByText('Click to start drawing shape')

    expect(
      document.querySelector('.polygon-search-line--dotted'),
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.polygon-search-line'),
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.polygon-search-polygon'),
    ).not.toBeInTheDocument()

    const map = document.querySelector('.leaflet-container') as HTMLElement
    fireEvent.mouseOver(map)
    fireEvent.mouseMove(map, { clientX: 50, clientY: 50 })
    await user.click(map)
    fireEvent.mouseMove(map, { clientX: 60, clientY: 60 })
    await user.click(map)
    fireEvent.mouseMove(map, { clientX: 60, clientY: 70 })
    await user.click(map)
    fireEvent.mouseOut(map)

    const lines = document.querySelectorAll('.polygon-search-line')
    expect(lines).toHaveLength(2)
    expect(deleteBtn).toBeEnabled()
    expect(finishBtn).toBeEnabled()

    await user.click(cancelBtn)

    expect(
      screen.queryByText('Click to start drawing shape'),
    ).not.toBeInTheDocument()
  })

  it('should render the MapView and test data layers', async () => {
    const { user } = renderComponent(themeBreakpointValues.xxl, [])

    const dataLayersBtn = screen.getByRole('button', {
      name: 'Data Layers',
    })
    await user.click(dataLayersBtn)

    screen.getByText(/^All data layers sourced/)
    expect(
      screen.queryByRole('button', { name: 'Reset Layers' }),
    ).not.toBeInTheDocument()
    const layerCb = screen.getByRole('checkbox', { name: 'Aquifers - All' })
    expect(layerCb).not.toBeChecked()
    await user.click(layerCb)
    expect(layerCb).toBeChecked()

    const resetBtn = screen.getByRole('button', { name: 'Reset Layers' })
    await user.click(resetBtn)
    expect(layerCb).not.toBeChecked()
  })
})
