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

  const title = (
    <Typography
      fontWeight={700}
      sx={{
        fontSize: {
          xs: '24px',
          md: '32px',
        },
      }}
    >
      Location Details
    </Typography>
  )
  const details = (
    <Grid container gap="24px 0">
      <DetailsGridLabel label="Facility Location" md={12}>
        {address}
      </DetailsGridLabel>
      <DetailsGridLabel label="Latitude" md={6}>
        {lat}
      </DetailsGridLabel>
      <DetailsGridLabel label="Longitude" md={6}>
        {lng}
      </DetailsGridLabel>
    </Grid>
  )
  const map = <DetailsMap item={item} isSmall={isSmall} />

  return (
    <Stack
      component="section"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{
        padding: {
          xs: '24px 16px',
          md: '40px',
        },
      }}
      className="details-section"
    >
      {isSmall ? (
        <>
          {title}
          {map}
          {details}
        </>
      ) : (
        <>
          <Box
            display="flex"
            flexDirection="column"
            gap="24px"
            flex={1}
            width="50%"
          >
            {title}
            {details}
          </Box>
          <Box width="50%">{map}</Box>
        </>
      )}
    </Stack>
  )
}
