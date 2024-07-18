import { useNavigate } from 'react-router'
import { Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button'

import homePageBanner from '@/assets/homepage-banner-unsplash.jpg'

const styles = {
  section: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundImage: `url(${homePageBanner})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '5rem',
    height: {
      xs: 'auto',
      md: '377px',
    },
    gap: '2rem',
  },
  stack: {},
  heading: {},
  buttonBar: {
    gap: '1rem',
  },
  button: {
    color: '#255a90',
    fontWeight: 'bold',
    fontSize: '1.125rem',
  },
}

export function TopSection() {
  const navigate = useNavigate()

  return (
    <Stack direction="column" component="section" sx={styles.section}>
      <Typography
        gutterBottom
        variant="h2"
        component="h2"
        color="secondary"
        sx={styles.heading}
      >
        Find an authorized compost and biosolid facility in British Columbia
      </Typography>
      <Stack
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={styles.buttonBar}
      >
        <Button
          size="large"
          color="secondary"
          variant="contained"
          sx={styles.button}
          onClick={() => navigate('/map')}
        >
          Search on a map
        </Button>
        <Button
          size="large"
          color="secondary"
          variant="contained"
          sx={styles.button}
          onClick={() => navigate('/search')}
        >
          List all authorizations
        </Button>
      </Stack>
    </Stack>
  )
}
