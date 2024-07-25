import { fireEvent, screen } from '@testing-library/react'

import { PolygonSearch } from './PolygonSearch'
import { render } from '@/test-utils'
import {
  initialState,
  useCircleFilter,
  usePolygonFilter,
} from '@/features/omrr/omrr-slice'
import { useActiveTool } from '@/features/map/map-slice'
import { CircleFilter, PolygonFilter } from '@/interfaces/omrr-filter'
import { ActiveToolEnum, MIN_CIRCLE_RADIUS } from '@/constants/constants'
import { LatLngTuple } from 'leaflet'

interface State {
  polygonFilter?: PolygonFilter
  activeTool?: ActiveToolEnum
}

describe('Test suite for PolygonSearch', () => {
  function renderComponent(
    isSmall = false,
    className: string | undefined = undefined,
    positions: LatLngTuple[] | undefined = undefined,
    finished = false,
  ) {
    let polygonFilter: PolygonFilter | undefined
    if (positions) {
      polygonFilter = { positions, finished }
    }

    const state: State = {}
    const TestComponent = () => {
      Object.assign(state, {
        polygonFilter: usePolygonFilter(),
        activeTool: useActiveTool(),
      })
      return <PolygonSearch isSmall={isSmall} className={className} />
    }
    const { user } = render(<TestComponent />, {
      withStateProvider: true,
      initialState: {
        omrr: {
          ...initialState,
          polygonFilter,
        },
      },
    })

    return { user, state }
  }

  it('should render large PolygonSearch and cancel', async () => {
    const { user, state } = renderComponent(false, 'test-class')

    const cancelBtn = screen.getByRole('button', { name: 'Cancel' })
    const deleteBtn = screen.getByRole('button', { name: 'Delete Last Point' })
    expect(deleteBtn).toBeDisabled()
    const finishBtn = screen.getByRole('button', { name: 'Finish Shape' })
    expect(finishBtn).toBeDisabled()

    await user.click(cancelBtn)
    expect(state.polygonFilter).toBeUndefined()
    expect(state.activeTool).toBeUndefined()
  })

  it('should render large PolygonSearch and delete last point', async () => {
    const positions: LatLngTuple[] = [[48, -123]]
    const { user, state } = renderComponent(false, undefined, positions)

    expect(state.polygonFilter).toEqual({ positions, finished: false })

    const deleteBtn = screen.getByRole('button', { name: 'Delete Last Point' })
    expect(deleteBtn).toBeEnabled()
    const finishBtn = screen.getByRole('button', { name: 'Finish Shape' })
    // Requires 3+ points
    expect(finishBtn).toBeDisabled()

    await user.click(deleteBtn)

    expect(state.polygonFilter).toEqual({ positions: [], finished: false })
    expect(deleteBtn).toBeDisabled()
    expect(finishBtn).toBeDisabled()
  })

  it('should render large PolygonSearch and finish', async () => {
    const positions: LatLngTuple[] = [
      [48, -123],
      [49, -123],
      [49, -122],
    ]
    const { user, state } = renderComponent(false, undefined, positions)

    const deleteBtn = screen.getByRole('button', { name: 'Delete Last Point' })
    expect(deleteBtn).toBeEnabled()
    expect(screen.queryByText('Delete Shape')).not.toBeInTheDocument()
    const finishBtn = screen.getByRole('button', { name: 'Finish Shape' })
    expect(finishBtn).toBeEnabled()

    await user.click(finishBtn)
    expect(state.polygonFilter).toEqual({ positions, finished: true })
    expect(finishBtn).toBeDisabled()

    const deleteShapeBtn = screen.getByRole('button', { name: 'Delete Shape' })
    await user.click(deleteShapeBtn)

    expect(state.polygonFilter).toEqual({ positions: [], finished: false })
  })
})
