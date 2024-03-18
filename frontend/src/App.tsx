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
    <Grid xs={12} sx={styles.container}>
      <Header />
      <BrowserRouter>
        <Stack direction="row" spacing={2} sx={{ marginTop: '4em', marginBottom:'5em' }}>
          <AppRoutes />
        </Stack>
      </BrowserRouter>
      <Footer />
    </Grid>
  )
}
