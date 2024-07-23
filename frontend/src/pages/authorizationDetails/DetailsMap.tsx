import React from 'react'
import { LatLngTuple } from 'leaflet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import OmrrData from '@/interfaces/omrr'
import { blueIcon1x, blueIcon2x } from '@/constants/marker-icons'

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
      scrollWheelZoom={false}
      zoomControl={false}
      zoom={14}
      style={{ height: `${height}px` }}
      className="authorization-details-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={isSmall ? blueIcon1x : blueIcon2x} />
    </MapContainer>
  )
}
