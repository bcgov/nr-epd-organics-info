import { useEffect, useState } from 'react'

import { Place, PlaceNamesResult } from '@/interfaces/place'

let cachedPlaces: Place[] = []
let placesLoaded = false

async function loadPlaces() {
  if (!placesLoaded) {
    placesLoaded = true
    const response = await fetch('/places.json')
    const data = await response.json()
    if (data && Array.isArray(data)) {
      cachedPlaces = data as Place[]
      console.log(`Loaded ${cachedPlaces.length} places`)
    }
  }
  return cachedPlaces
}

/**
 * Loads the place names from the public/places.json file.
 */
export function usePlaceNames(): PlaceNamesResult {
  const [loading, setLoading] = useState<boolean>(false)
  const [places, setPlaces] = useState<Place[]>([])
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    setLoading(true)
    loadPlaces()
      .then((places: Place[]) => {
        setPlaces(places)
        setLoading(false)
      })
      .catch((ex: any) => {
        console.error('Failed to load places', ex.message)
        setError(ex.message)
      })
  }, [])

  return { loading, places, error }
}
