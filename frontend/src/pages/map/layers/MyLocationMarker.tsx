import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { Circle, Tooltip, useMap } from 'react-leaflet'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { IconMarker } from './IconMarker'
import { useMyLocation } from '../hooks/useMyLocation'

import './MyLocationMarker.css'

export function myLocationIcon() {
  const size = 20
  return L.divIcon({
    html: `<div class="my-location-pulse"></div>
    <svg width="${size}" height="${size}" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="10" class="my-location-circle" />
    </svg>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    tooltipAnchor: [0, -size / 2],
    className: 'my-location-marker',
  })
}

const locationIcon = myLocationIcon()

function MyLocationMarkerContent() {
  const map = useMap()
  const hasZoomedToMyLocationRef = useRef(false)
  const { position, accuracy = 0 } = useMyLocation()

  // The first time my location changes - zoom to that location
  useEffect(() => {
    if (position && !hasZoomedToMyLocationRef.current) {
      hasZoomedToMyLocationRef.current = true
      map.setView(position, Math.max(map.getZoom(), 14), {
        animate: true,
        duration: 1000,
      })
    }
  }, [map, position])

  return position ? (
    <>
      {Math.round(accuracy) >= 1 && (
        <Circle
          center={position}
          radius={Math.round(accuracy / 2)}
          className="my-location-accuracy-circle"
        />
      )}
      <IconMarker
        position={position}
        icon={locationIcon}
        alt="My location marker"
      >
        <Tooltip direction="top">My location</Tooltip>
      </IconMarker>
    </>
  ) : null
}

export function MyLocationMarker() {
  const isVisible = useSelector(
    (state: RootState) => state.map.isMyLocationVisible,
  )
  return isVisible ? <MyLocationMarkerContent /> : null
}
