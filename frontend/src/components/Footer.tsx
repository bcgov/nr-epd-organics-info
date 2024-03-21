import { AppBar, Grid, Link, Toolbar } from '@mui/material'
import Button from '@mui/material/Button'
import { ArrowUpward } from '@mui/icons-material'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
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
  },
  footerButton: {
    margin: '0.2em',
    padding: '0.2em',
    color: '#ffffff',
  },
}

export default function Footer() {
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.up('md'))
  return (
    <AppBar position="relative" sx={styles.appBar} color="default">
      <Toolbar>
        <Grid container direction={{ xs: 'column', lg: 'row' }} justifyContent="center">
          <Grid item xs={10}>
            <Stack
              direction={{ xs: 'column', lg: 'row' }}
              alignItems={'center'}
              justifyContent="center"
              divider={mdMatches && <Divider sx={{
                height: '1em', color: '#ffffff', borderColor: '#ffffff', alignContent: 'center'
                , alignItems: 'center', alignSelf: 'center', justifyItems: 'center', justifyContent: 'center',
              }} orientation="vertical" flexItem />}
              spacing={2}
            >
              <Link
                sx={styles.footerButton}
                id="footer-home"
                target="_blank"
                href="https://www.gov.bc.ca/"
              >
                Home
              </Link>
              <Link
                sx={styles.footerButton}
                color="primary"
                id="footer-copyright"
                target="_blank"
                href="https://gov.bc.ca/copyright"
              >
                Copyright
              </Link>
              <Link
                sx={styles.footerButton}
                id="footer-disclaimer"
                target="_blank"
                href="https://gov.bc.ca/disclaimer"
              >
                Disclaimer
              </Link>

              <Link
                sx={styles.footerButton}
                id="footer-privacy"
                target="_blank"
                href="https://gov.bc.ca/privacy"
              >
                Privacy
              </Link>

              <Link
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
              <Button
                style={{
                  position: 'relative',
                  bottom: '0.2em',
                  width: '1em',
                  height: '3em',
                  background: ' #F8BA47',
                  borderRadius: '0.2em',
                }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <ArrowUpward />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
