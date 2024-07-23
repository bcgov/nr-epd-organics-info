import { Typography, Button, Box, Stack } from '@mui/material'

import infoImage from '@/assets/homepage-info.png'

const styles = {
  section: {
    padding: {
      xs: '2.5rem 1.5rem',
      md: '5rem',
    },
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '1.5rem',
  },
  heading2: {
    fontSize: {
      xs: '1.25rem',
      md: '1.5rem',
    },
    fontWeight: 'bold',
  },
  link: {
    textDecoration: 'none',
  },
  content: {
    paddingBottom: '1.25em',
  },
  stack: {
    justifyContent: {
      lg: 'flex-end',
      xs: 'flex-start',
    },
    alignItems: 'flex-start',
    marginTop: {
      xs: 0,
      md: '2em',
    },
    gap: {
      xs: '1rem',
      md: '2rem',
      lg: '5rem',
    },
  },
  stackList: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: {
      xs: '0.5rem',
      md: '1.25rem',
    },
  },
  list: {
    margin: '0 0 0.5rem',
    padding: '0 0 0 2rem',
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: '8px',
    maxWidth: 'calc(100vw - 3em)',
  },
  button: {
    fontWeight: 'bold',
    padding: '0.5rem 2rem',
  },
}

export function InfoSection() {
  return (
    <Stack component="section" direction="column" sx={styles.section}>
      <Typography variant="h2" component="h2" sx={styles.heading}>
        Organic Recycling in B.C.
      </Typography>
      <Typography component="p" sx={styles.content}>
        <a
          href="https://www2.gov.bc.ca/gov/content/environment/waste-management/food-and-organic-waste/regulations-guidelines"
          style={styles.link}
        >
          The Organic Matter Recycling Regulation of B.C.
        </a>{' '}
        (OMRR) governs the construction and operation of compost facilities, as
        well as the production, distribution, storage, sale and use of biosolids
        and compost.
      </Typography>
      <Typography component="p" sx={styles.content}>
        OMRR provides guidance for local governments and compost and biosolids
        producers on how to use organic material while protecting soil quality
        and drinking water sources.
      </Typography>

      <Stack
        direction={{
          xs: 'column',
          lg: 'row-reverse',
        }}
        sx={styles.stack}
      >
        <Box sx={styles.imageContainer}>
          <img src={infoImage} style={styles.image} alt="Information image" />
        </Box>
        <Stack direction="column" sx={styles.stackList}>
          <Typography variant="h2" component="h2" sx={styles.heading2}>
            The B.C. government has a plan to update the regulation to
          </Typography>
          <ul style={styles.list}>
            <Typography component="li">
              Better protect of human and environment health
            </Typography>
            <Typography component="li">
              Increase engagement with Indigenous communities
            </Typography>
            <Typography component="li">
              Improve transparency around organic matter management
            </Typography>
          </ul>
          <Button
            color="primary"
            variant="contained"
            href="https://www2.gov.bc.ca/assets/gov/environment/waste-management/organic-waste/reports-and-papers/omrr-public-update-june-2022.pdf"
            sx={styles.button}
          >
            Project Update Report
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
