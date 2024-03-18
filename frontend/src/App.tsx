import Grid from '@mui/material/Grid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AppRoutes from '@/routes'
import { BrowserRouter } from 'react-router-dom'
import { Stack } from '@mui/system'
import { useDispatch } from 'react-redux'
import { fetchOMRRData } from '@/features/omrr/omrr-slice'
import { useEffect } from 'react'

const styles = {
  container: {
    minHeight: '100vh',

  },
  content: {
    flexGrow: 1,
    marginTop: '5em',
    marginRight: '1em',
    marginLeft: '1em',
    marginBottom: '5em',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
}

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    //@ts-expect-error
    dispatch(fetchOMRRData())
  }, [dispatch])
  return (
    <Grid container  spacing={0} sx={styles.container}>
      <Grid sx={{maxHeight:65}} item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  )
}
