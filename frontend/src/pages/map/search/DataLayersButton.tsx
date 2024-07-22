import DropdownButton from '@/components/DropdownButton'
import { useDrawerExpanded } from '@/features/map/map-slice'

import layersIcon from '@/assets/svgs/fa-layers.svg'

export function DataLayersButton() {
  const isDrawerExpanded = useDrawerExpanded()

  // Hide the data layers button when the sidebar drawer is expanded
  return isDrawerExpanded ? null : (
    <DropdownButton
      id="mapDataLayersButton"
      variant="contained"
      size="large"
      color="secondary"
      className="map-button map-button--large data-layers-button"
      startIcon={<img src={layersIcon} alt="Data layers icon" />}
      disabled
    >
      Data Layers
    </DropdownButton>
  )
}
