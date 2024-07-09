import '@testing-library/jest-dom'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import mediaQuery from 'css-mediaquery'

import OmrrResponse from '@/interfaces/omrr-response'
import { omrrTestData } from '@/mocks/omrr-data'
import { cleanup } from '@testing-library/react'

// Vitest Mocks

// This module doesn't work in unit tests as it is not in ESM
vi.mock('react-leaflet-cluster', () => {
  return {
    default: ({ children }: any) => {
      return children
    },
  }
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
const baseUrl = 'http://localhost:3000/api'

const omrrResponse: OmrrResponse = {
  omrrData: omrrTestData,
  lastModified: new Date().toISOString(),
}

const successHandlers = [
  http.get(`${baseUrl}/omrr`, () => {
    return HttpResponse.json(omrrResponse, { status: 200 })
  }),
]

export const errorHandlers = [
  http.get(`${baseUrl}/omrr`, () => {
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
