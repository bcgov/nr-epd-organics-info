import { IconButton } from '@mui/material'
import clsx from 'clsx'

import { useSidebarState } from '../hooks/useSidebarState'
import { SearchResultsList } from './SearchResultsList'
import { SidebarToggleButton } from './SidebarToggleButton'
import { ZoomToButton } from './ZoomToButton'

import CloseIcon from '@/assets/svgs/close.svg?react'

import './MapSidebar.css'
import { ClearSelectedItemButton } from '@/pages/map/drawer/ClearSelectedItemButton'

export function MapSidebar() {
  // This hook keeps track of the expanded state and  calculates the sidebar width
  const { isExpanded, setExpanded, selectedItem, width, expandedWidth } =
    useSidebarState()

  const onClose = () => {
    setExpanded(false)
  }

  const style = { width: `${width}px` }
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
              <>
                <ClearSelectedItemButton />
                <ZoomToButton items={[selectedItem]} />
              </>
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
        {isExpanded && <SearchResultsList />}
        <SidebarToggleButton
          isExpanded={isExpanded}
          onClick={() => setExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide Results' : 'Show Results'}
        </SidebarToggleButton>
      </div>
    </div>
  )
}
