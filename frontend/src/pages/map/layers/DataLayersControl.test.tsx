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
  useHasDataLayersOn,
  useIsDataLayerOn,
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

vi.mock('react-redux', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>
  return {
    ...actual,
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  }
})

vi.mock('@/features/map/map-slice', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>
  return {
    ...actual,
    useActiveTool: vi.fn(),
    useDataLayers: vi.fn(),
    toggleActiveTool: vi.fn(),
    useHasDataLayersOn: vi.fn(),
    useIsDataLayerOn: vi.fn(),
  }
})

describe('DataLayersControl', () => {
  const mockDispatch = vi.fn()

  beforeEach(() => {
    vi.mocked(useDispatch).mockReturnValue(mockDispatch)
    vi.mocked(useDataLayers).mockReturnValue([])
    vi.mocked(useActiveTool).mockReturnValue(undefined)
    vi.mocked(useHasDataLayersOn).mockReturnValue(false)
    vi.mocked(useIsDataLayerOn).mockReturnValue(() => false)
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

  it('displays menu with layer options', () => {
    vi.mocked(useMediaQuery).mockReturnValue(false)

    render(<DataLayersControl />)

    const menu = screen.getByTestId('data-layers-checkbox-group')
    expect(menu).toBeInTheDocument()
  })
})
