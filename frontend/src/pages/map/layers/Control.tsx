import { CSSProperties, ReactNode, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { DomUtil } from 'leaflet'
import clsx from 'clsx'

// Allow custom corners like "bottomcenter", "leftmiddle" etc
const POSITION_CLASSES: Record<string, string> = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
  bottomcenter: 'leaflet-bottom leaflet-center',
  topcenter: 'leaflet-top leaflet-center',
  leftmiddle: 'leaflet-left leaflet-middle',
  rightmiddle: 'leaflet-right leaflet-middle',
}

interface Props {
  position: string
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function Control({ position, children, className, style }: Props) {
  const [container, setContainer] = useState<HTMLElement>(
    document.createElement('div'),
  )

  useEffect(() => {
    // @ts-ignore
    let positionClass = POSITION_CLASSES.topright
    if (position && position in POSITION_CLASSES) {
      positionClass = POSITION_CLASSES[position]
    }
    let targetDiv = document.getElementsByClassName(
      positionClass,
    )[0] as HTMLElement
    if (!targetDiv) {
      // Create custom position
      const topRight = document.getElementsByClassName(
        POSITION_CLASSES.topright,
      )[0]
      targetDiv = DomUtil.create(
        'div',
        positionClass,
        topRight.parentNode as HTMLElement,
      )
    }
    setContainer(targetDiv)
  }, [position])

  // Make the attribution the last child (after map controls)
  useEffect(() => {
    const len = container.children.length
    if (len > 1) {
      const attribution = container.querySelector(
        '.leaflet-control-attribution',
      )
      if (attribution && attribution !== container.children[len - 1]) {
        container.removeChild(attribution)
        container.appendChild(attribution)
      }
    }
  }, [container, position])

  const controlContainer = useMemo(
    () => (
      <div
        className={clsx('leaflet-control leaflet-bar', className)}
        style={style}
      >
        {children}
      </div>
    ),
    [children, style],
  )

  return createPortal(controlContainer, container)
}
