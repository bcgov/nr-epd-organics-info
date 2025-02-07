import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'

const styles = {
  wrapper: {
    width: {
      xs: '100%',
      md: '33.33%',
    },
    padding: '12px',
    display: 'flex',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    overflow: 'hidden',
    width: '100%',
    background: '#d8eafd',
  },
  content: {
    padding: '20px 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flex: 1,
  },
  icon: {
    width: '48px',
    height: '48px',
    marginBottom: '8px',
    borderRadius: '8px',
  },
  title: {
    fontWeight: 700,
    fontSize: '18px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    color: '#255a90',
  },
  actions: {
    padding: '0',
    color: 'text.primary',
  },
  divider: {
    display: {
      xs: 'block',
      md: 'none',
    },
    margin: '12px 0 4px',
    borderColor: '#d8d8d8',
  },
}

interface Props {
  title: string
  link: string
  icon: string
  actions: string
  divider?: boolean
}

export function LearnMoreCard({
  title,
  link,
  icon,
  actions,
  divider = true,
}: Readonly<Props>) {
  return (
    <Box component="section" sx={styles.wrapper}>
      <Card elevation={0} sx={styles.card}>
        <CardActionArea target="_blank" href={link} sx={{ height: '100%' }}>
          <CardContent sx={styles.content}>
            <CardMedia
              component="img"
              src={icon}
              sx={styles.icon}
              alt={title}
            />
            <Typography sx={styles.title}>{title}</Typography>
            <Typography sx={styles.actions}>{actions}</Typography>
          </CardContent>
          {divider && <Box component="hr" sx={styles.divider} />}
        </CardActionArea>
      </Card>
    </Box>
  )
}

export default LearnMoreCard
