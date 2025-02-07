import { Stack, Typography, Box, Card } from '@mui/material'

import calendarIcon from '@/assets/svgs/calendar-icon.svg'
import transportIcon from '@/assets/svgs/transport-icon.svg'
import cloudIcon from '@/assets/svgs/cloud-icon.svg'
import waterDropIcon from '@/assets/svgs/water-drop-icon.svg'
import chatBubblesIcon from '@/assets/svgs/chat-bubbles-icon.svg'
import leavesIcon from '@/assets/svgs/leaves-icon.svg'

const styles = {
  section: {
    padding: {
      xs: '24px',
      md: '40px 80px',
    },
  },
  container: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
    gap: '32px',
    alignItems: 'flex-start',
  },
  card: {
    flex: '0 1 33.33%',
    background: '#d8eafd',
    borderRadius: '8px',
    padding: '16px',
    minWidth: '300px',
    alignSelf: 'flex-start',
  },
  iconsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '12px',
    justifyItems: 'center',
    alignItems: 'center',
    minHeight: '200px',
  },
  icon: {
    width: '64px',
    height: '64px',
    borderRadius: '8px',
  },
  content: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    position: 'relative',
    paddingTop: '20px',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '40px',
      height: '4px',
      backgroundColor: '#FCBA19',
    },
  },
  heading: {
    fontSize: {
      xs: '20px',
      md: '24px',
    },
    fontWeight: 'bold',
    color: '#313131',
  },
  description: {
    color: '#313131',
  },
  list: {
    margin: '0',
    padding: '0 0 0 32px',
    '& li': {
      marginBottom: '8px',
    },
  },
}

export function UseThisTool() {
  return (
    <Stack component="section" sx={styles.section}>
      <Box sx={styles.container}>
        <Card elevation={0} sx={styles.card}>
          <Box sx={styles.iconsGrid}>
            <Box
              component="img"
              src={waterDropIcon}
              sx={styles.icon}
              alt="Water Drop"
            />
            <Box
              component="img"
              src={leavesIcon}
              sx={styles.icon}
              alt="Leaves"
            />
            <Box component="img" src={cloudIcon} sx={styles.icon} alt="Cloud" />
            <Box
              component="img"
              src={chatBubblesIcon}
              sx={styles.icon}
              alt="Chat"
            />
            <Box
              component="img"
              src={transportIcon}
              sx={styles.icon}
              alt="Transport"
            />
            <Box
              component="img"
              src={calendarIcon}
              sx={styles.icon}
              alt="Calendar"
            />
          </Box>
        </Card>

        <Box sx={styles.content}>
          <Typography variant="h2" component="h2" sx={styles.heading}>
            Why use this tool
          </Typography>
          <Typography sx={styles.description}>
            Organics Info helps you find information on authorized land
            application sites and compost facilities in B.C. This tool improves
            transparency around organic matter management in accordance with the{' '}
            <a
              href="https://www2.gov.bc.ca/gov/content/environment/waste-management/food-and-organic-waste/regulations-guidelines"
              target="_blank"
              rel="noopener noreferrer"
            >
              Organic Matter Recycling Regulation
            </a>{' '}
            which:
          </Typography>
          <ul style={styles.list}>
            <Typography component="li">
              Governs the construction and operation of compost facilities
            </Typography>
            <Typography component="li">
              Regulates the production, distribution, storage, sale and use of
              biosolids and compost controls how compost facilities are built
              and operated
            </Typography>
          </ul>
        </Box>
      </Box>
    </Stack>
  )
}
