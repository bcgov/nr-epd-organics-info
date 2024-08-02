import { useState } from 'react'
import { Box, Button, Collapse } from '@mui/material'
import clsx from 'clsx'

import { FilterByCheckboxGroup } from '@/components/FilterByCheckboxGroup'
import { ListSearchInput } from './ListSearchInput'
import { ListSearchByGroup } from './ListSearchByGroup'

import DownArrow from '@/assets/svgs/fa-caret-down.svg?react'

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
          endIcon={
            <DownArrow
              width={10}
              style={{
                transform: `rotate(${filtersExpanded ? 180 : 0}deg)`,
                transition: 'transform 0.2s linear',
              }}
            />
          }
        >
          Filter by Facility Type
        </Button>
      </Box>
      <Collapse in={filtersExpanded} timeout="auto" unmountOnExit>
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
      </Collapse>
    </>
  )
}
