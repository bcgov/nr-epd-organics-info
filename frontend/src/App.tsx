import Box from '@mui/material/Box'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AppRoutes from '@/routes'
import { BrowserRouter } from 'react-router-dom'
import LeftDrawer from '@/components/LeftDrawer'
import { Divider } from '@mui/material'
import { Stack } from '@mui/system'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flexGrow: 1,
    marginTop: '5em',
    marginRight: '1em',
    marginLeft: '1em',
    marginBottom: '5em',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
}

export default function App() {
  return (
    <Box sx={styles.container}>
      <Header />
      <BrowserRouter>
        <Stack direction="row" spacing={2} sx={{ margin: '5em' }}>
          <LeftDrawer />
          <AppRoutes />
        </Stack>
      </BrowserRouter>
      <Footer />
    </Box>
  )
}
