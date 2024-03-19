import { ArrowDropDown, ArrowDropUp, MyLocation, Search } from '@mui/icons-material'
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

export default function AuthorizationList() {
  const navigate = useNavigate()
  const buttonClicked = (route: any, data: any) => {
    navigate(route, { state: { data: data } }) // reset the state
  }
  const dispatch = useDispatch()
  const {
    filteredValue,
    expand,
    omrrFilter,
    permitFilter,
    approvalFilter,
    compostFacilityFilter,
    landApplicationBioSolidsFilter,
    operationalCertificateFilter,
    location,
    searchBy,
    page,
    globalTextSearchFilter,
  } = useSelector((state: RootState) => state.omrr)
  /*const [expand, setExpand] = useState(false)
  const [location, setLocation] = useState<Location | null>(null)*/
  const pagination = (
    <Grid item xs={12}>
    <Box
      sx={{
        display: 'flex',
        width: '90vw', // Make the Box take full width
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Pagination
        sx={{
          '& .MuiPagination-root': { color: '#053662' },
        }}
        variant="outlined"
        shape="rounded"
        count={Math.ceil(filteredValue.length / 10)}
        page={page}
        onChange={(event, value) => dispatch(setPage(value))}
      />
      <Typography>
        Showing {(page - 1) * 10 + 1}-
        {Math.min(page * 10, filteredValue.length)} of{' '}
        {filteredValue.length} results
      </Typography>
    </Box>
  </Grid>
  )
  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      )
      console.log(location)
    })
  }
  const headerCard = (
    <CardContent>
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'BC Sans',
          fontWeight: 700,
          fontSize: 48,
          color: '#000000',
          marginBottom: '0.5em',
        }}
        component="div"
      >
        Authorizations
      </Typography>
      <Typography component="div">
        Authorized compost and biosolid facilities in B.C.
      </Typography>
    </CardContent>
  )
  return (
    <Grid container spacing={2} sx={{ marginTop: '4vh' }}>
      <Grid item xs={12}>
        <Card
          variant="outlined"
          sx={{
            padding: '2em',
            marginTop: '0.1em',
            backgroundColor: '#D1CFCD',
          }}
        >
          {headerCard}
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} sx={{ paddingTop: '8vh', paddingLeft:'4vw', paddingBottom:'4vw' }}>
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
                endAdornment: (
                  <Button
                    sx={{
                      color: '#9F9D9C',
                    }}
                    onClick={handleLocation}
                  >
                    <MyLocation />
                  </Button>
                ),
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Stack
              sx={{
                display: 'flex',
                alignItems: 'left' /* Frame 1186 */,
                flexDirection: 'row',
                maxWidth: '90vw',
                justifyContent: 'space-between', // Add this line
              }}
              direction="row"
            >
              <Box display="flex" alignItems="center">
                <span>Search by: </span>
                <RadioGroup
                  sx={{ marginLeft: '2em' }}
                  row
                  name="searchBy"
                  defaultValue="all"
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
                onClick={() => dispatch(setExpand(!expand))}
              >
                Filter by Facility Type{' '}
                {expand ? <ArrowDropUp /> : <ArrowDropDown />}
              </Button>
            </Stack>
          </Grid>
          {expand && (
            <Grid item xs={12}>
              <Grid item xs={12}>
              <Stack
                direction="row"
                spacing={6}
                sx={{
                  width: '85vw', // Make the Stack take full width
                  justifyContent: 'space-between', // Add space between children
                }}
              >
                <FormControlLabel
                  checked={omrrFilter}
                  control={<Checkbox />}
                  label="Organic Matter Recycling Regulation"
                  onClick={() => dispatch(setFilters('omrr'))}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={permitFilter}
                  label="Permit"
                  onClick={() => dispatch(setFilters('permit'))}
                />
                <FormControlLabel
                  checked={approvalFilter}
                  control={<Checkbox />}
                  label="Approval"
                  onClick={() => dispatch(setFilters('approval'))}
                />
                <FormControlLabel
                  checked={operationalCertificateFilter}
                  control={<Checkbox />}
                  label="Operational Certificate"
                  onClick={() => dispatch(setFilters('operationalCertificate'))}
                />
              </Stack>
              </Grid>
              <Grid item xs={5.68}>
              <Stack
                direction="row"
                useFlexGap flexWrap="wrap"
                sx={{
                  marginTop: '1em',
                  marginLeft:'0.7em',
                  justifyContent: 'space-between', // Add space between children
                }}
              >
                <FormControlLabel
                  checked={compostFacilityFilter}
                  control={<Checkbox />}
                  label="Compost Production Facility"
                  onClick={() => dispatch(setFilters('compostFacility'))}
                />
                <FormControlLabel

                  checked={landApplicationBioSolidsFilter}
                  control={<Checkbox />}
                  label="Land Application Biosolids"
                  onClick={() => dispatch(setFilters('landApplicationBioSolids'))}
                />
              </Stack>
              </Grid>
              <Stack
                direction="row"
                sx={{
                  padding: '1em 0.6em',
                }}
                spacing={6}
              >
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
              </Stack>
            </Grid>
          )}
          <Grid item xs={12}>
            <Divider sx={{ width: '90vw', maxWidth: '90vw' }} />
          </Grid>
          {pagination}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {filteredValue && filteredValue.length> 0 && filteredValue
                .slice((page - 1) * 10, page * 10)
                .map((item, index) => (
                  <Grid key={index} item xs={12} sx={{ width: '90vw' }}>
                    <Card sx={{ background: '#E0DEDC', order: 5, width: '90vw' }} key={index}>
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                    <span
                      style={{
                        fontFamily: 'BC Sans',
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
                        fontFamily: 'BC Sans',
                        fontStyle: 'normal',
                        fontWeight: 700,
                      }}
                    >
                      {item['Regulated Party']}
                    </span>
                        </Typography>
                        <br />
                        <Stack>
                          <Stack
                            sx={{
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              display: 'flex',
                            }}
                            direction="row"
                          >
                      <span
                        style={{
                          fontFamily: 'BC Sans',
                          fontStyle: 'normal',
                          fontWeight: 700,
                        }}
                      >
                        Location of Facility
                      </span>
                            {item['Operation Type'] && (
                              <span
                                style={{
                                  fontFamily: 'BC Sans',
                                  fontStyle: 'normal',
                                  fontWeight: 700,
                                }}
                              >
                          Type of Facility
                        </span>
                            )}
                          </Stack>
                          <Stack
                            sx={{
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              display: 'flex',
                            }}
                            direction="row"
                          >
                      <span
                        style={{
                          fontFamily: 'BC Sans',
                          fontStyle: 'normal',
                        }}
                      >
                        {item['Facility Location']}
                      </span>
                            {item['Operation Type'] && (
                              <span
                                style={{
                                  fontFamily: 'BC Sans',
                                  fontStyle: 'normal',
                                }}
                              >
                          {item['Operation Type']}
                        </span>
                            )}
                          </Stack>
                        </Stack>
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
                                    ? '#353433'
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
                                border: '1px solid #353433',
                                borderRadius: '4px',
                                color: '#000000',
                                boxSizing: 'border-box',
                                backgroundColor: '#D1CFCD',
                                textTransform: 'none',
                              }}
                              onClick={() =>
                                buttonClicked(`/authorization/${item['Authorization Number']}`, {
                                  ...item,
                                })
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
