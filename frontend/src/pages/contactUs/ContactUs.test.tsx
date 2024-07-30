import React from 'react'
import { screen } from '@testing-library/react'

import { render } from '@/test-utils'
import { ContactUs } from './ContactUs'

describe('Test suite for ContactUs', () => {
  it('should render ContactUs', () => {
    render(<ContactUs />, {
      withRouter: true,
    })

    screen.getByRole('heading', { name: 'Contact Us' })
    screen.getByRole('heading', { name: 'Organic matter' })
    screen.getByRole('heading', { name: 'Authorizations' })
    screen.getByRole('heading', { name: 'Report natural resource violations' })
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(5)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(5)
  })
})
