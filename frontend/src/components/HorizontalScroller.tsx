import { ReactNode, useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import clsx from 'clsx'

import './HorizontalScroller.css'

const DEFAULT_SCROLL_OFFSET = 100

interface Props {
  children?: ReactNode
  isEnabled?: boolean
  className?: string
  scrollOffset?: number
  [key: string]: any
}

/**
 * When enabled, this component will horizontally scroll its children,
 * showing a left and right scroll button when appropriate.
 */
export function HorizontalScroller({
  children,
  isEnabled = true,
  className,
  scrollOffset = DEFAULT_SCROLL_OFFSET,
  ...rest
}: Readonly<Props>) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [scrollLeftVisible, setScrollLeftVisible] = useState<boolean>(false)
  const [scrollRightVisible, setScrollRightVisible] = useState<boolean>(false)

  useEffect(() => {
    if (isEnabled && ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current
      setScrollLeftVisible(scrollLeft > 0)
      setScrollRightVisible(scrollWidth > clientWidth)
    }
  }, [isEnabled])

  if (!isEnabled) {
    return children
  }

  const doScroll = (offset: number) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current
      let newScrollLeft = Math.max(0, scrollLeft + offset)
      // If we are nearly at 0 - then jump to zero to avoid a small scroll
      if (newScrollLeft <= 10) {
        newScrollLeft = 0
      }
      ref.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
      setScrollLeftVisible(newScrollLeft > 0)
      setScrollRightVisible(newScrollLeft + clientWidth < scrollWidth)
    }
  }

  const onScrollLeft = () => {
    if (ref.current) {
      doScroll(-scrollOffset)
    }
  }
  const onScrollRight = () => {
    if (ref.current) {
      doScroll(scrollOffset)
    }
  }

  return (
    <div className="horizontal-scroller-container">
      <div
        {...rest}
        className={clsx('horizontal-scroller', className)}
        ref={ref}
      >
        {children}
      </div>
      {scrollLeftVisible && (
        <Button
          color="primary"
          variant="contained"
          onClick={onScrollLeft}
          className="horizontal-scroller-button horizontal-scroller-button--left"
          title="Scroll left"
        >
          <ChevronLeft color="secondary" />
        </Button>
      )}
      {scrollRightVisible && (
        <Button
          color="primary"
          variant="contained"
          onClick={onScrollRight}
          className="horizontal-scroller-button horizontal-scroller-button--right"
          title="Scroll right"
        >
          <ChevronRight color="secondary" />
        </Button>
      )}
    </div>
  )
}

export default HorizontalScroller
