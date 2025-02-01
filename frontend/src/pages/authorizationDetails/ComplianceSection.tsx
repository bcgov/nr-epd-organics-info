import { Stack, Typography } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useEffect, useState } from 'react'
import './ComplianceSection.css'
import OmrrData from '@/interfaces/omrr'

interface Props {
  item: OmrrData
}

interface ComplianceRecord {
  dateIssued: string
  recordType: string
  summary: string
  id: string
}

export function ComplianceSection({ item }: Readonly<Props>) {
  const [complianceData, setComplianceData] = useState<ComplianceRecord[]>([])
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    const fetchComplianceData = async () => {
      const keywords = `${item['Authorization Number']} OR "${item['Regulated Party']}"`
      const url = `https://nrpti-api-f00029-prod.apps.silver.devops.gov.bc.ca/api/public/search?dataset=OrderNRCED,InspectionNRCED,RestorativeJusticeNRCED,AdministrativePenaltyNRCED,AdministrativeSanctionNRCED,TicketNRCED,WarningNRCED,CourtConvictionNRCED,CorrespondenceNRCED,DamSafetyInspectionNRCED,ReportNRCED&keywords=${encodeURIComponent(keywords)}&pageNum=0&pageSize=25&sortBy=-dateIssued&fields=`

      try {
        const response = await fetch(url)
        const data = await response.json()
        const records = data[0].searchResults.map((record: any) => ({
          dateIssued: record.dateIssued,
          recordType: record.recordType,
          summary: record.summary,
          id: record._id,
        }))
        setComplianceData(records)
      } catch (error) {
        console.error('Error fetching compliance data:', error)
        setComplianceData([])
      }
    }

    fetchComplianceData()
  }, [item])

  const handleSort = () => {
    const sorted = [...complianceData].sort((a, b) => {
      const dateA = new Date(a.dateIssued).getTime()
      const dateB = new Date(b.dateIssued).getTime()
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA
    })
    setComplianceData(sorted)
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  }

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
          <div
            className="compliance-table-cell compliance-table-cell--sortable"
            onClick={handleSort}
          >
            Date Issued
            {sortDirection === 'asc' ? (
              <ArrowUpwardIcon fontSize="small" />
            ) : (
              <ArrowDownwardIcon fontSize="small" />
            )}
          </div>
          <div className="compliance-table-cell">Type</div>
          <div className="compliance-table-cell">Summary</div>
          <div className="compliance-table-cell">Action</div>
        </div>
        {complianceData.length === 0 && (
          <div className="compliance-table-cell compliance-table-cell--no-data">
            No results found
          </div>
        )}
        {complianceData.map((record) => (
          <div key={record.id} className="compliance-table-row">
            <div className="compliance-table-cell">
              {new Date(record.dateIssued).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            <div className="compliance-table-cell">{record.recordType}</div>
            <div className="compliance-table-cell">{record.summary}</div>
            <div className="compliance-table-cell">
              <a
                href={`https://nrced.gov.bc.ca/records;autofocus=${record.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-link"
              >
                View <OpenInNewIcon fontSize="small" />
              </a>
            </div>
          </div>
        ))}
      </Stack>
    </Stack>
  )
}
