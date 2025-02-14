import { Stack, Typography, Box, Card, Button } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import mapThumbnail from '@/assets/map-thumbnail.png'

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
    maxWidth: '300px',
    alignSelf: 'flex-start',
    cursor: 'pointer',
    position: 'relative',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  thumbnailContainer: {
    position: 'relative',
    minHeight: '200px',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        'radial-gradient(circle at center, rgba(216, 234, 253, 0.3) 0%, rgba(216, 234, 253, 0.8) 100%)',
      borderRadius: '4px',
    },
  },
  thumbnail: {
    width: '100%',
    height: '200px',
    borderRadius: '4px',
    display: 'block',
    objectFit: 'cover',
  },
  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '64px',
    zIndex: 1,
    opacity: 0.9,
    transition: 'opacity 0.2s ease-in-out',
    '&:hover': {
      opacity: 1,
    },
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
  button: {
    alignSelf: 'flex-start',
    textTransform: 'none',
    marginTop: '16px',
  },
}

interface HowToUseThisToolProps {
  videoUrl: string
}

export function HowToUseThisTool({ videoUrl }: HowToUseThisToolProps) {
  const handleClick = () => {
    window.open(videoUrl, '_blank')
  }

  return (
    <Stack component="section" sx={styles.section}>
      <Box sx={styles.container}>
        <Card elevation={0} sx={styles.card} onClick={handleClick}>
          <Box sx={styles.thumbnailContainer}>
            <Box
              component="img"
              src={mapThumbnail}
              sx={styles.thumbnail}
              alt="Video tutorial thumbnail"
            />
            <PlayCircleIcon sx={styles.playIcon} />
          </Box>
        </Card>

        <Box sx={styles.content}>
          <Typography variant="h2" component="h2" sx={styles.heading}>
            How to use this tool
          </Typography>
          <Typography sx={styles.description}>
            Watch this video on how to use this resource when understanding
            authorized land application sites, compost, or biosolid facilities
            in your area.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            endIcon={<OpenInNewIcon />}
            onClick={handleClick}
            sx={styles.button}
          >
            View details
          </Button>
        </Box>
      </Box>
    </Stack>
  )
}
