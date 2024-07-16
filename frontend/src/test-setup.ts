import '@testing-library/jest-dom'
import '@testing-library/jest-dom/vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { afterAll, afterEach, beforeAll, expect } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import mediaQuery from 'css-mediaquery'

import OmrrResponse from '@/interfaces/omrr-response'
import { cleanup } from '@testing-library/react'
import { mockOmrrData } from '@/mocks/mock-omrr-data'
import { mockPlaces } from '@/mocks/mock-places'

expect.extend(matchers)

// Vitest Mocks

// This module doesn't work in unit tests as it is not in ESM
vi.mock('react-leaflet-cluster', () => {
  return {
    default: ({ children }: any) => {
      return children
    },
  }
})

// Define scrollTo and scrollIntoView
Object.defineProperty(window, 'scrollTo', {
  value: () => {},
  writable: true,
})
Element.prototype.scrollIntoView = vi.fn()
Element.prototype.scrollTo = vi.fn(() => {})

// Define geolocation and permissions query
const geoLocationResult: GeolocationPosition = {
  coords: {
    latitude: 48,
    longitude: -123,
    accuracy: 0,
    heading: 0,
    speed: 0,
    altitude: 0,
    altitudeAccuracy: 1,
  },
  timestamp: Date.now(),
}

Object.defineProperty(navigator, 'geolocation', {
  value: {
    getCurrentPosition: (success: (pos: GeolocationPosition) => void) => {
      success(geoLocationResult)
    },
    watchPosition: (success: (pos: GeolocationPosition) => void) => {
      success(geoLocationResult)
      return 0
    },
    clearWatch: () => {},
  },
})

Object.defineProperty(navigator, 'permissions', {
  value: {
    query: ({ name }: PermissionDescriptor) => {
      return Promise.resolve({
        name,
        state: 'granted',
      } as PermissionStatus)
    },
  },
})

/**
 * Media Query support
 * Call the setScreenWidth() function before a test to set the window width.
 * @see https://mui.com/material-ui/react-use-media-query/#testing
 * @see https://stackoverflow.com/questions/56180772/jest-material-ui-correctly-mocking-usemediaquery
 */
function createMatchMedia() {
  return (query: string): any => {
    const width = window.innerWidth
    return {
      matches: mediaQuery.match(query, { width }),
      media: query,
      onchange: null,
      addListener: () => {},
      addEventListener: () => {},
      removeListener: () => {},
      removeEventListener: () => {},
    }
  }
}

// MSW Setup
const baseUrl = 'http://localhost:3000'

const omrrResponse: OmrrResponse = {
  omrrData: mockOmrrData,
  lastModified: new Date().toISOString(),
}

const successHandlers = [
  http.get(`${baseUrl}/api/omrr`, () => {
    return HttpResponse.json(omrrResponse, { status: 200 })
  }),
  http.get(`${baseUrl}/places.json`, () => {
    return HttpResponse.json(mockPlaces, { status: 200 })
  }),
]

export const errorHandlers = [
  http.get(`${baseUrl}/api/omrr`, () => {
    return new HttpResponse(null, { status: 500 })
  }),
]

export const mswServer = setupServer(...successHandlers)

// Start server before all tests
beforeAll(() => {
  window.matchMedia = createMatchMedia()
  mswServer.listen({ onUnhandledRequest: 'error' })
})

//  Close server after all tests
afterAll(() => mswServer.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  cleanup()
  mswServer.resetHandlers()
})
