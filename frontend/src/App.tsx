import { BrowserRouter } from 'react-router-dom'
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

export default function App() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const status: LoadingStatusType = useSelector(selectStatus)

  const isLoading = status === 'loading' || status === 'idle'
  const isError = status === 'failed'
  const isReady = status === 'succeeded'

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
    { href: '/help', text: 'Help' },
  ]

  return (
    <BrowserRouter>
      <Stack direction="column" sx={{ minHeight: '100vh' }}>
        <DsHeader title="Organics Info">
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="menu"
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
        <Footer />
      </Stack>
    </BrowserRouter>
  )
}
