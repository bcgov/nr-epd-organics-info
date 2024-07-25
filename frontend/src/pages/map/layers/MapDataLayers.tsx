import { WMSTileLayer } from 'react-leaflet'

import { useDataLayers } from '@/features/map/map-slice'
import { DataLayer } from '@/interfaces/data-layers'

export function MapDataLayers() {
  const dataLayers = useDataLayers()

  if (!dataLayers || dataLayers.length === 0) {
    return null
  }

  return dataLayers.map((layer: DataLayer) => {
    const {
      name,
      url,
      layers,
      styles,
      format = 'image/png',
      transparent = true,
    } = layer
    const key = `DataLayer-${name}`
    return (
      <WMSTileLayer
        key={key}
        url={url}
        layers={layers}
        styles={styles}
        format={format}
        transparent={transparent}
      />
    )
  })
}
