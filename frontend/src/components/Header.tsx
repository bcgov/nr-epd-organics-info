import { MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Link,
  Menu,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { HeaderLink } from './HeaderLink'
import { HeaderMenuLink } from './HeaderMenuLink'

import BCGovLogoH from '@/assets/bc-logo-white.png'
import BCGovLogoV from '@/assets/bc-logo-white-small.png'
import MenuIcon from '@/assets/svgs/fa-menu.svg?react'

import './Header.css'

const styles = {
  appBar: {
    color: '#053662',
    backgroundColor: '#ffffff',
    height: '4em',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    px: {
      xs: 2,
      md: 12,
    },
  },
  logo: {
    alignContent: 'center',
    content: {
      xs: `url(${BCGovLogoV})`,
      sm: `url(${BCGovLogoH})`,
    },
    height: '4em',
    position: 'relative',
    top: '-2px',
    cursor: 'pointer',
  },
  titleText: {
    fontSize: {
      xs: '1.3em',
      sm: '1.5em',
    },
    marginLeft: {
      xs: '.25em',
      sm: '.5em',
    },
  },
}

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined)
  const navigate = useNavigate()
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.up('lg'))

  useEffect(() => {
    setAnchorEl(undefined)
  }, [mdMatches])

  const handleMenuClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget as HTMLElement)
  }
  const handleMenuClose = () => {
    setAnchorEl(undefined)
  }
  const buttonClicked = (route: string) => {
    navigate(route)
  }

  return (
    <AppBar position="fixed" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar} id="back-to-top-anchor">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          id="logo_name"
        >
          <Link
            style={{ display: 'inline-flex' }}
            onClick={() => buttonClicked('/')}
          >
            <Box
              component="img"
              data-testid="header-logo"
              sx={styles.logo}
              alt="Logo"
            />
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              mx: 2,
              height: '34px',
              my: 'auto',
              borderColor: 'rgba(0, 0, 0, 0.12)',
            }}
          />
          <Link
            style={{
              display: 'inline-flex',
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'pointer',
            }}
            onClick={() => buttonClicked('/')}
          >
            <Typography data-testid="header-title" sx={styles.titleText}>
              Organics Info
            </Typography>
          </Link>
        </Stack>
        <Stack direction="row" id="nav">
          {mdMatches && (
            <>
              <HeaderLink to="/map">Map Search</HeaderLink>
              <HeaderLink to="/search">Text Search</HeaderLink>
              <HeaderLink to="/contact">Contact Us</HeaderLink>
              <HeaderLink to="/help">Help</HeaderLink>
            </>
          )}
          {!mdMatches && (
            <div>
              <IconButton
                onClick={handleMenuClick}
                aria-label="Menu"
                title="Menu"
                className="header-menu-button"
              >
                <MenuIcon style={{ color: '#053662' }} />
              </IconButton>
              <Menu
                id="headerMenu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: -6,
                  horizontal: 24,
                }}
              >
                <HeaderMenuLink onClick={handleMenuClose} to="/map">
                  Map Search
                </HeaderMenuLink>
                <HeaderMenuLink onClick={handleMenuClose} to="/search">
                  Text Search
                </HeaderMenuLink>
                <HeaderMenuLink onClick={handleMenuClose} to="/contact">
                  Contact Us
                </HeaderMenuLink>
                <HeaderMenuLink onClick={handleMenuClose} to="/guidance">
                  Help
                </HeaderMenuLink>
              </Menu>
            </div>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
