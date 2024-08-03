import { MouseEventHandler, ReactNode } from 'react'
import { Button } from '@mui/material'
import clsx from 'clsx'

import ChevronRight from '@/assets/svgs/fa-chevron-right.svg?react'

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
          style={{ transform: `rotate(${isExpanded ? 90 : -90}deg)` }}
          width={9}
        />
        {children}
      </span>
    </Button>
  )
}
