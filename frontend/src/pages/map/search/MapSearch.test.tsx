import { screen } from '@testing-library/react'

import { MapSearch } from './MapSearch'
import { render } from '@/test-utils'

describe('Test suite for MapSearch', () => {
  it('should render MapSearch on desktop', async () => {
    render(<MapSearch />, {
      screenWidth: 1500,
      withStateProvider: true,
    })

    screen.getByPlaceholderText('Search')
    screen.getByRole('button', { name: 'Find Me' })
    screen.getByRole('button', { name: 'Layers' })
    screen.getByRole('button', { name: 'Polygon Search' })
    screen.getByRole('button', { name: 'Radius Search' })
    screen.getByText('Search By:')
    screen.getByRole('button', { name: 'Filter by Facility Type' })

    const dropdownArrows = screen.getAllByTitle('Down arrow')
    expect(dropdownArrows).toHaveLength(3)
  })

  it('should render MapSearch on mobile', async () => {
    render(<MapSearch />, {
      screenWidth: 500,
      withStateProvider: true,
    })

    expect(screen.queryByPlaceholderText('Search')).not.toBeInTheDocument()
    screen.getByRole('button', { name: 'Text Search' })
    expect(
      screen.queryByRole('button', { name: 'Find Me' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Layers' }),
    ).not.toBeInTheDocument()
    screen.getByRole('button', { name: 'Polygon Search' })
    screen.getByRole('button', { name: 'Point Search' })
    screen.getByText('Search By:')
    screen.getByRole('button', { name: 'Filter by Facility Type' })
  })
})
