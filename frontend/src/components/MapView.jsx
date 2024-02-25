import 'leaflet/dist/leaflet.css' // Import Leaflet CSS
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { useEffect, useState } from 'react'
import apiService from '@/service/api-service'
import pin from '../assets/marker-icon-2x-red.png'
import shadow from '../assets/marker-shadow.png'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

/**
 * Renders a map with a marker at the supplied location
 *
 */
const LeafletMapWithPoint = () => {
  const [data, setData] = useState([])
  const [dataFetched, setDataFetched] = useState(false)

  useEffect(() => {
    apiService
      .getAxiosInstance()
      .get('/omrr')
      .then((response) => {
        // iterate over the response data and set the state key is lat and long and details is rest of the data
        const points = response?.data
          ?.filter((item) => item.Latitude && item.Longitude)
          ?.map((item) => {
            return {
              position: [item?.Latitude, item?.Longitude],
              details: {
                'Authorization Number': item['Authorization Number'],
                'Authorization Type': item['Authorization Type'],
                'Authorization Status': item['Authorization Status'],
                'Regulated Party': item['Regulated Party'],
                'Facility Location': item['Facility Location'],
              },
            }
          })
        setData(points)
        setDataFetched(true)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  // Set the position of the marker for center of BC
  const position = [53.7267, -127.6476]
  // define points
  const samplePoints = [
    { position: [60, -140], details: 'BC' },
    {
      position: [49.019, -122.455],
      details: 'BC',
    },
    { position: [51.7267, -128.6476], details: 'BC' },
  ]
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
        style={{ height: '60em', width: '100%', marginLeft: '4em' }}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading>
          {dataFetched &&
            data.map((item, index) => (
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
