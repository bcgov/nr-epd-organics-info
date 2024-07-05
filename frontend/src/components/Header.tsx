import BCGovLogoH from '@/assets/BCID_H_rgb_rev.png'
import BCGovLogoV from '@/assets/BCID_V_rgb_rev.png'
import {
  AppBar,
  Box,
  Icon,
  IconButton,
  Link,
  Menu as MenuComponent,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { Feed, Map, Menu } from '@mui/icons-material'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { HeaderIconButton } from '@/components/HeaderIconButton'

const styles = {
  appBar: {
    color: '#ffffff',
    backgroundColor: '#053662',
    borderBottom: '0.1em solid rgb(252, 186, 25) !important',
    height: '4em',
  },
}
export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.up('lg'))

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const buttonClicked = (route: string) => {
    navigate(route)
  }

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
          <Link
            style={{ display: 'inline-flex' }}
            onClick={() => buttonClicked('/')}
          >
            <Box
              component="img"
              data-testid="header-logo"
              sx={{
                alignContent: 'center',
                content: {
                  xs: `url(${BCGovLogoV})`,
                  sm: `url(${BCGovLogoH})`,
                },
                height: '4em',
                position: 'relative',
                top: '-2px',
              }}
              alt="Logo"
            />
          </Link>
          <div style={{ display: 'inline-flex' }}>
            <Typography
              data-testid="header-title"
              sx={{
                display: 'inline-flex',
                fontFamily: 'BCSans',
                fontSize: {
                  xs: '1.25em',
                  sm: '1.5em',
                },
                lineHeight: '100%',
                alignItems: 'center',
                marginLeft: {
                  xs: '.25em',
                  sm: '.5em',
                },
              }}
            >
              Organics Info
            </Typography>
          </div>
        </Stack>
        <Stack direction="row" id="nav">
          {mdMatches && (
            <>
              <HeaderIconButton
                onClick={() => buttonClicked('/map')}
                icon={<Map color="secondary" />}
              >
                Map Search
              </HeaderIconButton>
              <HeaderIconButton
                onClick={() => buttonClicked('/search')}
                icon={<Feed color="secondary" />}
              >
                Text Search
              </HeaderIconButton>
              <a href="mailto:env.omrr.reg.reviews@gov.bc.ca">
                <Link
                  component="button"
                  sx={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    textTransform: 'none',
                    padding: '.5em 1em',
                  }}
                >
                  Contact Us
                </Link>
              </a>
            </>
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
                    data-testid="header-map-search"
                    sx={{
                      textTransform: 'none',
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                    onClick={() => buttonClicked('/map')}
                    component="button"
                  >
                    Map Search
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    data-testid="header-text-search"
                    sx={{
                      textTransform: 'none',
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                    onClick={() => buttonClicked('/search')}
                    component="button"
                  >
                    Text Search
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <a
                    data-testid="header-contact-us"
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
