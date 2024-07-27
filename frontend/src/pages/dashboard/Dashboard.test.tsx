import { screen } from '@testing-library/react'

import { render } from '@/test-utils'
import Dashboard from './Dashboard'

describe('Test suite for Dashboard', () => {
  it('should render Dashboard', async () => {
    const { user } = render(<Dashboard />, {
      withRouter: true,
    })

    screen.getByRole('heading', {
      name: 'Find an authorized compost and biosolid facility in British Columbia',
    })
    const mapButton = screen.getByRole('button', { name: 'Search on a map' })
    const listButton = screen.getByRole('button', {
      name: 'List all authorizations',
    })

    screen.getByRole('heading', {
      name: 'Organic Recycling in B.C.',
    })
    screen.getByRole('heading', {
      name: 'The B.C. government has a plan to update the regulation to',
    })
    screen.getByRole('link', { name: 'Project Update Report' })

    // There are two links for each - one for mobile, one for desktop
    let links = screen.getAllByRole('link', { name: 'Legislation' })
    expect(links).toHaveLength(2)
    links = screen.getAllByRole('link', { name: 'Process and procedures' })
    expect(links).toHaveLength(2)
    links = screen.getAllByRole('link', { name: 'Compliance and enforcement' })
    expect(links).toHaveLength(2)

    screen.getByAltText('Legislation')
    screen.getByAltText('Process and procedures')
    screen.getByAltText('Compliance and enforcement')

    await user.click(mapButton)
    expect(location.href).toContain('/map')

    await user.click(listButton)
    expect(location.href).toContain('/search')
  })
})
