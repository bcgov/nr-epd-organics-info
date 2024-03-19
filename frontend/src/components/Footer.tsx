import { AppBar, Grid, Link, Toolbar } from '@mui/material'
import Button from '@mui/material/Button'
import { ArrowUpward } from '@mui/icons-material'

const styles = {
  appBar: {
    flexShrink: 0,
    top: 'auto',
    bottom: 0,
    color: '#ffffff',
    backgroundColor: '#053662',
    display: 'flex'
  },
  footerButton: {
    margin: '0.2em',
    padding: '0.2em',
    color: '#ffffff',
  },
}

export default function Footer() {
  return (
    <AppBar position="relative" sx={styles.appBar} color="default">
      <Toolbar>
        <Grid container spacing={2} justifyContent={'center'}>
          <Grid item columns={12}>
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
              id="footer-about"
              target="_blank"
              href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca"
            >
              About gov.bc.ca
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
              color="primary"
              id="footer-contact"
              target="_blank"
              href="https://www2.gov.bc.ca/gov/content/home/contact-us"
            >
              Contact Us
            </Link>
            <Button
              style={{
                position: 'fixed',
                bottom: '0.2em',
                width: '2em',
                height: '4em',
                right: '2em',
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
      </Toolbar>
    </AppBar>
  )
}
