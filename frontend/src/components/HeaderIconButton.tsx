import { MouseEventHandler, ReactNode } from 'react'
import { Icon, Link } from '@mui/material'

interface Props {
  children?: ReactNode
  icon?: ReactNode
  onClick?: MouseEventHandler
  [key: string]: any
}

export function HeaderIconButton({ children, icon, onClick, ...rest }: Props) {
  return (
    <Link
      {...rest}
      sx={{
        textTransform: 'none',
        textDecoration: 'none',
        padding: '.5em 1em',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5em',
        color: '#ffffff',
      }}
      onClick={onClick}
      component="button"
    >
      {icon ? <Icon style={{ display: 'inline-flex' }}>{icon}</Icon> : null}
      {children}
    </Link>
  )
}
