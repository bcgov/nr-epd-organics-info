import { MouseEvent, ReactNode } from 'react'
import clsx from 'clsx'
import { IconButton } from '@mui/material'

import { useSelectedItem } from '@/features/map/map-slice'
import { useCalculateSidebarWidth } from '../hooks/useCalculateSidebarWidth'
import { SidebarToggleButton } from './SidebarToggleButton'
import { ZoomToButton } from './ZoomToButton'

import CloseIcon from '@/assets/svgs/close.svg?react'

import './MapSidebar.css'

interface Props {
  children?: ReactNode
  isExpanded: boolean
  setExpanded: (expanded: boolean, ev: MouseEvent) => void
}

export function MapSidebar({
  children,
  isExpanded,
  setExpanded,
}: Readonly<Props>) {
  const selectedItem = useSelectedItem()
  // This hook calculates the sidebar width based on screen size
  // It also updates the sidebarWidth state which other components use
  const expandedWidth = useCalculateSidebarWidth()

  const onClose = (ev: MouseEvent) => {
    setExpanded(false, ev)
  }

  const style = { width: `${isExpanded ? expandedWidth : 0}px` }
  return (
    <div
      className={clsx('map-sidebar', isExpanded && 'map-sidebar--expanded')}
      style={style}
      data-testid="map-sidebar"
    >
      <div
        className="map-sidebar-container"
        style={{ width: `${expandedWidth}px` }}
      >
        <div className="map-sidebar-titlebar">
          <div className="map-sidebar-title">
            {selectedItem ? (
              <ZoomToButton items={[selectedItem]} />
            ) : (
              'Search Results'
            )}
          </div>
          <IconButton
            className="map-sidebar-close-button"
            onClick={onClose}
            title="Close"
            size="medium"
          >
            <CloseIcon className="map-sidebar-close-icon" />
          </IconButton>
        </div>
        {children}
        <SidebarToggleButton isExpanded={isExpanded} setExpanded={setExpanded}>
          {isExpanded ? 'Hide Results' : 'Show Results'}
        </SidebarToggleButton>
      </div>
    </div>
  )
}
