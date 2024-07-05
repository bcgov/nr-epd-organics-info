import { Snackbar } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export default function AppError() {
  const theme = useTheme()
  const errorStyle = {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.secondary.main,
  }

  return (
    <Snackbar
      message="Loading Failed, Please try later refreshing the page"
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
