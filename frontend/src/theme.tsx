import { createTheme, styled } from '@mui/material/styles'
import { fontSize } from '@mui/system'

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
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '1em',
        },
      },
    },
  },
})

theme.typography.h1 = {
  fontFamily: 'BCSans-Bold',
  fontSize: '2rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.7rem',
  },
  lineHeight: '1.5',
}

theme.typography.h2 = {
  fontFamily: 'BCSans',
  fontSize: '2rem',
  fontWeight: 400,
  lineHeight: '1.5',
}

theme.typography.h6 = {
  fontFamily: 'BCSans',
  fontWeight: 400,
  fontSize: '1.25rem',
}

export default theme
