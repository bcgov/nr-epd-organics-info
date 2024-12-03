import { Typography, Button, Box, Stack } from '@mui/material'

import infoImage from '@/assets/homepage-info.jpg'
import { maxHeight } from '@mui/system'

const styles = {
  section: {
    padding: {
      xs: '40px 24px',
      md: '80px',
    },
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: {
      xs: 'black',
      md: '#313131',
    },
    marginBottom: '24px',
  },
  heading2: {
    fontSize: {
      xs: '20px',
      md: '24px',
    },
    fontWeight: 'bold',
    color: '#313131',
  },
  link: {
    textDecoration: 'none',
  },
  content: {
    paddingBottom: '20px',
  },
  stack: {
    justifyContent: {
      lg: 'flex-end',
      xs: 'flex-start',
    },
    alignItems: 'flex-start',
    marginTop: {
      xs: 0,
      md: '32px',
    },
    gap: {
      xs: '16px',
      md: '32px',
      lg: '80px',
    },
  },
  stackList: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: {
      xs: '8px',
      md: '20px',
    },
  },
  list: {
    margin: '0 0 8px',
    padding: '0 0 0 32px',
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: '8px',
    maxHeight: '40vh',
  },
  button: {
    fontWeight: 700,
    padding: '8px 32px',
    margin: {
      xs: '0',
      md: '10px 0 0 0',
    },
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
          href="https://www2.gov.bc.ca/gov/content?id=2C130233751D44AEBC77A7ACE4A014A8"
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
              Better protection of human and environmental health
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
