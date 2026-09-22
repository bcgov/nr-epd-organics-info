import { useState, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { IconButton } from '@mui/material'
import clsx from 'clsx'
import LayersIcon from '@/assets/svgs/fa-map.svg?react'
import GlobeIcon from '@/assets/svgs/globe.svg?react'

import './BasemapControl.css'

const basemaps = [
  {
    name: 'Terrain + Roads',
    layer: L.layerGroup([
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '© Esri',
        },
      ),
      L.tileLayer.wms(
        'https://openmaps.gov.bc.ca/geo/pub/WHSE_BASEMAPPING.DRA_DGTL_ROAD_ATLAS_MPAR_SP/ows',
        {
          layers: 'pub:WHSE_BASEMAPPING.DRA_DGTL_ROAD_ATLAS_MPAR_SP',
          format: 'image/png',
          transparent: true,
          minNativeZoom: 10,
          attribution: '© Government of British Columbia, DataBC, GeoBC',
        },
      ),
    ]),
    thumbnail: 'streets.png',
  },
  {
    name: 'Imagery + Roads',
    layer: L.layerGroup([
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '© Esri',
        },
      ),
      L.tileLayer.wms(
        'https://openmaps.gov.bc.ca/geo/pub/WHSE_BASEMAPPING.DRA_DGTL_ROAD_ATLAS_MPAR_SP/ows',
        {
          layers: 'pub:WHSE_BASEMAPPING.DRA_DGTL_ROAD_ATLAS_MPAR_SP',
          format: 'image/png',
          transparent: true,
          minNativeZoom: 10,
          attribution: '© Government of British Columbia, DataBC, GeoBC',
        },
      ),
    ]),
    thumbnail: '/imagery.png',
  },
]

export function BasemapControlButton() {
  const map = useMap()
  const [isListVisible, setIsListVisible] = useState(false)
  const [activeLayer, setActiveLayer] = useState<L.Layer>(basemaps[0].layer)

  useEffect(() => {
    activeLayer.addTo(map)
    return () => {
      map.removeLayer(activeLayer)
    }
  }, [map, activeLayer])

  const handleLayerChange = (newLayer: L.Layer) => {
    map.removeLayer(activeLayer)
    newLayer.addTo(map)
    setActiveLayer(newLayer)
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
              activeLayer === basemap.layer && 'active',
            )}
            onClick={() => handleLayerChange(basemap.layer)}
          >
            <img src={basemap.thumbnail} alt={basemap.name} />
            <span data-basemap-name="true">{basemap.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
