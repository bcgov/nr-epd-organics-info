import { BrowserRouter, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Box,
  CircularProgress,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Footer,
  Header as DsHeader,
} from '@bcgov/design-system-react-components'
import AppError from '@/components/AppError'
import AppRoutes from '@/routes'
import { LoadingStatusType } from '@/interfaces/loading-status'
import { selectStatus } from '@/features/omrr/omrr-slice'
import '@/styles/DsHeader.css'
import { useState } from 'react'

import 'leaflet/dist/leaflet.css'

const loadingStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

// Create a wrapper component to access useLocation
function AppContent() {
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const status: LoadingStatusType = useSelector(selectStatus)

  const isLoading = status === 'loading' || status === 'idle'
  const isError = status === 'failed'
  const isReady = status === 'succeeded'

  // Don't show footer on map view
  const showFooter = location.pathname !== '/map'

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const navLinks = [
    { href: '/map', text: 'Map View' },
    { href: '/search', text: 'List View' },
    { href: '/contact', text: 'Contact Us' },
  ]

  return (
    <Stack direction="column" sx={{ minHeight: '100vh' }}>
      <DsHeader title="Organics Info">
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="menu"
              sx={{
                border: '1px solid black',
                borderRadius: '5px',
              }}
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {navLinks.map((link) => (
                <MenuItem key={link.href} onClick={handleMenuClose}>
                  <Link href={link.href} underline="none" color="inherit">
                    {link.text}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          navLinks.map((link) => (
            <Link key={link.href} href={link.href} underline="none">
              {link.text}
            </Link>
          ))
        )}
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
      {showFooter && <Footer />}
    </Stack>
  )
}

// Main App component
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
