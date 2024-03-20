import React from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Card, Grid, Stack,Chip } from '@mui/material'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { useNavigate } from 'react-router'
import L, { LatLngLiteral } from 'leaflet'
// @ts-ignore
import pin from '../assets/marker-icon-2x-red.png'
// @ts-ignore
import shadow from '../assets/marker-shadow.png'

export default function AuthorizationDetails() {
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
  const navigate = useNavigate()
  const buttonClicked = (route: any) => {
    navigate(route) // reset the state
  }
  const location = useLocation()
  const data = location?.state?.data
  const facilityLocation: LatLngLiteral = { lat: data.Latitude, lng: data.Longitude }
  return (

      <Grid container spacing={1} sx={{marginTop:'6em', marginLeft:'2em', maxWidth:'95%' }}>
        <Grid item  xs={3} sm={6} md={12}>
          <Button sx={{
            background: '#8D8D8D',
            padding: '8px 16px',
            borderRadius: '6px;',
            color:'#000000',
            textTransform: 'none',
          }} onClick={() => buttonClicked('/search')}>Back To Search</Button>
        </Grid>
        <Grid item xs={3} sm={6} md={12} >
          <Stack direction="row" justifyContent="space-between">
            <span style={{
              color:'#000000',
              fontFamily: 'BCSans',
              fontStyle: 'bold',
              fontSize: '2em',
              lineHeight: '3em',
            }}>{data['Regulated Party']}</span>
          </Stack>
          <Grid container direction="row" spacing={1}>
              <Grid item xs={3}>
                 <span style={{
                   color: '#000000',
                   fontFamily: 'BCSans',
                   fontStyle: 'normal',
                   fontWeight: 'bold',
                   fontSize: '1em',
                   lineHeight: '1em',
                 }}>Authorization Status</span>
              </Grid>
              <Grid item xs={3}>
                 <span style={{
                   color: '#000000',
                   fontFamily: 'BCSans',
                   fontStyle: 'normal',
                   fontWeight: 'bold',
                   fontSize: '1em',
                   lineHeight: '1em',
                 }}>Authorization Number</span>
              </Grid>
              <Grid item xs={3}>
                 <span style={{
                   color: '#000000',
                   fontFamily: 'BCSans',
                   fontStyle: 'normal',
                   fontWeight: 'bold',
                   fontSize: '1em',
                   lineHeight: '1em',
                 }}>Effective/Issue Date</span>
              </Grid>
              <Grid item xs={3}>
                 <span style={{
                   color: '#000000',
                   fontFamily: 'BCSans',
                   fontStyle: 'normal',
                   fontWeight: 'bold',
                   fontSize: '1em',
                   lineHeight: '1em',
                 }}>Last Amendment Date</span>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={1}>
            <Grid item xs={3}>
              <Chip
                sx={{
                  background:
                    data['Authorization Status'] === 'Active'
                      ? '#353433'
                      : '#605E5C',
                  color: '#ffffff',
                }}
                label={data['Authorization Status']}
              />
            </Grid>
            <Grid item xs={3}>
              <span>{data['Authorization Number']}</span>
            </Grid>
            <Grid item xs={3}>
              <span>{data['Effective/Issue Date']}</span>
            </Grid>
            <Grid item xs={3}>
              <span>{data['Last Amendment Date']}</span>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{marginTop:'2em'}}>
          <MapContainer
            id="map"
            center={facilityLocation}
            scrollWheelZoom={false}
            zoom={12}
            style={{ height: '60em' }}
            className="map-container"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker key={data['Authorization Number']} position={facilityLocation} icon={redIcon} />
          </MapContainer>
        </Grid>
        <Grid item xs={4}>
          <Card>{/* Content of the third card */}</Card>
        </Grid>
      </Grid>
  )
}
