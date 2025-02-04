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

    // Test InfoSection content
    screen.getByRole('heading', { name: 'Who is this for' })
    screen.getByText('I am a member of the public')
    screen.getByText('I am an industry professional')
    screen.getByText('I am an organization')
    screen.getByText(
      'I am a local government of First Nations and want to see information about authorized compose and biosolids facilities.',
    )
    screen.getByAltText('Information image')

    await user.click(mapButton)
    expect(location.href).toContain('/map')

    await user.click(listButton)
    expect(location.href).toContain('/search')
  })
})
