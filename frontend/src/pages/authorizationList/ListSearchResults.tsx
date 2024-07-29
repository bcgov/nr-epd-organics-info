import { Box } from '@mui/material'

import { NoResults } from '@/components/NoResults'
import { AuthorizationListItem } from '@/components/AuthorizationListItem'
import OmrrData from '@/interfaces/omrr'

interface Props {
  results: OmrrData[]
  page: number
  pageSize: number
}

export function ListSearchResults({
  results,
  page,
  pageSize,
}: Readonly<Props>) {
  if (results.length === 0) {
    return <NoResults showResetFiltersButton={false} />
  }

  const start = (page - 1) * pageSize
  const end = start + pageSize
  const paginatedResults = results.slice(start, end)
  return (
    <Box
      component="ul"
      className="list-search-results"
      sx={{
        gap: {
          xs: '24px',
          md: '40px',
        },
      }}
    >
      {paginatedResults.map((item: OmrrData) => (
        <AuthorizationListItem
          key={`SearchResultListItem-${item['Authorization Number']}`}
          item={item}
          className="list-search-results-item"
          showAddress
          sx={{
            padding: {
              xs: '24px 24px 40px',
              md: '24px 40px 40px',
            },
          }}
        />
      ))}
    </Box>
  )
}
