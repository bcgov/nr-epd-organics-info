import { WMSTileLayerProps } from 'react-leaflet'

export interface DataLayer extends WMSTileLayerProps {
  name: string
  // URL to the BC Data Catalogue
  webUrl: string
}

export interface DataLayerGroup {
  name: string
  layers: DataLayer[]
}
