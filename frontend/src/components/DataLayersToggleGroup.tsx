import { useState, useEffect } from 'react'
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
  forceAction?: 'collapse' | 'expand' | null
  setForceAction: (action: 'collapse' | 'expand' | null) => void
}

export function DataLayersToggleGroup({
  group,
  onLayerToggle,
  isSmall,
  forceAction,
  setForceAction,
}: Readonly<Props>) {
  const [expanded, setExpanded] = useState<boolean>(true)
  const isDataLayerChecked = useIsDataLayerOn()

  // Track when global expand/collapse was last triggered
  const [lastGlobalAction, setLastGlobalAction] = useState<
    'collapse' | 'expand' | null
  >(null)

  useEffect(() => {
    if (forceAction && forceAction !== lastGlobalAction) {
      setExpanded(forceAction === 'expand')
      setLastGlobalAction(forceAction)
      // Reset the force action after it's been applied
      setTimeout(() => setForceAction(null), 0)
    }
  }, [forceAction, lastGlobalAction, setForceAction])

  const onToggle = () => {
    setExpanded(!expanded)
    // Reset the global action tracking when user manually toggles
    setLastGlobalAction(null)
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
