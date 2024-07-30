import { ReactNode } from 'react'
import { Grid, Typography } from '@mui/material'

interface Props {
  label: string
  children: ReactNode
  xs?: number
  md?: number
}

export function DetailsGridLabel({
  label,
  children,
  xs = 12,
  md = 3,
}: Readonly<Props>) {
  return (
    <Grid item xs={xs} md={md} flexDirection="column" gap="4px">
      <Typography
        component="div"
        fontSize={12}
        fontWeight="bold"
        marginBottom="4px"
      >
        {label}
      </Typography>
      <span>{children}</span>
    </Grid>
  )
}
