import { useState } from 'react'
import { Button } from '@mui/material'
import clsx from 'clsx'

import SearchIcon from '@/assets/svgs/fa-search.svg?react'
import { SearchDialog } from '@/pages/map/search/SearchDialog'

export function SearchButton() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        size="medium"
        className={clsx(
          'map-button',
          'map-button--medium',
          open && 'map-button--active',
        )}
        startIcon={<SearchIcon title="Search icon" />}
        onClick={() => setOpen(true)}
        aria-label="Search"
      >
        Text Search
      </Button>
      {open && <SearchDialog onClose={() => setOpen(false)} />}
    </>
  )
}
