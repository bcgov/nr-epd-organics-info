import { Stack, Typography } from '@mui/material'
import './ComplianceSection.css'
import OmrrData from '@/interfaces/omrr'

interface Props {
  item: OmrrData
}

export function ComplianceSection({ item }: Readonly<Props>) {
  // TODO: Replace with actual compliance data
  const complianceData: any[] = []

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
        Compliance and Enforcement
      </Typography>
      <Typography fontSize="16px" color="#666" fontStyle="italic">
        Compliance and enforcement data presented is from the Natural Resource
        Compliance and Enforcement Database and may not be complete
      </Typography>
      <Stack className="compliance-table" direction="column">
        <div className="compliance-table-row compliance-table-header">
          <div className="compliance-table-cell">Date Issued</div>
          <div className="compliance-table-cell">Type</div>
          <div className="compliance-table-cell">Summary</div>
          <div className="compliance-table-cell">Action</div>
        </div>
        {complianceData.length === 0 && (
          <div className="compliance-table-cell compliance-table-cell--no-data">
            No results found
          </div>
        )}
        {/* TODO: Add mapping of compliance data here */}
      </Stack>
    </Stack>
  )
}
