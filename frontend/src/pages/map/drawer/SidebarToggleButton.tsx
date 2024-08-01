import { MouseEventHandler, ReactNode } from 'react'
import { Button } from '@mui/material'
import { ChevronRight } from '@mui/icons-material'
import clsx from 'clsx'

import './SidebarToggleButton.css'

interface Props {
  children: ReactNode
  isExpanded: boolean
  onClick: MouseEventHandler
}

export function SidebarToggleButton({
  children,
  isExpanded,
  onClick,
}: Readonly<Props>) {
  return (
    <Button
      color="primary"
      variant="contained"
      size="medium"
      onClick={onClick}
      className={clsx(
        'sidebar-toggle-button',
        isExpanded && 'sidebar-toggle-button--expanded',
      )}
    >
      <span className="sidebar-toggle-rotation">
        <ChevronRight
          color="secondary"
          style={{ transform: `rotate(${isExpanded ? 90 : -90}deg)` }}
        />
        {children}
      </span>
    </Button>
  )
}
