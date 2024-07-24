import React from 'react'
import { screen } from '@testing-library/react'

import { render } from '@/test-utils'
import { initialState as initialOmrrState } from '@/features/omrr/omrr-slice'
import { initialState as initialMapState } from '@/features/map/map-slice'
import { mockOmrrData } from '@/mocks/mock-omrr-data'
import { themeBreakpointValues } from '@/theme'
import MapView from './MapView'

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
    render(<MapView />, {
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

    screen.getByTitle('Show the data layers')
    const findMeControl = screen.getByTitle('Show my location on the map')
    expect(findMeControl).toHaveClass('map-control-button--active')
    await screen.findByTitle('My location marker')
  })
})
