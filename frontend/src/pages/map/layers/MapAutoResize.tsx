import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

// The sidebar/drawer/search bar containers all animate size via CSS
// `transition` (0.2s-0.5s). Wait for the container to stop changing size
// for this long before invalidating the map, so a single animation only
// triggers one tile reload instead of one per animation frame.
const RESIZE_SETTLE_DELAY_MS = 200

/**
 * Leaflet only recalculates its internal size/pixel-origin on `map.invalidateSize()`
 * or on `window` resize - it does not observe its own container element. This app's
 * map container can resize independently of the window (initial layout settling,
 * sidebar/bottom drawer opening, breakpoint changes), which leaves tile layers using
 * a stale size/bounds until the next zoom or pan. Watch the container directly and
 * invalidate the map size once it stops changing so tiles for the current view load
 * without re-fetching on every intermediate frame of a resize animation.
 *
 * This component renders nothing.
 * @return null
 */
export function MapAutoResize() {
  const map = useMap()

  useEffect(() => {
    const container = map.getContainer()
    let settleTimeoutId: ReturnType<typeof setTimeout> | undefined

    // Debounce bursts of resize notifications (e.g. layout still settling,
    // CSS transitions) into a single invalidateSize once the size has been
    // stable for RESIZE_SETTLE_DELAY_MS, instead of calling it on every
    // observer callback/animation frame.
    const resizeObserver = new ResizeObserver(() => {
      if (settleTimeoutId !== undefined) {
        clearTimeout(settleTimeoutId)
      }
      settleTimeoutId = setTimeout(() => {
        settleTimeoutId = undefined
        map.invalidateSize()
      }, RESIZE_SETTLE_DELAY_MS)
    })
    resizeObserver.observe(container)
    return () => {
      resizeObserver.disconnect()
      if (settleTimeoutId !== undefined) {
        clearTimeout(settleTimeoutId)
      }
    }
  }, [map])

  return null
}
