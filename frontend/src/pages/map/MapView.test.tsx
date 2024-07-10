import React from 'react'
import { getByPlaceholderText, screen } from '@testing-library/react'

import MapView from '@/pages/map/MapView'
import { render } from '@/test-utils'
import { OmrrSliceState } from '@/features/omrr/omrr-slice'
import { omrrTestData } from '@/mocks/omrr-data'
import OmrrData from '@/interfaces/omrr'
import { themeBreakpointValues } from '@/theme'

describe('Test suite for MapView', () => {
  it('should render the MapView with markers', () => {
    render(<MapView />, {
      screenWidth: themeBreakpointValues.xxl,
      withStateProvider: true,
      initialState: {
        omrr: {
          filteredValue: omrrTestData,
          status: 'succeeded',
        } as OmrrSliceState,
      },
    })

    const mapView = screen.getByTestId('map-view')
    expect(mapView).not.toHaveClass('map-view--small')

    const markers = screen.getAllByAltText('Authorization marker')
    expect(markers.length > 0).toBe(true)

    screen.getByPlaceholderText('Search')
    screen.getByRole('button', { name: 'Find Me' })
  })

  it('should render the MapView with no markers on a small screen', async () => {
    render(<MapView />, {
      screenWidth: themeBreakpointValues.sm - 10,
      withStateProvider: true,
      initialState: {
        omrr: {
          filteredValue: [] as OmrrData[],
          status: 'succeeded',
        } as OmrrSliceState,
      },
    })

    const mapView = screen.getByTestId('map-view')
    expect(mapView).toHaveClass('map-view--small')
    const markers = screen.queryAllByAltText('Authorization marker')
    expect(markers).toHaveLength(0)
  })
})
