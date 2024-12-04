import { MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  AppBar,
  Box,
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

import BCGovLogoH from '@/assets/BCID_H_rgb_rev.png'
import BCGovLogoV from '@/assets/BCID_V_rgb_rev.png'
import MapIcon from '@/assets/svgs/fa-map.svg?react'
import TextIcon from '@/assets/svgs/fa-text.svg?react'
import MenuIcon from '@/assets/svgs/fa-menu.svg?react'

import './Header.css'

const styles = {
  appBar: {
    color: '#ffffff',
    backgroundColor: '#053662',
    borderBottom: '0.1em solid rgb(252, 186, 25) !important',
    height: '4em',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
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
              <HeaderLink
                to="/map"
                icon={<MapIcon width="20px" height="24px" />}
              >
                Map Search
              </HeaderLink>
              <HeaderLink
                to="/search"
                icon={<TextIcon width="14px" height="24px" />}
              >
                Text Search
              </HeaderLink>
              <HeaderLink to="/guidance">Guidance</HeaderLink>
              <HeaderLink to="/contact">Contact Us</HeaderLink>
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
                <MenuIcon />
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
                <HeaderMenuLink onClick={handleMenuClose} to="/guidance">
                  Guidance
                </HeaderMenuLink>
                <HeaderMenuLink onClick={handleMenuClose} to="/contact">
                  Contact Us
                </HeaderMenuLink>
              </Menu>
            </div>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
