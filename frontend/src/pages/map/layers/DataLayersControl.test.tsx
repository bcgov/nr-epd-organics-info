import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { DataLayersControl } from './DataLayersControl'
import { useMediaQuery } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useActiveTool, useDataLayers } from '@/features/map/map-slice'
import { ActiveToolEnum } from '@/constants/constants'

// Mock the hooks
vi.mock('@mui/material', () => ({
  ...vi.importActual('@mui/material'),
  useMediaQuery: vi.fn(),
}))

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}))

vi.mock('@/features/map/map-slice', () => ({
  useActiveTool: vi.fn(),
  useDataLayers: vi.fn(),
  toggleActiveTool: vi.fn(),
}))

describe('DataLayersControl', () => {
  const mockDispatch = vi.fn()

  beforeEach(() => {
    vi.mocked(useDispatch).mockReturnValue(mockDispatch)
    vi.mocked(useDataLayers).mockReturnValue([])
    vi.mocked(useActiveTool).mockReturnValue(undefined)
  })

  it('renders mobile version on small screens', () => {
    vi.mocked(useMediaQuery).mockReturnValue(true) // isSmall = true

    render(<DataLayersControl />)

    const button = screen.getByTitle('Show the data layers')
    expect(button).toBeInTheDocument()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('renders desktop version on large screens', () => {
    vi.mocked(useMediaQuery).mockReturnValue(false) // isSmall = false

    render(<DataLayersControl />)

    const button = screen.getByTitle('Show the data layers')
    expect(button).toBeInTheDocument()
  })

  it('dispatches toggle action on mobile', async () => {
    vi.mocked(useMediaQuery).mockReturnValue(true) // isSmall = true

    const { user } = render(<DataLayersControl />)

    const button = screen.getByTitle('Show the data layers')
    await user.click(button)

    expect(mockDispatch).toHaveBeenCalledWith(
      toggleActiveTool(ActiveToolEnum.dataLayers),
    )
  })

  it('shows/hides menu on desktop', async () => {
    vi.mocked(useMediaQuery).mockReturnValue(false) // isSmall = false

    const { user } = render(<DataLayersControl />)

    const button = screen.getByTitle('Show the data layers')
    await user.click(button)

    const menu = screen.getByRole('menu')
    expect(menu).toBeVisible()

    await user.click(button)
    expect(menu).not.toBeVisible()
  })

  it('displays badge with layer count', () => {
    vi.mocked(useMediaQuery).mockReturnValue(false)
    vi.mocked(useDataLayers).mockReturnValue(['layer1', 'layer2'])

    render(<DataLayersControl />)

    const badge = screen.getByText('2')
    expect(badge).toBeInTheDocument()
  })

  it('hides badge when no layers are selected', () => {
    vi.mocked(useMediaQuery).mockReturnValue(false)
    vi.mocked(useDataLayers).mockReturnValue([])

    render(<DataLayersControl />)

    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })
})
