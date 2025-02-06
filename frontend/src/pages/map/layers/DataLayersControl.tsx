import { useDispatch } from 'react-redux'
import { IconButton, Badge } from '@mui/material'
import clsx from 'clsx'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState, useEffect, useRef } from 'react'

import {
  toggleActiveTool,
  useActiveTool,
  useDataLayers,
} from '@/features/map/map-slice'
import { ActiveToolEnum } from '@/constants/constants'
import { DataLayersCheckboxGroup } from '@/components/DataLayersCheckboxGroup'

import LayersIcon from '@/assets/svgs/fa-layers.svg?react'
import './DataLayersControl.css'

export function DataLayersControl() {
  const dispatch = useDispatch()
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))
  const isActive = useActiveTool() === ActiveToolEnum.dataLayers
  const dataLayers = useDataLayers()
  const [isListVisible, setIsListVisible] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation()
    }

    menu.addEventListener('wheel', handleWheel)
    return () => {
      menu.removeEventListener('wheel', handleWheel)
    }
  }, [])

  const onClick = () => {
    if (isSmall) {
      dispatch(toggleActiveTool(ActiveToolEnum.dataLayers))
    } else {
      setIsListVisible(!isListVisible)
    }
  }

  return (
    <div className="leaflet-control-layers">
      <IconButton
        className={clsx(
          'map-control-button',
          (isActive || (!isSmall && isListVisible)) &&
            'map-control-button--active',
        )}
        onClick={onClick}
        title="Show the data layers"
      >
        <div className="layers-badge-wrapper">
          <Badge
            badgeContent={dataLayers.length}
            color="primary"
            invisible={dataLayers.length === 0}
            component="div"
            sx={{
              display: 'flex',
              '& .MuiBadge-badge': {
                right: -3,
                bottom: -15,
                top: 'auto',
                padding: '0 4px',
                minWidth: '16px',
                height: '16px',
                fontSize: '0.75rem',
                backgroundColor:
                  'var(--surface-color-primary-dangerButton-default, #ce3e39)',
                color: 'var(--surface-color-background-white)',
              },
            }}
          >
            <LayersIcon className="layers-icon" />
          </Badge>
        </div>
      </IconButton>

      {!isSmall && (
        <div
          ref={menuRef}
          className={clsx('data-layers-menu', !isListVisible && 'hidden')}
        >
          <DataLayersCheckboxGroup />
        </div>
      )}
    </div>
  )
}
