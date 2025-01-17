import { screen } from '@testing-library/react'

import { DataLayersCheckboxGroup } from './DataLayersCheckboxGroup'
import { render } from '@/test-utils'
import { useDataLayers, useHasDataLayersOn } from '@/features/map/map-slice'
import { DataLayer } from '@/interfaces/data-layers'
import { DATA_LAYER_GROUPS } from '@/constants/data-layers'

interface State {
  dataLayers?: DataLayer[]
  hasDataLayersOn?: boolean
}

describe('Test suite for DataLayersCheckboxGroup', () => {
  function renderComponent(
    isSmall = false,
    className: string | undefined = undefined,
  ) {
    const state: State = {}
    const TestComponent = () => {
      Object.assign(state, {
        dataLayers: useDataLayers(),
        hasDataLayersOn: useHasDataLayersOn(),
      })
      return <DataLayersCheckboxGroup isSmall={isSmall} className={className} />
    }
    const { user } = render(<TestComponent />, {
      withStateProvider: true,
      withRouter: true,
    })
    return { user, state }
  }

  it('should render large DataLayersCheckboxGroup', async () => {
    const { user, state } = renderComponent(false, 'test-class')
    screen.getByText(/^All data layers sourced from GeoBC/)
    screen.getByRole('link', { name: /^Click here to read our guidance/ })
    expect(state.dataLayers).toHaveLength(0)
    expect(state.hasDataLayersOn).toBe(false)

    const div = screen.getByTestId('data-layers-checkbox-group')
    expect(div).not.toHaveClass('data-layers-checkbox-group--small')
    expect(div).toHaveClass('test-class')

    DATA_LAYER_GROUPS.forEach(({ name, layers }) => {
      screen.getByRole('button', { name, pressed: true })
      layers.forEach((layer) => {
        if (layer.url) {
          const cb = screen.getByLabelText(layer.name)
          expect(cb).not.toBeChecked()
          expect(cb).toBeEnabled()
        }
      })
    })

    expect(screen.queryByText('Available Layers')).not.toBeInTheDocument()
    expect(screen.queryByText('Clear All')).not.toBeInTheDocument()

    const toggle = screen.getByRole('button', {
      name: 'Aquifers and Water Wells',
      pressed: true,
    })
    // should be expanded by default
    screen.getByText('Aquifers - All')

    await user.click(toggle)

    // Should be collapsed now
    screen.getByRole('button', {
      name: 'Aquifers and Water Wells',
      pressed: false,
    })
    expect(screen.queryByText('Aquifers - All')).not.toBeInTheDocument()

    const cb = screen.getByLabelText('FWA Wetlands')
    expect(cb).not.toBeChecked()

    await user.click(cb)
    expect(cb).toBeChecked()
    expect(state.dataLayers).toHaveLength(1)
    expect(state.hasDataLayersOn).toBe(true)

    const resetBtn = screen.getByRole('button', { name: 'Clear All' })
    await user.click(resetBtn)

    expect(state.dataLayers).toHaveLength(0)
    expect(state.hasDataLayersOn).toBe(false)
    expect(screen.queryByText('Clear All')).not.toBeInTheDocument()
  })

  it('should render small DataLayersCheckboxGroup', async () => {
    const { user, state } = renderComponent(true)
    screen.getByText(/^All data layers sourced from GeoBC/)
    expect(state.dataLayers).toHaveLength(0)

    const div = screen.getByTestId('data-layers-checkbox-group')
    expect(div).toHaveClass('data-layers-checkbox-group--small')

    const cb = screen.getByLabelText('Water Rights - Licences')
    expect(cb).not.toBeChecked()

    await user.click(cb)
    expect(cb).toBeChecked()
    expect(state.dataLayers).toHaveLength(1)
    expect(state.hasDataLayersOn).toBe(true)

    const resetLink = screen.getByRole('button', { name: 'Clear All' })
    await user.click(resetLink)

    expect(state.dataLayers).toHaveLength(0)
    expect(screen.queryByText('Clear All')).not.toBeInTheDocument()
  })
})
