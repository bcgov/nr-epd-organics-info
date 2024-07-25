import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { IconButton } from '@mui/material'

import { DataLayersCheckboxGroup } from '@/components/DataLayersCheckboxGroup'
import { BottomDrawerContentEnum } from '@/constants/constants'
import { useLastSearchTime } from '@/features/omrr/omrr-slice'
import { useBottomDrawerContentType } from '@/features/map/map-slice'
import { SearchResultsList } from './SearchResultsList'

import ChevonUpIcon from '@/assets/svgs/fa-chevron-up.svg?react'
import CloseIcon from '@/assets/svgs/close.svg?react'

import './MapBottomDrawer.css'
import { SearchByRadioGroup } from '@/components/SearchByRadioGroup'
import { FilterByCheckboxGroup } from '@/components/FilterByCheckboxGroup'

function getTitle(contentType: BottomDrawerContentEnum | undefined): string {
  switch (contentType) {
    case BottomDrawerContentEnum.dataLayers:
      return 'Data Layers'
    case BottomDrawerContentEnum.polygonSearch:
      return 'Polygon Search'
    case BottomDrawerContentEnum.pointSearch:
      return 'Point Search'
    case BottomDrawerContentEnum.searchBy:
      return 'Search By'
    case BottomDrawerContentEnum.filterBy:
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
  const [fullHeight, setFullHeight] = useState<boolean>(false)
  const lastSearchTime = useLastSearchTime()
  const contentType = useBottomDrawerContentType()
  const isSearchResultsVisible = !contentType
  const isDataLayersVisible = contentType === BottomDrawerContentEnum.dataLayers
  // const isPointSearchVisible =
  //   contentType === BottomDrawerContentEnum.pointSearch
  // const isPolygonSearchVisible =
  //   contentType === BottomDrawerContentEnum.polygonSearch
  const isSearchByVisible = contentType === BottomDrawerContentEnum.searchBy
  const isFilterByVisible = contentType === BottomDrawerContentEnum.filterBy

  // Expand when the search changes ???
  useEffect(() => {}, [lastSearchTime])

  const onClose = () => {
    setExpanded(false)
    setFullHeight(false)
  }

  return (
    <div
      className={clsx(
        'map-bottom-drawer',
        isExpanded && 'map-bottom-drawer--expanded',
        fullHeight && 'map-bottom-drawer--full-height',
        Boolean(contentType) && `map-bottom-drawer--${contentType}`,
      )}
      data-testid="map-bottom-drawer"
    >
      <div className="map-bottom-drawer-titlebar">
        <IconButton
          onClick={() => setFullHeight(!fullHeight)}
          className="map-bottom-drawer-button"
          title={fullHeight ? 'Collapse' : 'Expand'}
        >
          <ChevonUpIcon
            className={clsx(
              'map-bottom-drawer-icon',
              fullHeight && 'map-bottom-drawer-icon--invert',
            )}
          />
        </IconButton>

        <div className="map-bottom-drawer-title">{getTitle(contentType)}</div>

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
            {/* Add more contents like point/polygon search */}
            {isSearchResultsVisible && (
              <SearchResultsList pageSize={5} scrollBars={false} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
