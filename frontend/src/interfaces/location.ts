import { LatLngLiteral } from 'leaflet'

export interface Location {
  latitude: number
  longitude: number
}

export interface MyLocationData {
  position?: LatLngLiteral
  accuracy?: number
}

export type MyLocationSuccess = (data: MyLocationData) => void
