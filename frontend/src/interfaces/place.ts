import { LatLngTuple } from 'leaflet'

export interface Place {
  name: string
  pos: LatLngTuple
}

export interface PlaceNamesResult {
  loading: boolean
  places: Place[]
  error: string | undefined
}
