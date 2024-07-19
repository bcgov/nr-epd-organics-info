import { ReactNode, useEffect, useState } from 'react'
import clsx from 'clsx'
import { IconButton } from '@mui/material'
import { Close, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

import { useLastSearchTime } from '@/features/omrr/omrr-slice'

import './MapBottomDrawer.css'

interface Props {
  children?: ReactNode
  isExpanded?: boolean
  setExpanded: (expanded: boolean) => void
}

/**
 * Renders the children at the bottom of the map view.
 * When isExpanded is true - it is displayed.
 * When isExpanded is false - it is hidden.
 * It can be toggled to be full height.
 */
export function MapBottomDrawer({
  children,
  isExpanded,
  setExpanded,
}: Readonly<Props>) {
  const [fullHeight, setFullHeight] = useState<boolean>(false)
  const lastSearchTime = useLastSearchTime()

  // Expand when the search changes
  useEffect(() => {}, [lastSearchTime])

  const onClose = () => {
    setExpanded(false)
    setFullHeight(false)
  }

  // Single selected item or search results
  const title = 'Search Results'
  // Title will change for other modes:
  // 'Polygon Search', 'Point Search', 'Search By', 'Filter by Facility Type'
  return (
    <div
      className={clsx(
        'map-bottom-drawer',
        isExpanded && 'map-bottom-drawer--expanded',
        fullHeight && 'map-bottom-drawer--full-height',
      )}
    >
      <div className="map-bottom-drawer-titlebar">
        <IconButton
          onClick={() => setFullHeight(!fullHeight)}
          className="map-bottom-drawer-button"
        >
          {fullHeight ? (
            <KeyboardArrowDown className="map-bottom-drawer-icon" />
          ) : (
            <KeyboardArrowUp className="map-bottom-drawer-icon" />
          )}
        </IconButton>

        <div className="map-bottom-drawer-title">{title}</div>

        <IconButton onClick={onClose} className="map-bottom-drawer-button">
          <Close className="map-bottom-drawer-icon" />
        </IconButton>

        <div className="map-bottom-drawer-handle" />
      </div>
      <div className="map-bottom-drawer-container">
        {isExpanded && children}
      </div>
    </div>
  )
}
