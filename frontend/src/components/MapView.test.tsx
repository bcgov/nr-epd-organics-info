import React from 'react'
import { screen } from '@testing-library/react'

import MapView from './MapView'
import { render } from '@/test-utils'
import { OmrrSliceState } from '@/features/omrr/omrr-slice'
import { omrrTestData } from '@/mocks/omrr-data'
import OmrrData from '@/interfaces/omrr'

describe('Test suite for MapView', () => {
  it('should render the MapView with markers', () => {
    render(<MapView />, {
      withStateProvider: true,
      initialState: {
        omrr: {
          value: omrrTestData,
          status: 'succeeded',
        } as OmrrSliceState,
      },
    })

    screen.getByTestId('map-view')
    const markers = screen.getAllByAltText('Authorization marker')
    expect(markers.length > 0).toBe(true)
  })

  it('should render the MapView with no markers', async () => {
    render(<MapView />, {
      withStateProvider: true,
      initialState: {
        omrr: {
          value: [] as OmrrData[],
          status: 'succeeded',
        } as OmrrSliceState,
      },
    })

    screen.getByTestId('map-view')
    const markers = screen.queryAllByAltText('Authorization marker')
    expect(markers).toHaveLength(0)
  })
})
