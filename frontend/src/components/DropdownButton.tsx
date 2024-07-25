import { MouseEvent, MouseEventHandler, ReactNode, useState } from 'react'
import { Button, ButtonProps, MenuProps } from '@mui/material'
import Menu from '@mui/material/Menu'
import clsx from 'clsx'

import DownArrow from '@/assets/svgs/fa-caret-down.svg?react'

import './DropdownButton.css'

const defaultButtonStyles = {
  display: 'flex',
  gap: 0,
}

interface ButtonDropdownProps extends ButtonProps {
  id: string
  onClick?: MouseEventHandler
  dropdownContent?: ReactNode
  children?: ReactNode
  showArrow?: boolean
  arrowProps?: Record<string, any>
  openClassName?: string
  menuClassName?: string
  menuProps?: Partial<MenuProps>
  horizontalAlign?: 'left' | 'right'
  [key: string]: any
}

export function DropdownButton({
  id,
  onClick,
  dropdownContent,
  children,
  showArrow = true,
  arrowProps,
  openClassName,
  menuClassName,
  menuProps,
  horizontalAlign = 'left',
  ...rest
}: Readonly<ButtonDropdownProps>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const isOpen = Boolean(anchorEl)

  const handleClick = (ev: MouseEvent<HTMLElement>) => {
    setAnchorEl(ev.currentTarget)
    if (onClick) {
      onClick(ev)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { className, style, ...buttonProps } = rest

  return (
    <div>
      <Button
        id={id}
        className={clsx(className, isOpen && openClassName)}
        style={{
          ...defaultButtonStyles,
          ...style,
        }}
        aria-label={typeof children === 'string' ? children : undefined}
        endIcon={
          showArrow ? (
            <DownArrow title="Down arrow" {...arrowProps} />
          ) : undefined
        }
        {...buttonProps}
        onClick={handleClick}
      >
        {children}
      </Button>
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: horizontalAlign,
        }}
        transformOrigin={{
          vertical: -6,
          horizontal: horizontalAlign,
        }}
        elevation={0}
        {...menuProps}
        aria-labelledby={id}
        className={clsx('dropdown-button-menu', menuClassName)}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
      >
        {dropdownContent}
      </Menu>
    </div>
  )
}

export default DropdownButton
