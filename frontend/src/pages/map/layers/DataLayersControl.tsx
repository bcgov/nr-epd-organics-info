import { IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import LayersIcon from '@/assets/svgs/fa-layers.svg?react'

export function DataLayersControl() {
  const theme = useTheme()
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))

  if (isLarge) {
    return null
  }

  const onClick = () => {}

  return (
    <IconButton
      className="map-control-button"
      onClick={onClick}
      disabled
      title="Show the data layers"
    >
      <LayersIcon />
    </IconButton>
  )
}
