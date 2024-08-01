import { screen, waitForElementToBeRemoved } from '@testing-library/react'

import { FindMeButton } from './FindMeButton'
import { render } from '@/test-utils'
import { Mock } from '~/vitest'

describe('Test suite for FindMeButton', () => {
  it('should render FindMeButton', async () => {
    const { user } = render(<FindMeButton />, {
      withStateProvider: true,
    })

    const btn = screen.getByRole('button', { name: 'Find Me' })
    expect(btn).not.toHaveClass('map-button--active')

    await user.click(btn)

    expect(btn).toHaveClass('map-button--active')
  })

  it('should not render FindMeButton when no permission', async () => {
    const queryMock = navigator.permissions.query as Mock
    queryMock.mockResolvedValueOnce({
      name: 'geolocation',
      state: 'denied',
    })

    render(<FindMeButton />, {
      withStateProvider: true,
    })

    // Initially shows up until permissions query resolves
    await waitForElementToBeRemoved(() =>
      screen.getByRole('button', { name: 'Find Me' }),
    )
  })
})
