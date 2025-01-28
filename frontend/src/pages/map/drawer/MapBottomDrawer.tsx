import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { IconButton } from '@mui/material'
import clsx from 'clsx'

import { DataLayersCheckboxGroup } from '@/components/DataLayersCheckboxGroup'
import { FilterByCheckboxGroup } from '@/components/FilterByCheckboxGroup'
import { SearchByRadioGroup } from '@/components/SearchByRadioGroup'
import { ActiveToolEnum } from '@/constants/constants'
import { clearActiveTool } from '@/features/map/map-slice'
import { clearShapeFilters } from '@/features/omrr/omrr-slice'
import { SwipeDirection, useSwipe } from '@/hooks/useSwipe'
import { useBottomDrawerState } from '../hooks/useBottomDrawerState'
import { SearchResultsList } from './SearchResultsList'
import { PolygonSearch } from '../search/PolygonSearch'
import { PointSearch } from '../search/PointSearch'
import { ClearSelectedItemButton } from './ClearSelectedItemButton'

import ChevronUpIcon from '@/assets/svgs/fa-chevron-up.svg?react'
import CloseIcon from '@/assets/svgs/close.svg?react'

import './MapBottomDrawer.css'

function getTitle(
  tool: ActiveToolEnum | undefined,
  hasSelectedItem: boolean,
): string {
  switch (tool) {
    case ActiveToolEnum.dataLayers:
      return 'Data Layers'
    case ActiveToolEnum.polygonSearch:
      return 'Polygon Search'
    case ActiveToolEnum.pointSearch:
      return 'Radius Search'
    case ActiveToolEnum.searchBy:
      return 'Status'
    case ActiveToolEnum.filterBy:
      return 'Filter'
    default:
      return hasSelectedItem ? '' : 'Search Results'
  }
}

/**
 * Renders the children at the bottom of the map view.
 * When isExpanded is true - it is displayed.
 * When isExpanded is false - it is hidden.
 * It can be toggled to be full height.
 */
export function MapBottomDrawer() {
  const dispatch = useDispatch()
  const {
    isExpanded,
    setExpanded,
    height,
    activeTool,
    hasSelectedItem,
    isSearchResultsVisible,
    isDataLayersVisible,
    isSearchByVisible,
    isFilterByVisible,
    isPointSearchVisible,
    isPolygonSearchVisible,
  } = useBottomDrawerState()
  const [fullHeight, setFullHeight] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  const onClose = () => {
    setExpanded(false)
    setFullHeight(false)
    // Clear active tool and filters too
    if (activeTool) {
      dispatch(clearShapeFilters())
      dispatch(clearActiveTool())
    }
  }

  const swipeCallback = (direction: SwipeDirection) => {
    if (direction === 'up') {
      if (isExpanded) {
        setFullHeight(true)
      } else {
        setExpanded(true)
      }
    } else if (direction === 'down') {
      if (fullHeight) {
        setFullHeight(false)
      } else if (isExpanded) {
        onClose()
      }
    }
  }

  useSwipe(ref, swipeCallback)

  return (
    <div
      ref={ref}
      style={!isExpanded || fullHeight ? undefined : { height: `${height}px` }}
      className={clsx(
        'map-bottom-drawer',
        isExpanded && 'map-bottom-drawer--expanded',
        fullHeight && 'map-bottom-drawer--full-height',
      )}
      data-testid="map-bottom-drawer"
    >
      <div className="map-bottom-drawer-titlebar">
        <IconButton
          onClick={() => setFullHeight(!fullHeight)}
          className="map-bottom-drawer-button"
          title={fullHeight ? 'Collapse' : 'Expand'}
        >
          <ChevronUpIcon
            className={clsx(
              'map-bottom-drawer-icon',
              fullHeight && 'map-bottom-drawer-icon--invert',
            )}
          />
        </IconButton>

        <div className="map-bottom-drawer-title">
          {getTitle(activeTool, hasSelectedItem)}
        </div>

        <IconButton
          onClick={onClose}
          title="Close"
          className="map-bottom-drawer-button"
        >
          <CloseIcon className="map-bottom-close-icon" />
        </IconButton>

        <div className="map-bottom-drawer-handle" />
      </div>
      <div className="map-bottom-drawer-container">
        {isExpanded && (
          <>
            {hasSelectedItem && (
              <div>
                <ClearSelectedItemButton />
              </div>
            )}
            {isDataLayersVisible && <DataLayersCheckboxGroup isSmall />}
            {isSearchByVisible && <SearchByRadioGroup />}
            {isFilterByVisible && <FilterByCheckboxGroup isSmall />}
            {isPolygonSearchVisible && <PolygonSearch isSmall />}
            {isPointSearchVisible && <PointSearch isSmall />}
            {isSearchResultsVisible && (
              <SearchResultsList pageSize={5} scrollBars={false} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
