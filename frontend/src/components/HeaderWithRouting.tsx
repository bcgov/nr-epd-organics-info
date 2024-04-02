import BCGovLogo from '@/assets/gov-bc-logo-horiz.png'
import {
  AppBar,
  IconButton,
  Link,
  Toolbar,
  MenuItem,
  Menu as MenuComponent,
} from '@mui/material'
import { Feed, Menu } from '@mui/icons-material'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useNavigate } from 'react-router'
import { useState } from 'react'

const styles = {
  appBar: {
    color: '#ffffff',
    backgroundColor: '#053662',
    borderBottom: '0.1em solid rgb(252, 186, 25) !important',
  },
}
export default function HeaderWithRouting() {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const navigate = useNavigate()
  const buttonClicked = (route: string) => {
    navigate(route)
  }
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.up('md'))
  return (
    <AppBar position="fixed" sx={styles.appBar}>
      <Toolbar
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
        id="back-to-top-anchor"
      >
        <Stack direction="row" justifyContent={'center'} id="logo_name">
          <a href="/">
            <img alt="Logo" src={BCGovLogo} />
          </a>
          <div>
            {' '}
            <span
              style={{
                fontFamily: 'BCSans',
                fontSize: '1.5em',
                lineHeight: '2.25em',
                marginLeft: '1em',
                alignItems: 'center',
              }}
            >
              Organics Info
            </span>
          </div>
        </Stack>
        <Stack direction="row" id="nav">
          {mdMatches && (
            <div>
              <IconButton onClick={() => buttonClicked('/search')}>
                <Feed color="secondary"></Feed>
              </IconButton>
              <Link
                sx={{ textTransform: 'none', textDecoration: 'none' }}
                onClick={() => buttonClicked('/search')}
                component="button"
              >
                <span
                  style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    textTransform: 'none',
                  }}
                >
                  {' '}
                  Text Search
                </span>
              </Link>
              <a href="mailto:env.omrr.reg.reviews@gov.bc.ca">
                <Link
                  component="button"
                  sx={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    textTransform: 'none',
                    marginLeft: '1em',
                  }}
                >
                  Contact Us
                </Link>
              </a>
            </div>
          )}
          {!mdMatches && (
            <div>
              <IconButton onClick={handleClick}>
                <Menu color="secondary"></Menu>
              </IconButton>
              <MenuComponent
                id="headerMenu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    sx={{ textTransform: 'none', textDecoration: 'none' }}
                    onClick={() => buttonClicked('/search')}
                    component="button"
                  >
                    Text Search
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <a
                    href="mailto:env.omrr.reg.reviews@gov.bc.ca"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Contact Us
                  </a>
                </MenuItem>
              </MenuComponent>
            </div>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
