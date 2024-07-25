import { WMSTileLayerProps } from 'react-leaflet/lib/WMSTileLayer'

export interface DataLayer extends WMSTileLayerProps {
  name: string
}

export interface DataLayerGroup {
  name: string
  layers: DataLayer[]
}
