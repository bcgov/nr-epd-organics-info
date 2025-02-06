import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Button, Stack, Typography } from '@mui/material'
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

  const onReset = () => {
    dispatch(resetDataLayers())
  }

  const onCollapseAll = () => {
    setForceAction('collapse')
  }

  const onExpandAll = () => {
    setForceAction('expand')
  }

  const onLayerToggle = (layer: DataLayer) => {
    dispatch(toggleDataLayer(layer))
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
        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="text"
            size="small"
            className="layer-button"
            onClick={onReset}
          >
            Clear All
          </Button>
          <Button
            variant="text"
            size="small"
            className="layer-button"
            onClick={onCollapseAll}
          >
            Collapse All
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={onExpandAll}
            className="layer-button"
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
        </div>
      )}
      {DATA_LAYER_GROUPS.map((group: DataLayerGroup) => (
        <DataLayersToggleGroup
          key={`DataLayersToggleGroup-${group.name}`}
          group={group}
          onLayerToggle={onLayerToggle}
          isSmall={isSmall}
          forceAction={forceAction}
          setForceAction={setForceAction}
        />
      ))}
      <Stack>
        <Typography className="data-layers-top-text">
          All data layers sourced from GeoBC.
        </Typography>
        <Typography className="data-layers-top-text">
          {/* This is weird workaround to avoid some zombie styling behaviour. */}
          <button
            className="data-layers-top-link"
            onClick={() =>
              window.open(
                'https://www2.gov.bc.ca/gov/content?id=703C452C2F8C4B0095AF39CA59B9D1A2',
                '_blank',
              )
            }
            style={{
              textDecoration: 'underline',
              border: 'none',
              background: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          >
            Click here to learn more about map layers
          </button>
        </Typography>
      </Stack>
    </Stack>
  )
}
