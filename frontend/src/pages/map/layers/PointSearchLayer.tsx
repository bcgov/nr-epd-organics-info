import { useDispatch } from 'react-redux'
import { LatLngTuple, LeafletMouseEvent } from 'leaflet'
import { Circle, useMap, useMapEvents } from 'react-leaflet'

import { ActiveToolEnum } from '@/constants/constants'
import { useActiveTool } from '@/features/map/map-slice'
import {
  setPointFilterCenter,
  usePointFilterCenter,
  usePointFilterRadius,
} from '@/features/omrr/omrr-slice'
import { useMapCrosshairsCursor } from '../hooks/useMapCrosshairsCursor'
import { CrosshairsTooltipMarker } from './CrosshairsTooltipMarker'

export function PointSearchLayer() {
  const activeTool = useActiveTool()
  if (activeTool === ActiveToolEnum.pointSearch) {
    return <CircleLayer />
  }
  return null
}

function CircleLayer() {
  const dispatch = useDispatch()
  const center = usePointFilterCenter()
  const radius = usePointFilterRadius()
  const map = useMap()
  useMapCrosshairsCursor(map)

  useMapEvents({
    click: (ev: LeafletMouseEvent) => {
      const newCenter: LatLngTuple = [ev.latlng.lat, ev.latlng.lng]
      dispatch(setPointFilterCenter(newCenter))
    },
  })

  const drawCircle = center && radius > 0
  return (
    <>
      <CrosshairsTooltipMarker center={center}>
        Click to place center point
      </CrosshairsTooltipMarker>
      {drawCircle && (
        <Circle
          center={center}
          radius={radius}
          stroke
          fill
          className="point-search-circle"
        />
      )}
    </>
  )
}
