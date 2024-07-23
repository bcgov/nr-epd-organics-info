import { useDispatch } from 'react-redux'
import { Box, Pagination, Typography } from '@mui/material'

import { setPage } from '@/features/omrr/omrr-slice'
import { ExportResultsButton } from './ExportResultsButton'

import './ListPagination.css'

interface Props {
  page: number
  pageSize: number
  total: number
  showResultsCount?: boolean
  showExportButton?: boolean
}

export function ListPagination({
  page,
  pageSize,
  total,
  showResultsCount = true,
  showExportButton = false,
}: Readonly<Props>) {
  const dispatch = useDispatch()

  if (total === 0) {
    return null
  }

  const onPageChange = (newPage: number) => {
    dispatch(setPage(newPage))
  }

  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const pageStartIndex = (page - 1) * pageSize
  const pageStart = pageStartIndex + 1
  const pageEnd = Math.min(pageStartIndex + pageSize, total)
  let resultsText = ''
  if (total <= pageSize) {
    if (total === 1) {
      resultsText = `Showing 1 result`
    } else {
      resultsText = `Showing ${total} results`
    }
  } else {
    resultsText = `Showing ${pageStart}-${pageEnd} of ${total} results`
  }
  return (
    <Box
      component="div"
      className="list-pagination"
      data-testid="list-pagination"
      sx={{
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        alignItems: {
          xs: 'flex-start',
          md: 'center',
        },
      }}
    >
      {pageCount > 1 ? (
        <Pagination
          count={pageCount}
          siblingCount={0}
          page={page}
          onChange={(_ev, value) => onPageChange(value)}
          className="list-pagination-control"
          sx={{
            flex: {
              xs: '1 1 100%',
              md: '1 1 350px',
            },
          }}
          hidePrevButton={page === 1}
          hideNextButton={page === pageCount}
        />
      ) : (
        <div className="spacer" />
      )}
      {showResultsCount && (
        <Typography className="list-pagination-results-text">
          {resultsText}
        </Typography>
      )}
      {showExportButton && total > 0 && <ExportResultsButton />}
    </Box>
  )
}
