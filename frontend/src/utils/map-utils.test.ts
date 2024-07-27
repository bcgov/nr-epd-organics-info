import L, { LatLngTuple } from 'leaflet'

import { distanceTo, isPointInsidePolygon } from '@/utils/map-utils'

describe('Test suite for map-utils', () => {
  it('should test distanceTo', () => {
    expect(distanceTo([48, -123], [48, -123])).toBe(0)
    expect(distanceTo({ lat: 48, lng: -123 }, [48, -123])).toBe(0)
    expect(distanceTo(L.latLng([48, -123]), [48, -123])).toBe(0)
  })

  it('should test isPointInsidePolygon', () => {
    let point: LatLngTuple = [48, -123]
    let polygon: LatLngTuple[] = []
    expect(isPointInsidePolygon(point, polygon)).toBe(false)

    polygon = [
      [48, -123],
      [49, -123],
    ]
    expect(isPointInsidePolygon(point, polygon)).toBe(false)

    polygon = [
      [47, -122],
      [49, -123],
      [47, -124],
    ]
    expect(isPointInsidePolygon(point, polygon)).toBe(true)

    expect(isPointInsidePolygon([22, -33], polygon)).toBe(false)
  })
})
