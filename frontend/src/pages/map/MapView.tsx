import L, { LatLngTuple } from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import clsx from 'clsx'

import { MapSearch } from './components/MapSearch'
import { AuthorizationMarkers } from './layers/AuthorizationMarkers'
import { MyLocationMarker } from './layers/MyLocationMarker'

import 'leaflet/dist/leaflet.css'
import './MapView.css'
import { MapControls } from '@/pages/map/layers/MapControls'

// Set the position of the marker for center of BC
const CENTER_OF_BC: LatLngTuple = [53.7267, -127.6476]

/**
 * Renders a map with a marker at the supplied location
 */
function MapView() {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <div
      className={clsx('map-view', isSmall && 'map-view--small')}
      data-testid="map-view"
    >
      <MapContainer
        center={CENTER_OF_BC}
        zoom={6}
        zoomControl={false}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapControls />
        <AuthorizationMarkers />
        <MyLocationMarker />
      </MapContainer>
      <div className="map-components">
        <MapSearch />
      </div>
    </div>
  )
}

export default MapView
