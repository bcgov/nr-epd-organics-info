import { Pagination } from '@mui/material'

import './SearchResultsPagination.css'

interface Props {
  page: number
  setPage: (newPage: number) => void
  pageCount: number
}

export function SearchResultsPagination({
  page,
  setPage,
  pageCount,
}: Readonly<Props>) {
  return (
    <Pagination
      count={pageCount}
      siblingCount={0}
      page={page}
      onChange={(_ev, value) => setPage(value)}
      className="search-results-pagination"
    />
  )
}
