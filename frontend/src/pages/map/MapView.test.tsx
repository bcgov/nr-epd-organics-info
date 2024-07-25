import React from 'react'
import { screen } from '@testing-library/react'

import { render } from '@/test-utils'
import { initialState as initialOmrrState } from '@/features/omrr/omrr-slice'
import { initialState as initialMapState } from '@/features/map/map-slice'
import { mockOmrrData } from '@/mocks/mock-omrr-data'
import { themeBreakpointValues } from '@/theme'
import MapView from './MapView'
import { ActiveToolEnum } from '@/constants/constants'

describe('Test suite for MapView', () => {
  it('should render the MapView with markers', async () => {
    render(<MapView />, {
      screenWidth: themeBreakpointValues.xxl,
      withStateProvider: true,
      withRouter: true,
      initialState: {
        omrr: {
          ...initialOmrrState,
          allResults: mockOmrrData,
          searchByFilteredResults: mockOmrrData,
          filteredResults: mockOmrrData,
          status: 'succeeded',
        },
        map: {
          ...initialMapState,
        },
      },
    })

    const mapView = screen.getByTestId('map-view')
    expect(mapView).not.toHaveClass('map-view--small')

    const markers = screen.getAllByAltText('Authorization marker')
    expect(markers.length > 0).toBe(true)

    screen.getByPlaceholderText('Search')
    screen.getByRole('button', { name: 'Find Me' })
    expect(screen.queryByTitle('Show the data layers')).not.toBeInTheDocument()
    expect(
      screen.queryByTitle('Show my location on the map'),
    ).not.toBeInTheDocument()
  })

  it('should render the MapView with no markers on a small screen', async () => {
    const { user } = render(<MapView />, {
      screenWidth: themeBreakpointValues.sm - 10,
      withStateProvider: true,
      initialState: {
        omrr: {
          ...initialOmrrState,
          status: 'succeeded',
        },
        map: {
          ...initialMapState,
          isMyLocationVisible: true,
        },
      },
    })

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
})
