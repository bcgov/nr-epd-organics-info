import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AppRoutes from '@/routes'
import AppError from '@/components/AppError'
import { fetchOMRRData } from '@/features/omrr/omrr-slice'
import { RootState } from '@/app/store'

import 'leaflet/dist/leaflet.css'

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
}

export default function App() {
  const status: string = useSelector((state: RootState) => state.omrr.status)

  const dispatch = useDispatch()
  useEffect(() => {
    //@ts-expect-error
    dispatch(fetchOMRRData())
  }, [dispatch])

  const isLoading = status === 'loading'
  const isError = status === 'failed'
  const isReady = !isLoading && !isError

  return (
    <BrowserRouter>
      <Grid container sx={{ flexGrow: 1, minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12} style={isLoading ? loadingStyle : undefined}>
          {isLoading && <CircularProgress />}
          {isError && <AppError />}
          {isReady && <AppRoutes />}
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </BrowserRouter>
  )
}
