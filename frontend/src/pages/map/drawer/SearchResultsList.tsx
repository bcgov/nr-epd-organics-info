import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Button, Stack, Typography } from '@mui/material'

import OmrrData from '@/interfaces/omrr'
import { useSelectedItem } from '@/features/map/map-slice'
import {
  resetFilters,
  setSearchTextFilter,
  useFilteredResults,
  useHasFiltersOn,
  useHasSearchTextFilter,
} from '@/features/omrr/omrr-slice'
import { InfiniteScrollingList } from '@/components/InfiniteScrollingList'
import { SearchResultListItem } from './SearchResultsListItem'
import { ZoomToButton } from './ZoomToButton'

import './SearchResultsList.css'

interface Props {
  pageSize?: number
  scrollBars?: boolean
}

export function SearchResultsList({
  pageSize = 10,
  scrollBars = true,
}: Readonly<Props>) {
  const dispatch = useDispatch()
  const filteredResults = useFilteredResults()
  const selectedItem = useSelectedItem()
  const hasFiltersOn = useHasFiltersOn()
  const hasSearchText = useHasSearchTextFilter()

  const onResetFilters = () => {
    dispatch(resetFilters())
  }

  const onClearSearchText = () => {
    dispatch(setSearchTextFilter(''))
  }

  let results = selectedItem ? [selectedItem] : filteredResults
  const noResults = results.length === 0
  const hasSelectedItem = Boolean(selectedItem)
  const showButtonBar = !hasSelectedItem && filteredResults.length > 0

  if (noResults) {
    return (
      <>
        <Typography color="textSecondary">
          There are no matching authorizations.
        </Typography>
        <Stack direction="row" gap="1rem">
          {hasFiltersOn && (
            <Button variant="outlined" onClick={onResetFilters}>
              Reset Filters
            </Button>
          )}
          {hasSearchText && (
            <Button variant="outlined" onClick={onClearSearchText}>
              Clear Search Text
            </Button>
          )}
        </Stack>
      </>
    )
  }

  const itemRenderer = (item: OmrrData) => (
    <SearchResultListItem
      key={`SearchResultListItem-${item['Authorization Number']}`}
      item={item}
      fullDetails={hasSelectedItem}
    />
  )

  const resultsText = `${results.length} matching result${results.length === 1 ? '' : 's'}`
  return (
    <>
      {showButtonBar && (
        <div className="search-results-bar">
          {resultsText}
          <ZoomToButton items={results}>Zoom To Results</ZoomToButton>
        </div>
      )}
      <InfiniteScrollingList
        items={results}
        initialCount={pageSize}
        className={clsx(
          'search-results-list',
          !scrollBars && 'search-results-list--no-scrollbars',
        )}
        itemRenderer={itemRenderer}
      />
    </>
  )
}
