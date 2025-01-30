import { getByText, screen, waitFor } from '@testing-library/react'

import { render } from '@/test-utils'
import OmrrData from '@/interfaces/omrr'
import { OmrrAuthzDocsResponse } from '@/interfaces/omrr-documents'
import { initialState } from '@/features/omrr/omrr-slice'
import { mockOmrrData } from '@/mocks/mock-omrr-data'
import { mockOmrrApplicationStatusResponse } from '@/mocks/mock-omrr-application-status'
import { mockOmrrDocuments } from '@/mocks/mock-omrr-documents'
import AuthorizationDetails from './AuthorizationDetails'

describe('Test suite for AuthorizationDetails', () => {
  function renderComponent(
    authorizationNumber: number,
    allDocuments: OmrrAuthzDocsResponse[] | undefined = [],
  ) {
    const { user } = render(<AuthorizationDetails />, {
      withRouter: true,
      route: `/authorization/${authorizationNumber}`,
      path: '/authorization/:id',
      withStateProvider: true,
      initialState: {
        omrr: {
          ...initialState,
          allResults: mockOmrrData,
          searchByFilteredResults: mockOmrrData,
        },
        applications: {
          status: 'succeeded',
          allApplications: mockOmrrApplicationStatusResponse,
        },
        documents: {
          status: allDocuments.length > 0 ? 'succeeded' : 'failed',
          allDocuments,
        },
      },
    })
    return { user }
  }

  it('should render AuthorizationDetails with invalid number', async () => {
    const fakeAuthNumber = 999999
    renderComponent(fakeAuthNumber)
    // Should redirect to list page
    await waitFor(() => expect(location.pathname).toBe('/search'))
  })

  it('should render AuthorizationDetails and click back button', async () => {
    const item: OmrrData = mockOmrrData[0]
    const num = item['Authorization Number']
    const { user } = renderComponent(num)

    expect(location.pathname).toBe(`/authorization/${num}`)
    await screen.findByText('WYNDLOW WOOD WASTE REDUCTION INC.')
    const backBtn = screen.getByRole('button', { name: 'Back to Text Search' })

    await user.click(backBtn)
    expect(location.pathname).toBe('/search')
  })

  it('should render AuthorizationDetails with inactive notification', async () => {
    const item: OmrrData = mockOmrrData[0]
    const {
      'Authorization Number': number,
      'Regulated Party': name,
      'Effective/Issue Date': issueDate,
      'Last Amendment Date': lastAmendmentDate,
      'Facility Location': address,
      Latitude,
      Longitude,
    } = item
    renderComponent(number)

    expect(location.pathname).toBe(`/authorization/${number}`)
    await screen.findByText(name)

    screen.getByText('Authorization Status')
    screen.getByText('Inactive')
    screen.getByText('Authorization Number')
    screen.getByText(number)
    screen.getByText('Effective/Issue Date')
    screen.getByText(issueDate)
    screen.getByText('Last Amendment Date')
    if (lastAmendmentDate) {
      screen.getByText(lastAmendmentDate)
    }

    screen.getByText('Location Details')
    screen.getByText('Facility Location')
    screen.getByText(address)
    screen.getByText('Latitude')
    screen.getByText(Latitude)
    screen.getByText('Longitude')
    screen.getByText(Longitude)

    screen.getByText('Authorization Details')
    screen.getByText('Authorization Type')
    screen.getByText('Regulation')
    screen.getByRole('link', { name: 'Organic Matter Recycling Regulation' })
    screen.getByText(/^Please note that authorizations issued/)

    expect(screen.queryByText('Documents')).not.toBeInTheDocument()
  })

  it('should render AuthorizationDetails with application status', async () => {
    // This authorization has an application status
    const number = 108485
    const item = mockOmrrData.find(
      (item) => item['Authorization Number'] === number,
    ) as OmrrData

    renderComponent(number)

    screen.getByText('Application Status')
    const box = screen.getByTestId('application-status-box')
    getByText(box, 'Received Date')
    getByText(box, '2019-09-27')
    getByText(box, 'Status')
    getByText(box, 'In Review')

    screen.getByText(/^Applies to amendment and new notifications only/)
    // screen.getByRole('link', { name: 'please see our guidance on data we show' })
  })

  it('should render AuthorizationDetails with no documents', async () => {
    // this one has no documents
    const number = 11123
    renderComponent(number, mockOmrrDocuments)

    screen.getByText('Documents')
    screen.getByText('File Description')
    screen.getByText('There are no documents to display.')
  })

  it('should render AuthorizationDetails with documents', async () => {
    // This one has 2 documents
    const number = 108485
    renderComponent(number, mockOmrrDocuments)

    screen.getByText('Documents')
    screen.getByText('File Description')
    screen.getByText('test-file.pdf')
    screen.getByText('sample-file.pdf')
  })
})
