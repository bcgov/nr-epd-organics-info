import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Leaflet, { LatLngExpression, Map } from 'leaflet'
const MapComponent = () => {
  const mapRef = useRef<Map | null>(null)
  return (
    <div>To Be Done</div>
  )
 /* return (
    <div style={{ margin: '5em' }}>
      <MapContainer
        id="map"
        style={{
          zIndex: 0,
          maxHeight: '80vh',
          height: '80vh',
          maxWidth: '80vw',
          width: '80vw',
        }}
        center={[53.7267, -127.6476]}
        zoom={13}
        className="map-container"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  )*/
}

export default MapComponent
