import { useEffect, useState } from 'react'
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
  useLastSearchTime,
} from '@/features/omrr/omrr-slice'
import { SearchResultListItem } from './SearchResultsListItem'
import { SearchResultsPagination } from './SearchResultsPagination'

import './SearchResultsList.css'

interface Props {
  pageSize?: number
  scrollBars?: boolean
}

export function SearchResultsList({ pageSize = 10, scrollBars = true }: Props) {
  const dispatch = useDispatch()
  const [page, setPage] = useState<number>(1)
  const filteredResults = useFilteredResults()
  const selectedItem = useSelectedItem()
  const hasFiltersOn = useHasFiltersOn()
  const hasSearchText = useHasSearchTextFilter()
  const lastSearchTime = useLastSearchTime()

  useEffect(() => {
    if (lastSearchTime) {
      // Reset page back to start
      setPage(1)
    }
  }, [lastSearchTime])

  const onResetFilters = () => {
    dispatch(resetFilters())
  }

  const onClearSearchText = () => {
    dispatch(setSearchTextFilter(''))
  }

  let results = selectedItem ? [selectedItem] : filteredResults
  const isPaging = results.length > pageSize
  const noResults = results.length === 0
  if (isPaging) {
    const start = (page - 1) * pageSize
    results = results.slice(start, Math.min(start + pageSize, results.length))
  }

  return (
    <div
      className={clsx(
        'search-results-list',
        !scrollBars && 'search-results-list--no-scrollbars',
      )}
      role="list"
    >
      {noResults && (
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
      )}
      {results.map((item: OmrrData) => (
        <SearchResultListItem
          key={`SearchResultListItem-${item['Authorization Number']}`}
          item={item}
          fullDetails={Boolean(selectedItem)}
        />
      ))}
      {isPaging && (
        <SearchResultsPagination
          page={page}
          setPage={setPage}
          pageCount={Math.ceil(filteredResults.length / pageSize)}
        />
      )}
    </div>
  )
}
