import { LatLngTuple } from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import clsx from 'clsx'

import { env } from '@/env'
import { MapSearch } from './search/MapSearch'
import { MapDrawer } from './drawer/MapDrawer'
import { AuthorizationMarkers } from './layers/AuthorizationMarkers'
import { MyLocationMarker } from './layers/MyLocationMarker'
import { MapControls } from './layers/MapControls'
import { MapDataLayers } from './layers/MapDataLayers'
import { MapZoom } from './layers/MapZoom'
import { PointSearchLayer } from './layers/PointSearchLayer'
import { PolygonSearchLayer } from './layers/PolygonSearchLayer'

import 'leaflet/dist/leaflet.css'
import './MapView.css'

// Set the position of the marker for center of BC
const CENTER_OF_BC: LatLngTuple = [53.7267, -127.6476]

/**
 * Renders a map with a marker at the supplied location
 */
function MapView() {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))
  // Feature flag for turning OpenStreetMap tiles gray
  const osmGrayscale = env.VITE_OSM_GRAYSCALE_FLAG === 'true'

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
          className={clsx(osmGrayscale && 'osm--grayscale')}
        />
        <MapDataLayers />
        <MapControls />
        <AuthorizationMarkers />
        <MyLocationMarker />
        <PointSearchLayer />
        <PolygonSearchLayer />
        <MapZoom />
      </MapContainer>
      <MapSearch />
      <MapDrawer />
    </div>
  )
}

export default MapView
