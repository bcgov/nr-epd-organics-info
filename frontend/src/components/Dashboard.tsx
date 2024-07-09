import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Link,
  Typography,
  Box,
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
import { ChevronRight } from '@mui/icons-material'
import LearnMoreCard from '@/components/LearnMoreCard'

function informationTypography() {
  return (
    <>
      <Grid
        container
        direction={{ xs: 'column', lg: 'row' }}
        sx={{ zIndex: 1 }}
      >
        <Grid item xs={12}>
          <Typography
            data-testid="dashboard_heading"
            variant="h2"
            component="h2"
            sx={{
              fontFamily: 'BCSans',
              fontWeight: 400,
              color: '#000000',
              marginBottom: '1em',
            }}
          >
            Organic Recycling in B.C.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div data-testid="recycling_regulation">
            <a
              href="https://www2.gov.bc.ca/gov/content/environment/waste-management/food-and-organic-waste/regulations-guidelines"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#000000', textDecoration: 'underline' }}
            >
              British Columbia's Organic Matter Recycling Regulation (OMRR):
            </a>
            <ul style={{ marginBottom: '2em' }}>
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
            <ul style={{ marginBottom: '2em' }}>
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
          backgroundPosition: 'center',
        }}
      />
      <Stack>
        <CardContent>
          <Typography
            gutterBottom
            variant="h1"
            component="h1"
            data-testid="dashboard_heading"
            sx={{
              margin: {
                xs: '2em .333em 0',
                sm: '2.25em .7em 0',
                md: '5em .7em 0',
              },
              color: '#FFFFFF',
              backgroundColor: 'none',
              position: 'relative',
              textAlign: 'left',
            }}
          >
            Compost and Biosolids
          </Typography>
          <Typography
            data-testid="dashboard_subheading"
            variant="h6"
            component="h6"
            sx={{
              margin: {
                xs: '1em .6em 0',
                sm: '1em 1.6em 0',
              },
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
          <Button
            size="large"
            color="secondary"
            variant="contained"
            onClick={() => buttonClicked('/map')}
          >
            Search on a map
          </Button>
          <Button
            data-testid="list_all_authorizations"
            size="large"
            color="secondary"
            variant="contained"
            onClick={() => buttonClicked('/search')}
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
        margin: '0',
        padding: {
          xs: '2.5em 1.8em 5em',
          sm: '5em 3em',
        },
        borderRadius: '0px',
        backgroundColor: '#FCC85D',
        backgroundImage: {
          xs: 'none',
          md: `url(${bcEarthImage})`,
        },
        backgroundPosition: 'right 4em top 50%',
        backgroundSize: '25em',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {mdMatches && <>{informationTypography()}</>}
      {!mdMatches && (
        <>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              sx={{
                content: `url(${bcEarthImage})`,
                width: '100%',
                maxWidth: 300,
                marginBottom: '1.5em',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {informationTypography()}
          </Grid>
        </>
      )}
    </Grid>
  )

  return (
    <Grid item sx={{ marginTop: '3em' }}>
      {headerCard}
      {infoCard}
      <Grid
        container
        spacing={3}
        sx={{
          margin: 0,
          padding: '1em',
          maxWidth: '100%',
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            padding: '0 !important',
            margin: {
              xs: '1.5em 0.7em 2.5em',
              sm: '1.5em 1.9em 2.5em',
              md: '4em 1.9em 3em',
            },
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              color: '#000000',
              marginTop: {
                xs: '.5em',
                md: '0',
              },
            }}
          >
            Learn more
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            padding: '0 !important',
            margin: {
              xs: '0 0.7em',
              sm: '0 1.9em',
            },
          }}
        >
          <Grid
            container
            spacing={3}
            direction={{ xs: 'column', md: 'row' }}
            sx={{
              marginBottom: {
                xs: '4em',
                md: '9em',
              },
            }}
          >
            <LearnMoreCard
              title="Legislation"
              link="https://www2.gov.bc.ca/gov/content/environment/waste-management/food-and-organic-waste/regulations-guidelines"
              icon={govSvg}
              actions="Learn about the laws that apply to recycling organic matter."
            />
            <LearnMoreCard
              title="Process and procedures"
              link="https://www2.gov.bc.ca/gov/content/environment/waste-management/waste-discharge-authorization"
              icon={verification}
              actions="Learn about how we administer the authorizations process for
                    compost and biosolids facilities."
            />
            <LearnMoreCard
              title="Compliance and enforcement"
              link="https://www2.gov.bc.ca/gov/content/environment/natural-resource-stewardship/natural-resource-law-enforcement/environmental-compliance"
              icon={identity}
              actions="Search the compliance and enforcement database and learn
                    about how we coordinate oversight."
              divider={false}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
