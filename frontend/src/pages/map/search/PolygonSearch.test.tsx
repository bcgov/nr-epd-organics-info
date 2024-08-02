import { screen } from '@testing-library/react'
import { LatLngTuple } from 'leaflet'

import { render } from '@/test-utils'
import {
  initialState,
  usePolygonFilterFinished,
  usePolygonFilterPositions,
} from '@/features/omrr/omrr-slice'
import { useActiveTool } from '@/features/map/map-slice'
import { ActiveToolEnum } from '@/constants/constants'
import { PolygonSearch } from './PolygonSearch'

interface State {
  polygonFilterFinished: boolean
  polygonFilterPositions: LatLngTuple[]
  activeTool?: ActiveToolEnum
}

describe('Test suite for PolygonSearch', () => {
  function renderComponent(
    isSmall = false,
    className: string | undefined = undefined,
    polygonFilterPositions: LatLngTuple[] = [],
    polygonFilterFinished = false,
  ) {
    const state: State = {
      polygonFilterFinished,
      polygonFilterPositions,
    }
    const TestComponent = () => {
      Object.assign(state, {
        polygonFilterFinished: usePolygonFilterFinished(),
        polygonFilterPositions: usePolygonFilterPositions(),
        activeTool: useActiveTool(),
      })
      return <PolygonSearch isSmall={isSmall} className={className} />
    }
    const { user } = render(<TestComponent />, {
      withStateProvider: true,
      initialState: {
        omrr: {
          ...initialState,
          polygonFilterFinished,
          polygonFilterPositions,
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
    expect(state.polygonFilterFinished).toBe(false)
    expect(state.polygonFilterPositions).toHaveLength(0)
    expect(state.activeTool).toBeUndefined()
  })

  it('should render large PolygonSearch and delete last point', async () => {
    const positions: LatLngTuple[] = [[48, -123]]
    const { user, state } = renderComponent(false, undefined, positions)

    expect(state.polygonFilterFinished).toBe(false)
    expect(state.polygonFilterPositions).toEqual(positions)

    const deleteBtn = screen.getByRole('button', { name: 'Delete Last Point' })
    expect(deleteBtn).toBeEnabled()
    const finishBtn = screen.getByRole('button', { name: 'Finish Shape' })
    // Requires 3+ points
    expect(finishBtn).toBeDisabled()

    await user.click(deleteBtn)

    expect(state.polygonFilterFinished).toBe(false)
    expect(state.polygonFilterPositions).toHaveLength(0)
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
    expect(state.polygonFilterFinished).toBe(true)
    expect(state.polygonFilterPositions).toEqual(positions)
    expect(finishBtn).toBeDisabled()

    const deleteShapeBtn = screen.getByRole('button', { name: 'Delete Shape' })
    await user.click(deleteShapeBtn)

    expect(state.polygonFilterFinished).toBe(false)
    expect(state.polygonFilterPositions).toHaveLength(0)
  })
})
