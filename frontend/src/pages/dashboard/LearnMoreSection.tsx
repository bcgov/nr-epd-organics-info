import { Grid, Stack, Typography } from '@mui/material'

import LearnMoreCard from './LearnMoreCard'

import govSvg from '@/assets/svgs/fa-government.svg'
import verification from '@/assets/svgs/fa-verification.svg'
import identity from '@/assets/svgs/fa-identity.svg'

const styles = {
  section: {
    margin: {
      xs: '24px',
      md: '80px',
    },
    gap: '4px',
  },
  yellowDivider: {
    width: '32px',
    height: '4px',
    backgroundColor: '#fcba19',
  },
  heading: {
    color: 'black',
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '56px',
    marginBottom: '16px',
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
      <div style={styles.yellowDivider} />
      <Typography variant="h2" component="h2" sx={styles.heading}>
        Learn more
      </Typography>
      <Grid container spacing={3}>
        <LearnMoreCard
          title="Legislation"
          link="https://www2.gov.bc.ca/gov/content/environment/waste-management/food-and-organic-waste/regulations-guidelines"
          icon={govSvg}
          actions="Learn about the laws that apply to recycling organic matter."
        />
        <LearnMoreCard
          title="Process and procedures"
          link="https://www2.gov.bc.ca/gov/content/environment/waste-management/waste-discharge-authorization"
          icon={verification}
          actions="Learn about how we administer the authorizations process for
                    compost and biosolids facilities."
        />
        <LearnMoreCard
          title="Compliance and enforcement"
          link="https://www2.gov.bc.ca/gov/content/environment/research-monitoring-reporting/reporting/environmental-enforcement-reporting"
          icon={identity}
          actions="Search the compliance and enforcement database and learn
                    about how we coordinate oversight."
          divider={false}
        />
      </Grid>
    </Stack>
  )
}
