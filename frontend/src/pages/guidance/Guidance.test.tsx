import React from 'react'
import { getByAltText, screen } from '@testing-library/react'

import { DATA_LAYER_GROUPS } from '@/constants/data-layers'
import { render } from '@/test-utils'
import { GuidancePage } from './GuidancePage'

describe('Test suite for GuidancePage', () => {
  it('should render GuidancePage', () => {
    render(<GuidancePage />, {
      withRouter: true,
    })

    screen.getByRole('heading', { name: 'Guidance' })
    screen.getByRole('heading', { name: 'How to interpret' })
    screen.getByRole('heading', { name: 'Limitations' })
    screen.getByRole('heading', { name: 'Definitions' })
    screen.getByRole('heading', { name: 'Map layers' })
    screen.getByRole('heading', { name: 'Other sources of information' })

    const listItems = screen.getAllByRole('listitem')
    expect(listItems.length > 0).toBe(true)

    screen.getByAltText('Map layers icon')
    screen.getByAltText('Other sources of information icon')

    DATA_LAYER_GROUPS.forEach((group) => {
      screen.getByText(group.name)
      group.layers.forEach(({ name, webUrl }) => {
        if (webUrl) {
          const link = screen.getByRole('link', { name })
          expect(link).toHaveAttribute('href', webUrl)
        }
      })
    })
  })
})
