import DropdownButton from '@/components/DropdownButton'
import { useSidebarWidth, useDataLayers } from '@/features/map/map-slice'
import { DataLayersCheckboxGroup } from '@/components/DataLayersCheckboxGroup'
import { Badge } from '@mui/material'

import LayersIcon from '@/assets/svgs/fa-layers.svg?react'

export function DataLayersButton() {
  const sidebarWidth = useSidebarWidth()
  const dataLayers = useDataLayers()

  // Hide the data layers button when the sidebar is expanded
  return sidebarWidth === 0 ? (
    <DropdownButton
      id="mapDataLayersButton"
      variant="contained"
      size="large"
      color="secondary"
      className="map-button map-button--large"
      menuClassName="data-layers-button-menu"
      openClassName="map-button--active"
      menuPosition={{ horizontal: 'right', offset: 20 }}
      startIcon={
        <div className="layers-badge-wrapper" style={{ marginRight: '8px' }}>
          <Badge
            badgeContent={dataLayers.length}
            color="primary"
            invisible={dataLayers.length === 0}
            component="div"
            sx={{
              display: 'flex',
              '& .MuiBadge-badge': {
                right: -3,
                bottom: -15,
                top: 'auto',
                padding: '0 4px',
                minWidth: '16px',
                height: '16px',
                fontSize: '0.75rem',
                backgroundColor:
                  'var(--surface-color-primary-dangerButton-default, #ce3e39)',
                color: 'var(--surface-color-background-white)',
              },
            }}
          >
            <LayersIcon className="layers-icon" />
          </Badge>
        </div>
      }
      dropdownContent={<DataLayersCheckboxGroup />}
      horizontalAlign="right"
    >
      Layers
    </DropdownButton>
  ) : null
}
