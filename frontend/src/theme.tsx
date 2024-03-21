import { createTheme } from '@mui/material/styles'

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#385a8a',
    },
    secondary: {
      main: '#ffffff',
    },
    error: {
      main: '#712024',
    },
    warning: {
      main: '#81692c',
    },
    success: {
      main: '#234720',
    },
  },
  typography: {
    fontFamily: 'BCSans !important',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: 'BCSans',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: 'BCSans',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: 'BCSans',
        },
      },
    },
  },

})

export default theme
