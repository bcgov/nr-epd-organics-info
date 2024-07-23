import React from 'react'
import { Button } from '@mui/material'

import { useFilteredResults } from '@/features/omrr/omrr-slice'
import { downloadCsvFile } from '@/utils/file-utils'
import { omrrDataToCsv } from '@/utils/utils'

import ExportIcon from '@/assets/svgs/fa-file-export.svg?react'

export function ExportResultsButton() {
  const filteredResults = useFilteredResults()

  const onExport = () => {
    const csv = omrrDataToCsv(filteredResults)
    downloadCsvFile(csv, `authorizations.csv`)
  }

  return (
    <Button
      variant="outlined"
      onClick={onExport}
      startIcon={<ExportIcon />}
      sx={{
        height: '40px',
        borderColor: 'var(--surface-color-border-dark)',
      }}
    >
      Export Results to CSV
    </Button>
  )
}
