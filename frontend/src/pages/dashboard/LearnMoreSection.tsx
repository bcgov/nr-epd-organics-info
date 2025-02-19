import {
  Stack,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@mui/material'

import LearnMoreCard from './LearnMoreCard'

import govSvg from '@/assets/svgs/fa-government.svg'
import verification from '@/assets/svgs/fa-verification.svg'
import identity from '@/assets/svgs/fa-identity.svg'
import organicExample from '@/assets/compost-example.png'

const styles = {
  section: {
    margin: {
      xs: '-12px 24px',
      md: '-20px 80px',
    },
    gap: '4px',
  },
  heading: {
    color: 'black',
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '56px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '-12px',
    alignItems: 'stretch',
    hr: {
      display: 'none',
    },
  },
  fullWidthCard: {
    marginTop: '24px',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  fullWidthContent: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
    background: '#d8eafd',
  },
  imageContainer: {
    width: {
      xs: '100%',
      md: '300px',
    },
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  textContent: {
    padding: '32px',
    flex: 1,
  },
  cardTitle: {
    fontWeight: 700,
    fontSize: '18px',
    color: '#255a90',
    marginBottom: '12px',
  },
  cardText: {
    color: 'text.primary',
  },
}

export function LearnMoreSection() {
  return (
    <Stack
      direction="column"
      component="section"
      sx={styles.section}
      className="learn-more-section"
    >
      <Typography variant="h2" component="h2" sx={styles.heading}>
        More resources
      </Typography>
      <Box sx={styles.cardsContainer}>
        <LearnMoreCard
          title="Legislation"
          link="https://www2.gov.bc.ca/gov/content?id=2C130233751D44AEBC77A7ACE4A014A8"
          icon={govSvg}
          actions="Learn about the laws that apply to recycling organic matter."
        />
        <LearnMoreCard
          title="Process and procedures"
          link="https://www2.gov.bc.ca/gov/content?id=0876E90DA4744A449423D35EB4E09785"
          icon={verification}
          actions="Learn about how we administer the authorization process for land application sites and compost facilities."
        />
        <LearnMoreCard
          title="Compliance and enforcement"
          link="https://www2.gov.bc.ca/gov/content?id=41FDB87D3806443399047028740AC274"
          icon={identity}
          actions="Learn about how we coordinate oversight and ensure the process is accountable."
          divider={false}
        />
      </Box>

      <Card elevation={0} sx={styles.fullWidthCard}>
        <CardActionArea
          href="https://www2.gov.bc.ca/gov/content/environment/waste-management/waste-discharge-authorization/apply"
          target="_blank"
        >
          <Box sx={styles.fullWidthContent}>
            <Box sx={styles.imageContainer}>
              <CardMedia
                component="img"
                src={organicExample}
                alt="Authorization application process"
              />
            </Box>
            <Box sx={styles.textContent}>
              <Typography sx={styles.cardTitle}>
                Authorization application process
              </Typography>
              <Typography sx={styles.cardText}>
                Learn more about the application process or apply for an
                authorization for a compost facility or the application of
                organic matter.
              </Typography>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    </Stack>
  )
}
