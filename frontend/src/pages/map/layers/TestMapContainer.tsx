import { ReactNode, useEffect } from 'react'
import { LatLngExpression } from 'leaflet'
import { MapContainer, useMap } from 'react-leaflet'

import { MapZoom } from './MapZoom'

interface Props {
  center?: LatLngExpression
  zoom?: number
  zoomControl?: boolean
  children: ReactNode
}

export function TestMapContainer({
  center = [48, -123],
  zoom = 13,
  zoomControl = false,
  children,
}: Readonly<Props>) {
  return (
    <MapContainer center={center} zoom={zoom} zoomControl={zoomControl}>
      <FixMap />
      <MapZoom />
      {children}
    </MapContainer>
  )
}

/**
 * There is a bug/issue with the user-event v14 library
 * and leaflet that causes click events to throw a NaN error.
 * This is an ugly workaround.
 * @see https://stackoverflow.com/questions/70791283/testing-react-leaflet-marker-click-event-triggers-error-invalid-latlng-object
 */
export function FixMap() {
  const map = useMap()

  useEffect(() => {
    const container = map.getContainer()
    // First leaflet container to have a fixed size
    if (container.clientWidth === 0) {
      Object.defineProperty(container, 'clientWidth', { value: 800 })
      Object.defineProperty(container, 'clientHeight', { value: 600 })
    }

    // Fix bug where Util.extend doesn't clone getters properly
    const mapAny: any = map
    const realFireDOMEvent = mapAny._fireDOMEvent
    mapAny._fireDOMEvent = (e: any, type: string, canvasTargets: any) => {
      if (type === 'click') {
        // the clientX and clientY getter properties are defined on the parent MouseEvent class
        // when leaflet clones the event object to fire the 'preclick' event
        // these properties are not copied and are therefore undefined
        const { target, currentTarget, srcElement } = e
        e = new MouseEvent(type, {
          button: e.button,
          buttons: e.buttons,
          clientX: e.clientX,
          clientY: e.clientY,
          relatedTarget: e.target,
          screenX: e.screenX,
          screenY: e.screenY,
          altKey: e.altKey,
          ctrlKey: e.ctrlKey,
          shiftKey: e.shiftKey,
          metaKey: e.metaKey,
          detail: e.detail,
          view: e.view,
          bubbles: e.bubbles,
          cancelable: e.cancelable,
          composed: e.composed,
        })
        Object.defineProperty(e, 'target', {
          value: target,
          enumerable: true,
        })
        Object.defineProperty(e, 'currentTarget', {
          value: currentTarget,
          enumerable: true,
        })
        Object.defineProperty(e, 'srcElement', {
          value: srcElement,
          enumerable: true,
        })
      }
      return realFireDOMEvent.call(map, e, type, canvasTargets)
    }
  }, [map])

  return null
}
