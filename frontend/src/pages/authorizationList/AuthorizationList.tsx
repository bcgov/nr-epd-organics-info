import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { selectPage, useFilteredResults } from '@/features/omrr/omrr-slice'
import { ListTopSection } from './ListTopSection'
import { ListSearchSection } from './ListSearchSection'
import { ListLastUpdated } from './ListLastUpdated'
import { ListPagination } from './ListPagination'
import { ListSearchResults } from './ListSearchResults'

import './AuthorizationList.css'

const styles = {
  stack: {
    gap: '24px',
    padding: {
      xs: '40px 24px',
      md: '80px 76px',
    },
  },
}

interface Props {
  pageSize?: number
}

export default function AuthorizationList({ pageSize = 10 }: Readonly<Props>) {
  const page = useSelector(selectPage)
  const filteredResults = useFilteredResults()
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Stack direction="column" className="authorization-list">
      <ListTopSection />
      <Stack component="section" direction="column" sx={styles.stack}>
        <Stack sx={{ display: { xs: 'block', md: 'none' } }}>
          <ListSearchSection isMobile={true} />
        </Stack>
        <ListLastUpdated />
        <ListPagination
          page={page}
          pageSize={pageSize}
          total={filteredResults.length}
          showExportButton
        />
        <ListSearchResults
          results={filteredResults}
          page={page}
          pageSize={pageSize}
        />
        <ListPagination
          page={page}
          pageSize={pageSize}
          total={filteredResults.length}
          showResultsCount={isMd}
        />
      </Stack>
    </Stack>
  )
}
