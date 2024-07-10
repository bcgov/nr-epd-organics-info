import { Stack } from '@mui/system'
import { Box } from '@mui/material'
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

const styles = {
  container: {
    position: 'absolute',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: {
      xs: 'nowrap',
      md: 'wrap',
    },
    gap: '1em 0.5rem',
  },
  row: {
    flex: '1 1 100%',
    gap: '0.5rem',
  },
  scroller: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: '0.5rem',
    flex: 1,
  },
}

export function MapSearch() {
  const theme = useTheme()
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box component="div" sx={styles.container}>
      <HorizontalScroller isEnabled={isSmall} style={styles.scroller}>
        {isLarge ? (
          <Stack direction="row" sx={styles.row}>
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
  )
}
