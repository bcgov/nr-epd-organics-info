import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  AppBar,
  Button,
  Fade,
  Divider,
  Link,
  Stack,
  useScrollTrigger,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import clsx from 'clsx'

import { FOOTER_HEIGHT } from '@/constants/constants'

import ArrowUp from '@/assets/svgs/fa-arrow-up.svg?react'

import './Footer.css'

export default function Footer() {
  const location = useLocation()
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))

  // Don't show the footer on the map page
  if (location.pathname === '/map' && isSmall) {
    return null
  }

  return (
    <AppBar
      position="relative"
      color="default"
      component="footer"
      className="footer"
      sx={{
        height: {
          xs: 'auto',
          md: 'var(--footer-height)',
        },
        flex: {
          xs: '0 0 auto',
          md: '0 0 var(--footer-height)',
        },
      }}
    >
      <Stack
        direction="row"
        className="footer-toolbar"
        divider={
          <Divider orientation="vertical" flexItem className="footer-divider" />
        }
      >
        <Link
          data-testid="footer-home"
          target="_blank"
          href="https://www.gov.bc.ca/"
        >
          Home
        </Link>
        <Link
          data-testid="footer-copyright"
          color="primary"
          target="_blank"
          href="https://gov.bc.ca/copyright"
        >
          Copyright
        </Link>
        <Link
          data-testid="footer-disclaimer"
          target="_blank"
          href="https://gov.bc.ca/disclaimer"
        >
          Disclaimer
        </Link>

        <Link
          data-testid="footer-privacy"
          target="_blank"
          href="https://gov.bc.ca/privacy"
        >
          Privacy
        </Link>

        <Link
          data-testid="footer-accessibility"
          color="primary"
          target="_blank"
          href="https://gov.bc.ca/webaccessibility"
        >
          Accessibility
        </Link>
      </Stack>
      <ScrollToTop isSmall={isSmall} />
    </AppBar>
  )
}

interface Props {
  isSmall: boolean
}

function ScrollToTop({ isSmall }: Readonly<Props>) {
  const trigger = useScrollTrigger({
    threshold: 100,
  })
  const [shiftUp, setShiftUp] = useState<boolean>(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // On small screens - shift the button up on top of the footer
  useEffect(() => {
    if (isSmall) {
      const onScroll = () => {
        const { scrollY } = window
        const { scrollHeight, clientHeight } = document.body
        setShiftUp(scrollHeight - scrollY - clientHeight < FOOTER_HEIGHT)
      }
      window.addEventListener('scroll', onScroll)
      return () => window.removeEventListener('scroll', onScroll)
    }
  }, [isSmall])

  return (
    <Fade in={trigger}>
      <Button
        size="small"
        className={clsx(
          'footer-scroll-button',
          isSmall && shiftUp && 'footer-scroll-button--shift-up',
        )}
        sx={{
          right: {
            xs: '24px',
            md: '76px',
          },
        }}
        onClick={() => scrollToTop()}
      >
        <ArrowUp width={12} />
      </Button>
    </Fade>
  )
}
