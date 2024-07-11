import { useEffect, useState } from 'react'
import { LatLngLiteral } from 'leaflet'

const opts: PositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 0,
}

interface MyLocationData {
  position?: LatLngLiteral
  accuracy?: number
}

/**
 * Uses the navigator geolocation to find the GPS location of the user.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/permissions
 * @returns position LatLngLiteral object
 */
export function useMyLocation(): MyLocationData {
  const [data, setData] = useState<MyLocationData>({})

  useEffect(() => {
    const success = (result: GeolocationPosition) => {
      const { coords } = result
      const { latitude: lat, longitude: lng, accuracy = 0 } = coords || {}
      const newData: MyLocationData = { accuracy }
      if (!isNaN(lat) && !isNaN(lng)) {
        newData.position = { lat, lng }
      }
      setData(newData)
    }
    const { geolocation } = navigator
    // prettier-ignore Ignore Sonar error about geolocation - we need to allow this
    geolocation.getCurrentPosition(success, null, opts) // NOSONAR
  }, [])

  return data
}
