import React from 'react'
import { Stack, Typography } from '@mui/material'

import './DocumentsSection.css'

export function DocumentsSection() {
  return (
    <Stack
      direction="column"
      sx={{
        padding: {
          xs: '24px 16px 32px',
          md: '40px 24px 48px',
        },
      }}
      className="details-section"
    >
      <Typography fontWeight={700} color="#000" fontSize="24px">
        Documents
      </Typography>
      <Stack className="documents-table" direction="column">
        <div className="documents-table-cell documents-table-cell--header">
          File Description
        </div>
        <div className="documents-table-cell">
          There are no documents to display.
        </div>
        {/* documents goes here */}
      </Stack>
    </Stack>
  )
}
