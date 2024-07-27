import { useDispatch } from 'react-redux'
import { Button, Stack, Typography } from '@mui/material'

import {
  resetFilters,
  setSearchTextFilter,
  useHasFiltersOn,
  useHasSearchTextFilter,
} from '@/features/omrr/omrr-slice'

interface Props {
  showResetFiltersButton?: boolean
}

export function NoResults({ showResetFiltersButton = true }: Readonly<Props>) {
  const dispatch = useDispatch()
  const hasFiltersOn = useHasFiltersOn()
  const hasSearchText = useHasSearchTextFilter()

  const onResetFilters = () => {
    dispatch(resetFilters())
  }

  const onClearSearchText = () => {
    dispatch(setSearchTextFilter(''))
  }

  return (
    <>
      <Typography color="textSecondary">
        There are no matching authorizations.
      </Typography>
      <Stack direction="row" gap="16px">
        {showResetFiltersButton && hasFiltersOn && (
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
