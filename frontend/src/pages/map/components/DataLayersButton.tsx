import DropdownButton from '@/components/DropdownButton'

import layersIcon from '@/assets/svgs/fa-layers.svg'

export function DataLayersButton() {
  return (
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
