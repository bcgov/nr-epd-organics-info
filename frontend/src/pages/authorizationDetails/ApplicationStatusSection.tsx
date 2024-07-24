import React from 'react'
import { Link, Stack, Typography } from '@mui/material'

import OmrrData from '@/interfaces/omrr'
import { useFindApplicationStatus } from '@/features/omrr/application-status-slice'
import { OmrrApplicationStatus } from '@/interfaces/omrr-application-status'

import './ApplicationStatusSection.css'

interface Props {
  item: OmrrData
}

/**
 * Displays the details about an application status.
 * If there is no application status then null is returned and nothing is shown.
 */
export function ApplicationStatusSection({ item }: Readonly<Props>) {
  const number = item['Authorization Number']
  const allApplications: OmrrApplicationStatus[] =
    useFindApplicationStatus(number)

  if (allApplications.length === 0) {
    return null
  }

  // Still need to make a new guidance page
  const isGuidancePageReady = false

  return (
    <div className="application-status-section">
      <Typography fontSize={12} fontWeight="bold">
        Application Status
      </Typography>
      {allApplications.map((appStatus: OmrrApplicationStatus) => {
        const {
          'Authorization Type': authorizationType,
          'Received Date': receivedDate,
          'Job Tracking Number': trackingNumber,
          Status: status,
        } = appStatus
        return (
          <Stack
            key={`ApplicationStatus-${trackingNumber}`}
            direction={{
              xs: 'column',
              md: 'row',
            }}
            className="application-status-box"
            component="section"
            data-testid="application-status-box"
          >
            <Typography
              fontWeight="bold"
              sx={{
                flex: 1,
                marginBottom: {
                  xs: '16px',
                  md: 0,
                },
              }}
            >
              {authorizationType}
            </Typography>
            <div className="application-status-label application-status-label--light">
              Received Date
            </div>
            <div className="application-status-value">{receivedDate}</div>
            <div className="application-status-label application-status-label--light">
              Status
            </div>
            <div className="application-status-value">{status}</div>
          </Stack>
        )
      })}

      <div className="application-status-guidance">
        Applies to amendment and new notifications only
        {isGuidancePageReady && (
          <>
            {', '}
            <Link href="/guidance">
              please see our guidance on data we show
            </Link>
          </>
        )}
        .
      </div>
    </div>
  )
}
