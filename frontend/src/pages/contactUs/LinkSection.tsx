import { Stack, Typography, SxProps, Theme } from '@mui/material'
import { ReactNode } from 'react'

import './LinkSection.css'

interface Props {
  title: string
  text: string
  children: ReactNode
  sx?: SxProps<Theme>
  headerSx?: SxProps<Theme>
  contentSx?: SxProps<Theme>
}

export function LinkSection({
  title,
  text,
  children,
  sx,
  headerSx,
  contentSx,
}: Props) {
  return (
    <Stack direction="column" sx={sx}>
      <Typography sx={headerSx}>{title}</Typography>
      <Stack direction="column" sx={contentSx}>
        <Typography sx={{ mb: 2 }}>{text}</Typography>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>{children}</ul>
      </Stack>
    </Stack>
  )
}
