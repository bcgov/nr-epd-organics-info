import { Box, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { HorizontalScroller } from '@/components/HorizontalScroller'
import { DataLayersButton } from './DataLayersButton'
import { FilterByButton } from './FilterByButton'
import { FindMeButton } from './FindMeButton'
import { PolygonSearchButton } from './PolygonSearchButton'
import { PointSearchButton } from './PointSearchButton'
import { SearchByButton } from './SearchByButton'
import { SearchAutocomplete } from './SearchAutocomplete'
import { SearchButton } from './SearchButton'

import './MapSearch.css'

const styles = {
  marginTop: {
    md: '40px',
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
  },
  flexWrap: {
    md: 'wrap',
  },
}

export function MapSearch() {
  const theme = useTheme()
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box component="div" sx={styles} className="map-search">
      <HorizontalScroller isEnabled={isSmall} className="map-search-scroller">
        {isLarge ? (
          <Stack direction="row" className="map-search-row">
            <SearchAutocomplete />
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
  )
}
