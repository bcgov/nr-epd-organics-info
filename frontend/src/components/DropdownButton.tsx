import { MouseEvent, MouseEventHandler, ReactNode, useState } from 'react'
import { Button, ButtonProps, MenuProps } from '@mui/material'
import Menu from '@mui/material/Menu'
import clsx from 'clsx'

import downArrow from '@/assets/svgs/fa-caret-down.svg'

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
  ...rest
}: ButtonDropdownProps) {
  const [anchorElement, setAnchorEl] = useState<HTMLElement | null>(null)

  const isOpen = Boolean(anchorElement)

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
        endIcon={
          showArrow ? (
            <img src={downArrow} alt="Down arrow icon" {...arrowProps} />
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
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: -6,
          horizontal: 'left',
        }}
        elevation={0}
        {...menuProps}
        aria-labelledby={id}
        className={clsx('dropdown-button-menu', menuClassName)}
        anchorEl={anchorElement}
        open={isOpen}
        onClose={handleClose}
      >
        {dropdownContent}
      </Menu>
    </div>
  )
}

export default DropdownButton
