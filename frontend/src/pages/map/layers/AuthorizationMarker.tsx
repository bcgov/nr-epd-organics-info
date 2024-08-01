import { Tooltip } from 'react-leaflet'

import OmrrData from '@/interfaces/omrr'
import { blueIcon1x, blueIcon2x } from '@/constants/marker-icons'
import { IconMarker } from './IconMarker'

interface Props {
  item: OmrrData
  isSmall: boolean
  onClick: () => void
}

export function AuthorizationMarker({
  item,
  isSmall,
  onClick,
}: Readonly<Props>) {
  const title = item['Regulated Party']
  return (
    <IconMarker
      position={[item.Latitude, item.Longitude]}
      icon={isSmall ? blueIcon1x : blueIcon2x}
      alt="Authorization marker"
      title={title}
      riseOnHover
      onClick={onClick}
    >
      <Tooltip direction="top">{title}</Tooltip>
    </IconMarker>
  )
}
