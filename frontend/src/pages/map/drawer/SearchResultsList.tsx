import clsx from 'clsx'

import OmrrData from '@/interfaces/omrr'
import { useSelectedItem } from '@/features/map/map-slice'
import { useFilteredResults } from '@/features/omrr/omrr-slice'
import { InfiniteScrollingList } from '@/components/InfiniteScrollingList'
import { NoResults } from '@/components/NoResults'
import { AuthorizationListItem } from '@/components/AuthorizationListItem'
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
  const filteredResults = useFilteredResults()
  const selectedItem = useSelectedItem()

  let results = selectedItem ? [selectedItem] : filteredResults
  const noResults = results.length === 0
  const hasSelectedItem = Boolean(selectedItem)
  const showButtonBar = !hasSelectedItem && filteredResults.length > 0

  if (noResults) {
    return <NoResults />
  }

  const itemRenderer = (item: OmrrData) => (
    <AuthorizationListItem
      key={`SearchResultListItem-${item['Authorization Number']}`}
      className="search-results-list-item"
      item={item}
      fullDetails={Boolean(selectedItem)}
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
