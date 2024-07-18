import { Box, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { FindMeButton } from './FindMeButton'
import { PolygonSearchButton } from './PolygonSearchButton'
import { PointSearchButton } from './PointSearchButton'
import { SearchByButton } from './SearchByButton'
import { SearchInput } from './SearchInput'
import { DataLayersButton } from './DataLayersButton'
import { SearchButton } from './SearchButton'
import { FilterByButton } from './FilterByButton'
import HorizontalScroller from '@/components/HorizontalScroller'

import './MapSearch.css'

const styles = {
  container: {
    top: {
      md: '40px',
      xs: '16px',
    },
    left: {
      xl: '72px',
      lg: '48px',
      md: '72px',
      xs: '24px',
    },
    right: {
      xl: '72px',
      lg: '48px',
      xs: 0,
    },
    flexWrap: {
      xs: 'nowrap',
      md: 'wrap',
    },
  },
}

export function MapSearch() {
  const theme = useTheme()
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <div className="map-search">
      <Box
        component="div"
        sx={styles.container}
        className="map-search-container"
      >
        <HorizontalScroller isEnabled={isSmall} className="map-search-scroller">
          {isLarge ? (
            <Stack direction="row" className="map-search-row">
              <SearchInput />
              <FindMeButton />
              <div className="spacer" />
              <DataLayersButton />
            </Stack>
          ) : (
            <SearchButton />
          )}
          <PolygonSearchButton />
          <PointSearchButton />
          {isLarge || isSmall ? null : <div className="spacer--fill" />}
          <SearchByButton />
          <FilterByButton />
        </HorizontalScroller>
      </Box>
    </div>
  )
}
