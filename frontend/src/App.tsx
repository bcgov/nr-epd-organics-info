import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, CircularProgress, Stack } from '@mui/material'
import {
  Footer,
  Header as DsHeader,
} from '@bcgov/design-system-react-components'
import AppError from '@/components/AppError'
import AppRoutes from '@/routes'
import { LoadingStatusType } from '@/interfaces/loading-status'
import { selectStatus } from '@/features/omrr/omrr-slice'
import '@/styles/DsHeader.css'

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

  const headerConfig = {
    title: 'Organics Info',
    navigation: {
      items: [
        { label: 'Map View', href: '/map' },
        { label: 'List View', href: '/search' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Help', href: '/help' },
      ],
    },
  }

  return (
    <BrowserRouter>
      <Stack direction="column" sx={{ minHeight: '100vh' }}>
        <DsHeader title="Organics Info">
          <a href="/map">Map View</a>
          <a href="/search">List View</a>
          <a href="/contact">Contact Us</a>
          <a href="/help">Help</a>
        </DsHeader>
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
