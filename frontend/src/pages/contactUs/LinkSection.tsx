import { Stack, Typography, SxProps, Theme } from '@mui/material'
import { ReactNode } from 'react'

import './LinkSection.css'

interface LinkSectionProps {
  title: string
  text: string
  children: ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
}

export function LinkSection({
  title,
  text,
  children,
  className = '',
  headerClassName = '',
  contentClassName = '',
}: LinkSectionProps) {
  return (
    <Stack className={className}>
      <Stack className={headerClassName}>
        <span data-section-header="true">{title}</span>
      </Stack>
      <Stack className={contentClassName}>
        <Typography sx={{ mb: 3 }}>{text}</Typography>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>{children}</ul>
      </Stack>
    </Stack>
  )
}
