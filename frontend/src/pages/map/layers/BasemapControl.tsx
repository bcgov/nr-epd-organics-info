import { useState, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { IconButton } from '@mui/material'
import clsx from 'clsx'
import LayersIcon from '@/assets/svgs/fa-map.svg?react'

import './BasemapControl.css'

const basemaps = [
  {
    name: 'Streets',
    layer: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }),
    thumbnail: 'streets.png',
  },
  {
    name: 'Imagery',
    layer: L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '© Esri',
      },
    ),
    thumbnail: '/imagery.png',
  },
  {
    name: 'Terrain',
    layer: L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
      attribution: '© Google',
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }),
    thumbnail: 'terrain2.png',
  },
]

export function BasemapControlButton() {
  const map = useMap()
  const [isListVisible, setIsListVisible] = useState(false)
  const [activeLayer, setActiveLayer] = useState(basemaps[0].layer)

  useEffect(() => {
    activeLayer.addTo(map)
    return () => {
      map.removeLayer(activeLayer)
    }
  }, [map, activeLayer])

  const handleLayerChange = (newLayer: L.TileLayer) => {
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
        <LayersIcon />
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
            <span>{basemap.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
