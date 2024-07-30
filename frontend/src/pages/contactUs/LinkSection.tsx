import { ReactNode } from 'react'
import { Stack, Typography } from '@mui/material'

import './LinkSection.css'

interface Props {
  title: string
  text: string
  children: ReactNode
}

export function LinkSection({ title, text, children }: Readonly<Props>) {
  return (
    <Stack direction="column" className="link-section">
      <div className="link-section-top-bar" />
      <Typography className="link-section-title" variant="h6" component="h6">
        {title}
      </Typography>
      <Typography className="link-section-text">{text}</Typography>
      <ul className="link-section-list">{children}</ul>
    </Stack>
  )
}
