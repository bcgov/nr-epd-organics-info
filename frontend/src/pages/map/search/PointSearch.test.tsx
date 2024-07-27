import { fireEvent, screen } from '@testing-library/react'

import { PointSearch } from './PointSearch'
import { render } from '@/test-utils'
import { useCircleFilter } from '@/features/omrr/omrr-slice'
import { useActiveTool } from '@/features/map/map-slice'
import { CircleFilter } from '@/interfaces/omrr-filter'
import { ActiveToolEnum, MIN_CIRCLE_RADIUS } from '@/constants/constants'

interface State {
  circleFilter?: CircleFilter
  activeTool?: ActiveToolEnum
}

describe('Test suite for PointSearch', () => {
  function renderComponent(
    isSmall = false,
    className: string | undefined = undefined,
  ) {
    const state: State = {}
    const TestComponent = () => {
      Object.assign(state, {
        circleFilter: useCircleFilter(),
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
    expect(state.circleFilter).toBeUndefined()
    expect(state.activeTool).toBeUndefined()
  })

  it('should render large PointSearch and set radius', async () => {
    const { user, state } = renderComponent(false)

    const setRadiusBtn = screen.getByRole('button', { name: 'Set Radius' })
    await user.click(setRadiusBtn)
    screen.getByText(`${MIN_CIRCLE_RADIUS} m`)
    const slider = screen.getByRole('slider', { name: 'Search radius' })
    fireEvent.change(slider, { target: { value: 1000 } })
    expect(state.circleFilter).toEqual({ center: undefined, radius: 1000 })
  })

  it('should render small PointSearch and set radius', async () => {
    const { state } = renderComponent(true)

    expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    screen.getByText('Set Radius:')
    const slider = screen.getByRole('slider', { name: 'Search radius' })
    screen.getByText(`${MIN_CIRCLE_RADIUS} m`)
    fireEvent.change(slider, { target: { value: 2000 } })
    expect(state.circleFilter).toEqual({ center: undefined, radius: 2000 })
  })
})
