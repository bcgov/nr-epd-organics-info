import { useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import './BasemapControl.css'
import MapIcon from '@/assets/svgs/fa-map.svg?react'
import { renderToString } from 'react-dom/server'

// Custom control interface
interface BasemapOption {
  layer: L.TileLayer
  icon: string
  name: string
}

// Custom control class
class BasemapSwitcher extends L.Control {
  private readonly container: HTMLElement
  private expanded: boolean = false
  private readonly basemaps: BasemapOption[]
  private readonly onLayerChange: (layer: L.TileLayer) => void
  private toggleButton: HTMLElement | null = null

  constructor(
    basemaps: BasemapOption[],
    onLayerChange: (layer: L.TileLayer) => void,
  ) {
    super({ position: 'bottomright' })
    this.basemaps = basemaps
    this.onLayerChange = onLayerChange
    this.container = L.DomUtil.create('div', 'leaflet-control-basemaps')
  }

  onAdd() {
    this.toggleButton = L.DomUtil.create(
      'button',
      'basemap-toggle leaflet-control-button',
      this.container,
    )

    const icon = document.createElement('div')
    icon.innerHTML = renderToString(MapIcon({ width: '20px', height: '24px' }))
    this.toggleButton.appendChild(icon.firstChild as Node)

    const basemapsList = L.DomUtil.create(
      'div',
      'basemaps-list hidden',
      this.container,
    )

    this.basemaps.forEach((basemap, index) => {
      const item = L.DomUtil.create('div', 'basemap-option', basemapsList)
      item.innerHTML = `
        <img src="${basemap.icon}" alt="${basemap.name}" />
        <span>${basemap.name}</span>
      `
      L.DomEvent.on(item, 'click', () => {
        // Remove active class from all options
        const options = this.container.getElementsByClassName('basemap-option')
        Array.from(options).forEach((opt) => opt.classList.remove('active'))

        // Add active class to clicked option
        item.classList.add('active')

        this.onLayerChange(basemap.layer)
        if (this.toggleButton) {
          this.toggleButton.classList.remove('active')
        }
        this._collapse()
      })

      // Set initial active state on first basemap
      if (index === 0) {
        item.classList.add('active')
      }
    })

    L.DomEvent.on(this.toggleButton, 'click', (e) => {
      L.DomEvent.stopPropagation(e)
      this.expanded ? this._collapse() : this._expand()
      this.toggleButton?.classList.toggle('active')
    })

    // Add touch event handler
    this.container.addEventListener('touchstart', (e) => {
      e.preventDefault()
      const isExpanded = !this.container.querySelector('.hidden')
      if (isExpanded) {
        const target = e.target as HTMLElement
        target.click()
        this._collapse()
      } else {
        this._expand()
      }
    })

    // Prevent map click events when interacting with control
    L.DomEvent.disableClickPropagation(this.container)
    return this.container
  }

  _expand() {
    const list = this.container.querySelector('.basemaps-list')
    list?.classList.remove('hidden')
    this.expanded = true
  }

  _collapse() {
    const list = this.container.querySelector('.basemaps-list')
    list?.classList.add('hidden')
    this.expanded = false
  }

  // Add method to get container for cleanup
  getContainer() {
    return this.container
  }
}

export function BasemapControl() {
  const map = useMap()

  useEffect(() => {
    let activeLayer: L.TileLayer | null = null

    const basemaps = [
      {
        layer: L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution: '&copy; OpenStreetMap contributors',
            crossOrigin: 'anonymous',
          },
        ),
        icon: './streets.png',
        name: 'Streets',
      },
      {
        layer: L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: 'Tiles &copy; Esri',
            crossOrigin: 'anonymous',
          },
        ),
        icon: './imagery.png',
        name: 'Imagery',
      },
      {
        layer: L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: 'Tiles &copy; Esri',
            crossOrigin: 'anonymous',
          },
        ),
        icon: './terrain.png',
        name: 'Terrain',
      },
    ]

    // Set initial active layer
    activeLayer = basemaps[0].layer
    activeLayer.addTo(map)

    const handleLayerChange = (newLayer: L.TileLayer) => {
      if (activeLayer) {
        map.removeLayer(activeLayer)
      }
      activeLayer = newLayer
      newLayer.addTo(map)
    }

    const switcher = new BasemapSwitcher(basemaps, handleLayerChange).addTo(map)

    // Cleanup
    return () => {
      if (activeLayer) {
        map.removeLayer(activeLayer)
      }
      const switcherElement = switcher.getContainer()
      switcherElement.removeEventListener('touchstart', () => {})
      map.removeControl(switcher)
    }
  }, [map])

  return null
}
