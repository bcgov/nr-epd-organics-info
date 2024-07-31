import { useEffect, useState } from 'react'

import { MyLocationData } from '@/interfaces/location'
import { getGeolocationPermission, getMyLocation } from '@/utils/utils'

/**
 * Uses the navigator geolocation to find the GPS location of the user.
 * @returns { position, accuracy } object
 */
export function useMyLocation(): MyLocationData {
  const [data, setData] = useState<MyLocationData>({})

  useEffect(() => {
    getMyLocation(setData)
  }, [])

  return data
}

export function useGeolocationPermission(): PermissionState | undefined {
  const [state, setState] = useState<PermissionState | undefined>(undefined)

  useEffect(() => {
    // If there is an error - assume the permissions API is not supported
    // And the geolocation is probably still available
    getGeolocationPermission(setState, () => setState('prompt'))
  }, [])

  return state
}
