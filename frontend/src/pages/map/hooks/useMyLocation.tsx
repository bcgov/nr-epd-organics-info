import { useEffect, useState } from 'react'

import { MyLocationData } from '@/interfaces/location'
import { getMyLocation } from '@/utils/utils'

/**
 * Uses the navigator geolocation to find the GPS location of the user.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/permissions
 * @returns position LatLngLiteral object
 */
export function useMyLocation(): MyLocationData {
  const [data, setData] = useState<MyLocationData>({})

  useEffect(() => {
    getMyLocation(setData)
  }, [])

  return data
}
