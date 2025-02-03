import { getByText, screen, waitFor } from '@testing-library/react'

import { render } from '@/test-utils'
import OmrrData from '@/interfaces/omrr'
import { OmrrAuthzDocsResponse } from '@/interfaces/omrr-documents'
import { initialState } from '@/features/omrr/omrr-slice'
import { mockOmrrData } from '@/mocks/mock-omrr-data'
import { mockOmrrApplicationStatusResponse } from '@/mocks/mock-omrr-application-status'
import { mockOmrrDocuments } from '@/mocks/mock-omrr-documents'
import AuthorizationDetails from './AuthorizationDetails'
import { mockComplianceData } from '../../mocks/mock-compliance-data'

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
      'Authorization Type': authorizationType,
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
    screen.getByText(authorizationType)
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
    const { 'Authorization Type': authorizationType } = item

    renderComponent(number)

    screen.getByText('Application Status')
    const box = screen.getByTestId('application-status-box')
    getByText(box, authorizationType)
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
  })

  it('should render compliance section with no results', async () => {
    const number = 12398
    renderComponent(number)

    screen.getByText('Compliance and Enforcement')
    screen.getByText('Date Issued')
    screen.getByText('Type')
    screen.getByText('Summary')
    screen.getByText('Action')
    await screen.findByText('No results found')
  })

  it('should render compliance section with data', async () => {
    const number = 12398
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ searchResults: mockComplianceData }]),
      }),
    ) as ReturnType<typeof vi.fn>

    renderComponent(number)

    screen.getByText('Compliance and Enforcement')
    const headerRow = screen
      .getByText('Date Issued')
      .closest('.compliance-table-header')
    expect(headerRow).toBeInTheDocument()

    // Wait for data to load
    await screen.findByText(mockComplianceData[0].summary)
    screen.getByText('View')
  })

  it('should handle compliance section sorting', async () => {
    const number = 12398
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ searchResults: mockComplianceData }]),
      }),
    ) as ReturnType<typeof vi.fn>

    const { user } = renderComponent(number)

    // Wait for data to load
    await screen.findByText(mockComplianceData[0].summary)

    const sortButton = screen.getByText('Date Issued').closest('button')
    expect(sortButton).toBeInTheDocument()

    await user.click(sortButton!)
    expect(screen.getByTestId('ArrowDownwardIcon')).toBeInTheDocument()

    await user.click(sortButton!)
    expect(screen.getByTestId('ArrowUpwardIcon')).toBeInTheDocument()

    await user.click(sortButton!)
    expect(screen.getByTestId('ImportExportIcon')).toBeInTheDocument()
  })
})
