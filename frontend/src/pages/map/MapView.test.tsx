import React from 'react'
import { screen } from '@testing-library/react'

import { render } from '@/test-utils'
import { initialState } from '@/features/omrr/omrr-slice'
import { mockOmrrData } from '@/mocks/mock-omrr-data'
import { themeBreakpointValues } from '@/theme'
import MapView from './MapView'

describe('Test suite for MapView', () => {
  it('should render the MapView with markers', async () => {
    const { user } = render(<MapView />, {
      screenWidth: themeBreakpointValues.xxl,
      withStateProvider: true,
      initialState: {
        omrr: {
          ...initialState,
          allResults: mockOmrrData,
          searchByFilteredResults: mockOmrrData,
          filteredResults: mockOmrrData,
          status: 'succeeded',
        },
        map: {
          isMyLocationVisible: false,
        },
      },
    })

    const mapView = screen.getByTestId('map-view')
    expect(mapView).not.toHaveClass('map-view--small')

    const markers = screen.getAllByAltText('Authorization marker')
    expect(markers.length > 0).toBe(true)

    const input = screen.getByPlaceholderText('Search')
    screen.getByRole('button', { name: 'Find Me' })
    expect(screen.queryByTitle('Show the data layers')).not.toBeInTheDocument()
    expect(
      screen.queryByTitle('Show my location on the map'),
    ).not.toBeInTheDocument()

    await user.type(input, 'waste')
    await screen.findByText(/WYNDLOW WOOD WASTE/i)
    screen.getByText('11123')
    screen.getByText(/BIOWASTE MANAGEMENT/i)
    screen.getByText('11475')

    await user.clear(input)
    await user.type(input, 'V9N')
    await screen.findByText('14517')
    screen.getByText(/RIVER MEADOW FARMS/i)
    screen.getByText('Postal Code')
    const text = screen.getByText('V9N 7J3')

    await user.click(text)
    expect(input).toHaveValue('V9N 7J3')

    const clearBtn = screen.getByTitle('Clear')
    await user.click(clearBtn)

    expect(input).toHaveValue('')
    await user.type(input, 'Vancouver')
    const places = await screen.findAllByText('City')
    expect(places).toHaveLength(3)
    screen.getByText('North Vancouver')
    screen.getByText('West Vancouver')
  })

  it('should render the MapView with no markers on a small screen', async () => {
    render(<MapView />, {
      screenWidth: themeBreakpointValues.sm - 10,
      withStateProvider: true,
      initialState: {
        omrr: {
          ...initialState,
          status: 'succeeded',
        },
        map: {
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
