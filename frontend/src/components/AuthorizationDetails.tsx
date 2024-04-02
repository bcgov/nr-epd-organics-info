import React from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Chip, Grid } from '@mui/material'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { useNavigate } from 'react-router'
import L, { LatLngLiteral } from 'leaflet'
import pin from '../assets/marker-icon-2x-red.png'
import shadow from '../assets/marker-shadow.png'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import OmrrData from '@/interfaces/omrr'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect } from 'react'

function authorizationSection(mdMatches: boolean, data: OmrrData) {
  return (
    <>
      {mdMatches && (
        <>
          <Grid container direction="row" sx={{ marginTop: '1em' }} spacing={1}>
            <Grid item xs={3}>
              <span
                style={{
                  color: '#000000',
                  fontFamily: 'BCSans',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: '1em',
                  lineHeight: '1em',
                }}
              >
                Authorization Status
              </span>
            </Grid>
            <Grid item xs={3}>
              <span
                style={{
                  color: '#000000',
                  fontFamily: 'BCSans',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: '1em',
                  lineHeight: '1em',
                }}
              >
                Authorization Number
              </span>
            </Grid>
            <Grid item xs={3}>
              <span
                style={{
                  color: '#000000',
                  fontFamily: 'BCSans',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: '1em',
                  lineHeight: '1em',
                }}
              >
                Effective/Issue Date
              </span>
            </Grid>
            <Grid item xs={3}>
              <span
                style={{
                  color: '#000000',
                  fontFamily: 'BCSans',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: '1em',
                  lineHeight: '1em',
                }}
              >
                Last Amendment Date
              </span>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            spacing={1}
            sx={{ marginTop: '0.2em' }}
          >
            <Grid item xs={3}>
              <Chip
                sx={{
                  background:
                    data['Authorization Status'] === 'Active'
                      ? '#42814A'
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
          </Grid>
        </>
      )}
      {!mdMatches && (
        <>
          <Grid container direction="row" sx={{ marginTop: '2em' }} spacing={0}>
            <Grid item xs={6}>
              <span
                style={{
                  color: '#000000',
                  fontFamily: 'BCSans',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: '1em',
                  lineHeight: '1em',
                }}
              >
                Authorization Status
              </span>
            </Grid>
            <Grid item xs={6}>
              <span
                style={{
                  color: '#000000',
                  fontFamily: 'BCSans',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: '1em',
                  lineHeight: '1em',
                }}
              >
                Authorization Number
              </span>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            sx={{ marginTop: '.2em' }}
            spacing={0}
          >
            <Grid item xs={6}>
              <Chip
                sx={{
                  background:
                    data['Authorization Status'] === 'Active'
                      ? '#42814A'
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
              <span
                style={{
                  color: '#000000',
                  fontFamily: 'BCSans',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: '1em',
                  lineHeight: '1em',
                }}
              >
                Effective/Issue Date
              </span>
            </Grid>
            <Grid item xs={6}>
              <span
                style={{
                  color: '#000000',
                  fontFamily: 'BCSans',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: '1em',
                  lineHeight: '1em',
                }}
              >
                Last Amendment Date
              </span>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            sx={{ marginTop: '.2em' }}
            spacing={0}
          >
            <Grid item xs={6}>
              <span>{data['Effective/Issue Date']?.toString()}</span>
            </Grid>
            <Grid item xs={6}>
              <span>{data['Last Amendment Date']?.toString()}</span>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

function getAuthorizationGridOthersForMdAbove(data: OmrrData) {
  return (
    <>
      {(data['Authorization Type']?.toLowerCase() === 'permit' ||
        data['Authorization Type']?.toLowerCase() ===
          'operational certificate' ||
        data['Authorization Type']?.toLowerCase() === 'approval') && (
        <>
          <Grid sx={{ margin: '1em 0em 3em 1em' }} container spacing={0}>
            <Grid item xs={12}>
              <span
                style={{
                  fontFamily: 'BCSans-Bold',
                  fontSize: '1.5em',
                  color: '#000000',
                }}
              >
                Authorization Details
              </span>
            </Grid>
            <Grid sx={{ margin: '2em 0em 0em 0em' }} item xs={12}>
              <span
                style={{
                  fontFamily: 'BCSans-Bold',
                  fontSize: '.75em',
                  color: '#000000',
                }}
              >
                Authorization Type
              </span>
            </Grid>
            <Grid item xs={12}>
              <span
                style={{
                  fontFamily: 'BCSans',
                  fontSize: '1em',
                  color: '#000000',
                }}
              >
                {data['Authorization Type']}
              </span>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                direction={{ xs: 'column', md: 'column', lg: 'row' }}
              >
                <Grid item xs={6}>
                  <Grid container direction="column">
                    <Grid sx={{ margin: '2em 0em 0em 0em' }} item xs={6}>
                      <span
                        style={{
                          fontFamily: 'BCSans-Bold',
                          fontSize: '.75em',
                          color: '#000000',
                        }}
                      >
                        Regulation
                      </span>
                    </Grid>
                    <Grid item xs={6}>
                      <span
                        style={{
                          fontFamily: 'BCSans',
                          fontSize: '1em',
                          color: '#000000',
                          textDecoration: 'underline',
                        }}
                      >
                        Waste Discharge Regulation
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container direction="column">
                    <Grid sx={{ margin: '2em 0em 0em 0em' }} item xs={6}>
                      <span
                        style={{
                          fontFamily: 'BCSans-Bold',
                          fontSize: '.75em',
                          color: '#000000',
                        }}
                      >
                        Schedule
                      </span>
                    </Grid>
                    <Grid item xs={6}>
                      <span
                        style={{
                          fontFamily: 'BCSans',
                          fontSize: '1em',
                          color: '#000000',
                        }}
                      >
                        {data['Waste Discharge Regulation']}
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={11} sx={{ margin: '2em 0em 3em 0em' }}>
              <span style={{ fontFamily: 'BCSans-Italic', fontSize: '1.1em' }}>
                Permits, Operational Certificates, and Approvals are necessary
                for composting operations that handle 5,000 tonnes or more of
                finished compost per year from food waste or biosolids, as
                specified in the Organic Matter Recycling Regulation.
              </span>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

function getAuthorizationGridNotificationCompostForMdAbove(data: OmrrData) {
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.up('md'))
  return (
    <>
      {data['Authorization Type']?.toLowerCase() === 'notification' &&
        data['Operation Type']?.toLowerCase() ===
          'compost production facility' && (
          <>
            <Grid sx={{ margin: '1em 0em 3em 1em' }} container spacing={0}>
              <Grid item xs={12}>
                <span
                  style={{
                    fontFamily: 'BCSans-Bold',
                    fontSize: '1.5em',
                    color: '#000000',
                  }}
                >
                  Authorization Details
                </span>
              </Grid>
              <Grid sx={{ margin: '2em 0em 0em 0em' }} item xs={12}>
                <span
                  style={{
                    fontFamily: 'BCSans-Bold',
                    fontSize: '.75em',
                    color: '#000000',
                  }}
                >
                  Authorization Type
                </span>
              </Grid>
              <Grid item xs={12}>
                <span
                  style={{
                    fontFamily: 'BCSans',
                    fontSize: '1em',
                    color: '#000000',
                  }}
                >
                  {data['Authorization Type']}
                </span>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  direction={{ xs: 'column', md: 'column', lg: 'row' }}
                >
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid sx={{ margin: '2em 0em 0em 0em' }} item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans-Bold',
                            fontSize: '.75em',
                            color: '#000000',
                          }}
                        >
                          Operation Type
                        </span>
                      </Grid>
                      <Grid item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans',
                            fontSize: '1em',
                            color: '#000000',
                          }}
                        >
                          {data['Operation Type']}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid sx={{ margin: '2em 0em 0em 0em' }} item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans-Bold',
                            fontSize: '.75em',
                            color: '#000000',
                          }}
                        >
                          Regulation
                        </span>
                      </Grid>
                      <Grid item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans',
                            fontSize: '1em',
                            color: '#000000',
                            textDecoration: 'underline',
                          }}
                        >
                          Organic Matter Recycling Regulation
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  direction={{ xs: 'column', md: 'column', lg: 'row' }}
                >
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid sx={{ margin: '2em 0em 0em 0em' }} item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans-Bold',
                            fontSize: '.75em',
                            color: '#000000',
                          }}
                        >
                          Types of Compost Produced
                        </span>
                      </Grid>
                      <Grid item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans',
                            fontSize: '1em',
                            color: '#000000',
                          }}
                        >
                          {data['Type of Compost Produced']}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid sx={{ margin: '2em 0em 0em 0em' }} item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans-Bold',
                            fontSize: '.75em',
                            color: '#000000',
                          }}
                        >
                          Facility Design Capacity (tonnes per year)
                        </span>
                      </Grid>
                      <Grid item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans',
                            fontSize: '1em',
                            color: '#000000',
                          }}
                        >
                          {data['Facility Design Capacity (t/y)']}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ margin: '3em  3em 3em 0em', background: '#D8EAFD' }}
              >
                <Grid container sx={{ margin: '3em  3em 3em 2em' }}>
                  <Grid item xs={6}>
                    <span
                      style={{
                        fontFamily: 'BCSans',
                        fontSize: '1.1em',
                        color: '#000000',
                      }}
                    >
                      Organic Matter Used for Composting
                    </span>
                  </Grid>
                  <Grid sx={{ marginTop: '1em' }} item xs={12}>
                    <Grid
                      container
                      direction={{ xs: 'column', md: 'column', lg: 'row' }}
                    >
                      <Grid item xs={3}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'left',
                          }}
                        >
                          {data['Yard Waste'] ? (
                            <CheckIcon style={{ color: '#42814A' }} />
                          ) : (
                            <CloseIcon style={{ color: '#605E5C' }} />
                          )}
                          <span
                            style={{
                              fontFamily: 'BCSans',
                              fontSize: '1em',
                              color: '#000000',
                              marginLeft: '0.5em', // Add some space between the icon and the text
                            }}
                          >
                            Yard Waste
                          </span>
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'left',
                          }}
                        >
                          {data['Biosolids'] ? (
                            <CheckIcon style={{ color: '#42814A' }} />
                          ) : (
                            <CloseIcon style={{ color: '#605E5C' }} />
                          )}
                          <span
                            style={{
                              fontFamily: 'BCSans',
                              fontSize: '1em',
                              color: '#000000',
                              marginLeft: '0.5em', // Add some space between the icon and the text
                            }}
                          >
                            Biosolids
                          </span>
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'left',
                          }}
                        >
                          {data['Whey'] ? (
                            <CheckIcon style={{ color: '#42814A' }} />
                          ) : (
                            <CloseIcon style={{ color: '#605E5C' }} />
                          )}
                          <span
                            style={{
                              fontFamily: 'BCSans',
                              fontSize: '1em',
                              color: '#000000',
                              marginLeft: '0.5em', // Add some space between the icon and the text
                            }}
                          >
                            Whey
                          </span>
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'left',
                          }}
                        >
                          {data['Untreated and Unprocessed Wood'] ? (
                            <CheckIcon style={{ color: '#42814A' }} />
                          ) : (
                            <CloseIcon style={{ color: '#605E5C' }} />
                          )}
                          <span
                            style={{
                              fontFamily: 'BCSans',
                              fontSize: '1em',
                              color: '#000000',
                              marginLeft: '0.5em', // Add some space between the icon and the text
                            }}
                          >
                            Untreated and Unprocessed Wood
                          </span>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    sx={{ marginTop: mdMatches ? '1em' : '0em' }}
                    item
                    xs={12}
                  >
                    <Grid
                      container
                      direction={{ xs: 'column', md: 'column', lg: 'row' }}
                    >
                      <Grid item xs={3}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'left',
                          }}
                        >
                          {data['Poultry Carcasses'] ? (
                            <CheckIcon style={{ color: '#42814A' }} />
                          ) : (
                            <CloseIcon style={{ color: '#605E5C' }} />
                          )}
                          <span
                            style={{
                              fontFamily: 'BCSans',
                              fontSize: '1em',
                              color: '#000000',
                              marginLeft: '0.5em', // Add some space between the icon and the text
                            }}
                          >
                            Poultry Carcasses
                          </span>
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'left',
                          }}
                        >
                          {data['Fish Wastes'] ? (
                            <CheckIcon style={{ color: '#42814A' }} />
                          ) : (
                            <CloseIcon style={{ color: '#605E5C' }} />
                          )}
                          <span
                            style={{
                              fontFamily: 'BCSans',
                              fontSize: '1em',
                              color: '#000000',
                              marginLeft: '0.5em', // Add some space between the icon and the text
                            }}
                          >
                            Fish Wastes
                          </span>
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'left',
                          }}
                        >
                          {data['Food Waste'] ? (
                            <CheckIcon style={{ color: '#42814A' }} />
                          ) : (
                            <CloseIcon style={{ color: '#605E5C' }} />
                          )}
                          <span
                            style={{
                              fontFamily: 'BCSans',
                              fontSize: '1em',
                              color: '#000000',
                              marginLeft: '0.5em', // Add some space between the icon and the text
                            }}
                          >
                            Food Waste
                          </span>
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'left',
                          }}
                        >
                          {data['Brewary Waste/Wine Waste'] ? (
                            <CheckIcon style={{ color: '#42814A' }} />
                          ) : (
                            <CloseIcon style={{ color: '#605E5C' }} />
                          )}
                          <span
                            style={{
                              fontFamily: 'BCSans',
                              fontSize: '1em',
                              color: '#000000',
                              marginLeft: '0.5em', // Add some space between the icon and the text
                            }}
                          >
                            Brewary Waste/Wine Waste
                          </span>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    sx={{ marginTop: mdMatches ? '1em' : '0em' }}
                    item
                    xs={12}
                  >
                    <Grid
                      container
                      direction={{ xs: 'column', md: 'column', lg: 'row' }}
                    >
                      <Grid item xs={3}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'left',
                          }}
                        >
                          {data['Animal Bedding'] ? (
                            <CheckIcon style={{ color: '#42814A' }} />
                          ) : (
                            <CloseIcon style={{ color: '#605E5C' }} />
                          )}
                          <span
                            style={{
                              fontFamily: 'BCSans',
                              fontSize: '1em',
                              color: '#000000',
                              marginLeft: '0.5em', // Add some space between the icon and the text
                            }}
                          >
                            Animal Bedding
                          </span>
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'left',
                          }}
                        >
                          {data['Domestic Septic Tank Sludge'] ? (
                            <CheckIcon style={{ color: '#42814A' }} />
                          ) : (
                            <CloseIcon style={{ color: '#605E5C' }} />
                          )}
                          <span
                            style={{
                              fontFamily: 'BCSans',
                              fontSize: '1em',
                              color: '#000000',
                              marginLeft: '0.5em', // Add some space between the icon and the text
                            }}
                          >
                            Domestic Septic Tank Sludge
                          </span>
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'left',
                          }}
                        >
                          {data['Hatchery Waste'] ? (
                            <CheckIcon style={{ color: '#42814A' }} />
                          ) : (
                            <CloseIcon style={{ color: '#605E5C' }} />
                          )}
                          <span
                            style={{
                              fontFamily: 'BCSans',
                              fontSize: '1em',
                              color: '#000000',
                              marginLeft: '0.5em', // Add some space between the icon and the text
                            }}
                          >
                            Hatchery Waste
                          </span>
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'left',
                          }}
                        >
                          {data['Manure'] ? (
                            <CheckIcon style={{ color: '#42814A' }} />
                          ) : (
                            <CloseIcon style={{ color: '#605E5C' }} />
                          )}
                          <span
                            style={{
                              fontFamily: 'BCSans',
                              fontSize: '1em',
                              color: '#000000',
                              marginLeft: '0.5em', // Add some space between the icon and the text
                            }}
                          >
                            Manure
                          </span>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    sx={{ marginTop: mdMatches ? '1em' : '0em' }}
                    item
                    xs={12}
                  >
                    <Grid
                      container
                      direction={{ xs: 'column', md: 'column', lg: 'row' }}
                    >
                      <Grid item xs={3}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'left',
                          }}
                        >
                          {data['Milk Processing Waste'] ? (
                            <CheckIcon style={{ color: '#42814A' }} />
                          ) : (
                            <CloseIcon style={{ color: '#605E5C' }} />
                          )}
                          <span
                            style={{
                              fontFamily: 'BCSans',
                              fontSize: '1em',
                              color: '#000000',
                              marginLeft: '0.5em', // Add some space between the icon and the text
                            }}
                          >
                            Milk Processing Waste
                          </span>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
    </>
  )
}

function getAuthorizationGridNotificationLandApplication(data: OmrrData) {
  return (
    <>
      {data['Authorization Type']?.toLowerCase() === 'notification' &&
        data['Operation Type']?.toLowerCase()?.includes('land application') && (
          <>
            <Grid sx={{ margin: '1em 0em 3em 1em' }} container spacing={0}>
              <Grid item xs={12}>
                <span
                  style={{
                    fontFamily: 'BCSans-Bold',
                    fontSize: '1.5em',
                    color: '#000000',
                  }}
                >
                  Authorization Details
                </span>
              </Grid>
              <Grid sx={{ margin: '2em 0em 0em 0em' }} item xs={12}>
                <span
                  style={{
                    fontFamily: 'BCSans-Bold',
                    fontSize: '.75em',
                    color: '#000000',
                  }}
                >
                  Authorization Type
                </span>
              </Grid>
              <Grid item xs={12}>
                <span
                  style={{
                    fontFamily: 'BCSans',
                    fontSize: '1em',
                    color: '#000000',
                  }}
                >
                  {data['Authorization Type']}
                </span>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  direction={{ xs: 'column', md: 'column', lg: 'row' }}
                >
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid sx={{ margin: '2em 0em 0em 0em' }} item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans-Bold',
                            fontSize: '.75em',
                            color: '#000000',
                          }}
                        >
                          Operation Type
                        </span>
                      </Grid>
                      <Grid item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans',
                            fontSize: '1em',
                            color: '#000000',
                          }}
                        >
                          {data['Operation Type']}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid sx={{ margin: '2em 0em 0em 0em' }} item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans-Bold',
                            fontSize: '.75em',
                            color: '#000000',
                          }}
                        >
                          Regulation
                        </span>
                      </Grid>
                      <Grid item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans',
                            fontSize: '1em',
                            color: '#000000',
                            textDecoration: 'underline',
                          }}
                        >
                          Organic Matter Recycling Regulation
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  direction={{ xs: 'column', md: 'column', lg: 'row' }}
                >
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid sx={{ margin: '2em 0em 0em 0em' }} item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans-Bold',
                            fontSize: '.75em',
                            color: '#000000',
                          }}
                        >
                          Material Land Applied
                        </span>
                      </Grid>
                      <Grid item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans',
                            fontSize: '1em',
                            color: '#000000',
                          }}
                        >
                          {data['Material Land Applied']}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid sx={{ margin: '2em 0em 0em 0em' }} item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans-Bold',
                            fontSize: '.75em',
                            color: '#000000',
                          }}
                        >
                          Intended Date of Land Application
                        </span>
                      </Grid>
                      <Grid item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans',
                            fontSize: '1em',
                            color: '#000000',
                          }}
                        >
                          {data['Intended Dates of Land Applica']}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
    </>
  )
}

function getAuthorizationGridNotificationOthers(data: OmrrData) {
  return (
    <>
      {data['Authorization Type']?.toLowerCase() === 'notification' &&
        data['Operation Type']?.trim() === '' && (
          <>
            <Grid sx={{ margin: '1em 0em 3em 1em' }} container spacing={0}>
              <Grid item xs={12}>
                <span
                  style={{
                    fontFamily: 'BCSans-Bold',
                    fontSize: '1.5em',
                    color: '#000000',
                  }}
                >
                  Authorization Details
                </span>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  direction={{ xs: 'column', md: 'column', lg: 'row' }}
                >
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid sx={{ margin: '2em 0em 0em 0em' }} item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans-Bold',
                            fontSize: '.75em',
                            color: '#000000',
                          }}
                        >
                          Authorization Type
                        </span>
                      </Grid>
                      <Grid item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans',
                            fontSize: '1em',
                            color: '#000000',
                          }}
                        >
                          {data['Authorization Type']}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid sx={{ margin: '2em 0em 0em 0em' }} item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans-Bold',
                            fontSize: '.75em',
                            color: '#000000',
                          }}
                        >
                          Regulation
                        </span>
                      </Grid>
                      <Grid item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans',
                            fontSize: '1em',
                            color: '#000000',
                            textDecoration: 'underline',
                          }}
                        >
                          Organic Matter Recycling Regulation
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ margin: '2em 2em 3em 0em' }}>
                <span
                  style={{
                    color: '#000000',
                    fontFamily: 'BCSans-Italic',
                    fontSize: '1.1em',
                  }}
                >
                  Please note that authorizations issued prior to 2007 are
                  currently categorized as historical data. The Authorization
                  Management System (AMS), which houses authorization
                  documentation, has constraints on the historical data it
                  provides.{' '}
                  <a
                    style={{ color: '#000000' }}
                    href="mailto:env.omrr.reg.reviews@gov.bc.ca"
                  >
                    {' '}
                    For additional information, please contact us.
                  </a>
                </span>
              </Grid>
            </Grid>
          </>
        )}
    </>
  )
}

export default function AuthorizationDetails() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.up('md'))
  const smMatches = useMediaQuery(theme.breakpoints.up('sm'))
  const xsMatches = useMediaQuery(theme.breakpoints.up('xs'))
  const lgMatches = useMediaQuery(theme.breakpoints.up('lg'))
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
  const authorizationType = data && data['Authorization Type']
  let facilityLatLng: LatLngLiteral | undefined = undefined
  if (data && data.Latitude && data.Longitude) {
    facilityLatLng = { lat: data.Latitude, lng: data.Longitude }
  }
  let marginTop: string = '0em'
  if (lgMatches || mdMatches) {
    marginTop = '5em'
  } else if (smMatches) {
    marginTop = '4em'
  } else if (xsMatches) {
    marginTop = '5em'
  }

  return (
    <Grid
      container
      spacing={1}
      sx={{
        marginTop: marginTop,
        marginLeft: mdMatches ? '2em' : '0.5em',
        maxWidth: '95%',
      }}
    >
      <Grid item xs={12}>
        <Button
          sx={{
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
          }}
          onClick={() => buttonClicked('/search')}
        >
          Back To Search
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: '.5em' }}>
        <Grid container direction={{ xs: 'column', md: 'column', lg: 'row' }}>
          <Grid item xs={12}>
            <span
              style={{
                color: '#000000',
                fontFamily: 'BCSans-Bold',
                fontSize: '1.5em',
              }}
            >
              {data['Regulated Party']}
            </span>
          </Grid>
        </Grid>
        {authorizationSection(mdMatches, data)}
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          height: '30em',
          marginTop: mdMatches ? '2em' : '1em',
          background: '#F1F8FE',
        }}
      >
        <Grid
          justifyItems="center"
          justifyContent="center"
          container
          direction={{ xs: 'column', md: 'column', lg: 'row' }}
          spacing={0}
        >
          <Grid item xs={6}>
            <Grid container spacing={0}>
              <Grid sx={{ margin: '1em' }} item xs={12}>
                <span
                  style={{
                    fontFamily: 'BCSans-Bold',
                    fontSize: '1.5em',
                    color: '#000000',
                  }}
                >
                  Location Details
                </span>
              </Grid>
              <Grid sx={{ margin: '1em 0em 0em 1em' }} item xs={12}>
                <span
                  style={{
                    fontFamily: 'BCSans-Bold',
                    fontSize: '.75em',
                    color: '#000000',
                  }}
                >
                  Facility Location{' '}
                </span>
              </Grid>
              <Grid sx={{ margin: '0em 0em 0em 1em' }} item xs={12}>
                <span
                  style={{
                    fontFamily: 'BCSans',
                    fontSize: '1em',
                    color: '#000000',
                  }}
                >
                  {data['Facility Location']}{' '}
                </span>
              </Grid>
              <Grid sx={{ margin: '1em 0em 0em 1em' }} item xs={12}>
                <Grid
                  container
                  spacing={0}
                  direction={{ xs: 'column', md: 'column', lg: 'row' }}
                >
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid item>
                        <span
                          style={{
                            fontFamily: 'BCSans-Bold',
                            fontSize: '.75em',
                            color: '#000000',
                          }}
                        >
                          Latitude{' '}
                        </span>
                      </Grid>
                      <Grid item>
                        <span
                          style={{
                            fontFamily: 'BCSans',
                            fontSize: '1em',
                            color: '#000000',
                          }}
                        >
                          {facilityLatLng?.lat}{' '}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid item>
                        <span
                          style={{
                            fontFamily: 'BCSans-Bold',
                            fontSize: '.75em',
                            color: '#000000',
                          }}
                        >
                          Longitude{' '}
                        </span>
                      </Grid>
                      <Grid item>
                        <span
                          style={{
                            fontFamily: 'BCSans',
                            fontSize: '1em',
                            color: '#000000',
                          }}
                        >
                          {facilityLatLng?.lng}{' '}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {facilityLatLng && (
            <Grid item xs={6}>
              <MapContainer
                id="map"
                center={facilityLatLng}
                scrollWheelZoom={false}
                zoom={14}
                style={{ height: '35em', width: '98%' }}
                className="map-container"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  key={data['Authorization Number']}
                  position={facilityLatLng}
                  icon={redIcon}
                />
              </MapContainer>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          margin: mdMatches ? '2em 0em 3em 0em' : '15em 0em 3em 0em',
          background: '#F1F8FE',
        }}
      >
        {getAuthorizationGridOthersForMdAbove(data)}
        {getAuthorizationGridNotificationCompostForMdAbove(data)}
        {getAuthorizationGridNotificationLandApplication(data)}
        {getAuthorizationGridNotificationOthers(data)}
      </Grid>
    </Grid>
  )
}
