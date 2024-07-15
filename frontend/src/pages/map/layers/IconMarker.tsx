import { forwardRef, ReactNode } from 'react'
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
      onClick,
      eventHandlers,
      children = null,
      riseOnHover = false,
      ...rest
    }: Props,
    ref,
  ) => {
    if (onClick) {
      if (!eventHandlers) {
        eventHandlers = {
          click: onClick,
        }
      } else {
        eventHandlers.click = onClick
      }
    }

    return (
      <Marker
        ref={ref}
        position={position}
        icon={icon}
        eventHandlers={eventHandlers}
        riseOnHover={riseOnHover}
        {...rest}
      >
        {children}
      </Marker>
    )
  },
)

IconMarker.displayName = 'IconMarker'
