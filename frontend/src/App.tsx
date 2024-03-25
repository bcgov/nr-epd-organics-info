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
import 'leaflet/dist/leaflet.css'
import { Snackbar } from '@mui/material'

export default function App() {
  const status: string = useSelector((state: RootState) => state.omrr.status)
  const dispatch = useDispatch()
  useEffect(() => {
    //@ts-expect-error
    dispatch(fetchOMRRData())
  }, [dispatch])
  return (
    <Grid container sx={{ flexGrow: 1 }}>
      {status === 'loading' ? (
        <><Grid item xs={12}>
          <Header />
        </Grid>
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
          <Grid item xs={12}>
            <Footer />
          </Grid></>
      ) : status === 'failed' ? (
        <><Grid item xs={12}>
          <Header />
        </Grid>
          <Grid item xs={12}>
            <Snackbar
              message="Loading Failed, Please try later refreshing the page"
              sx={{ background: '#fffffff', backgroundColor: '#fffffff' }}
              color="error"
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              autoHideDuration={6000}
              draggable
              open={true}
            ></Snackbar>
          </Grid>
          <Grid item xs={12}>
            <Footer />
          </Grid></>
      ) : (
        <><BrowserRouter>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <AppRoutes />
          </Grid>
          <Grid item xs={12}>
            <Footer />
          </Grid>
        </BrowserRouter></>
      )}

    </Grid>
  )
}
