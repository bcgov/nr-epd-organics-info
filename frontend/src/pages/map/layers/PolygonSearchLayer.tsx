import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
  LatLng,
  LatLngExpression,
  LatLngTuple,
  LeafletMouseEvent,
  Polyline as LeafletPolyline,
} from 'leaflet'
import { Polygon, Polyline, useMap, useMapEvents } from 'react-leaflet'

import { ActiveToolEnum } from '@/constants/constants'
import { blackSquareIcon } from '@/constants/marker-icons'
import { useActiveTool } from '@/features/map/map-slice'
import {
  addPolygonFilterPosition,
  usePolygonFilterFinished,
  usePolygonFilterPositions,
} from '@/features/omrr/omrr-slice'
import { useMapCrosshairsCursor } from '../hooks/useMapCrosshairsCursor'
import { CrosshairsTooltipMarker } from './CrosshairsTooltipMarker'
import { IconMarker } from './IconMarker'

export function PolygonSearchLayer() {
  const activeTool = useActiveTool()
  if (activeTool === ActiveToolEnum.polygonSearch) {
    return <PolygonLayer />
  }
  return null
}

function PolygonLayer() {
  const dispatch = useDispatch()
  const positions = usePolygonFilterPositions()
  const finished = usePolygonFilterFinished()
  const map = useMap()
  useMapCrosshairsCursor(map, !finished)
  const dottedLineRef = useRef<LeafletPolyline>(null)
  const mousePositionRef = useRef<LatLng>(map.getCenter())

  useMapEvents({
    mousemove: (ev: LeafletMouseEvent) => {
      mousePositionRef.current = ev.latlng
      if (positions.length > 0 && dottedLineRef.current) {
        const lastPosition = positions[positions.length - 1]
        dottedLineRef.current.setLatLngs([
          lastPosition,
          [ev.latlng.lat, ev.latlng.lng],
        ])
      }
    },
    click: (ev: LeafletMouseEvent) => {
      if (!finished) {
        dispatch(addPolygonFilterPosition([ev.latlng.lat, ev.latlng.lng]))
      }
    },
  })

  const showCrosshairs = positions.length === 0
  const drawLine = !finished && positions.length >= 2
  const drawDottedLine = !finished && positions.length > 0
  let dottedLinePositions: LatLngExpression[] = []
  if (drawDottedLine) {
    dottedLinePositions = [
      positions[positions.length - 1],
      mousePositionRef.current,
    ]
  }
  const markerPositions: LatLngTuple[] = finished ? [] : positions
  return (
    <>
      {showCrosshairs && (
        <CrosshairsTooltipMarker>
          Click to start drawing shape
        </CrosshairsTooltipMarker>
      )}
      {finished && (
        <Polygon positions={positions} className="polygon-search-polygon" />
      )}
      {drawLine && (
        <Polyline positions={positions} className="polygon-search-line" />
      )}
      {drawDottedLine && (
        <Polyline
          ref={dottedLineRef}
          positions={dottedLinePositions}
          className="polygon-search-line polygon-search-line--dotted"
        />
      )}
      {markerPositions.map((position: LatLngTuple, i: number) => (
        <IconMarker
          key={`BlackSquareMarker-${i}-${position[0]}-${position[1]}`}
          position={position}
          icon={blackSquareIcon}
          draggable={false}
          interactive={false}
        />
      ))}
    </>
  )
}
