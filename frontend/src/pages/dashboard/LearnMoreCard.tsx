import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Link,
} from '@mui/material'
import Grid from '@mui/material/Grid'

import ChevronRight from '@/assets/svgs/fa-chevron-right.svg?react'

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: 0,
    marginBottom: {
      xs: '12px',
      md: '16px',
    },
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
  content: {
    background: '#d8eafd',
    height: '9em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 0 20px',
  },
  icon: {
    width: 'auto',
    height: '48px',
  },
  actions: {
    padding: '0 0 16px',
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
  const titleElement = (
    <Link sx={styles.title} target="_blank" href={link}>
      {title}
      <ChevronRight width={9} />
    </Link>
  )

  return (
    <Grid item xs={12} md={4} component="section">
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
          <CardMedia component="img" src={icon} sx={styles.icon} alt={title} />
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
