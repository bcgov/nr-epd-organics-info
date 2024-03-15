import Box from '@mui/material/Box'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AppRoutes from '@/routes'
import { BrowserRouter } from 'react-router-dom'
import { Stack } from '@mui/system'
import { useDispatch } from 'react-redux'
import { fetchOMRRData } from '@/features/omrr/omrr-slice'
import { useEffect } from 'react'

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
  const dispatch = useDispatch()
  useEffect(() => {
    //@ts-expect-error
    dispatch(fetchOMRRData())
  }, [dispatch])
  return (
    <Box sx={styles.container}>
      <Header />
      <BrowserRouter>
        <Stack direction="row" spacing={2} sx={{ margin: '5em' }}>
          <AppRoutes />
        </Stack>
      </BrowserRouter>
      <Footer />
    </Box>
  )
}
