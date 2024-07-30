import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Stack, Typography } from '@mui/material'

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
        Applies to amendment and new notifications only,{' '}
        <NavLink to="/guidance" className="application-status-guidance-link">
          please see our guidance on data we show
        </NavLink>
        .
      </div>
    </div>
  )
}
