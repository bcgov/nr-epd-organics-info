import { fireEvent, screen } from '@testing-library/react'
import { LatLngTuple } from 'leaflet'

import { render } from '@/test-utils'
import {
  usePointFilterCenter,
  usePointFilterRadius,
} from '@/features/omrr/omrr-slice'
import { useActiveTool } from '@/features/map/map-slice'
import { ActiveToolEnum, MIN_CIRCLE_RADIUS } from '@/constants/constants'
import { PointSearch } from './PointSearch'

interface State {
  pointFilterCenter?: LatLngTuple
  pointFilterRadius: number
  activeTool?: ActiveToolEnum
}

describe('Test suite for PointSearch', () => {
  function renderComponent(
    isSmall = false,
    className: string | undefined = undefined,
  ) {
    const state: State = {
      pointFilterRadius: MIN_CIRCLE_RADIUS,
    }
    const TestComponent = () => {
      Object.assign(state, {
        pointFilterCenter: usePointFilterCenter(),
        pointFilterRadius: usePointFilterRadius(),
        activeTool: useActiveTool(),
      })
      return <PointSearch isSmall={isSmall} className={className} />
    }
    const { user } = render(<TestComponent />, {
      withStateProvider: true,
    })

    return { user, state }
  }

  it('should render large PointSearch and cancel', async () => {
    const { user, state } = renderComponent(false, 'test-class')

    const cancelBtn = screen.getByRole('button', { name: 'Cancel' })

    await user.click(cancelBtn)
    expect(state.pointFilterCenter).toBeUndefined()
    expect(state.pointFilterRadius).toBe(MIN_CIRCLE_RADIUS)
    expect(state.activeTool).toBeUndefined()
  })

  it('should render large PointSearch and set radius', async () => {
    const { user, state } = renderComponent(false)

    const setRadiusBtn = screen.getByRole('button', { name: 'Set Radius' })
    await user.click(setRadiusBtn)
    screen.getByText(`${MIN_CIRCLE_RADIUS / 1000} km`)
    const slider = screen.getByRole('slider', { name: 'Search radius' })
    fireEvent.change(slider, { target: { value: 1000 } })
    expect(state.pointFilterCenter).toBeUndefined()
    expect(state.pointFilterRadius).toBe(1000)
  })

  it('should render small PointSearch and set radius', async () => {
    const { state } = renderComponent(true)

    expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    screen.getByText('Set Radius:')
    const slider = screen.getByRole('slider', { name: 'Search radius' })
    screen.getByText(`${MIN_CIRCLE_RADIUS / 1000} km`)
    fireEvent.change(slider, { target: { value: 2000 } })
    expect(state.pointFilterCenter).toBeUndefined()
    expect(state.pointFilterRadius).toBe(2000)
  })
})
