import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, CircularProgress, Stack } from '@mui/material'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AppError from '@/components/AppError'
import AppRoutes from '@/routes'
import { LoadingStatusType } from '@/interfaces/loading-status'
import { selectStatus } from '@/features/omrr/omrr-slice'

import 'leaflet/dist/leaflet.css'

const loadingStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export default function App() {
  const status: LoadingStatusType = useSelector(selectStatus)

  const isLoading = status === 'loading' || status === 'idle'
  const isError = status === 'failed'
  const isReady = status === 'succeeded'

  return (
    <BrowserRouter>
      <Stack direction="column" sx={{ minHeight: '100vh' }}>
        <Header />
        <Box
          component="div"
          flex={1}
          style={isLoading ? loadingStyle : undefined}
        >
          {isLoading && <CircularProgress title="Loading..." />}
          {isError && <AppError />}
          {isReady && <AppRoutes />}
        </Box>
        <Footer />
      </Stack>
    </BrowserRouter>
  )
}
