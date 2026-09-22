import { useState } from 'react'
import { LayerGroup, TileLayer, WMSTileLayer } from 'react-leaflet'
import { IconButton } from '@mui/material'
import clsx from 'clsx'
import LayersIcon from '@/assets/svgs/fa-map.svg?react'
import GlobeIcon from '@/assets/svgs/globe.svg?react'

import './BasemapControl.css'

const basemaps = [
  {
    name: 'Terrain + Roads',
    thumbnail: 'streets.png',
    render: () => (
      <LayerGroup key="Terrain + Roads">
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
          attribution="© Esri"
        />
        <WMSTileLayer
          url="https://openmaps.gov.bc.ca/geo/pub/WHSE_BASEMAPPING.DRA_DGTL_ROAD_ATLAS_MPAR_SP/ows"
          layers="pub:WHSE_BASEMAPPING.DRA_DGTL_ROAD_ATLAS_MPAR_SP"
          format="image/png"
          transparent
          minZoom={12}
          attribution="© Government of British Columbia, DataBC, GeoBC"
        />
      </LayerGroup>
    ),
  },
  {
    name: 'Imagery + Roads',
    thumbnail: '/imagery.png',
    render: () => (
      <LayerGroup key="Imagery + Roads">
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="© Esri"
        />
        <WMSTileLayer
          url="https://openmaps.gov.bc.ca/geo/pub/WHSE_BASEMAPPING.DRA_DGTL_ROAD_ATLAS_MPAR_SP/ows"
          layers="pub:WHSE_BASEMAPPING.DRA_DGTL_ROAD_ATLAS_MPAR_SP"
          format="image/png"
          transparent
          minZoom={12}
          attribution="© Government of British Columbia, DataBC, GeoBC"
        />
      </LayerGroup>
    ),
  },
]

export function BasemapControlButton() {
  const [isListVisible, setIsListVisible] = useState(false)
  const [activeBasemapName, setActiveBasemapName] = useState(
    basemaps[0].name,
  )

  const activeBasemap =
    basemaps.find((basemap) => basemap.name === activeBasemapName) ??
    basemaps[0]

  const handleLayerChange = (name: string) => {
    setActiveBasemapName(name)
    setIsListVisible(false)
  }

  return (
    <div className="leaflet-control-basemaps">
      <IconButton
        className={clsx(
          'map-control-button',
          isListVisible && 'map-control-button--active',
        )}
        onClick={() => setIsListVisible(!isListVisible)}
        title="Change basemap"
      >
        <GlobeIcon />
      </IconButton>

      <div className={clsx('basemaps-list', !isListVisible && 'hidden')}>
        {basemaps.map((basemap) => (
          <button
            key={basemap.name}
            type="button"
            className={clsx(
              'basemap-option',
              activeBasemapName === basemap.name && 'active',
            )}
            onClick={() => handleLayerChange(basemap.name)}
          >
            <img src={basemap.thumbnail} alt={basemap.name} />
            <span data-basemap-name="true">{basemap.name}</span>
          </button>
        ))}
      </div>

      {activeBasemap.render()}
    </div>
  )
}

