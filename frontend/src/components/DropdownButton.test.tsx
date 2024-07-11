import React from 'react'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'

import { render } from '@/test-utils'
import { DropdownButton } from './DropdownButton'

describe('Test suite for DropdownButton', () => {
  it('should render DropdownButton', async () => {
    const onClick = vi.fn()
    const { user } = render(
      <DropdownButton
        id="id"
        dropdownContent={<div>Content</div>}
        onClick={onClick}
      >
        Button
      </DropdownButton>,
    )

    const button = screen.getByRole('button', { name: 'Button' })
    expect(screen.queryByText('Content')).not.toBeInTheDocument()

    await user.click(button)

    screen.getByText('Content')
    expect(onClick).toHaveBeenCalledOnce()
  })
})
