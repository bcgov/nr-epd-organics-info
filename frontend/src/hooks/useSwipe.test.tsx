import React, { useRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { SwipeCallback, useSwipe } from './useSwipe'

describe('Test suite for useSwipe', () => {
  function renderComponent(callback: SwipeCallback) {
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null)
      useSwipe(ref, callback)
      return (
        <div ref={ref} style={{ height: '100%' }}>
          Swipe
        </div>
      )
    }

    return render(<TestComponent />)
  }

  it('should test useSwipe with touch events', () => {
    const callback = vi.fn()
    renderComponent(callback)

    const div = screen.getByText('Swipe')
    expect(callback).toHaveBeenCalledTimes(0)

    // Swipe left
    fireEvent.touchStart(div, {
      changedTouches: [{ clientX: 100, clientY: 0 }],
    })
    fireEvent.touchEnd(div, {
      changedTouches: [{ clientX: 10, clientY: 0 }],
    })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('left')

    // Swipe right
    fireEvent.touchStart(div, {
      changedTouches: [{ clientX: 10, clientY: 0 }],
    })
    fireEvent.touchEnd(div, {
      changedTouches: [{ clientX: 100, clientY: 0 }],
    })
    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith('right')

    // Swipe down
    fireEvent.touchStart(div, {
      changedTouches: [{ clientX: 0, clientY: 10 }],
    })
    fireEvent.touchEnd(div, {
      changedTouches: [{ clientX: 0, clientY: 100 }],
    })
    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith('down')

    // Swipe up
    fireEvent.touchStart(div, {
      changedTouches: [{ clientX: 0, clientY: 100 }],
    })
    fireEvent.touchEnd(div, {
      changedTouches: [{ clientX: 0, clientY: 10 }],
    })
    expect(callback).toHaveBeenCalledTimes(4)
    expect(callback).toHaveBeenCalledWith('up')
  })

  it('should test useSwipe with mouse events', () => {
    const original = window.ontouchstart
    delete window.ontouchstart

    const callback = vi.fn()
    renderComponent(callback)

    const div = screen.getByText('Swipe')
    expect(callback).toHaveBeenCalledTimes(0)

    // Swipe left
    fireEvent.mouseDown(div, { clientX: 100, clientY: 0 })
    fireEvent.mouseUp(div, { clientX: 10, clientY: 0 })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('left')

    // Swipe right
    fireEvent.mouseDown(div, { clientX: 10, clientY: 0 })
    fireEvent.mouseUp(div, { clientX: 100, clientY: 0 })
    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith('right')

    // Swipe down
    fireEvent.mouseDown(div, { clientX: 0, clientY: 10 })
    fireEvent.mouseUp(div, { clientX: 0, clientY: 100 })
    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith('down')

    // Swipe up
    fireEvent.mouseDown(div, { clientX: 0, clientY: 100 })
    fireEvent.mouseUp(div, { clientX: 0, clientY: 10 })
    expect(callback).toHaveBeenCalledTimes(4)
    expect(callback).toHaveBeenCalledWith('up')

    // Too small distance
    fireEvent.mouseDown(div, { clientX: 0, clientY: 0 })
    fireEvent.mouseUp(div, { clientX: 10, clientY: 10 })
    expect(callback).toHaveBeenCalledTimes(4)

    window.ontouchstart = original
  })
})
