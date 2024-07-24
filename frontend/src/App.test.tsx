import { screen } from '@testing-library/react'

import App from '@/App'
import { render } from '@/test-utils'
import { initialState } from '@/features/omrr/omrr-slice'

describe('App suite', () => {
  test('renders the App with successful data load', () => {
    render(<App />, { withStateProvider: true })

    screen.getByAltText('Logo')
    screen.getByText('Organics Info')
    screen.getByText(
      'Find an authorized compost and biosolid facility in British Columbia',
    )
  })

  test('renders the App with error loading data', () => {
    render(<App />, {
      withStateProvider: true,
      initialState: {
        omrr: {
          ...initialState,
          status: 'failed',
          error: 'Error message',
        },
      },
    })

    screen.getByAltText('Logo')
    screen.getByText('Organics Info')
    screen.getByText('Loading failed, please try again later')
  })
})
