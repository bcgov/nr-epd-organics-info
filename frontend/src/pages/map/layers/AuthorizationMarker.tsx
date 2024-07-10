import L from 'leaflet'
import { Tooltip } from 'react-leaflet'
import OmrrData from '@/interfaces/omrr'

import { IconMarker } from './IconMarker'

import markerIcon2x from '@/assets/marker-icon-2x-blue.png'
import shadowIcon2x from '@/assets/marker-shadow-2x.png'
import markerIcon1x from '@/assets/marker-icon-1x-blue.png'
import shadowIcon1x from '@/assets/marker-shadow-1x.png'

const blueIcon2x = new L.Icon({
  iconUrl: markerIcon2x,
  iconSize: [34.5, 45],
  iconAnchor: [17.25, 45],
  // both relative to iconAnchor
  popupAnchor: [0, -42],
  tooltipAnchor: [0, -42],
  shadowUrl: shadowIcon2x,
  shadowSize: [32, 16],
  shadowAnchor: [16, 8],
})

const blueIcon1x = new L.Icon({
  iconUrl: markerIcon1x,
  iconSize: [23, 30],
  iconAnchor: [11.5, 30],
  // both relative to iconAnchor
  popupAnchor: [0, -28],
  tooltipAnchor: [0, -28],
  shadowUrl: shadowIcon1x,
  shadowSize: [16, 8],
  shadowAnchor: [8, 4],
})

interface Props {
  item: OmrrData
  isSmall: boolean
}

export function AuthorizationMarker({ item, isSmall }: Props) {
  const title = item['Regulated Party']
  return (
    <IconMarker
      position={[item.Latitude, item.Longitude]}
      icon={isSmall ? blueIcon1x : blueIcon2x}
      alt="Authorization marker"
      title={title}
      riseOnHover
    >
      <Tooltip direction="top">{title}</Tooltip>
    </IconMarker>
  )
}

export default AuthorizationMarker
