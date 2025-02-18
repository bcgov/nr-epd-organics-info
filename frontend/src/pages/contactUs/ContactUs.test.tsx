import { screen } from '@testing-library/react'

import { render } from '@/test-utils'
import { ContactUs } from './ContactUs'

describe('Test suite for ContactUs', () => {
  it('should render ContactUs page with all sections and content', () => {
    render(<ContactUs />, {
      withRouter: true,
    })

    // Test main heading structure
    expect(
      screen.getByRole('heading', { name: 'Contact us', level: 1 }),
    ).toBeInTheDocument()

    // Test section headings
    expect(
      screen.getByText('Organic matter', {
        selector: '[data-section-header="true"]',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Authorizations', {
        selector: '[data-section-header="true"]',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Report natural resource violations', {
        selector: '[data-section-header="true"]',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Need general help?' }),
    ).toBeInTheDocument()

    // Test links
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(6) // All email and web links

    // Verify link destinations
    expect(links[0]).toHaveAttribute(
      'href',
      'mailto:ENV.OMRR.Reg.Reviews@gov.bc.ca',
    )
    expect(links[1]).toHaveAttribute('href', 'mailto:ENVCIA@gov.bc.ca')
    expect(links[2]).toHaveAttribute(
      'href',
      'https://forms.gov.bc.ca/environment/wda-enquiry/',
    )
    expect(links[3]).toHaveAttribute('href', 'tel:18779527277')
    expect(links[4]).toHaveAttribute(
      'href',
      'https://forms.gov.bc.ca/environment/rapp/',
    )
    expect(links[5]).toHaveAttribute(
      'href',
      'https://www2.gov.bc.ca/gov/content/home/get-help-with-government-services',
    )
  })
})
