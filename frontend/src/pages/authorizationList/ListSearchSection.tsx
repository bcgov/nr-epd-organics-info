import { useState } from 'react'
import { Box, Button } from '@mui/material'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import clsx from 'clsx'

import { FilterByCheckboxGroup } from '@/components/FilterByCheckboxGroup'
import { ListSearchInput } from './ListSearchInput'
import { ListSearchByGroup } from './ListSearchByGroup'

const styles = {
  searchByRow: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
    justifyContent: {
      xs: 'flex-start',
      md: 'space-between',
    },
    alignItems: {
      xs: 'flex-start',
      md: 'center',
    },
    gap: '24px',
    marginBottom: {
      xs: 0,
      md: '16px',
    },
  },
}

export function ListSearchSection() {
  const [filtersExpanded, setFiltersExpanded] = useState<boolean>(false)

  return (
    <>
      <ListSearchInput />
      <Box sx={styles.searchByRow}>
        <ListSearchByGroup />
        <Button
          color="primary"
          variant="contained"
          onClick={() => setFiltersExpanded(!filtersExpanded)}
          endIcon={filtersExpanded ? <ArrowDropUp /> : <ArrowDropDown />}
        >
          Filter by Facility Type
        </Button>
      </Box>
      {filtersExpanded && (
        <Box
          component="div"
          className={clsx(
            'list-search-filter-by-row',
            filtersExpanded && 'list-search-filter-by-row--expanded',
          )}
          sx={{
            gap: {
              xs: '8px',
              md: '16px',
            },
          }}
        >
          <FilterByCheckboxGroup className="list-search-checkbox-group" />
        </Box>
      )}
    </>
  )
}
