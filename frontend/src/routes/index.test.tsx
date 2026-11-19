import { screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'

import AppRoutes from './index'
import { render } from '@/test-utils'
import { initialState } from '@/features/omrr/omrr-slice'
import { mockOmrrData } from '@/mocks/mock-omrr-data'
import { mockOmrrApplicationStatusResponse } from '@/mocks/mock-omrr-application-status'
import { mockOmrrDocuments } from '@/mocks/mock-omrr-documents'
import { mswServer } from '@/test-setup'

const preloadedState = {
  omrr: {
    ...initialState,
    status: 'succeeded' as const,
    allResults: mockOmrrData,
    searchByFilteredResults: mockOmrrData,
    filteredResults: mockOmrrData,
  },
  applications: {
    status: 'succeeded' as const,
    allApplications: mockOmrrApplicationStatusResponse,
  },
  documents: {
    status: 'succeeded' as const,
    allDocuments: mockOmrrDocuments,
  },
}

describe('AppRoutes', () => {
  it('renders Dashboard on / and falls back unknown routes to Dashboard', () => {
    render(<AppRoutes />, {
      withRouter: true,
      route: '/',
      path: '*',
      withStateProvider: true,
      initialState: preloadedState,
    })

    expect(
      screen.getByText(
        'Find authorized land application sites and compost facilities in B.C.',
      ),
    ).toBeInTheDocument()

    render(<AppRoutes />, {
      withRouter: true,
      route: '/unknown-route',
      path: '*',
      withStateProvider: true,
      initialState: preloadedState,
    })

    expect(
      screen.getAllByText(
        'Find authorized land application sites and compost facilities in B.C.',
      ).length,
    ).toBeGreaterThanOrEqual(2)
  })

  it('renders AuthorizationList on /search', async () => {
    render(<AppRoutes />, {
      withRouter: true,
      route: '/search',
      path: '*',
      withStateProvider: true,
      initialState: preloadedState,
    })

    expect(
      await screen.findByTestId('auth-list-top-section-title'),
    ).toBeInTheDocument()
    await waitFor(() => expect(navigator.permissions.query).toHaveBeenCalled())
  })

  it('renders AuthorizationDetails on /authorization/:id', async () => {
    mswServer.use(
      http.get('*/api/public/search', () =>
        HttpResponse.json([{ searchResults: [] }]),
      ),
    )

    const authNumber = mockOmrrData[0]['Authorization Number']
    render(<AppRoutes />, {
      withRouter: true,
      route: `/authorization/${authNumber}`,
      path: '*',
      withStateProvider: true,
      initialState: preloadedState,
    })

    expect(
      await screen.findByText(mockOmrrData[0]['Regulated Party']),
    ).toBeInTheDocument()
    expect(await screen.findByText('No results found')).toBeInTheDocument()
  })

  it('renders MapView on /map', async () => {
    render(<AppRoutes />, {
      withRouter: true,
      route: '/map',
      path: '*',
      withStateProvider: true,
      initialState: preloadedState,
    })

    expect(await screen.findByTestId('map-view')).toBeInTheDocument()
    await waitFor(() => expect(navigator.permissions.query).toHaveBeenCalled())
  })

  it('renders ContactUs on /contact', () => {
    render(<AppRoutes />, {
      withRouter: true,
      route: '/contact',
      path: '*',
      withStateProvider: true,
      initialState: preloadedState,
    })

    expect(screen.getByRole('heading', { name: /Contact/i })).toBeInTheDocument()
  })
})
