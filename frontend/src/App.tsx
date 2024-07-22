import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, CircularProgress, Stack } from '@mui/material'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AppRoutes from '@/routes'
import AppError from '@/components/AppError'
import { fetchOMRRData, selectStatus } from '@/features/omrr/omrr-slice'

import 'leaflet/dist/leaflet.css'

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
}

export default function App() {
  const dispatch = useDispatch()
  const status: string = useSelector(selectStatus)

  useEffect(() => {
    //@ts-expect-error
    dispatch(fetchOMRRData())
  }, [dispatch])

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
