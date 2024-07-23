import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, CircularProgress, Stack } from '@mui/material'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AppError from '@/components/AppError'
import AppRoutes from '@/routes'
import { LoadingStatusType } from '@/interfaces/loading-status'
import { fetchOMRRData, selectStatus } from '@/features/omrr/omrr-slice'
import { fetchOmrrApplicationStatus } from '@/features/omrr/application-status-slice'

import 'leaflet/dist/leaflet.css'

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
}

export default function App() {
  const dispatch = useDispatch()
  const status: LoadingStatusType = useSelector(selectStatus)

  useEffect(() => {
    //@ts-expect-error
    dispatch(fetchOMRRData())
  }, [dispatch])

  // Load application status after OMRR data has been loaded
  useEffect(() => {
    if (status === 'succeeded') {
      //@ts-expect-error
      dispatch(fetchOmrrApplicationStatus())
    }
  }, [dispatch, status])

  const isLoading = status === 'loading'
  const isError = status === 'failed'
  const isReady = !isLoading && !isError

  return (
    <BrowserRouter>
      <Stack direction="column" sx={{ flexGrow: 1, minHeight: '100vh' }}>
        <Header />
        <Box
          component="div"
          flex={1}
          style={isLoading ? loadingStyle : undefined}
        >
          {isLoading && <CircularProgress />}
          {isError && <AppError />}
          {isReady && <AppRoutes />}
        </Box>
        <Footer />
      </Stack>
    </BrowserRouter>
  )
}
