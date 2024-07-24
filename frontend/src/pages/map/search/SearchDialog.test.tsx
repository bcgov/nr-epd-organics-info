import { screen, waitFor } from '@testing-library/react'

import { render } from '@/test-utils'
import { themeBreakpointValues } from '@/theme'
import { initialState as initialMapState } from '@/features/map/map-slice'
import {
  initialState as initialOmrrState,
  useSearchTextFilter,
} from '@/features/omrr/omrr-slice'
import { SearchDialog } from './SearchDialog'
import { mockOmrrData } from '@/mocks/mock-omrr-data'
import { SEARCH_BY_ALL } from '@/interfaces/types'

interface State {
  searchTextFilter: string
}

describe('Test suite for SearchDialog', () => {
  function renderComponent(onClose: () => void) {
    const state: State = {
      searchTextFilter: '',
    }
    const TestComponent = () => {
      // Allow testing the current search text
      Object.assign(state, { searchTextFilter: useSearchTextFilter() })
      return <SearchDialog onClose={onClose} />
    }

    const { user } = render(<TestComponent />, {
      screenWidth: themeBreakpointValues.sm,
      withStateProvider: true,
      initialState: {
        omrr: {
          ...initialOmrrState,
          searchBy: SEARCH_BY_ALL,
          allResults: mockOmrrData,
          searchByFilteredResults: mockOmrrData,
          filteredResults: mockOmrrData,
        },
        map: {
          ...initialMapState,
        },
      },
    })
    return { user, state }
  }

  it('should render SearchDialog', async () => {
    const onClose = vi.fn()
    const { user, state } = renderComponent(onClose)

    screen.getByTitle('Back to the map')
    const input = screen.getByPlaceholderText('Search')
    expect(screen.queryAllByRole('option')).toHaveLength(0)

    await user.type(input, 'waste')

    await screen.findByText('WYNDLOW WOOD WASTE REDUCTION INC.')
    screen.getByText('BIOWASTE MANAGEMENT LTD.')
    expect(state.searchTextFilter).toBe('waste')

    const clearBtn = screen.getByTitle('Clear')
    await user.click(clearBtn)

    await waitFor(() => expect(state.searchTextFilter).toBe(''))
    await user.type(input, 'farm')

    // Authorization
    await screen.findByText('RIVER MEADOW FARMS LTD.')
    // City (see mock-places.ts)
    const farmington = await screen.findByText('Farmington')
    expect(state.searchTextFilter).toBe('farm')

    await user.click(farmington)
    // The search text gets set to the city name
    await waitFor(() => expect(state.searchTextFilter).toBe('Farmington'))
  })

  it('should render SearchDialog and click close', async () => {
    const onClose = vi.fn()
    const { user } = renderComponent(onClose)

    const closeBtn = screen.getByTitle('Back to the map')
    await user.click(closeBtn)
    expect(onClose).toHaveBeenCalledOnce()
  })
})
