import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Link,
} from '@mui/material'
import { ChevronRight } from '@mui/icons-material'

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: 0,
  },
  title: {
    fontWeight: 700,
    fontSize: '1.125rem',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  content: {
    background: '#d8eafd',
    height: '9em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1em 0',
  },
  icon: {
    width: '3em',
    height: '3em',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  actions: {
    padding: {
      xs: '0.25em 0 1em',
      md: '0 0 1em',
    },
  },
  divider: {
    display: {
      xs: 'block',
      md: 'none',
    },
    margin: '0.5em 0',
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
}: Props) {
  const titleElement = (
    <Link sx={styles.title} target="_blank" href={link}>
      {title}
      <ChevronRight color="primary" />
    </Link>
  )

  return (
    <Grid item xs={12} md={4}>
      <Card elevation={0} sx={styles.card}>
        <CardHeader
          sx={{
            ...styles.header,
            display: {
              xs: 'none',
              md: 'flex',
            },
          }}
          title={titleElement}
        />
        <CardContent sx={styles.content}>
          <CardMedia
            component="div"
            sx={{
              ...styles.icon,
              backgroundImage: `url(${icon})`,
            }}
          />
        </CardContent>
        <CardHeader
          sx={{
            ...styles.header,
            display: {
              xs: 'flex',
              md: 'none',
            },
          }}
          title={titleElement}
        />
        <CardActions sx={styles.actions}>{actions}</CardActions>
        {divider && <Box component="hr" sx={styles.divider} />}
      </Card>
    </Grid>
  )
}

export default LearnMoreCard
