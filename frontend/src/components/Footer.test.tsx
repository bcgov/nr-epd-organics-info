import React from 'react'
import { screen } from '@testing-library/react'

import { render } from '@/test-utils'
import { themeBreakpointValues } from '@/theme'
import Footer from './Footer'

describe('Test suite for Footer', () => {
  it('should render Footer on large page', () => {
    render(<Footer />, {
      screenWidth: themeBreakpointValues.xxl,
      withRouter: true,
      route: '/map',
    })

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(5)
  })

  it('should render Footer on small page with map view showing', () => {
    render(<Footer />, {
      screenWidth: themeBreakpointValues.sm - 10,
      withRouter: true,
      route: '/map',
    })

    expect(screen.queryByRole('footer')).not.toBeInTheDocument()
  })
})
