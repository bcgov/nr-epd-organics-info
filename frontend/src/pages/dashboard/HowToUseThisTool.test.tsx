import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import { render } from '@/test-utils'
import { HowToUseThisTool } from './HowToUseThisTool'

describe('HowToUseThisTool', () => {
  const mockVideoUrl = 'https://example.com/video'
  const originalWindow = window

  beforeEach(() => {
    vi.spyOn(window, 'open').mockImplementation(() => null)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    window = originalWindow
  })

  it('renders component with all required elements', () => {
    render(<HowToUseThisTool videoUrl={mockVideoUrl} />)

    expect(
      screen.getByRole('heading', { name: 'How to use this tool' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Watch this video on how to use this resource/),
    ).toBeInTheDocument()
    expect(screen.getByAltText('Video tutorial thumbnail')).toBeInTheDocument()
    expect(screen.getByTestId('PlayCircleIcon')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'View details' }),
    ).toBeInTheDocument()
  })

  it('opens video URL in new tab when button is clicked', async () => {
    const { user } = render(<HowToUseThisTool videoUrl={mockVideoUrl} />)

    const button = screen.getByRole('button', { name: 'View details' })
    await user.click(button)

    expect(window.open).toHaveBeenCalledWith(mockVideoUrl, '_blank')
  })
})
