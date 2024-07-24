import { Tooltip } from 'react-leaflet'

import OmrrData from '@/interfaces/omrr'
import { useSetSelectedItem } from '../hooks/useSetSelectedItem'
import { IconMarker } from './IconMarker'
import { blueIcon1x, blueIcon2x } from '@/constants/marker-icons'

interface Props {
  item: OmrrData
  isSmall: boolean
}

export function AuthorizationMarker({ item, isSmall }: Readonly<Props>) {
  const selectItem = useSetSelectedItem()

  const onClick = () => {
    selectItem(item)
  }

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
