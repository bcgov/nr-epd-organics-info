import { Box, Typography } from '@mui/material'

import homePageBanner from '@/assets/homepage-banner-unsplash.jpg'

const styles = {
  box: {
    height: {
      xs: '209px',
      md: '305px',
    },
    padding: {
      xs: '40px 24px 40px',
      md: '160px 76px 40px',
    },
    background: `linear-gradient(0deg, var(--surface-color-brand-gold-60) 0%, var(--surface-color-brand-gold-60) 100%), url(${homePageBanner}) lightgray -34.093px -78.971px / 111.389% 194.45% no-repeat`,
    backgroundBlendMode: 'multiply, normal',
  },
  heading: {
    fontSize: {
      xs: '36px',
      md: '48px',
    },
  },
}

export function TopSection() {
  return (
    <Box className="top-banner" sx={styles.box}>
      <Typography
        variant="h1"
        component="h1"
        color="secondary"
        fontWeight={700}
        sx={styles.heading}
      >
        Guidance
      </Typography>
    </Box>
  )
}
