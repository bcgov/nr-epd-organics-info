import { useSelector } from 'react-redux'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { selectStatus, useFilteredResults } from '@/features/omrr/omrr-slice'
import OmrrData from '@/interfaces/omrr'
import { AuthorizationMarker } from './AuthorizationMarker'

export function AuthorizationMarkers() {
  const values = useFilteredResults()
  const status = useSelector(selectStatus)
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  const hasMarkers =
    status === 'succeeded' && Array.isArray(values) && values.length > 0

  return hasMarkers ? (
    <MarkerClusterGroup
      chunkedLoading
      maxClusterRadius={20}
      spiderfyOnMaxZoom
      showCoverageOnHover
    >
      {values.map((item: OmrrData) => (
        <AuthorizationMarker
          key={`AuthorizationMarker-${item['Authorization Number']}`}
          item={item}
          isSmall={isSmall}
        />
      ))}
    </MarkerClusterGroup>
  ) : null
}
