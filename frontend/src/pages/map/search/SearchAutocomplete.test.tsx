import { screen } from '@testing-library/react'

import { render } from '@/test-utils'
import { initialState as initialOmrrState } from '@/features/omrr/omrr-slice'
import { initialState as initialMapState } from '@/features/map/map-slice'
import { mockOmrrData } from '@/mocks/mock-omrr-data'
import { SEARCH_BY_ALL } from '@/interfaces/types'
import { SearchAutocomplete } from './SearchAutocomplete'

describe('Test suite for SearchAutocomplete', () => {
  it('should render SearchAutocomplete', async () => {
    const { user } = render(<SearchAutocomplete />, {
      withStateProvider: true,
      initialState: {
        omrr: {
          ...initialOmrrState,
          // Use all results
          searchBy: SEARCH_BY_ALL,
          allResults: mockOmrrData,
          searchByFilteredResults: mockOmrrData,
          filteredResults: mockOmrrData,
          status: 'succeeded',
        },
        map: {
          ...initialMapState,
        },
      },
    })

    const input = screen.getByPlaceholderText('Search')
    // This should match 4 results
    await user.type(input, 'waste')
    const options = await screen.findAllByRole('option')
    expect(options).toHaveLength(4)
    await screen.findByText(/WYNDLOW WOOD WASTE/i)
    screen.getByText('11123')
    screen.getByText(/BIOWASTE MANAGEMENT/i)
    screen.getByText('11475')

    await user.clear(input)
    await user.type(input, 'V9N')
    await screen.findByText('14517')
    screen.getByText(/RIVER MEADOW FARMS/i)
    screen.getByText('Postal Code')
    const text = screen.getByText('V9N 7J3')

    await user.click(text)
    expect(input).toHaveValue('V9N 7J3')

    const clearBtn = screen.getByTitle('Clear')
    await user.click(clearBtn)

    expect(input).toHaveValue('')
    await user.type(input, 'Vancouver')
    const places = await screen.findAllByText('City')
    expect(places).toHaveLength(3)
    screen.getByText('North Vancouver')
    screen.getByText('West Vancouver')
  })
})
