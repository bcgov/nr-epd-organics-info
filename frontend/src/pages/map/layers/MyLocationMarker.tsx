import { useSelector } from 'react-redux'
import { Circle, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'

import { RootState } from '@/app/store'
import { IconMarker } from './IconMarker'
import { useMyLocation } from '../hooks/useMyLocation'

import './MyLocationMarker.css'
import { useEffect, useRef } from 'react'

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
  const { position: myLocation, accuracy = 0 } = useMyLocation()
  const map = useMap()
  const hasZoomedToMyLocationRef = useRef(false)

  // The first time my location changes - zoom to that location
  useEffect(() => {
    if (myLocation && !hasZoomedToMyLocationRef.current) {
      hasZoomedToMyLocationRef.current = true
      map.setView(myLocation, Math.max(map.getZoom(), 14), {
        animate: true,
        duration: 1000,
      })
    }
  }, [map, myLocation])

  return myLocation ? (
    <>
      {Math.round(accuracy) >= 1 && (
        <Circle
          center={myLocation}
          radius={Math.round(accuracy / 2)}
          className="my-location-accuracy-circle"
        />
      )}
      <IconMarker position={myLocation} icon={locationIcon}>
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
