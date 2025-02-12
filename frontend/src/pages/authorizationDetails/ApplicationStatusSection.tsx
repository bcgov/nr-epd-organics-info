import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Stack, Typography } from '@mui/material'

import OmrrData from '@/interfaces/omrr'
import {
  selectStatus,
  useFindApplications,
} from '@/features/omrr/applications-slice'
import { OmrrApplicationStatus } from '@/interfaces/omrr-application-status'

import './ApplicationStatusSection.css'

interface Props {
  item: OmrrData
}

/**
 * Displays the details about an application status.
 * If there are no application status items then null is returned and nothing is shown.
 */
export function ApplicationStatusSection({ item }: Readonly<Props>) {
  const number = item['Authorization Number']
  const status = useSelector(selectStatus)
  const allApplications: OmrrApplicationStatus[] = useFindApplications(number)

  if (status !== 'succeeded' || allApplications.length === 0) {
    return null
  }

  return (
    <div className="application-status-section">
      <Typography fontWeight={700} fontSize="24px">
        Application Status
      </Typography>
      <Typography fontSize={'1rem'} fontWeight="normal" fontStyle="italic">
        Applies to amendments and new notifications only,{' '}
        <a
          href="https://www2.gov.bc.ca/gov/content?id=AF9C921702294B06AD1490034721D3D6"
          target="_blank"
          rel="noopener noreferrer"
          className="application-status-guidance-link"
        >
          please see our website on data we show
        </a>
        {'. '}
        <a
          href="https://www2.gov.bc.ca/gov/content/environment/waste-management/waste-discharge-authorization"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a>{' '}
        about amendments, notifications and authorizations.
      </Typography>

      {allApplications.map((appStatus: OmrrApplicationStatus) => {
        const {
          'Authorization Type': authorizationType,
          'Received Date': receivedDate,
          'Job Tracking Number': trackingNumber,
          'Job Type': jobType,
          Status: status,
        } = appStatus
        return (
          <Stack
            key={`ApplicationStatus-${trackingNumber}`}
            direction={{
              xs: 'column',
              md: 'row',
            }}
            spacing={4}
            className="application-status-box"
            component="section"
            data-testid="application-status-box"
          >
            {/* Column 1: Authorization Type - 50% */}
            <Stack sx={{ flex: '0 0 50%' }}>
              <Typography fontWeight="bold" sx={{ marginBottom: '8px' }}>
                {authorizationType} - {jobType}
              </Typography>
            </Stack>

            {/* Column 2: Received Date - 25% */}
            <Stack direction="row" spacing={2} sx={{ flex: '0 0 25%' }}>
              <Box className="application-status-label application-status-label--light">
                Received Date
              </Box>
              <Box className="application-status-value">{receivedDate}</Box>
            </Stack>

            {/* Column 3: Status - 25% */}
            <Stack direction="row" spacing={2} sx={{ flex: '0 0 25%' }}>
              <Box className="application-status-label application-status-label--light">
                Status
              </Box>
              <Box className="application-status-value">{status}</Box>
            </Stack>
          </Stack>
        )
      })}
    </div>
  )
}
