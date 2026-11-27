import { fireEvent, screen } from '@testing-library/react'
import L, { LatLngBoundsLiteral, LatLngTuple } from 'leaflet'
import { useSelector } from 'react-redux'

import { render } from '@/test-utils'
import {
  initialState as initialOmrrState,
  OmrrSliceState,
  usePointFilterCenter,
  usePointFilterFinished,
  usePointFilterRadius,
} from '@/features/omrr/omrr-slice'
import {
  initialState as initialMapState,
  MapSliceState,
  selectZoomBounds,
  useActiveTool,
} from '@/features/map/map-slice'
import { ActiveToolEnum, MIN_CIRCLE_RADIUS } from '@/constants/constants'
import { PointSearch } from './PointSearch'

interface State {
  pointFilterCenter?: LatLngTuple
  pointFilterRadius: number
  pointFilterFinished: boolean
  activeTool?: ActiveToolEnum
  zoomBounds?: LatLngBoundsLiteral
}

describe('Test suite for PointSearch', () => {
  function renderComponent(
    isSmall = false,
    className: string | undefined = undefined,
    omrrState: Partial<OmrrSliceState> = {},
    mapState: Partial<MapSliceState> = {},
  ) {
    const state: State = {
      pointFilterRadius: MIN_CIRCLE_RADIUS,
      pointFilterFinished: false,
    }
    const TestComponent = () => {
      Object.assign(state, {
        pointFilterCenter: usePointFilterCenter(),
        pointFilterRadius: usePointFilterRadius(),
        pointFilterFinished: usePointFilterFinished(),
        activeTool: useActiveTool(),
        zoomBounds: useSelector(selectZoomBounds),
      })
      return <PointSearch isSmall={isSmall} className={className} />
    }
    const { user } = render(<TestComponent />, {
      withStateProvider: true,
      initialState: {
        omrr: {
          ...initialOmrrState,
          ...omrrState,
        },
        map: {
          ...initialMapState,
          ...mapState,
        },
      },
    })

    return { user, state }
  }

  it('should render large PointSearch and cancel', async () => {
    const { user, state } = renderComponent(false, 'test-class')

    screen.getByText(
      'Click the map to place the centre point, then adjust the radius.',
    )
    const cancelBtn = screen.getByRole('button', { name: 'Cancel' })

    await user.click(cancelBtn)
    expect(state.pointFilterCenter).toBeUndefined()
    expect(state.pointFilterRadius).toBe(MIN_CIRCLE_RADIUS)
    expect(state.activeTool).toBeUndefined()
  })

  it('should render large PointSearch with inline slider and set radius', async () => {
    const { state } = renderComponent(false)

    expect(
      screen.queryByRole('button', { name: 'Set Radius' }),
    ).not.toBeInTheDocument()
    screen.getByText(`${MIN_CIRCLE_RADIUS / 1000} km`)
    const slider = screen.getByRole('slider', { name: 'Search radius' })
    fireEvent.change(slider, { target: { value: 5000 } })
    expect(state.pointFilterCenter).toBeUndefined()
    expect(state.pointFilterRadius).toBe(5000)
  })

  it('should show guidance states and zoom to radius bounds on OK', async () => {
    const center: LatLngTuple = [48.4284, -123.3656]
    const radius = 5000
    const { user, state } = renderComponent(
      false,
      undefined,
      {
        pointFilterCenter: center,
        pointFilterRadius: radius,
        pointFilterFinished: false,
      },
      {
        activeTool: ActiveToolEnum.pointSearch,
      },
    )

    screen.getByText(
      'Adjust the radius, then click OK to see results in the area.',
    )
    const okBtn = screen.getByRole('button', { name: 'OK' })
    expect(okBtn).toBeEnabled()

    await user.click(okBtn)

    expect(state.pointFilterFinished).toBe(true)
    screen.getByText('Showing results within 5 km.')

    const expectedBounds = L.latLng(center).toBounds(radius * 2)
    expect(state.zoomBounds).toEqual([
      [expectedBounds.getSouth(), expectedBounds.getWest()],
      [expectedBounds.getNorth(), expectedBounds.getEast()],
    ])
  })

  it('should render small PointSearch and set radius', async () => {
    const { state } = renderComponent(true)

    expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    screen.getByText('Set Radius:')
    screen.getByText(
      'Click the map to place the centre point, then adjust the radius.',
    )
    const slider = screen.getByRole('slider', { name: 'Search radius' })
    screen.getByText(`${MIN_CIRCLE_RADIUS / 1000} km`)
    fireEvent.change(slider, { target: { value: 2000 } })
    expect(state.pointFilterCenter).toBeUndefined()
    expect(state.pointFilterRadius).toBe(2000)
  })
})
