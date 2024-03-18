import Grid from '@mui/material/Grid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AppRoutes from '@/routes'
import { BrowserRouter } from 'react-router-dom'
import { Stack } from '@mui/system'
import { useDispatch } from 'react-redux'
import { fetchOMRRData } from '@/features/omrr/omrr-slice'
import { useEffect } from 'react'

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    //@ts-expect-error
    dispatch(fetchOMRRData())
  }, [dispatch])
  return (
    <Grid container  spacing={0}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12} >
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
