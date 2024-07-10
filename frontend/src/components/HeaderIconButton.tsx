import { MouseEventHandler, ReactNode } from 'react'
import { Icon, Link } from '@mui/material'

const styles = {
  link: {
    textTransform: 'none',
    textDecoration: 'none',
    padding: '.5em 1em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5em',
    color: '#ffffff',
  },
  icon: { display: 'inline-flex', justifyContent: 'center' },
}

interface Props {
  children?: ReactNode
  icon?: ReactNode
  onClick?: MouseEventHandler
  [key: string]: any
}

export function HeaderIconButton({
  children,
  icon,
  onClick,
  ...rest
}: Readonly<Props>) {
  return (
    <Link {...rest} sx={styles.link} onClick={onClick} component="button">
      {icon ? <Icon style={styles.icon}>{icon}</Icon> : null}
      {children}
    </Link>
  )
}
