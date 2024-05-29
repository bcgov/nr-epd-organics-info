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
import { ChevronLeft } from '@mui/icons-material'

function authorizationSection(mdMatches: boolean, data: OmrrData) {
  return (
    <>
      {mdMatches && (
        <>
          <Grid
            container
            direction="row"
            sx={{ marginTop: '1.5em' }}
            spacing={1}
          >
            <Grid item xs={3}>
              <span
                data-testid="auth-details-auth-status"
                style={{
                  color: '#000000',
                  fontFamily: 'BCSans-Bold',
                  fontSize: '1em',
                  lineHeight: '1em',
                }}
              >
                Authorization Status
              </span>
            </Grid>
            <Grid item xs={3}>
              <span
                data-testid="auth-details-auth-number"
                style={{
                  color: '#000000',
                  fontFamily: 'BCSans-Bold',
                  fontSize: '1em',
                  lineHeight: '1em',
                }}
              >
                Authorization Number
              </span>
            </Grid>
            <Grid item xs={3}>
              <span
                data-testid="auth-details-effactive-date"
                style={{
                  color: '#000000',
                  fontFamily: 'BCSans-Bold',
                  fontSize: '1em',
                  lineHeight: '1em',
                }}
              >
                Effective/Issue Date
              </span>
            </Grid>
            <Grid item xs={3}>
              <span
                data-testid="auth-details-last-ammendment-date"
                style={{
                  color: '#000000',
                  fontFamily: 'BCSans-Bold',
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
                data-testid="auth-details-auth-status-value"
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
              <span data-testid="auth-details-auth-number-value">{data['Authorization Number']}</span>
            </Grid>
            <Grid item xs={3}>
              <span data-testid="auth-details-effactive-date-value">{data['Effective/Issue Date']?.toString()}</span>
            </Grid>
            <Grid item xs={3}>
              <span
                data-testid="auth-details-last-ammendment-date-value">{data['Last Amendment Date']?.toString()}</span>
            </Grid>
          </Grid>
        </>
      )}
      {!mdMatches && (
        <>
          <Grid
            container
            direction="row"
            sx={{ marginTop: '1.5em' }}
            spacing={0}
          >
            <Grid item xs={6}>
              <span
                data-testid="auth-details-auth-status"
                style={{
                  color: '#000000',
                  fontFamily: 'BCSans-Bold',
                  fontSize: '.75em',
                  lineHeight: '1em',
                }}
              >
                Authorization Status
              </span>
            </Grid>
            <Grid item xs={6}>
              <span
                data-testid="auth-details-auth-number"
                style={{
                  color: '#000000',
                  fontFamily: 'BCSans-Bold',
                  fontSize: '.75em',
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
                data-testid="auth-details-auth-status-value"
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
              <span data-testid="auth-details-auth-number-value">{data['Authorization Number']}</span>
            </Grid>
          </Grid>
          <Grid container direction="row" sx={{ marginTop: '2em' }} spacing={0}>
            <Grid item xs={6}>
              <span
                data-testid="auth-details-effactive-date"
                style={{
                  color: '#000000',
                  fontFamily: 'BCSans-Bold',
                  fontSize: '.75em',
                  lineHeight: '1em',
                }}
              >
                Effective/Issue Date
              </span>
            </Grid>
            <Grid item xs={6}>
              <span
                data-testid="auth-details-last-ammendment-date"
                style={{
                  color: '#000000',
                  fontFamily: 'BCSans-Bold',
                  fontSize: '.75em',
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
              <span data-testid="auth-details-effactive-date-valu">{data['Effective/Issue Date']?.toString()}</span>
            </Grid>
            <Grid item xs={6}>
              <span data-testid="auth-details-last-ammendment-valu">{data['Last Amendment Date']?.toString()}</span>
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
          <Grid sx={{ margin: '0 0 0' }} container spacing={0}>
            <Grid item xs={12} sx={{ marginBottom: '2em' }}>
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
            <Grid sx={{ margin: '0 0 0.5em' }} item xs={12}>
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
            <Grid
              sx={{ margin: { xs: '0 0 1em', md: '0 0 1.5em' } }}
              item
              xs={12}
            >
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
                    <Grid sx={{ margin: '0 0 0.5em' }} item xs={6}>
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
                    <Grid
                      sx={{ margin: { xs: '0 0 1em', md: '0 0 1.5em' } }}
                      item
                      xs={6}
                    >
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
                    <Grid sx={{ margin: '0 0 0.5em' }} item xs={6}>
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
                    <Grid sx={{ margin: '0 0 1.5em' }} item xs={6}>
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
            <Grid item xs={11} sx={{ margin: '0' }}>
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
            <Grid sx={{ margin: '0 0 0' }} container spacing={0}>
              <Grid item xs={12} sx={{ marginBottom: '2em' }}>
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
              <Grid sx={{ margin: '0 0 0.5em' }} item xs={12}>
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
              <Grid
                sx={{ margin: { xs: '0 0 1em', md: '0 0 1.5em' } }}
                item
                xs={12}
              >
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
                      <Grid sx={{ margin: '0 0 0.5em' }} item xs={6}>
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
                      <Grid
                        sx={{ margin: { xs: '0 0 1em', md: '0 0 1.5em' } }}
                        item
                        xs={6}
                      >
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
                      <Grid sx={{ margin: '0 0 0.5em' }} item xs={6}>
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
                      <Grid
                        sx={{ margin: { xs: '0 0 1em', md: '0 0 1.5em' } }}
                        item
                        xs={6}
                      >
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
                      <Grid sx={{ margin: '0 0 0.5em' }} item xs={6}>
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
                      <Grid
                        sx={{ margin: { xs: '0 0 1em', md: '0 0 1.5em' } }}
                        item
                        xs={6}
                      >
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
                      <Grid sx={{ margin: '0 0 0.5em' }} item xs={6}>
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
                      <Grid sx={{ margin: '0 0 2em' }} item xs={6}>
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
                sx={{
                  margin: 0,
                  background: '#D8EAFD',
                  '& > .MuiGrid-root': {
                    padding: {
                      xs: '1.5em',
                      md: '1.5em 2.5em 2em',
                    },
                  },
                }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      margin: {
                        xs: '0 0 1.5em',
                      },
                    }}
                  >
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
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={{ xs: 'column', md: 'row' }}
                      sx={{
                        '& > .MuiGrid-item': {
                          marginBottom: {
                            xs: '1em',
                            md: '1.5em',
                          },
                        },
                      }}
                    >
                      <Grid item xs={12} md={6} lg={4} xl={3}>
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
                      <Grid item xs={12} md={6} lg={4} xl={3}>
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
                      <Grid item xs={12} md={6} lg={4} xl={3}>
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
                      <Grid item xs={12} md={6} lg={4} xl={3}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'left',
                          }}
                        >
                          {data['Untreated and Unprocessed Wood Residuals'] ? (
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
                      <Grid item xs={12} md={6} lg={4} xl={3}>
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
                      <Grid item xs={12} md={6} lg={4} xl={3}>
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
                      <Grid item xs={12} md={6} lg={4} xl={3}>
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
                      <Grid item xs={12} md={6} lg={4} xl={3}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'left',
                          }}
                        >
                          {data['Brewery Waste/Wine Waste'] ? (
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
                      <Grid item xs={12} md={6} lg={4} xl={3}>
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
                      <Grid item xs={12} md={6} lg={4} xl={3}>
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
                      <Grid item xs={12} md={6} lg={4} xl={3}>
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
                      <Grid item xs={12} md={6} lg={4} xl={3}>
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
                      <Grid item xs={12} md={6} lg={4} xl={3}>
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
            <Grid sx={{ margin: '0 0 0' }} container spacing={0}>
              <Grid item xs={12} sx={{ marginBottom: '2em' }}>
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
              <Grid sx={{ margin: '0 0 0.5em' }} item xs={12}>
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
              <Grid
                sx={{ margin: { xs: '0 0 1em', md: '0 0 1.5em' } }}
                item
                xs={12}
              >
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
                <Grid container direction={{ xs: 'column', md: 'row' }}>
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid sx={{ margin: '0 0 0.5em' }} item xs={6}>
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
                      <Grid
                        sx={{ margin: { xs: '0 0 1em', md: '0 0 1.5em' } }}
                        item
                        xs={6}
                      >
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
                      <Grid sx={{ margin: '0 0 0.5em' }} item xs={6}>
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
                      <Grid
                        sx={{ margin: { xs: '0 0 1em', md: '0 0 1.5em' } }}
                        item
                        xs={6}
                      >
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
                <Grid container direction={{ xs: 'column', md: 'row' }}>
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid sx={{ margin: '0 0 0.5em' }} item xs={6}>
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
                      <Grid
                        sx={{
                          margin: { xs: '0 0 1em', lg: '0' },
                        }}
                        item
                        xs={6}
                      >
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
                      <Grid sx={{ margin: '0 0 0.5em' }} item xs={6}>
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
                      <Grid sx={{ margin: '0' }} item xs={6}>
                        <span
                          style={{
                            fontFamily: 'BCSans',
                            fontSize: '1em',
                            color: '#000000',
                          }}
                        >
                          {data['Intended Dates of Land Application']}
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
            <Grid sx={{ margin: '0 0 0' }} container spacing={0}>
              <Grid item xs={12} sx={{ marginBottom: '2em' }}>
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
                      <Grid sx={{ margin: '0 0 0.5em' }} item xs={6}>
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
                      <Grid
                        sx={{ margin: { xs: '0 0 1em', md: '0 0 1.5em' } }}
                        item
                        xs={6}
                      >
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
                      <Grid sx={{ margin: '0 0 0.5em' }} item xs={6}>
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
                      <Grid sx={{ margin: '0 0 1.5em' }} item xs={6}>
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
              <Grid item xs={12} sx={{ margin: '0' }}>
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

  return (
    <Grid
      container
      spacing={1}
      sx={{
        maxWidth: '100%',
        width: '100%',
        margin: 0,
        padding: {
          xs: '6.5em 1em 0',
          md: '6.5em 2em 0',
        },
        '& > .MuiGrid-item': {
          paddingRight: {
            xs: '.5em',
            md: 0,
          },
        },
      }}
    >
      <Grid item xs={12}>
        <Button
          data-testid="auth-details-back-to-search"
          sx={{
            background: '#053662',
            color: '#ffffff',
            borderRadius: '4px',
            textTransform: 'none',
            order: 1,
            padding: '0.6em 1.125em 0.6em .5em',
            '&:hover': {
              background: '#053662',
              color: '#ffffff',
              boxShadow: 'none',
            },
          }}
          onClick={() => buttonClicked('/search')}
        >
          <ChevronLeft sx={{ marginRight: '.25em' }}></ChevronLeft>
          Back To Search
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: '1em' }}>
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
          background: '#F1F8FE',
          margin: {
            xs: '2.5em .5em 0',
          },
          padding: {
            xs: '1.5em 1em !important',
            md: '1.5em !important',
          },
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
              <Grid
                sx={{ margin: { xs: '0 0 1em', md: '0 0 1.5em' } }}
                item
                xs={12}
              >
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
              <Grid sx={{ margin: '0 0 0.5em' }} item xs={12}>
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
              <Grid
                sx={{ margin: { xs: '0 0 1em', md: '0 0 1.5em' } }}
                item
                xs={12}
              >
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
              <Grid sx={{ margin: '0' }} item xs={12}>
                <Grid
                  container
                  spacing={0}
                  direction={{ xs: 'column', md: 'column', lg: 'row' }}
                >
                  <Grid item xs={6}>
                    <Grid container direction="column">
                      <Grid item sx={{ margin: '0 0 0.5em' }}>
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
                      <Grid
                        item
                        sx={{ margin: { xs: '0 0 1em', md: '0 0 1.5em' } }}
                      >
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
                      <Grid item sx={{ margin: '0 0 0.5em' }}>
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
                      <Grid
                        item
                        sx={{ margin: { xs: '0 0 1em', md: '0 0 1.5em' } }}
                      >
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
            <Grid item xs={6} sx={{ margin: '0' }}>
              <MapContainer
                id="map"
                center={facilityLatLng}
                scrollWheelZoom={false}
                zoom={14}
                style={{ height: '35em', width: '100%' }}
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
          background: '#F1F8FE',
          margin: {
            xs: '2.5em .5em 5em',
            md: '2.5em .5em 5em',
          },
          padding: {
            xs: '1.5em 1em 2em !important',
            md: '1.5em 1.5em 3em !important',
          },
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
