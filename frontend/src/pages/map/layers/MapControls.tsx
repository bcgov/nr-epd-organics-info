import { DataLayersControl } from './DataLayersControl'
import { FindMeControl } from './FindMeControl'
import { ZoomInOutControl } from './ZoomInOutControl'
import { Control } from './Control'

import './MapControls.css'

export function MapControls() {
  return (
    <Control position="bottomright" className="map-controls">
      <DataLayersControl />
      <FindMeControl />
      <ZoomInOutControl />
    </Control>
  )
}
