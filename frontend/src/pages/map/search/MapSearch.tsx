import { Box, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { HorizontalScroller } from '@/components/HorizontalScroller'
import {
  ActiveToolEnum,
  MAP_CONTROLS_RIGHT_LG,
  MAP_CONTROLS_RIGHT_SM,
  MAP_CONTROLS_RIGHT_XL,
} from '@/constants/constants'
import { useActiveTool } from '@/features/map/map-slice'
import { DataLayersButton } from './DataLayersButton'
import { FilterByButton } from './FilterByButton'
import { FindMeButton } from './FindMeButton'
import { PointSearch } from './PointSearch'
import { PointSearchButton } from './PointSearchButton'
import { PolygonSearchButton } from './PolygonSearchButton'
import { PolygonSearch } from './PolygonSearch'
import { SearchByButton } from './SearchByButton'
import { SearchAutocomplete } from './SearchAutocomplete'
import { TextSearchButton } from './TextSearchButton'

import './MapSearch.css'

const styles = {
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
  const activeTool = useActiveTool()
  const isPolygonTool = activeTool === ActiveToolEnum.polygonSearch
  const isPointTool = activeTool === ActiveToolEnum.pointSearch

  return (
    <Box component="div" sx={styles} className="map-search">
      <HorizontalScroller
        isEnabled={isSmall}
        className="map-search-scroller"
        scrollOffset={150}
      >
        {isLarge ? (
          <Stack direction="row" className="map-search-row">
            <SearchAutocomplete />
            <SearchByButton isLarge={isLarge} />
            <FilterByButton isLarge={isLarge} />
            <FindMeButton />
            <div className="spacer" />
            <DataLayersButton />
          </Stack>
        ) : (
          <TextSearchButton />
        )}
        <PolygonSearchButton isActive={isPolygonTool} />
        <PointSearchButton isActive={isPointTool} />
        {isLarge || isSmall ? null : <div className="spacer--fill" />}
        {!isLarge && <SearchByButton isLarge={isLarge} />}
        {!isLarge && <FilterByButton isLarge={isLarge} />}
      </HorizontalScroller>
      {isLarge && (isPolygonTool || isPointTool) && (
        <div className="map-search-tool-row">
          <div className="map-search-tool-box">
            {isPolygonTool ? <PolygonSearch /> : <PointSearch />}
          </div>
        </div>
      )}
    </Box>
  )
}
