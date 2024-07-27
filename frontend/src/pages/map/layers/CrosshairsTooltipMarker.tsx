import React, { ReactNode, useRef } from 'react'
import {
  LatLngExpression,
  LeafletMouseEvent,
  Marker as LeafletMarker,
} from 'leaflet'
import { Tooltip, useMap, useMapEvent } from 'react-leaflet'

import { crosshairsIcon, emptyIcon } from '@/constants/marker-icons'
import { IconMarker } from './IconMarker'

interface Props {
  children: ReactNode
  center?: LatLngExpression
}

export function CrosshairsTooltipMarker({ children, center }: Readonly<Props>) {
  const map = useMap()
  const markerRef = useRef<LeafletMarker>(null)

  useMapEvent('mousemove', (ev: LeafletMouseEvent) => {
    if (markerRef.current && !center) {
      markerRef.current.setLatLng(ev.latlng)
    }
  })

  return (
    <IconMarker
      ref={markerRef}
      position={center ?? map.getCenter()}
      icon={center ? crosshairsIcon : emptyIcon}
      interactive={false}
      draggable={false}
      cursor="crosshair"
    >
      {!center && (
        <Tooltip
          permanent
          sticky
          direction="right"
          offset={[12, 0]}
          className="search-layer-tooltip"
          interactive={false}
        >
          {children}
        </Tooltip>
      )}
    </IconMarker>
  )
}
