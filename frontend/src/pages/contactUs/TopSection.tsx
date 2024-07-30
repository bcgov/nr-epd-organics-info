import { Box, Typography } from '@mui/material'

import homePageBanner from '@/assets/homepage-banner-unsplash.jpg'

const styles = {
  box: {
    height: {
      xs: '209px',
      md: '305px',
    },
    padding: {
      xs: '40px 24px 80px',
      md: '160px 76px 80px',
    },
    // backgroundImage: `url(${homePageBanner})`,
    background: `linear-gradient(0deg, rgba(5, 54, 98, 0.80) 0%, rgba(5, 54, 98, 0.80) 100%), url(${homePageBanner}) lightgray -34.093px -78.971px / 111.389% 194.45% no-repeat`,
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
    <Box sx={styles.box}>
      <Typography
        variant="h1"
        component="h1"
        color="secondary"
        fontWeight={700}
        sx={styles.heading}
      >
        Contact Us
      </Typography>
    </Box>
  )
}
