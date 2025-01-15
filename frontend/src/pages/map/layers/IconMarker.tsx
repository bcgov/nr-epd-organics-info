import { forwardRef, ReactNode, useState } from 'react'
import { Marker } from 'react-leaflet'
import {
  DivIcon,
  Icon,
  LatLngExpression,
  LeafletEventHandlerFnMap,
  LeafletMouseEvent,
  Marker as LeafletMarker,
} from 'leaflet'

interface Props {
  position: LatLngExpression
  icon?: Icon | DivIcon
  hoverIcon?: Icon | DivIcon
  onClick?: (e: LeafletMouseEvent) => void
  eventHandlers?: LeafletEventHandlerFnMap
  children?: ReactNode
  riseOnHover?: boolean
  [key: string]: any
}

export const IconMarker = forwardRef<LeafletMarker, Props>(
  (
    {
      position,
      icon,
      hoverIcon,
      onClick,
      eventHandlers,
      children = null,
      riseOnHover = false,
      ...rest
    }: Props,
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false)
    const currentIcon = isHovered ? hoverIcon : icon

    const combinedEventHandlers = {
      ...eventHandlers,
      click: onClick,
      mouseover: (e: LeafletMouseEvent) => {
        setIsHovered(true)
        eventHandlers?.mouseover?.(e)
      },
      mouseout: (e: LeafletMouseEvent) => {
        setIsHovered(false)
        eventHandlers?.mouseout?.(e)
      },
    }

    return (
      <Marker
        ref={ref}
        position={position}
        icon={currentIcon}
        eventHandlers={combinedEventHandlers}
        riseOnHover={riseOnHover}
        {...rest}
      >
        {children}
      </Marker>
    )
  },
)

IconMarker.displayName = 'IconMarker'
