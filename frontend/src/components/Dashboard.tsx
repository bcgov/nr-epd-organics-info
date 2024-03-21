import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material'
import Button from '@mui/material/Button'
import { Stack } from '@mui/system'
import { useNavigate } from 'react-router'
import homePageBanner from '@/assets/homepage-banner-unsplash.jpg'
import bcEarthImage from '@/assets/BC.svg'
import identity from '@/assets/font-awesome-identity.svg'
import govSvg from '@/assets/font-awesome-government.svg'
import verification from '@/assets/font-awesome-verification.svg'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

function informationTypography() {
  return (
    <>
      <Grid container direction={{ xs: 'column', lg: 'row' }}>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontFamily: 'BCSans',
              fontWeight: 400,
              fontSize: 28,
              color: '#000000',
            }}
            component="div"
          >
            Organic Recycling in B.C.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div>
            <a
              href="https://www2.gov.bc.ca/gov/content/environment/waste-management/food-and-organic-waste/regulations-guidelines"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#000000', textDecoration: 'underline' }}
            >
              British Columbia's Organic Matter Recycling Regulation (OMRR):
            </a>
            <ul>
              <li>
                Governs the construction and operation of compost facilities
              </li>{' '}
              <li>
                Regulates the production, distribution, storage, sale and use of
                biosolids and compost
              </li>{' '}
              <li>Controls how compost facilities are built and operated</li>{' '}
            </ul>
            The B.C. government has a plan to update the regulation to:
            <ul>
              <li>Better protect of human and environment health</li>
              <li>Increase engagement with Indigenous communities</li>
              <li> Improve transparency around organic matter management</li>
            </ul>{' '}
            Learn about the planned changes in the{' '}
            <Link
              sx={{ color: '#000000' }}
              href={
                'https://www2.gov.bc.ca/assets/gov/environment/waste-management/organic-waste/reports-and-papers/omrr-public-update-june-2022.pdf'
              }
              target={'_blank'}
            >
              <span style={{ textDecoration: 'underline' }}>
                project update report
              </span>
            </Link>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default function Dashboard() {
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.up('md'))
  const navigate = useNavigate()
  const buttonClicked = (route: string) => {
    navigate(route)
  }
  const headerCard = (
    <Card
      sx={{
        position: 'relative',
        height: '35%',
        borderRadius: '0px',
        width: '100%',
      }}
    >
      <CardMedia
        component="div"
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${homePageBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left',
        }}
      />
      <Stack>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            sx={{
              margin: '2em 0em 0em 1em',
              fontSize: 42,
              color: '#FFFFFF',
              backgroundColor: 'none',
              position: 'relative',
              textAlign: 'left',
            }}
          >
            Compost and Biosolids
          </Typography>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              margin: '1em 0em 0.5em 2em',
              color: '#FFFFFF',
              backgroundColor: 'none',
              position: 'relative',
              textAlign: 'left',
            }}
          >
            Find an authorized compost and biosolid facility in British Columbia
          </Typography>
        </CardContent>
        <CardActions>
          {/*<Button
            size="large"
            sx={{
              margin: '1em 0em 3em 3em',
              boxSizing: 'border-box',
              border: '1px solid #FFFFFF',
              borderRadius: '4px',
              color: '#FFFFFF',
              textTransform: 'none',
            }}
            onClick={() => {
              console.log('map')
            }}
          >
            Search on a map
          </Button>*/}
          <Button
            size="large"
            sx={{
              margin: '1em 0em 3em 3em',
              boxSizing: 'border-box',
              border: '1px solid #FFFFFF',
              borderRadius: '4px',
              color: '#FFFFFF',
              textTransform: 'none',
            }}
            onClick={() => {
              buttonClicked('/search')
            }}
          >
            List all authorizations
          </Button>
        </CardActions>
      </Stack>
    </Card>
  )
  const infoCard = (
    <Grid
      container
      direction={{ xs: 'column', lg: 'row' }}
      sx={{
        margin: '0em 0em 0em 0em',
        padding: '1em 3em 0.475em 3em',
        backgroundColor: '#FCC85D',
        borderRadius: '0px',
      }}
    >
      {mdMatches && (
        <>
          <CardMedia
            image={bcEarthImage}
            sx={{
              marginLeft:'40%',
              position: 'absolute',
              width: '50%',
              height: '30%',
              backgroundSize: 'contain',
              backgroundPosition: 'right',
            }}
          />
          {informationTypography()}
        </>
      )}
      {!mdMatches && (
        <>
          <Grid item xs={12}>
            <img src={bcEarthImage} alt="BC Earth" />
          </Grid>
          <Grid item xs={12}>
            {informationTypography()}
          </Grid>
        </>
      )}
    </Grid>
  )

  return (
    <Grid item sx={{ marginTop: '6vh' }}>
      {headerCard}
      {infoCard}
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ margin: '3em 0em 0em 3em' }}>
          <Typography
            sx={{
              fontSize: 28,
              color: '#000000',
            }}
            component="div"
          >
            Learn more
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ margin: '1em 2em 3em 3em' }}>
          <Grid container spacing={1} direction={{ xs: 'column', md: 'row' }}>
            <Grid item xs={12} md={4}>
              <Card elevation={0}>
                <CardHeader
                  sx={{ margin: '0em 0em 0em -1em' }}
                  title={
                    <Link
                      target={'_blank'}
                      href="https://www2.gov.bc.ca/gov/content/environment/waste-management/food-and-organic-waste/regulations-guidelines"
                    >
                      {' '}
                      Legislation {'>'}
                    </Link>
                  }
                ></CardHeader>
                <CardContent
                  sx={{
                    background: '#D8EAFD',
                    height: '15em',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      position: 'absolute',
                      width: '3em',
                      height: '3em',
                      backgroundImage: `url(${govSvg})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                    }}
                  />
                </CardContent>

                <CardActions sx={{ margin: '0em 0em 0em -0.5em' }}>
                  <span>
                    Learn about the laws that apply to recycling organic matter.
                  </span>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={0}>
                <CardHeader
                  sx={{ margin: '0em 0em 0em -1em' }}
                  title={
                    <Link
                      target={'_blank'}
                      href="https://www2.gov.bc.ca/gov/content/environment/waste-management/waste-discharge-authorization"
                    >
                      Process and procedures {'>'}
                    </Link>
                  }
                ></CardHeader>
                <CardContent
                  sx={{
                    background: '#D8EAFD',
                    height: '15em',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      position: 'absolute',
                      width: '3em',
                      height: '3em',
                      backgroundImage: `url(${verification})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                    }}
                  />
                </CardContent>

                <CardActions sx={{ margin: '0em 0em 0em -0.5em' }}>
                  <span>
                    Learn about how we administer the authorizations process for
                    compost and biosolids facilities.
                  </span>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={0}>
                <CardHeader
                  sx={{ margin: '0em 0em 0em -1em' }}
                  title={
                    <Link
                      target={'_blank'}
                      href="https://www2.gov.bc.ca/gov/content/environment/natural-resource-stewardship/natural-resource-law-enforcement/environmental-compliance"
                    >
                      Compliance and enforcement {'>'}
                    </Link>
                  }
                ></CardHeader>
                <CardContent
                  sx={{
                    background: '#D8EAFD',
                    height: '15em',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      position: 'absolute',
                      width: '3em',
                      height: '3em',
                      backgroundImage: `url(${identity})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                    }}
                  />
                </CardContent>

                <CardActions sx={{ margin: '0em 0em 0em -0.5em' }}>
                  <span>
                    Learn about how we coordinate oversight and ensure the
                    process is accountable. 
                  </span>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
