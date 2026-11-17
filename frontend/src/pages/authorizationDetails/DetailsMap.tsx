import { LatLngTuple } from 'leaflet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import OmrrData from '@/interfaces/omrr'
import { pinHoverIcon } from '@/constants/marker-icons'

interface Props {
  item: OmrrData
  isSmall?: boolean
}

export function DetailsMap({ item, isSmall = false }: Readonly<Props>) {
  const height = isSmall ? 224 : 402
  const position: LatLngTuple = [item.Latitude, item.Longitude]

  return (
    <MapContainer
      center={position}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: height, width: '100%' }}
      dragging={false}
    >
      {/* OpenStreetMap blocks our tile requests in prod (#422, #425), so use the
          same Esri basemap as the main map. */}
      <TileLayer
        attribution="&copy; Esri"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
        crossOrigin="anonymous"
      />
      <Marker position={position} icon={pinHoverIcon} />
    </MapContainer>
  )
}
