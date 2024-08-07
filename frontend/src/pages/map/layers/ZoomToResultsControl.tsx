import { IconButton } from '@mui/material'

import { env } from '@/env'
import { useFilteredResults } from '@/features/omrr/omrr-slice'
import { useZoomToAuthorizations } from '../hooks/useZoomTo'

import ZoomToResultsIcon from '@/assets/svgs/zoom-to-results.svg?react'

export function ZoomToResultsControl() {
  const zoomTo = useZoomToAuthorizations()
  const filteredResults = useFilteredResults()

  // Feature flag for showing this control button
  const zoomToResultsFeatureFlag =
    env.VITE_ZOOM_TO_RESULTS_CONTROL_FLAG === 'true'

  if (filteredResults.length === 0 || !zoomToResultsFeatureFlag) {
    return null
  }

  const onClick = () => {
    zoomTo(filteredResults)
  }

  return (
    <IconButton
      className="map-control-button"
      onClick={onClick}
      title="Zoom to show all search results"
    >
      <ZoomToResultsIcon />
    </IconButton>
  )
}
