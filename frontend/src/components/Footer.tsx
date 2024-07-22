import { useLocation } from 'react-router-dom'
import {
  AppBar,
  Button,
  Fade,
  Divider,
  Grid,
  Link,
  Stack,
  Toolbar,
  useScrollTrigger,
} from '@mui/material'
import { ArrowUpward } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const styles = {
  appBar: {
    flexShrink: 0,
    top: 'auto',
    bottom: 0,
    color: '#ffffff',
    backgroundColor: '#053662',
    display: 'flex',
    height: '4em',
  },
  footerButton: {
    margin: '0.2em',
    padding: '0.2em',
    color: '#ffffff',
  },
}

export default function Footer() {
  const location = useLocation()
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))

  // Don't show the footer on the map page
  if (location.pathname === '/map' && isSmall) {
    return null
  }

  return (
    <AppBar
      position="relative"
      sx={styles.appBar}
      color="default"
      component="footer"
    >
      <Toolbar
        sx={{
          padding: {
            xs: '1.5em 1em',
            md: '1.5em',
          },
          margin: {
            xs: '0',
            md: '0 auto',
          },
        }}
      >
        <Grid
          container
          direction={{ xs: 'column', lg: 'row' }}
          justifyContent="center"
        >
          <Grid item xs={10}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{
                flexWrap: {
                  xs: 'wrap',
                  md: 'nowrap',
                },
              }}
              divider={
                <Divider
                  sx={{
                    height: '1em',
                    color: '#ffffff',
                    borderColor: '#ffffff',
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyItems: 'center',
                    justifyContent: 'center',
                  }}
                  orientation="vertical"
                  flexItem
                />
              }
              spacing={2}
            >
              <Link
                data-testid="footer-home"
                sx={styles.footerButton}
                id="footer-home"
                target="_blank"
                href="https://www.gov.bc.ca/"
              >
                Home
              </Link>
              <Link
                data-testid="footer-copyright"
                sx={styles.footerButton}
                color="primary"
                id="footer-copyright"
                target="_blank"
                href="https://gov.bc.ca/copyright"
              >
                Copyright
              </Link>
              <Link
                data-testid="footer-disclaimer"
                sx={styles.footerButton}
                id="footer-disclaimer"
                target="_blank"
                href="https://gov.bc.ca/disclaimer"
              >
                Disclaimer
              </Link>

              <Link
                data-testid="footer-privacy"
                sx={styles.footerButton}
                id="footer-privacy"
                target="_blank"
                href="https://gov.bc.ca/privacy"
              >
                Privacy
              </Link>

              <Link
                data-testid="footer-accessibility"
                sx={styles.footerButton}
                color="primary"
                id="footer-accessibility"
                target="_blank"
                href="https://gov.bc.ca/webaccessibility"
              >
                Accessibility
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={1} justifyContent="end">
            <Grid container spacing={1} justifyContent="right">
              <ScrollToTop />
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

// To Do: Build a check to see if user has scrolled to the bottom so we offset the button at the end of the page to not overlap the footer on mobile.
function ScrollToTop() {
  const trigger = useScrollTrigger({
    threshold: 100,
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Fade in={trigger}>
      <Button
        sx={{
          position: 'fixed',
          bottom: {
            xs: '1.8em',
            sm: '0.8em',
          },
          right: {
            xs: '2em',
            sm: '3.3em',
          },
          width: '4.25em',
          height: '4em',
          minWidth: '4.25em',
          background: ' #F8BA47',
          borderRadius: '.5em',
          zIndex: 9,
        }}
        onClick={() => scrollToTop()}
      >
        <ArrowUpward />
      </Button>
    </Fade>
  )
}
