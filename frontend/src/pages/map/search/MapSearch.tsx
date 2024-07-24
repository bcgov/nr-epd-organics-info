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
import {
  MAP_CONTROLS_RIGHT_LG,
  MAP_CONTROLS_RIGHT_SM,
  MAP_CONTROLS_RIGHT_XL,
} from '@/constants/constants'

const styles = {
  marginTop: {
    md: '40px',
  },
  left: {
    xs: '24px',
    md: '72px',
    lg: '48px',
    xl: '72px',
  },
  right: {
    xs: `${MAP_CONTROLS_RIGHT_SM}px`,
    lg: `${MAP_CONTROLS_RIGHT_LG}px`,
    xl: `${MAP_CONTROLS_RIGHT_XL}px`,
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
        <SearchByButton isLarge={isLarge} />
        <FilterByButton isLarge={isLarge} />
      </HorizontalScroller>
    </Box>
  )
}
