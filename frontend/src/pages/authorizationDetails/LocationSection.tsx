import { Box, Grid, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import OmrrData from '@/interfaces/omrr'
import { DetailsGridLabel } from './DetailsGridLabel'
import { DetailsMap } from './DetailsMap'

interface Props {
  item: OmrrData
}

export function LocationSection({ item }: Readonly<Props>) {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))

  const { 'Facility Location': address, Latitude: lat, Longitude: lng } = item

  const map = <DetailsMap item={item} isSmall={isSmall} />

  return <Box sx={{ flex: 1 }}>{map}</Box>
}
