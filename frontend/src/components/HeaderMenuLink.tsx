import { MouseEventHandler, ReactNode } from 'react'
import { MenuItem } from '@mui/material'

import { HeaderLink } from './HeaderLink'

import './HeaderMenuLink.css'

interface Props {
  children: ReactNode
  to: string
  onClick: MouseEventHandler
}

export function HeaderMenuLink({ children, to, onClick }: Readonly<Props>) {
  return (
    <MenuItem onClick={onClick}>
      <HeaderLink to={to} className="header-menu-link">
        {children}
      </HeaderLink>
    </MenuItem>
  )
}
