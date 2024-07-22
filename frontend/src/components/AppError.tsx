import { useSelector } from 'react-redux'
import { Snackbar } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { selectError } from '@/features/omrr/omrr-slice'

export default function AppError() {
  const error = useSelector(selectError)
  const theme = useTheme()
  const errorStyle = {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.secondary.main,
  }
  console.info('App error:', error)

  return (
    <Snackbar
      message="Loading failed, please try again later"
      ContentProps={{ style: errorStyle }}
      sx={{
        '&.MuiSnackbar-root': { top: '6em' },
      }}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={6000}
      draggable
      open={true}
    />
  )
}
