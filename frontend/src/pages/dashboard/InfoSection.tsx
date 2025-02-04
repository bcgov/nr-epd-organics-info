import { Typography, Button, Box, Stack } from '@mui/material'

import infoImage from '@/assets/homepage-info.jpg'

const styles = {
  section: {
    padding: {
      xs: '40px 24px',
      md: '80px',
    },
  },
  heading2: {
    fontSize: {
      xs: '20px',
      md: '24px',
    },
    fontWeight: 'bold',
    color: '#313131',
  },
  list: {
    margin: '0 0 8px',
    padding: '0 0 0 32px',
  },
  imageContainer: {
    flex: '1 1 50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxHeight: '400px',
  },
  image: {
    borderRadius: '8px',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    maxHeight: '400px',
  },
  stack: {
    justifyContent: {
      lg: 'space-between',
      xs: 'flex-start',
    },
    alignItems: 'stretch',
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
    flex: '1 1 50%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: {
      xs: '8px',
      md: '20px',
    },
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -20,
      left: 0,
      width: '40px',
      height: '4px',
      backgroundColor: '#FCBA19',
    },
  },
}

export function InfoSection() {
  return (
    <Stack component="section" direction="column" sx={styles.section}>
      <Stack
        direction={{
          xs: 'column',
          lg: 'row-reverse',
        }}
        sx={styles.stack}
      >
        <Box sx={styles.imageContainer}>
          <Box
            component="img"
            src={infoImage}
            sx={styles.image}
            alt="Information image"
          />
        </Box>
        <Stack direction="column" sx={styles.stackList}>
          <Typography variant="h2" component="h2" sx={styles.heading2}>
            Who is this for
          </Typography>
          <ul style={styles.list}>
            <Typography component="li">I am a member of the public</Typography>
            <Typography component="li">
              I am an industry professional
            </Typography>
            <Typography component="li">I am an organization</Typography>
            <Typography component="li">
              I am a local government of First Nations and want to see
              information about authorized compose and biosolids facilities.
            </Typography>
          </ul>
        </Stack>
      </Stack>
    </Stack>
  )
}
