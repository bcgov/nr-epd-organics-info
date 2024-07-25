import L, { LatLngTuple, LatLngExpression } from 'leaflet'

export function distanceTo(
  start: LatLngExpression,
  end: LatLngExpression,
  digits = 0,
): number {
  const latlng = L.latLng(start)
  return Number(latlng.distanceTo(end).toFixed(digits))
}

/**
 * Uses Ray Casting algorithm to determine if a point is inside a polygon.
 * Copied from https://stackoverflow.com/questions/31790344/determine-if-a-point-reside-inside-a-leaflet-polygon
 */
export function isPointInsidePolygon(
  point: LatLngTuple,
  polygon: LatLngTuple[],
): boolean {
  const [lat, lng] = point
  let inside = false

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [lati, lngi] = polygon[i]
    const [latj, lngj] = polygon[j]
    const intersect =
      lngi > lng != lngj > lng &&
      lat < ((latj - lati) * (lng - lngi)) / (lngj - lngi) + lati
    if (intersect) {
      inside = !inside
    }
  }

  return inside
}
