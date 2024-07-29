import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { IconButton } from '@mui/material'

import { DataLayersCheckboxGroup } from '@/components/DataLayersCheckboxGroup'
import { FilterByCheckboxGroup } from '@/components/FilterByCheckboxGroup'
import { SearchByRadioGroup } from '@/components/SearchByRadioGroup'
import { ActiveToolEnum } from '@/constants/constants'
import { setActiveTool, useActiveTool } from '@/features/map/map-slice'
import { setCircleFilter, setPolygonFilter } from '@/features/omrr/omrr-slice'
import { SwipeDirection, useSwipe } from '@/hooks/useSwipe'
import { SearchResultsList } from './SearchResultsList'
import { PolygonSearch } from '../search/PolygonSearch'
import { PointSearch } from '../search/PointSearch'

import ChevronUpIcon from '@/assets/svgs/fa-chevron-up.svg?react'
import CloseIcon from '@/assets/svgs/close.svg?react'

import './MapBottomDrawer.css'

function getTitle(tool: ActiveToolEnum | undefined): string {
  switch (tool) {
    case ActiveToolEnum.dataLayers:
      return 'Data Layers'
    case ActiveToolEnum.polygonSearch:
      return 'Polygon Search'
    case ActiveToolEnum.pointSearch:
      return 'Point Search'
    case ActiveToolEnum.searchBy:
      return 'Search By'
    case ActiveToolEnum.filterBy:
      return 'Filter by Facility Type'
    default:
      return 'Search Results'
  }
}

interface Props {
  isExpanded: boolean
  setExpanded: (expanded: boolean) => void
}

/**
 * Renders the children at the bottom of the map view.
 * When isExpanded is true - it is displayed.
 * When isExpanded is false - it is hidden.
 * It can be toggled to be full height.
 */
export function MapBottomDrawer({ isExpanded, setExpanded }: Readonly<Props>) {
  const dispatch = useDispatch()
  const ref = useRef<HTMLDivElement>(null)
  const [fullHeight, setFullHeight] = useState<boolean>(false)
  const activeTool = useActiveTool()
  const isSearchResultsVisible = !activeTool
  const isDataLayersVisible = activeTool === ActiveToolEnum.dataLayers
  const isPointSearchVisible = activeTool === ActiveToolEnum.pointSearch
  const isPolygonSearchVisible = activeTool === ActiveToolEnum.polygonSearch
  const isSearchByVisible = activeTool === ActiveToolEnum.searchBy
  const isFilterByVisible = activeTool === ActiveToolEnum.filterBy

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

  const onClose = () => {
    setExpanded(false)
    setFullHeight(false)
    dispatch(setActiveTool(undefined))
    if (isPolygonSearchVisible) {
      dispatch(setPolygonFilter(undefined))
    } else if (isPointSearchVisible) {
      dispatch(setCircleFilter(undefined))
    }
  }

  return (
    <div
      ref={ref}
      className={clsx(
        'map-bottom-drawer',
        isExpanded && 'map-bottom-drawer--expanded',
        fullHeight && 'map-bottom-drawer--full-height',
        Boolean(activeTool) && `map-bottom-drawer--${activeTool}`,
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

        <div className="map-bottom-drawer-title">{getTitle(activeTool)}</div>

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
