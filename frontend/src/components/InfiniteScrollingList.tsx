import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'

interface Props<T> {
  items: T[]
  itemRenderer: (item: T, index: number, arr: T[]) => ReactNode
  // How many items to initially show (defaults to 10)
  initialCount?: number
  // How many items to add when scrolling (defaults to initialCount)
  increment?: number
  // The number of pixels from the bottom of the list when to load more items
  offset?: number
  component?: React.ElementType
  className?: string
  [key: string]: any
}

export function InfiniteScrollingList<T>({
  items,
  itemRenderer,
  initialCount = 10,
  increment = initialCount,
  offset = 30,
  component = 'ul',
  className,
  ...rest
}: Readonly<Props<T>>) {
  const [itemCount, setItemCount] = useState<number>(initialCount)
  const listRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setItemCount(initialCount)
  }, [initialCount])

  useEffect(() => {
    const list = listRef.current
    if (list) {
      const onScroll = () => {
        const scrollPosition = list.clientHeight + list.scrollTop + offset
        if (scrollPosition >= list.scrollHeight) {
          setItemCount((count) => count + increment)
        }
      }
      list.addEventListener('scroll', onScroll)
      return () => list.removeEventListener('scroll', onScroll)
    }
  }, [increment, offset])

  return (
    <Box {...rest} className={className} component={component} ref={listRef}>
      <>
        {items
          .slice(0, itemCount)
          .map((item: T, i: number, arr: T[]) => itemRenderer(item, i, arr))}
      </>
    </Box>
  )
}
