import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { Mock } from 'vitest'

import { render } from '@/test-utils'
import { FindMeControl } from './FindMeControl'

describe('Test suite for FindMeControl', () => {
  it('should render FindMeControl', async () => {
    const { user } = render(<FindMeControl />, {
      withStateProvider: true,
    })

    const btn = screen.getByTitle('Show my location on the map')
    expect(btn).not.toHaveClass('map-control-button--active')

    await user.click(btn)

    expect(btn).toHaveClass('map-control-button--active')
  })

  it('should not render FindMeControl when no permission', async () => {
    const queryMock = navigator.permissions.query as Mock
    queryMock.mockResolvedValueOnce({
      name: 'geolocation',
      state: 'denied',
    })

    render(<FindMeControl />, {
      withStateProvider: true,
    })

    // Initially shows up until permissions query resolves
    await waitForElementToBeRemoved(() =>
      screen.getByTitle('Show my location on the map'),
    )
  })
})
