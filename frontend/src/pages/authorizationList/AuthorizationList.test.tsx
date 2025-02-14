import { screen } from '@testing-library/react'

import { render } from '@/test-utils'
import { initialState, OmrrSliceState } from '@/features/omrr/omrr-slice'
import { mockActiveOmrrData, mockOmrrData } from '@/mocks/mock-omrr-data'
import { SEARCH_BY_ALL } from '@/interfaces/types'
import AuthorizationList from './AuthorizationList'

describe('Test suite for AuthorizationList', () => {
  function renderComponent(state: Partial<OmrrSliceState> = {}, pageSize = 2) {
    return render(<AuthorizationList pageSize={pageSize} />, {
      withRouter: true,
      withStateProvider: true,
      initialState: {
        omrr: {
          ...initialState,
          allResults: mockOmrrData,
          ...state,
        },
      },
    })
  }

  it('should render empty AuthorizationList', async () => {
    const { user } = renderComponent({ filteredResults: [] })

    screen.getByRole('heading', { name: 'Search Authorizations' })
    const searchInput = screen.getByPlaceholderText('Search')
    screen.getAllByRole('button', { name: 'Status' })[0]
    await screen.findByText('There are no matching authorizations.')

    expect(screen.queryByText('Export Results to CSV')).not.toBeInTheDocument()
    expect(screen.queryByTestId('list-pagination')).not.toBeInTheDocument()

    await user.type(searchInput, 'zzzz')

    const clearBtn = screen.getByRole('button', { name: 'Clear Search Text' })
    await user.click(clearBtn)

    await user.type(searchInput, 'abcde')

    const clearBtn2 = screen.getByTitle('Clear')
    await user.click(clearBtn2)
  })

  it('should render AuthorizationList and search and filter', async () => {
    const { user } = renderComponent({
      searchBy: SEARCH_BY_ALL,
      searchByFilteredResults: mockOmrrData,
      filteredResults: mockOmrrData,
    })

    // Test the search dropdown
    const searchByButton = screen.getByRole('button', { name: 'Status' })
    expect(searchByButton).toBeInTheDocument()
    await user.click(searchByButton)

    const activeMenuItem = screen.getByRole('menuitem', { name: 'Active' })
    await user.click(activeMenuItem)

    const [first] = mockActiveOmrrData
    const { 'Authorization Number': number } = first
    screen.getByText(first['Regulated Party'])
    screen.getByText(first['Facility Location'])

    const btns = screen.getAllByRole('button', {
      name: 'View Details',
    })
    expect(btns).toHaveLength(2)
    await user.click(btns[0])
    expect(location.href).toContain(`/authorization/${number}`)
  })
})
