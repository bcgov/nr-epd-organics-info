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
    screen.getByLabelText('Search Authorizations')
    const input = screen.getByPlaceholderText('Type keyword to search')
    screen.getByText('Search')
    await screen.findByText('There are no matching authorizations.')

    expect(screen.queryByText('Export Results to CSV')).not.toBeInTheDocument()
    expect(screen.queryByTestId('list-pagination')).not.toBeInTheDocument()

    await user.type(input, 'zzzz')

    const clearBtn = screen.getByRole('button', { name: 'Clear Search Text' })
    await user.click(clearBtn)

    await user.type(input, 'abcde')

    const clearBtn2 = screen.getByTitle('Clear')
    await user.click(clearBtn2)
  })

  it('should render AuthorizationList and search and filter', async () => {
    const { user } = renderComponent({
      searchBy: SEARCH_BY_ALL,
      searchByFilteredResults: mockOmrrData,
      filteredResults: mockOmrrData,
    })

    screen.getByText('Search')
    // Results text is shown twice
    const total = mockOmrrData.length
    const resultsText = screen.getAllByText(`Showing 1-2 of ${total} results`)
    expect(resultsText).toHaveLength(2)

    // Test filter checkboxes
    const filterByBtn = screen.getByRole('button', {
      name: 'Filter by Facility Type',
    })
    // Display the checkbox filters
    await user.click(filterByBtn)
    // Only shown when there are active filters
    expect(screen.queryByText('Reset Filters')).not.toBeInTheDocument()

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(6)
    // Initially none are checked
    checkboxes.forEach((cb) => {
      expect(cb).not.toBeChecked()
    })
    const opCertCb = screen.getByRole('checkbox', {
      name: 'Operational Certificate',
    })
    expect(opCertCb).not.toBeChecked()
    await user.click(opCertCb)
    expect(opCertCb).toBeChecked()

    // Should be 1 result now
    screen.getAllByText('Showing 1 result')
    screen.getByText('NANAIMO ORGANIC WASTE LTD.')

    const resetBtn = screen.getByRole('button', { name: 'Reset Filters' })
    await user.click(resetBtn)
    expect(opCertCb).not.toBeChecked()
    expect(screen.queryByText('Reset Filters')).not.toBeInTheDocument()

    // Test the search by radio buttons
    const allRb = screen.getByRole('radio', { name: 'All' })
    expect(allRb).toBeChecked()
    const activeRb = screen.getByRole('radio', { name: 'Active' })
    expect(activeRb).not.toBeChecked()
    const inactiveRb = screen.getByRole('radio', { name: 'Inactive' })
    expect(inactiveRb).not.toBeChecked()

    await user.click(activeRb)

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
