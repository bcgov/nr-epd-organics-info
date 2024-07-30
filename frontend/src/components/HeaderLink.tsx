import { MouseEventHandler, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'

import './HeaderLink.css'

interface Props {
  children?: ReactNode
  to: string
  icon?: ReactNode
  onClick?: MouseEventHandler
  className?: string
  [key: string]: any
}

export function HeaderLink({
  children = null,
  to,
  icon = null,
  onClick,
  className,
  ...rest
}: Readonly<Props>) {
  return (
    <NavLink
      {...rest}
      to={to}
      onClick={onClick}
      className={clsx('header-link', className)}
    >
      {icon}
      {children}
    </NavLink>
  )
}
