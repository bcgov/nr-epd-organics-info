import { useSelector } from 'react-redux'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { RootState } from '@/app/store'
import OmrrData from '@/interfaces/omrr'
import AuthorizationMarker from './AuthorizationMarker'

export function AuthorizationMarkers() {
  const values = useSelector((state: RootState) => state.omrr.filteredValue)
  const status = useSelector((state: RootState) => state.omrr.status)
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
      {values.map((item: OmrrData, index: number) => {
        const key = `Marker-${index}-${item['Regulated Party']}`
        return <AuthorizationMarker key={key} item={item} isSmall={isSmall} />
      })}
    </MarkerClusterGroup>
  ) : null
}
