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
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={pinHoverIcon} />
    </MapContainer>
  )
}
