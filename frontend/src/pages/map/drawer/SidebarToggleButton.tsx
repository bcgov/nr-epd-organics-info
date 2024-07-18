import { MouseEvent, ReactNode } from 'react'
import { Button } from '@mui/material'
import { ChevronRight } from '@mui/icons-material'
import clsx from 'clsx'

import './SidebarToggleButton.css'

interface Props {
  children: ReactNode
  isExpanded: boolean
  setExpanded: (expanded: boolean, ev: MouseEvent) => void
}

export function SidebarToggleButton({
  children,
  isExpanded,
  setExpanded,
}: Props) {
  return (
    <Button
      color="primary"
      variant="contained"
      onClick={(ev) => setExpanded(!isExpanded, ev)}
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
