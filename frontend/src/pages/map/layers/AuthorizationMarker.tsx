import { Tooltip } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

import OmrrData from '@/interfaces/omrr'
import {
  pinDefaultIcon,
  pinSelectedIcon,
  pinHoverIcon,
  pinSelectedHoverIcon,
} from '@/constants/marker-icons'
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
  const selectedItem = useSelector((state: RootState) => state.map.selectedItem)
  const isSelected =
    selectedItem?.['Authorization Number'] === item['Authorization Number']

  const title = item['Regulated Party']
  return (
    <IconMarker
      position={[item.Latitude, item.Longitude]}
      icon={isSelected ? pinSelectedIcon : pinDefaultIcon}
      hoverIcon={isSelected ? pinSelectedHoverIcon : pinHoverIcon}
      alt="Authorization marker"
      title={title}
      riseOnHover
      onClick={onClick}
    >
      <Tooltip direction="top">{title}</Tooltip>
    </IconMarker>
  )
}
