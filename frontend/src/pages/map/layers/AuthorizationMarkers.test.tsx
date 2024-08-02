import { screen } from '@testing-library/react'
import { useSelector } from 'react-redux'

import { render } from '@/test-utils'
import {
  initialState as initialOmrrState,
  OmrrSliceState,
} from '@/features/omrr/omrr-slice'
import { mockOmrrData } from '@/mocks/mock-omrr-data'
import {
  initialState as initialMapState,
  MapSliceState,
  selectZoomPosition,
  useSelectedItem,
  ZoomPosition,
} from '@/features/map/map-slice'
import OmrrData from '@/interfaces/omrr'
import { TestMapContainer } from './TestMapContainer'
import { AuthorizationMarkers } from './AuthorizationMarkers'
import { ActiveToolEnum } from '@/constants/constants'

interface State {
  selectedItem?: OmrrData
  zoomPosition?: ZoomPosition
}

describe('Test suite for AuthorizationMarkers', () => {
  function renderComponent(
    omrrState: Partial<OmrrSliceState> = {},
    mapState: Partial<MapSliceState> = {},
    screenWidth = 1500,
  ) {
    const state: State = {}

    const TestComponent = () => {
      Object.assign(state, {
        selectedItem: useSelectedItem(),
        zoomPosition: useSelector(selectZoomPosition),
      })
      return (
        <TestMapContainer>
          <AuthorizationMarkers />
        </TestMapContainer>
      )
    }

    const { user } = render(<TestComponent />, {
      screenWidth,
      withStateProvider: true,
      initialState: {
        omrr: {
          ...initialOmrrState,
          status: 'succeeded',
          filteredResults: mockOmrrData,
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

  it('should not render AuthorizationMarkers if status is not succeeded', () => {
    renderComponent({ status: 'failed' })
    expect(
      screen.queryByAltText('Authorization marker'),
    ).not.toBeInTheDocument()
  })

  it('should not render AuthorizationMarkers if no items', () => {
    renderComponent({ filteredResults: [] })
    expect(
      screen.queryByAltText('Authorization marker'),
    ).not.toBeInTheDocument()
  })

  it('should render AuthorizationMarkers and click on marker', async () => {
    const { user, state } = renderComponent()

    const markers = screen.getAllByAltText('Authorization marker')
    expect(markers).toHaveLength(mockOmrrData.length)

    const [marker] = markers
    await user.click(marker)

    expect(state.selectedItem).toBe(mockOmrrData[0])
    expect(state.zoomPosition).toBeDefined()
  })

  it('should render AuthorizationMarkers in polygon search mode and click on marker', async () => {
    const { user, state } = renderComponent(
      {},
      { activeTool: ActiveToolEnum.polygonSearch },
    )

    const markers = screen.getAllByAltText('Authorization marker')
    const [marker] = markers
    // Click is ignored when in polygon search mode
    await user.click(marker)

    expect(state.selectedItem).toBeUndefined()
  })

  it('should render AuthorizationMarkers in polygon search mode with positions', async () => {
    const { user, state } = renderComponent(
      {
        polygonFilterPositions: [[48.123, -123.123]],
        polygonFilterFinished: false,
      },
      { activeTool: ActiveToolEnum.polygonSearch },
    )

    const marker = screen.getAllByAltText('Authorization marker')[0]
    expect(marker).toBeDefined()
    await user.click(marker)

    expect(state.selectedItem).toBeUndefined()
  })

  it('should render AuthorizationMarkers in point search mode and click on marker', async () => {
    const { user, state } = renderComponent(
      {},
      { activeTool: ActiveToolEnum.pointSearch },
    )

    const markers = screen.getAllByAltText('Authorization marker')
    const [marker] = markers
    await user.click(marker)

    expect(state.selectedItem).toBeUndefined()
  })
})
