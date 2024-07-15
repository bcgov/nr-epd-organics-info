import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    xxl: true
  }
}

export const themeBreakpointValues = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1320,
}

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#385a8a',
      light: '#255a90',
      dark: '#053662',
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
  breakpoints: {
    values: themeBreakpointValues,
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
  fontFamily: 'BCSans',
  fontWeight: 700,
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
