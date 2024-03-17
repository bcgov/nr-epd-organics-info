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
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment, Pagination,
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
  setExpand,
  setFilters,
  setLocation, setPage,
  setSearchBy,
} from '@/features/omrr/omrr-slice'

export default function AuthorizationList() {
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
    page
  } = useSelector((state: RootState) => state.omrr)
  /*const [expand, setExpand] = useState(false)
  const [location, setLocation] = useState<Location | null>(null)*/

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
    <Stack sx={{ margin: '2em' }}>
      <Card
        sx={{
          padding: '2em',
          marginTop: '0.1em',
          backgroundColor: '#D1CFCD',
          height: '10em',
          width: '120em',
        }}
      >
        {headerCard}
      </Card>
      <TextField
        sx={{
          margin: '2em',
          color: '#9F9D9C',
        }}
        label="Search Authorizations"
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
      />
      <Stack
        sx={{
          margin: '2em',
          display: 'flex',
          alignItems: 'left' /* Frame 1186 */,
          flexDirection: 'row',
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
            justifyContent: 'flex-end',
            '&:hover': {
              background: '#053662',
              color: '#ffffff',
              boxShadow: 'none',
            },
          }}
          onClick={() => dispatch(setExpand(!expand))}
        >
          Filter by Facility Type {expand ? <ArrowDropUp /> : <ArrowDropDown />}
        </Button>
      </Stack>
      {expand && (
        <Stack sx={{ margin: '2em' }}>
          <Stack
            direction="row"
            spacing={6}
            sx={{
              width: '100%', // Make the Stack take full width
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
          <Stack
            direction="row"
            spacing={6}
            sx={{
              width: '49.7%', // Make the Stack take full width
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
              }}
              variant="contained"
              color="secondary"
              onClick={() => dispatch(resetFilters())}
            >
              Reset Filters
            </Button>
          </Stack>
        </Stack>
      )}
      <Divider />
      <Pagination sx={{margin:'2em'}}
        count={Math.ceil(filteredValue.length / 10)}
        page={page}
        onChange={(event,value) => dispatch(setPage(value))}
      />
      <Stack sx={{margin:'2em'}} spacing={2}>
        {filteredValue.slice((page - 1) * 10, page * 10).map((item, index) => (
          <Card  key={index}>
            <CardContent>
              <Typography variant="h5" component="div">
                {item['Authorization Number']}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item['Facility Location']}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Pagination
        count={Math.ceil(filteredValue.length / 10)}
        page={page}
        onChange={(event,value) => dispatch(setPage(value))}
      />
    </Stack>
  )
}
