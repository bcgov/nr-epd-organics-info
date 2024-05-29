import {
  ArrowDropDown,
  ArrowDropUp,
  MyLocation,
  Search,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  Pagination,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { Stack } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import {
  resetFilters,
  searchAuthorizationsByGlobalFilter,
  setExpand,
  setFilters,
  setLocation,
  setPage,
  setSearchBy,
} from '@/features/omrr/omrr-slice'
import { useNavigate } from 'react-router'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect } from 'react'
export default function AuthorizationList() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.up('md'))
  const navigate = useNavigate()
  const buttonClicked = (route: any, data: any) => {
    navigate(route, { state: { data: data } }) // reset the state
  }
  const dispatch = useDispatch()
  const {
    filteredValue,
    expand,
    notificationFilter,
    permitFilter,
    approvalFilter,
    compostFacilityFilter,
    landApplicationBioSolidsFilter,
    operationalCertificateFilter,
    location,
    searchBy,
    page,
    globalTextSearchFilter,
    compostFacilityFilterDisabled,
    landApplicationBioSolidsFilterDisabled,
    lastModified
  } = useSelector((state: RootState) => state.omrr)
  const pagination = (
    <Grid item xs={12}>
      <Grid
        container
        spacing={0}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: {
            xs: 'flex-start',
            sm: 'center',
          },
        }}
      >
        <Pagination
          sx={{
            margin: {
              xs: '0 0 1em',
              sm: '0',
            },
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: '#053662',
              color: '#ffffff',
              ':hover': {},
            },
            '& .MuiPaginationItem-root': {
              color: '#053662',
              backgroundColor: '#ffffff',
            },
          }}
          variant="outlined"
          shape="rounded"
          count={Math.ceil(filteredValue.length / 10)}
          siblingCount={mdMatches ? 1 : 0}
          page={page}
          onChange={(event, value) => dispatch(setPage(value))}
        />
        <Typography
          sx={{
            display: 'block',
          }}
        >
          Showing {(page - 1) * 10 + 1}-
          {Math.min(page * 10, filteredValue.length)} of {filteredValue.length}{' '}
          results
        </Typography>
      </Grid>
    </Grid>
  )
  const headerCard = (
    <CardContent sx={{ padding: '0' }}>
      <Typography
        data-testid="auth-list-headin1"
        variant="h1"
        sx={{
          margin: '0 0 .75em',
        }}
        component="h1"
      >
        Authorizations
      </Typography>
      <Typography data-testid="auth-list-heading2" variant="h6">
        Authorized compost and biosolid facilities in B.C.
      </Typography>
    </CardContent>
  )
  return (
    <Grid container spacing={2} sx={{ marginTop: '4vh' }}>
      <Grid item xs={12}>
        <Card
          elevation={0}
          variant="outlined"
          sx={{
            padding: {
              xs: '7em 1.5em 5em',
              sm: '5em 2.1em 2.5em',
              md: '10em 2.25em 5em',
            },
            backgroundColor: '#FCC85D',
            border: '0',
          }}
        >
          {headerCard}
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          spacing={2}
          direction={{ xs: 'column', md: 'row' }}
          sx={{
            margin: '0',
            padding: {
              xs: '1.5em 1.5em 5em',
              sm: '1.5em 2.1em 5em',
              md: '4em 2.25em 10em',
            },
            width: '100%',
            '& > .MuiGrid-item': {
              padding: '0',
              width: '100%',
            },
          }}
        >
          <Grid item xs={12}>
            <TextField
              sx={{
                minWidth: '100%',
                color: '#9F9D9C',
                marginBottom: '1.5em',
              }}
              label="Search Authorizations"
              data-testid="auth-list-search-authorizations-textfield"
              value={globalTextSearchFilter}
              onChange={(event) =>
                dispatch(searchAuthorizationsByGlobalFilter(event.target.value))
              }
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                /*endAdornment: (
                  <Button
                    sx={{
                      color: '#9F9D9C',
                    }}
                    onClick={handleLocation}
                  >
                    <MyLocation />
                  </Button>
                )*/
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              sx={{ maxWidth: '100%' }}
              justifyContent="space-between"
              spacing={0}
              direction={{ xs: 'column', sm: 'row' }}
            >
              <Stack
                sx={{
                  display: 'flex',
                  alignItems: 'left',
                  flexDirection: 'row',

                  justifyContent: 'left',
                }}
                direction={{ xs: 'column', md: 'row' }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ marginRight: '2em' }}
                >
                  <span>Search by: </span>
                </Box>
                <Box display="flex" alignItems="left">
                  <RadioGroup
                    row
                    name="searchBy"
                    defaultValue="active"
                    value={searchBy}
                  >
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="All"
                      onClick={() => dispatch(setSearchBy('all'))}
                    />
                    <FormControlLabel
                      value="active"
                      control={<Radio />}
                      label="Active"
                      onClick={() => dispatch(setSearchBy('active'))}
                    />
                    <FormControlLabel
                      value="inactive"
                      control={<Radio />}
                      label="Inactive"
                      onClick={() => dispatch(setSearchBy('inactive'))}
                    />
                  </RadioGroup>
                </Box>
              </Stack>
              <Button
                sx={{
                  marginTop: {
                    xs: '1.5em',
                    sm: '0',
                  },
                  padding: '0.6em 1.125em',
                  background: '#053662',
                  color: '#ffffff',
                  borderRadius: '4px',
                  textTransform: 'none',
                  order: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  height: '100%',
                  alignSelf: {
                    sm: 'center',
                  },
                  '&:hover': {
                    background: '#053662',
                    color: '#ffffff',
                    boxShadow: 'none',
                  },
                }}
                onClick={() => dispatch(setExpand(!expand))}
              >
                Filter by Facility Type{' '}
                {expand ? <ArrowDropUp /> : <ArrowDropDown />}
              </Button>
            </Grid>
          </Grid>
          {expand && (
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={2}
                  direction={{ xs: 'column', sm: 'row' }}
                  sx={{
                    marginTop: {
                      xs: '1.5em',
                    },
                  }}
                >
                  <Grid item xs={12} sm={4} md={3}>
                    <FormControlLabel
                      checked={notificationFilter}
                      control={<Checkbox />}
                      label="Notification"
                      onClick={() => dispatch(setFilters('notification'))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={3}>
                    <FormControlLabel
                      control={<Checkbox />}
                      checked={permitFilter}
                      label="Permit"
                      onClick={() => dispatch(setFilters('permit'))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={3}>
                    <FormControlLabel
                      checked={approvalFilter}
                      control={<Checkbox />}
                      label="Approval"
                      onClick={() => dispatch(setFilters('approval'))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={3}>
                    <FormControlLabel
                      checked={operationalCertificateFilter}
                      control={<Checkbox />}
                      label="Operational Certificate"
                      onClick={() =>
                        dispatch(setFilters('operationalCertificate'))
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={3}>
                    <FormControlLabel
                      checked={compostFacilityFilter}
                      control={<Checkbox />}
                      disabled={compostFacilityFilterDisabled}
                      label="Compost Production Facility"
                      onClick={() => dispatch(setFilters('compostFacility'))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={3}>
                    <FormControlLabel
                      checked={landApplicationBioSolidsFilter}
                      control={<Checkbox />}
                      disabled={landApplicationBioSolidsFilterDisabled}
                      label="Land Application of Biosolids"
                      onClick={() =>
                        dispatch(setFilters('landApplicationBioSolids'))
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={3}
                  direction="row"
                  sx={{ marginTop: '0.1em' }}
                >
                  <Grid item xs={12}>
                    <Button
                      sx={{
                        border: '1px solid #353433',
                        borderRadius: '4px',
                        textTransform: 'none',
                      }}
                      variant="contained"
                      color="secondary"
                      onClick={() => dispatch(resetFilters())}
                    >
                      Reset Filters
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12}>
            <Divider
              sx={{
                margin: '2em 0em',
                width: '100%',
                maxWidth: '100%',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{
                margin: '2em 0em',
                width: '100%',
                maxWidth: '100%',
                fontStyle: 'italic',
              }}
            >
              Data Last Updated :  {lastModified}
            </Typography>
          </Grid>
          {pagination}
          <Grid
            item
            xs={12}
            sx={{
              margin: {
                xs: '1.5em 0',
                md: '2.5em 0',
              },
            }}
          >
            <Grid container spacing={3}>
              {filteredValue &&
                filteredValue.length > 0 &&
                filteredValue
                  .slice((page - 1) * 10, page * 10)
                  .map((item, index) => (
                    <Grid key={index} item xs={12} sx={{ width: '100%' }}>
                      <Card
                        elevation={0}
                        sx={{
                          background: '#F1F8FE',
                          order: 5,
                          width: '100%',
                          border: '1px solid #D8D8D8',
                        }}
                        key={index}
                      >
                        <CardContent
                          sx={{
                            padding: {
                              xs: '1.5em 1.5em 2.5em !important',
                              md: '1.5em 2.5em 2.5em !important',
                            },
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginBottom: '0.6em' }}
                          >
                            <span
                              style={{
                                fontFamily: 'BCSans',
                                fontStyle: 'normal',
                              }}
                            >
                              {' '}
                              Authorization #:
                              <span
                                style={{
                                  textDecoration: 'underline',
                                  marginLeft: '0.5em',
                                }}
                              >
                                {item['Authorization Number']}
                              </span>
                            </span>
                          </Typography>
                          <Typography
                            variant="h5"
                            component="h5"
                            sx={{
                              marginBottom: {
                                xs: '1em',
                                md: '.7em',
                              },
                            }}
                          >
                            <span
                              style={{
                                fontFamily: 'BCSans-Bold',
                              }}
                            >
                              {item['Regulated Party']}
                            </span>
                          </Typography>
                          <Grid container direction="row">
                            <Grid
                              item
                              xs={12}
                              md={6}
                              sx={{ marginBottom: { xs: '1.5em', md: '0' } }}
                            >
                              <Box sx={{ marginBottom: '.5em' }}>
                                <span
                                  style={{
                                    fontFamily: 'BCSans-Bold',
                                  }}
                                >
                                  Location of Facility
                                </span>
                              </Box>
                              <Box>
                                <span
                                  style={{
                                    fontFamily: 'BCSans',
                                    fontStyle: 'normal',
                                  }}
                                >
                                  {item['Facility Location']}
                                </span>
                              </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Box sx={{ marginBottom: '.5em' }}>
                                <span
                                  style={{
                                    fontFamily: 'BCSans-Bold',
                                  }}
                                >
                                  Authorization Type
                                </span>
                              </Box>
                              <Box>
                                <span
                                  style={{
                                    fontFamily: 'BCSans',
                                    fontStyle: 'normal',
                                  }}
                                >
                                  {item['Authorization Type']}
                                  {item['Operation Type']
                                    ? `, ${item['Operation Type']}`
                                    : ''}
                                </span>
                              </Box>
                            </Grid>
                          </Grid>
                          <Stack
                            sx={{
                              justifyContent: 'space-between',
                              alignItems: {
                                xs: 'flex-start',
                                sm: 'center',
                              },
                              display: 'flex',
                              marginTop: '1em',
                            }}
                            direction={{ xs: 'column', sm: 'row' }}
                          >
                            <Stack
                              direction="row"
                              sx={{
                                alignItems: 'center',
                                display: 'flex',
                                marginTop: '1em',
                              }}
                              spacing={1}
                            >
                              <span>Status: </span>
                              <Chip
                                sx={{
                                  background:
                                    item['Authorization Status'] === 'Active'
                                      ? '#42814A'
                                      : '#605E5C',
                                  color: '#ffffff',
                                }}
                                label={item['Authorization Status']}
                              />
                            </Stack>
                            <CardActions
                              sx={{
                                padding: '1em 0 0',
                                width: {
                                  xs: '100%',
                                  sm: 'auto',
                                },
                              }}
                            >
                              <Button
                                data-testid={`auth-list-view-facility-details-button-${item['Authorization Number']}`}
                                size="large"
                                sx={{
                                  border: '1px solid #053662;',
                                  borderRadius: '4px',
                                  boxSizing: 'border-box',
                                  textTransform: 'none',
                                  color: '#255A90;',
                                  width: {
                                    xs: '100%',
                                    sm: 'auto',
                                  },
                                }}
                                onClick={() =>
                                  buttonClicked(
                                    `/authorization/${item['Authorization Number']}`,
                                    {
                                      ...item,
                                    },
                                  )
                                }
                              >
                                View Facility Details
                              </Button>
                            </CardActions>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
            </Grid>
          </Grid>
          {pagination}
        </Grid>
      </Grid>
    </Grid>
  )
}
