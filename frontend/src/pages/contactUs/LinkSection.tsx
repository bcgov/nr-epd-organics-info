import { Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

import './LinkSection.css'

interface LinkSectionProps {
  title: string
  text: string
  children: ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  'data-testid'?: string
  'data-section-header'?: boolean
}

export function LinkSection({
  title,
  text,
  children,
  className = '',
  headerClassName = '',
  contentClassName = '',
  'data-testid': dataTestId,
  'data-section-header': dataSectionHeader,
}: LinkSectionProps) {
  return (
    <Stack className={className} data-testid={dataTestId}>
      <Stack className={headerClassName}>
        <Typography component="h2" data-section-header={dataSectionHeader}>
          {title}
        </Typography>
      </Stack>
      <Stack className={contentClassName}>
        <Typography sx={{ mb: 3 }}>{text}</Typography>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>{children}</ul>
      </Stack>
    </Stack>
  )
}
