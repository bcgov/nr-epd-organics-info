import { screen } from '@testing-library/react'
import { Mock } from 'vitest'
import { LatLngTuple } from 'leaflet'

import { render } from '@/test-utils'
import { useUserLocation } from '@/features/omrr/omrr-slice'
import { LocationIconButton } from './LocationIconButton'

interface State {
  userLocation?: LatLngTuple
}

describe('Test suite for LocationIconButton', () => {
  it('should render LocationIconButton with geolocation granted', async () => {
    const state: State = {}
    const TestComponent = () => {
      Object.assign(state, {
        userLocation: useUserLocation(),
      })
      return <LocationIconButton />
    }
    const { user } = render(<TestComponent />, {
      withStateProvider: true,
    })

    // Initially hidden, but the permission will be 'granted'
    const btn = await screen.findByTitle('Sort results by my location')
    const icon = screen.getByTitle('My location icon')
    expect(icon).not.toHaveClass('search-input-icon--active')
    expect(state.userLocation).toBeUndefined()
    expect(navigator.permissions.query).toHaveBeenCalledOnce()
    expect(navigator.permissions.query).toHaveBeenCalledWith({
      name: 'geolocation',
    })
    expect(navigator.geolocation.getCurrentPosition).not.toHaveBeenCalled()

    await user.click(btn)
    expect(icon).toHaveClass('search-input-icon--active')
    // See test-setup.ts
    expect(state.userLocation).toEqual([48, -123])
    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledOnce()

    await user.click(btn)
    expect(icon).not.toHaveClass('search-input-icon--active')
    expect(state.userLocation).toBeUndefined()
  })

  it('should render LocationIconButton with geolocation prompt then denied', async () => {
    // The getCurrentPosition function is actually a vi.fn() - see test-utils.ts
    const getLocationMock = navigator.geolocation.getCurrentPosition as Mock
    getLocationMock.mockImplementationOnce(
      (_success: any, error: (err: GeolocationPositionError) => void) => {
        error({
          code: 1,
          message: 'User denied geolocation',
        } as GeolocationPositionError)
      },
    )

    const { user } = render(<LocationIconButton />, {
      withStateProvider: true,
    })

    const btn = await screen.findByTitle('Sort results by my location')

    await user.click(btn)
    // permission will be denied, and button hidden
    expect(
      screen.queryByTitle('Sort results by my location'),
    ).not.toBeInTheDocument()
  })
})
