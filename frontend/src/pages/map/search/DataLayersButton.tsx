import DropdownButton from '@/components/DropdownButton'
import { useSidebarWidth } from '@/features/map/map-slice'
import { DataLayersCheckboxGroup } from '@/components/DataLayersCheckboxGroup'

import layersIcon from '@/assets/svgs/fa-layers.svg'

export function DataLayersButton() {
  const sidebarWidth = useSidebarWidth()

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
      startIcon={<img src={layersIcon} alt="Data layers icon" />}
      dropdownContent={<DataLayersCheckboxGroup />}
      horizontalAlign="right"
    >
      Data Layers
    </DropdownButton>
  ) : null
}
