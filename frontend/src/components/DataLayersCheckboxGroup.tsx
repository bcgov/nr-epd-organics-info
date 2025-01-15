import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Stack, Typography } from '@mui/material'
import clsx from 'clsx'
import { useState } from 'react'

import { DATA_LAYER_GROUPS } from '@/constants/data-layers'
import {
  resetDataLayers,
  toggleDataLayer,
  useHasDataLayersOn,
} from '@/features/map/map-slice'
import { DataLayer, DataLayerGroup } from '@/interfaces/data-layers'
import { DataLayersToggleGroup } from './DataLayersToggleGroup'

import './DataLayersCheckboxGroup.css'

interface Props {
  isSmall?: boolean
  className?: string
}

export function DataLayersCheckboxGroup({
  isSmall = false,
  className,
}: Readonly<Props>) {
  const dispatch = useDispatch()
  const isLarge = !isSmall
  const hasDataLayers = useHasDataLayersOn()
  const [forceAction, setForceAction] = useState<'collapse' | 'expand' | null>(
    null,
  )

  const onLayerToggle = (layer: DataLayer) => {
    dispatch(toggleDataLayer(layer))
  }

  const onReset = () => {
    dispatch(resetDataLayers())
  }

  const onCollapseAll = () => {
    setForceAction((prev) => (prev === 'collapse' ? null : 'collapse'))
  }

  return (
    <Stack
      direction="column"
      className={clsx(
        'data-layers-checkbox-group',
        !isSmall && 'thin-scrollbar',
        isSmall && 'data-layers-checkbox-group--small',
        className,
      )}
      data-testid="data-layers-checkbox-group"
    >
      <Stack direction="column" className="data-layers-top-section">
        <Typography className="data-layers-top-text">
          All data layers sourced from GeoBC.
        </Typography>
        <Stack direction="row" spacing={1}>
          <NavLink to="/guidance" className="data-layers-top-link">
            Click here to read our guidance page about map layers.
          </NavLink>
          <Button
            variant="text"
            size="small"
            className="data-layers-top-link"
            onClick={() => setForceAction('collapse')}
          >
            Collapse All
          </Button>
          <Button
            variant="text"
            size="small"
            className="data-layers-top-link"
            onClick={() => setForceAction('expand')}
          >
            Expand All
          </Button>
        </Stack>
      </Stack>
      {isSmall && (
        <div className="available-layers-row">
          <Typography className="available-layers-text">
            Available Layers
          </Typography>
          {hasDataLayers && (
            <Button
              variant="text"
              size="small"
              className="data-layers-reset-link"
              onClick={onReset}
            >
              Reset
            </Button>
          )}
        </div>
      )}
      {DATA_LAYER_GROUPS.map((group: DataLayerGroup) => (
        <DataLayersToggleGroup
          key={`DataLayersToggleGroup-${group.name}`}
          group={group}
          onLayerToggle={onLayerToggle}
          isSmall={isSmall}
          forceAction={forceAction}
        />
      ))}
      {isLarge && hasDataLayers && (
        <Button
          variant="outlined"
          onClick={onReset}
          className="data-layers-reset-button"
        >
          Reset Layers
        </Button>
      )}
    </Stack>
  )
}
