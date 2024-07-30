import { useNavigate } from 'react-router'
import { Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button'

import homePageBanner from '@/assets/homepage-banner-unsplash.jpg'

const styles = {
  section: {
    // backgroundImage: `url(${homePageBanner})`,
    background: `linear-gradient(0deg, rgba(5, 54, 98, 0.80) 0%, rgba(5, 54, 98, 0.80) 100%), url(${homePageBanner}) lightgray -34.093px -78.971px / 111.389% 194.45% no-repeat`,
    backgroundBlendMode: 'multiply, normal',
    padding: {
      xs: '40px 24px',
      md: '80px 76px',
    },
    height: {
      xs: 'auto',
      md: '377px',
    },
    gap: '32px',
  },
  heading: {
    fontSize: {
      xs: '28px',
      md: '32px',
    },
  },
  buttonBar: {
    gap: '16px',
  },
  button: {
    color: '#255a90',
    fontWeight: 'bold',
    fontSize: '18px',
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
