import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css' // Import Leaflet CSS
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { useSelector } from 'react-redux'
import pin from '../assets/marker-icon-2x-red.png'
import shadow from '../assets/marker-shadow.png'
/**
 * Renders a map with a marker at the supplied location
 *
 */
const LeafletMapWithPoint = () => {
  const mapPopupValue = useSelector((state) => state.omrr.mapPopupValue)
  const status = useSelector((state) => state.omrr.status)

  // Set the position of the marker for center of BC
  const position = [53.7267, -127.6476]

  //define red icon
  const redIcon = new L.Icon({
    //read from assets
    iconUrl: pin,
    shadowUrl: shadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })

  return (
    <>
      <MapContainer
        id="map"
        center={position}
        zoom={6}
        style={{ height: '65em', width: '100%', marginLeft: '4em' }}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading>
          {status === 'succeeded' &&
            mapPopupValue.map((item, index) => (
              <Marker key={index} position={item.position} icon={redIcon}>
                <Popup sx={{ maxWidth: '50em' }}>
                  <Table key={index} size="small">
                    {Object.keys(item.details).map((itemDetails) => (
                      <>
                        <TableRow key={itemDetails}>
                          <TableCell variant="head" align="right">
                            {itemDetails}
                          </TableCell>
                          <TableCell align="right">
                            {item.details[itemDetails]}
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </Table>
                </Popup>
              </Marker>
            ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  )
}

export default LeafletMapWithPoint
