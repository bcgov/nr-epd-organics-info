import React from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Card, Chip, Grid } from '@mui/material'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { useNavigate } from 'react-router'
import L, { LatLngLiteral } from 'leaflet'
import pin from '../assets/marker-icon-2x-red.png'
import shadow from '../assets/marker-shadow.png'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import OmrrData from '@/interfaces/omrr'

function authorizationSection(mdMatches: boolean, data: OmrrData) {
  return <>
    {mdMatches && <>
      <Grid container direction="row" sx={{ marginTop: '2em' }} spacing={1}>
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
      <Grid container direction="row" spacing={1} sx={{ marginTop: '0.2em' }}>
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
          <span>{data['Effective/Issue Date']?.toString()}</span>
        </Grid>
        <Grid item xs={3}>
          <span>{data['Last Amendment Date']?.toString()}</span>
        </Grid>
      </Grid></>
    }
    {!mdMatches && <>
      <Grid container direction="row" sx={{ marginTop: '2em' }} spacing={0}>
        <Grid item xs={6}>
                 <span style={{
                   color: '#000000',
                   fontFamily: 'BCSans',
                   fontStyle: 'normal',
                   fontWeight: 'bold',
                   fontSize: '1em',
                   lineHeight: '1em',
                 }}>Authorization Status</span>
        </Grid>
        <Grid item xs={6}>
                 <span style={{
                   color: '#000000',
                   fontFamily: 'BCSans',
                   fontStyle: 'normal',
                   fontWeight: 'bold',
                   fontSize: '1em',
                   lineHeight: '1em',
                 }}>Authorization Number</span>
        </Grid>
      </Grid>
      <Grid container direction="row" sx={{ marginTop: '.2em' }} spacing={0}>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
          <span>{data['Authorization Number']}</span>
        </Grid>
      </Grid>
      <Grid container direction="row" sx={{ marginTop: '2em' }} spacing={0}>
        <Grid item xs={6}>
                 <span style={{
                   color: '#000000',
                   fontFamily: 'BCSans',
                   fontStyle: 'normal',
                   fontWeight: 'bold',
                   fontSize: '1em',
                   lineHeight: '1em',
                 }}>Effective/Issue Date</span>
        </Grid>
        <Grid item xs={6}>
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

      <Grid container direction="row" sx={{ marginTop: '.2em' }} spacing={0}>
        <Grid item xs={6}>
          <span>{data['Effective/Issue Date']?.toString()}</span>
        </Grid>
        <Grid item xs={6}>
          <span>{data['Last Amendment Date']?.toString()}</span>
        </Grid>
      </Grid></>
    }
  </>
}

export default function AuthorizationDetails() {
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.up('md'))
  //define red icon
  const redIcon = new L.Icon({
    //read from assets
    iconUrl: pin,
    shadowUrl: shadow,
    iconSize: [50, 82],
    iconAnchor: [25, 82],
    popupAnchor: [1, -34],
    shadowSize: [82, 82],
  })
  const navigate = useNavigate()
  const buttonClicked = (route: any) => {
    navigate(route) // reset the state
  }
  const location = useLocation()
  const data = location?.state?.data
  const facilityLocation: LatLngLiteral = { lat: data.Latitude, lng: data.Longitude }
  return (
    <Grid container spacing={1} sx={{ marginTop: '6em', marginLeft: '2em', maxWidth: '95%' }}>
      <Grid item xs={12}>
        <Button sx={{
          background: '#053662',
          color: '#ffffff',
          borderRadius: '4px',
          textTransform: 'none',
          order: 1,
          '&:hover': {
            background: '#053662',
            color: '#ffffff',
            boxShadow: 'none',
          },
        }} onClick={() => buttonClicked('/search')}>Back To Search</Button>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: '2em' }}>
        <Grid container direction={{ xs: 'column', lg: 'row' }}>
          <Grid item xs={12}>
              <span style={{
                color: '#000000',
                fontFamily: 'BCSans-Bold',
                fontSize: '1.5em',
              }}>{data['Regulated Party']}</span>
          </Grid>
        </Grid>
        {authorizationSection(mdMatches, data)}

      </Grid>
      <Grid item xs={12} sx={{ marginTop: '2em' }}>
        <Grid container direction="row" spacing={1}>
          <Grid item xs={6}>

          </Grid>
          <Grid item xs={6}>
            <MapContainer
              id="map"
              center={facilityLocation}
              scrollWheelZoom={true}
              zoom={14}
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

        </Grid>

      </Grid>
      <Grid item xs={4}>
        <Card>{/* Content of the third card */}</Card>
      </Grid>
    </Grid>
  )
}
