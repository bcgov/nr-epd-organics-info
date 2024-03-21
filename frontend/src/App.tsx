import Grid from '@mui/material/Grid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AppRoutes from '@/routes'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOMRRData } from '@/features/omrr/omrr-slice'
import { useEffect } from 'react'
import { RootState } from '@/app/store'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css' // Import Leaflet CSS
export default function App() {
  const status: string = useSelector((state: RootState) => state.omrr.status)
  const dispatch = useDispatch()
  useEffect(() => {
    //@ts-expect-error
    dispatch(fetchOMRRData())
  }, [dispatch])
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item style={{ flexGrow: 1, minHeight: '93vh' }} xs={12}>
        {status === 'loading' ? (
          <CircularProgress />
        ) : status === 'failed' ? (
          <Snackbar
            message="Loading Failed, Please try later refreshing the page"
            sx={{ background: '#fffffff', backgroundColor: '#fffffff' }}
            color="error"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={6000}
            draggable
            open={true}
          ></Snackbar>
        ) : (
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        )}
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  )
}
