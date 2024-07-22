import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  AppBar,
  Box,
  IconButton,
  Link,
  Menu as MenuComponent,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { Menu } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { HeaderIconButton } from '@/components/HeaderIconButton'

import BCGovLogoH from '@/assets/BCID_H_rgb_rev.png'
import BCGovLogoV from '@/assets/BCID_V_rgb_rev.png'
import MapIcon from '@/assets/svgs/fa-map.svg?react'
import TextIcon from '@/assets/svgs/fa-text.svg?react'

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
  menuLink: {
    textTransform: 'none',
    textDecoration: 'none',
    color: 'inherit',
  },
}

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined)
  const navigate = useNavigate()
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.up('lg'))

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
          <Typography data-testid="header-title" sx={styles.titleText}>
            Organics Info
          </Typography>
        </Stack>
        <Stack direction="row" id="nav">
          {mdMatches && (
            <>
              <HeaderIconButton
                onClick={() => buttonClicked('/map')}
                icon={<MapIcon width="20px" height="24px" />}
              >
                Map Search
              </HeaderIconButton>
              <HeaderIconButton
                onClick={() => buttonClicked('/search')}
                icon={<TextIcon width="14px" height="24px" />}
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
              <IconButton
                onClick={handleMenuClick}
                aria-label="Menu"
                title="Menu"
              >
                <Menu color="secondary" />
              </IconButton>
              <MenuComponent
                id="headerMenu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link
                    sx={styles.menuLink}
                    onClick={() => buttonClicked('/map')}
                    component="button"
                  >
                    Map Search
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link
                    sx={styles.menuLink}
                    onClick={() => buttonClicked('/search')}
                    component="button"
                  >
                    Text Search
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
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
