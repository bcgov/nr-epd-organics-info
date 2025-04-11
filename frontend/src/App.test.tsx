import { useSelector } from 'react-redux'
import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import App from '@/App'
import { render } from '@/test-utils'
import {
  initialState,
  selectAllResults,
  selectStatus as selectOmrrStatus,
} from '@/features/omrr/omrr-slice'
import {
  selectAllDocuments,
  useDocumentsStatus,
} from '@/features/omrr/documents-slice'
import {
  selectAllApplications,
  selectStatus as selectApplicationStatus,
} from '@/features/omrr/applications-slice'
import OmrrData from '@/interfaces/omrr'
import { OmrrApplicationStatus } from '@/interfaces/omrr-application-status'
import { OmrrAuthzDocsResponse } from '@/interfaces/omrr-documents'
import { LoadingStatusType } from '@/interfaces/loading-status'
import { mockOmrrData } from '@/mocks/mock-omrr-data'
import { mockOmrrApplicationStatusResponse } from '@/mocks/mock-omrr-application-status'
import { mockOmrrDocuments } from '@/mocks/mock-omrr-documents'

describe('App suite', () => {
  test('renders the App with idle state', () => {
    render(<App />, {
      withStateProvider: true,
      withRouter: true,
    })

    screen.getByText('Organics Info')
    screen.getByTitle('Loading...')
  })

  test('renders the App with loading state', () => {
    render(<App />, {
      withStateProvider: true,
      withRouter: true,
      initialState: {
        omrr: {
          ...initialState,
          status: 'loading',
        },
      },
    })

    screen.getByText('Organics Info')
    screen.getByTitle('Loading...')
  })

  test('renders the App with successful data load', () => {
    render(<App />, {
      withStateProvider: true,
      withRouter: true,
      initialState: {
        omrr: {
          ...initialState,
          status: 'succeeded',
        },
      },
    })

    screen.getByText('Organics Info')
    screen.getByText(
      'Find authorized land application sites and compost facilities in B.C.',
    )
  })

  test('renders the App with error loading data', () => {
    render(<App />, {
      withStateProvider: true,
      withRouter: true,
      initialState: {
        omrr: {
          ...initialState,
          status: 'failed',
          error: 'Error message',
        },
      },
    })

    screen.getByText('Organics Info')
    screen.getByText('Loading failed, please try again later')
  })

  test('renders the App and loads API data using MSW', async () => {
    interface State {
      allResults?: OmrrData[]
      omrrStatus?: LoadingStatusType
      allApplications?: OmrrApplicationStatus[]
      applicationStatus?: LoadingStatusType
      allDocuments?: OmrrAuthzDocsResponse[]
      documentStatus?: LoadingStatusType
    }
    const state: State = {}

    const TestComponent = () => {
      Object.assign(state, {
        allResults: useSelector(selectAllResults),
        omrrStatus: useSelector(selectOmrrStatus),
        allApplications: useSelector(selectAllApplications),
        applicationStatus: useSelector(selectApplicationStatus),
        allDocuments: useSelector(selectAllDocuments),
        documentStatus: useDocumentsStatus(),
      })
      return <App />
    }
    render(<TestComponent />, {
      withStateProvider: true,
      withRouter: true,
      withApiData: true,
    })

    await screen.findByText(
      'Find authorized land application sites and compost facilities in B.C.',
    )
    // Ensure state is set properly
    expect(state.allResults).toBeDefined()
    expect(state.allResults).toHaveLength(mockOmrrData.length)
    expect(state.omrrStatus).toBe('succeeded')

    expect(state.allApplications).toBeDefined()
    expect(state.allApplications).toHaveLength(
      mockOmrrApplicationStatusResponse.length,
    )
    expect(state.applicationStatus).toBe('succeeded')

    expect(state.allDocuments).toBeDefined()
    expect(state.allDocuments).toHaveLength(mockOmrrDocuments.length)
    expect(state.documentStatus).toBe('succeeded')
  })
})
