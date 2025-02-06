import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { DataLayersControl } from './DataLayersControl'
import { useMediaQuery } from '@mui/material'
import { useDispatch } from 'react-redux'
import {
  toggleActiveTool,
  useActiveTool,
  useDataLayers,
} from '@/features/map/map-slice'
import { ActiveToolEnum } from '@/constants/constants'

// Mock the hooks
vi.mock('@mui/material', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>
  return {
    ...actual,
    useMediaQuery: vi.fn(),
    IconButton: vi.fn(({ children, ...props }) => (
      <button {...props}>{children}</button>
    )),
    Badge: vi.fn(({ children, ...props }) => <div {...props}>{children}</div>),
  }
})

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}))

vi.mock('@/features/map/map-slice', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>
  return {
    ...actual,
    useActiveTool: vi.fn(),
    useDataLayers: vi.fn(),
    toggleActiveTool: vi.fn(),
    useHasDataLayersOn: vi.fn(),
  }
})

describe('DataLayersControl', () => {
  const mockDispatch = vi.fn()

  beforeEach(() => {
    vi.mocked(useDispatch).mockReturnValue(mockDispatch)
    vi.mocked(useDataLayers).mockReturnValue([
      { name: 'layer1', url: 'url1', layers: 'layers1', webUrl: 'webUrl1' },
      { name: 'layer2', url: 'url2', layers: 'layers2', webUrl: 'webUrl2' },
    ])
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
    vi.mocked(useMediaQuery).mockReturnValue(true)
    const user = userEvent.setup()

    render(<DataLayersControl />)
    const button = screen.getByTitle('Show the data layers')
    await user.click(button)

    expect(mockDispatch).toHaveBeenCalledWith(
      toggleActiveTool(ActiveToolEnum.dataLayers),
    )
  })

  it('shows/hides menu on desktop', async () => {
    vi.mocked(useMediaQuery).mockReturnValue(false) // isSmall = false

    const user = userEvent.setup()

    render(<DataLayersControl />)

    const button = screen.getByTitle('Show the data layers')
    await user.click(button)

    const menu = screen.getByRole('menu')
    expect(menu).toBeVisible()

    await user.click(button)
    expect(menu).not.toBeVisible()
  })

  it('displays badge with layer count', () => {
    vi.mocked(useMediaQuery).mockReturnValue(false)
    vi.mocked(useDataLayers).mockReturnValue([
      { name: 'layer1', url: 'url1', layers: 'layers1', webUrl: 'webUrl1' },
      { name: 'layer2', url: 'url2', layers: 'layers2', webUrl: 'webUrl2' },
    ])

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
