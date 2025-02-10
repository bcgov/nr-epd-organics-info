import { getByText, screen } from '@testing-library/react'
import Header from '@/components/Header'
import { render } from '@/test-utils'
import { themeBreakpointValues } from '@/theme'

describe('Header suite', () => {
  test('renders the Header on wide screen', async () => {
    const { user } = render(<Header />, {
      screenWidth: themeBreakpointValues.xxl + 10,
      withRouter: true,
    })

    const logoLink = screen.getByAltText('Logo')
    screen.getByText('Organics Info')
    const mapLink = screen.getByRole('link', { name: 'Map Search' })
    const textLink = screen.getByRole('link', { name: 'Text Search' })
    const contactLink = screen.getByRole('link', { name: 'Contact Us' })

    await user.click(mapLink)
    expect(location.href).toContain('/map')

    await user.click(textLink)
    expect(location.href).toContain('/search')

    await user.click(guidanceLink)
    expect(location.href).toContain('/guidance')

    await user.click(contactLink)
    expect(location.href).toContain('/contact')

    // Clicking on the logo will redirect back to "/"
    // Find the base url without hard-coding the url
    const { href } = location
    const baseUrl = href.substring(0, href.indexOf('/contact') + 1)

    await user.click(logoLink)
    expect(location.href).toEqual(baseUrl)
  })

  test('renders the Header on narrow screen with menu', async () => {
    // On small+medium screens a menu is shown instead of toolbar buttons
    const { user } = render(<Header />, {
      screenWidth: themeBreakpointValues.sm,
      withRouter: true,
    })

    const menuButton = screen.getByTitle('Menu')
    // Show the menu
    await user.click(menuButton)

    const menu = screen.getByRole('menu')
    const mapLink = getByText(menu, 'Map Search')
    const textLink = getByText(menu, 'Text Search')
    const contactLink = getByText(menu, 'Contact Us')

    await user.click(mapLink)
    expect(location.href).toContain('/map')

    await user.click(textLink)
    expect(location.href).toContain('/search')

    await user.click(contactLink)
    expect(location.href).toContain('/contact')
  })
})
