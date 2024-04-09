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
  } = useSelector((state: RootState) => state.omrr)
  const pagination = (
    <Grid
      sx={{
        margin: mdMatches ? '0em' : '1em 0em 1em 0em',
      }}
      item
      xs={12}
    >
      <Grid
        container
        spacing={0}
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          display: 'flex',
          width: '90vw', // Make the Box take full width
          justifyContent: 'space-between',
        }}
      >
        <Pagination
          sx={{
            margin: mdMatches ? '0em' : '1em 0em 1em 0em',
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
          page={page}
          onChange={(event, value) => dispatch(setPage(value))}
        />
        <Typography>
          Showing {(page - 1) * 10 + 1}-
          {Math.min(page * 10, filteredValue.length)} of {filteredValue.length}{' '}
          results
        </Typography>
      </Grid>
    </Grid>
  )
  const headerCard = (
    <CardContent>
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'BCSans',
          fontWeight: 700,
          fontSize: 48,
          color: '#000000',
          marginBottom: '0.5em',
        }}
        component="div"
      >
        Authorizations
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ fontFamily: 'BCSans' }}>
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
            padding: mdMatches ? '2em' : '.5em',
            marginTop: '0.1em',
            backgroundColor: '#FCC85D',
            borderRadius: '0',
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
          sx={{ paddingTop: '8vh', paddingLeft: '4vw', paddingBottom: '4vw' }}
        >
          <Grid item xs={12}>
            <TextField
              sx={{
                minWidth: '90vw',
                color: '#9F9D9C',
              }}
              label="Search Authorizations"
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
              sx={{ maxWidth: '90vw' }}
              justifyContent="space-between"
              spacing={0}
              direction={{ xs: 'column', md: 'row' }}
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
                  marginTop: mdMatches ? '0em' : '1em',
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
                  direction={{ xs: 'column', md: 'row' }}
                >
                  <Grid item xs={3}>
                    <FormControlLabel
                      checked={notificationFilter}
                      control={<Checkbox />}
                      label="Notification"
                      onClick={() => dispatch(setFilters('notification'))}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControlLabel
                      control={<Checkbox />}
                      checked={permitFilter}
                      label="Permit"
                      onClick={() => dispatch(setFilters('permit'))}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControlLabel
                      checked={approvalFilter}
                      control={<Checkbox />}
                      label="Approval"
                      onClick={() => dispatch(setFilters('approval'))}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControlLabel
                      checked={operationalCertificateFilter}
                      control={<Checkbox />}
                      label="Operational Certificate"
                      onClick={() =>
                        dispatch(setFilters('operationalCertificate'))
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid sx={{ marginTop: '1em' }} item xs={12}>
                <Grid
                  container
                  spacing={2}
                  direction={{ xs: 'column', md: 'row' }}
                >
                  <Grid item xs={3}>
                    <FormControlLabel
                      checked={compostFacilityFilter}
                      control={<Checkbox />}
                      disabled={compostFacilityFilterDisabled}
                      label="Compost Production Facility"
                      onClick={() => dispatch(setFilters('compostFacility'))}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControlLabel
                      checked={landApplicationBioSolidsFilter}
                      control={<Checkbox />}
                      disabled={landApplicationBioSolidsFilterDisabled}
                      label="Land Application Biosolids"
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
                margin: '1em 0em 1em 0em',
                width: '90vw',
                maxWidth: '90vw',
              }}
            />
          </Grid>
          {pagination}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {filteredValue &&
                filteredValue.length > 0 &&
                filteredValue
                  .slice((page - 1) * 10, page * 10)
                  .map((item, index) => (
                    <Grid key={index} item xs={12} sx={{ width: '90vw' }}>
                      <Card
                        elevation={0}
                        sx={{ background: '#F1F8FE', order: 5, width: '90vw' }}
                        key={index}
                      >
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            <span
                              style={{
                                fontFamily: 'BCSans',
                                fontStyle: 'normal',
                                fontWeight: 700,
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
                          <br />
                          <Typography variant="h5" component="div">
                            <span
                              style={{
                                fontFamily: 'BCSans',
                                fontStyle: 'normal',
                                fontWeight: 700,
                              }}
                            >
                              {item['Regulated Party']}
                            </span>
                          </Typography>
                          <br />
                          <Grid container direction="row">
                            <Grid item xs={6}>
                              <span
                                style={{
                                  fontFamily: 'BCSans',
                                  fontStyle: 'normal',
                                  fontWeight: 700,
                                }}
                              >
                                Location of Facility
                              </span>
                            </Grid>
                            <Grid item xs={6}>
                              <span
                                style={{
                                  fontFamily: 'BCSans',
                                  fontStyle: 'normal',
                                  fontWeight: 700,
                                }}
                              >
                                Authorization Type
                              </span>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            direction="row"
                            sx={{ marginTop: '1em' }}
                          >
                            <Grid item xs={6}>
                              <span
                                style={{
                                  fontFamily: 'BCSans',
                                  fontStyle: 'normal',
                                }}
                              >
                                {item['Facility Location']}
                              </span>
                            </Grid>
                            <Grid item xs={6}>
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
                            </Grid>
                          </Grid>

                          <Stack
                            sx={{
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              display: 'flex',
                              marginTop: '1em',
                            }}
                            direction="row"
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
                            <CardActions>
                              <Button
                                size="large"
                                sx={{
                                  border: '1px solid #053662;',
                                  borderRadius: '4px',
                                  boxSizing: 'border-box',
                                  textTransform: 'none',
                                  color: '#255A90;',
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
          <Grid item xs={12}>
            <Divider sx={{ width: '90vw', maxWidth: '90vw' }} />
          </Grid>
          {pagination}
        </Grid>
      </Grid>
    </Grid>
  )
}
