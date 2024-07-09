import L, { LatLngTuple } from 'leaflet'
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  ZoomControl,
} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { RootState } from '@/app/store'
import OmrrData from '@/interfaces/omrr'

import markerIcon2x from '../assets/marker-icon-2x-blue.png'
import markerIcon1x from '../assets/marker-icon-1x-blue.png'
import shadowIcon2x from '../assets/marker-shadow-2x.png'
import shadowIcon1x from '../assets/marker-shadow-1x.png'

import 'leaflet/dist/leaflet.css'

const blueIcon2x = new L.Icon({
  iconUrl: markerIcon2x,
  iconSize: [34.5, 45],
  iconAnchor: [17.25, 45],
  // both relative to iconAnchor
  popupAnchor: [0, -42],
  tooltipAnchor: [0, -42],
  shadowUrl: shadowIcon2x,
  shadowSize: [32, 16],
  shadowAnchor: [16, 8],
})

const blueIcon1x = new L.Icon({
  iconUrl: markerIcon1x,
  iconSize: [23, 30],
  iconAnchor: [11.5, 30],
  // both relative to iconAnchor
  popupAnchor: [0, -28],
  tooltipAnchor: [0, -28],
  shadowUrl: shadowIcon1x,
  shadowSize: [16, 8],
  shadowAnchor: [8, 4],
})

// Set the position of the marker for center of BC
const CENTER_OF_BC: LatLngTuple = [53.7267, -127.6476]

/**
 * Renders a map with a marker at the supplied location
 */
function MapView() {
  const values = useSelector((state: RootState) => state.omrr.value)
  const status = useSelector((state: RootState) => state.omrr.status)
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  const hasMarkers =
    status === 'succeeded' && Array.isArray(values) && values.length > 0
  const markerIcon = isSmall ? blueIcon1x : blueIcon2x

  return (
    <div className="map-view" data-testid="map-view">
      <MapContainer
        id="map"
        center={CENTER_OF_BC}
        zoom={6}
        zoomControl={false}
        className="map-view-container"
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hasMarkers && (
          <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={20}
            spiderfyOnMaxZoom
            showCoverageOnHover
          >
            {values.map((item: OmrrData, index: number) => {
              const key = `Marker-${index}-${item['Regulated Party']}`
              const title = item['Regulated Party']
              return (
                <Marker
                  key={key}
                  position={[item.Latitude, item.Longitude]}
                  icon={markerIcon}
                  alt="Authorization marker"
                  title={title}
                >
                  <Tooltip direction="top">{title}</Tooltip>
                </Marker>
              )
            })}
          </MarkerClusterGroup>
        )}
      </MapContainer>
    </div>
  )
}

export default MapView
