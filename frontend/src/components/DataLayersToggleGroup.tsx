import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  Stack,
} from '@mui/material'
import clsx from 'clsx'

import { useIsDataLayerOn } from '@/features/map/map-slice'
import { DataLayer, DataLayerGroup } from '@/interfaces/data-layers'

import DownArrow from '@/assets/svgs/fa-caret-down.svg?react'

import './DataLayersToggleGroup.css'

interface Props {
  group: DataLayerGroup
  onLayerToggle: (layer: DataLayer) => void
  isSmall: boolean
}

export function DataLayersToggleGroup({
  group,
  onLayerToggle,
  isSmall,
}: Readonly<Props>) {
  const [expanded, setExpanded] = useState<boolean>(true)
  const isDataLayerChecked = useIsDataLayerOn()

  const onToggle = () => {
    setExpanded(!expanded)
  }

  return (
    <Stack
      direction="column"
      className={clsx(
        'data-layers-toggle-group',
        isSmall && 'data-layers-toggle-group--small',
      )}
    >
      <Button
        onClick={onToggle}
        className="data-layers-toggle-button"
        size="small"
        variant="text"
        aria-label={group.name}
        aria-pressed={expanded}
        endIcon={
          <DownArrow
            className={clsx(
              'data-layers-expand-arrow',
              expanded && 'data-layers-expand-arrow--invert',
            )}
          />
        }
      >
        {group.name}
      </Button>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <FormGroup className="data-layers-checkbox-list">
          {group.layers.map((layer: DataLayer) =>
            layer.url ? (
              <FormControlLabel
                key={`dataLayerCheckBox-${layer.name}`}
                control={<Checkbox />}
                checked={isDataLayerChecked(layer)}
                label={layer.name}
                className="data-layers-checkbox-item"
                onChange={() => onLayerToggle(layer)}
              />
            ) : null,
          )}
        </FormGroup>
      </Collapse>
    </Stack>
  )
}
