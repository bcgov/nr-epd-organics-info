import { RefObject, useEffect, useRef } from 'react'

export type SwipeDirection = 'left' | 'right' | 'up' | 'down'
export type SwipeCallback = (swipeDirection: SwipeDirection) => void

/**
 * A simple hook that will call a callback function
 * when a swipe gesture is detected on the reference element.
 * @param ref a reference to the HTML element which will receive gestures
 * @param callback the callback function for when gestures are detected
 * @param {number} [minDistance=20] the minimum distance in pixels required
 * for a swipe to be recognized.
 */
export function useSwipe(
  ref: RefObject<HTMLElement | null | undefined>,
  callback: SwipeCallback,
  minDistance = 20,
) {
  const callbackRef = useRef<SwipeCallback>(callback)
  callbackRef.current = callback
  const minDistanceRef = useRef<number>(minDistance)
  minDistanceRef.current = minDistance
  const startRef = useRef<[number, number]>([0, 0])

  function eventEnd(endX: number, endY: number) {
    const [startX, startY] = startRef.current
    const diffX = endX - startX
    const diffY = endY - startY
    if (Math.max(Math.abs(diffX), Math.abs(diffY)) >= minDistanceRef.current) {
      let direction: SwipeDirection
      if (Math.abs(diffX) > Math.abs(diffY)) {
        direction = diffX < 0 ? 'left' : 'right'
      } else {
        direction = diffY < 0 ? 'up' : 'down'
      }
      callbackRef.current(direction)
    }
  }

  function onTouchStart(e: TouchEvent) {
    const [touchSrc] = e.changedTouches
    if (touchSrc) {
      startRef.current = [touchSrc.clientX, touchSrc.clientY]
    }
  }

  function onTouchEnd(e: TouchEvent) {
    const [touchSrc] = e.changedTouches
    if (touchSrc) {
      eventEnd(touchSrc.clientX, touchSrc.clientY)
    }
  }

  function onMouseDown(e: MouseEvent) {
    startRef.current = [e.clientX, e.clientY]
  }

  function onMouseUp(e: MouseEvent) {
    eventEnd(e.clientX, e.clientY)
  }

  useEffect(() => {
    const el = ref.current
    // Determine if touch screen enabled device
    const isTouch = 'ontouchstart' in window
    if (el) {
      if (isTouch) {
        el.addEventListener('touchstart', onTouchStart)
        el.addEventListener('touchend', onTouchEnd)
      } else {
        el.addEventListener('mousedown', onMouseDown)
        el.addEventListener('mouseup', onMouseUp)
      }
    }
    return () => {
      if (el) {
        if (isTouch) {
          el.removeEventListener('touchstart', onTouchStart)
          el.removeEventListener('touchend', onTouchEnd)
        } else {
          el.removeEventListener('mousedown', onMouseDown)
          el.removeEventListener('mouseup', onMouseUp)
        }
      }
    }
  }, [ref])
}
