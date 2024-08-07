import L from 'leaflet'

import markerIcon1x from '@/assets/marker-icon-1x-blue.png'
import shadowIcon1x from '@/assets/marker-shadow-1x.png'
import markerIcon2x from '@/assets/marker-icon-2x-blue.png'
import shadowIcon2x from '@/assets/marker-shadow-2x.png'
import crosshairsSvg from '@/assets/svgs/crosshairs.svg'

export const blueIcon2x = new L.Icon({
  iconUrl: markerIcon2x,
  iconSize: [34.5, 45],
  iconAnchor: [17.25, 45],
  // both relative to iconAnchor
  popupAnchor: [0, -42],
  tooltipAnchor: [0, -42],
  shadowUrl: shadowIcon2x,
  shadowSize: [32, 16],
  shadowAnchor: [16, 8],
})

export const blueIcon1x = new L.Icon({
  iconUrl: markerIcon1x,
  iconSize: [23, 30],
  iconAnchor: [11.5, 30],
  // both relative to iconAnchor
  popupAnchor: [0, -28],
  tooltipAnchor: [0, -28],
  shadowUrl: shadowIcon1x,
  shadowSize: [16, 8],
  shadowAnchor: [8, 4],
})

// Used by Polygon and Point search tools
export const crosshairsIcon = new L.Icon({
  iconUrl: crosshairsSvg,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  // relative to iconAnchor
  popupAnchor: [32, 0],
  tooltipAnchor: [32, 0],
  className: 'crosshairs-icon',
})

export const emptyIcon = new L.DivIcon({
  html: '<span/>',
  className: 'empty-icon',
  iconSize: [0, 0],
})

// Icon used by Polygon search at the vertices
export const blackSquareIcon = new L.DivIcon({
  html: '<div />',
  className: 'black-square-icon',
  iconSize: [18, 18],
})
