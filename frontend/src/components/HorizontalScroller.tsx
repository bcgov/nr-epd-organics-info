import { ReactNode, useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material'
import clsx from 'clsx'

import { SwipeDirection, useSwipe } from '@/hooks/useSwipe'

import ChevronLeft from '@/assets/svgs/fa-chevron-left.svg?react'
import ChevronRight from '@/assets/svgs/fa-chevron-right.svg?react'

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
 * It also supports swipe left/right gestures.
 */
export function HorizontalScroller({
  children,
  isEnabled = true,
  ...rest
}: Readonly<Props>) {
  return isEnabled ? (
    <HorizontalScrollerComponent {...rest}>
      {children}
    </HorizontalScrollerComponent>
  ) : (
    children
  )
}

function HorizontalScrollerComponent({
  children,
  className,
  scrollOffset = DEFAULT_SCROLL_OFFSET,
  ...rest
}: Readonly<Omit<Props, 'isEnabled'>>) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [scrollLeftVisible, setScrollLeftVisible] = useState<boolean>(false)
  const [scrollRightVisible, setScrollRightVisible] = useState<boolean>(false)

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

  const swipeCallback = (direction: SwipeDirection) => {
    if (direction === 'left') {
      onScrollRight()
    } else if (direction === 'right') {
      onScrollLeft()
    }
  }

  useSwipe(ref, swipeCallback)

  useEffect(() => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current
      setScrollLeftVisible(scrollLeft > 0)
      setScrollRightVisible(scrollWidth > clientWidth)
    }
  }, [])

  return (
    <div className="horizontal-scroller-container">
      <div
        {...rest}
        ref={ref}
        className={clsx('horizontal-scroller', className)}
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
          <ChevronLeft />
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
          <ChevronRight />
        </Button>
      )}
    </div>
  )
}
