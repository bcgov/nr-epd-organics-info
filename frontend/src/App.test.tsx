import { screen } from '@testing-library/react'

import App from '@/App'
import { errorHandlers, mswServer } from '@/test-setup'
import { render } from '@/test-utils'

describe('App suite', () => {
  test('renders the App with successful data load', async () => {
    render(<App />, { withStateProvider: true })

    screen.getByAltText('Logo')
    screen.getByText('Organics Info')
    // Wait for dashboard to load
    await screen.findByText(
      'Find an authorized compost and biosolid facility in British Columbia',
    )
  })

  test('renders the App with error loading data', async () => {
    mswServer.use(...errorHandlers)

    render(<App />, { withStateProvider: true })

    screen.getByAltText('Logo')
    screen.getByText('Organics Info')
    // Wait for error message to display
    await screen.findByText('Loading failed, please try again later')
  })
})
