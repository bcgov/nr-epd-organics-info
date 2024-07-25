import { LatLngTuple } from 'leaflet'

export interface Location {
  latitude: number
  longitude: number
}

export interface MyLocationData {
  position?: LatLngTuple
  accuracy?: number
}

export type MyLocationSuccess = (data: MyLocationData) => void
