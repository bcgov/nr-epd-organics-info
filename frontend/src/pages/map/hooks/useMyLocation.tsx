import { useEffect, useState } from 'react'
import { LatLngLiteral } from 'leaflet'

interface MyLocationData {
  position?: LatLngLiteral
  accuracy?: number
}

/**
 * Uses the navigator geolocation to find the GPS location of the user.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition
 * @returns position LatLngLiteral object
 */
export function useMyLocation() {
  const [data, setData] = useState<MyLocationData>({})

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (result) => {
        const { coords } = result
        const { latitude: lat, longitude: lng, accuracy = 0 } = coords || {}
        const newData: MyLocationData = { accuracy }
        if (!isNaN(lat) && !isNaN(lng)) {
          newData.position = { lat, lng }
        }
        setData(newData)
      },
      (error) => {
        console.error('Watch my location error', error)
        navigator.geolocation.clearWatch(watchId)
        setData({})
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      },
    )
    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return data
}
