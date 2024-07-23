import React, { ReactNode } from 'react'
import { Grid, Stack, Typography } from '@mui/material'

import OmrrData from '@/interfaces/omrr'
import { DetailsGridLabel } from './DetailsGridLabel'
import {
  AUTHORIZATION_TYPE_APPROVAL,
  AUTHORIZATION_TYPE_NOTIFICATION,
  AUTHORIZATION_TYPE_OPERATIONAL_CERTIFICATE,
  AUTHORIZATION_TYPE_PERMIT,
  OPERATION_TYPE_COMPOST_FACILITY,
  OPERATION_TYPE_LAND_APPLICATION,
} from '@/interfaces/omrr-filter'
import {
  NotificationCompostGridItems,
  NotificationGridItems,
  NotificationLandApplicationGridItems,
  PermitApprovalOperationalCertificateGridItems,
} from './DetailsGridItems'

interface Props {
  item: OmrrData
}

export function DetailsSection({ item }: Readonly<Props>) {
  const {
    'Authorization Type': authorizationType,
    'Operation Type': operationType,
  } = item

  const authTypeLower = authorizationType.toLowerCase()
  const opTypeLower = (operationType ?? '').toLowerCase()

  const isNotification = authTypeLower === AUTHORIZATION_TYPE_NOTIFICATION
  const isPermit = authTypeLower === AUTHORIZATION_TYPE_PERMIT
  const isApproval = authTypeLower === AUTHORIZATION_TYPE_APPROVAL
  const isOperationalCertificate =
    authTypeLower === AUTHORIZATION_TYPE_OPERATIONAL_CERTIFICATE
  const isCompost = opTypeLower === OPERATION_TYPE_COMPOST_FACILITY
  const isLandApplication = opTypeLower.startsWith(
    OPERATION_TYPE_LAND_APPLICATION,
  )

  let authTypeCols = 12
  if (isNotification && !isCompost && !isLandApplication) {
    authTypeCols = 6
  }

  let gridItems: ReactNode = null
  if (isPermit || isApproval || isOperationalCertificate) {
    gridItems = <PermitApprovalOperationalCertificateGridItems item={item} />
  } else if (isNotification) {
    if (isCompost) {
      gridItems = <NotificationCompostGridItems item={item} />
    } else if (isLandApplication) {
      gridItems = <NotificationLandApplicationGridItems item={item} />
    } else {
      gridItems = <NotificationGridItems />
    }
  }

  return (
    <Stack
      direction="column"
      component="section"
      className="details-section"
      sx={{
        padding: {
          xs: '24px 16px 32px',
          md: '40px 40px 48px',
        },
      }}
    >
      <Typography fontWeight={700} fontSize="24px" color="#000">
        Authorization Details
      </Typography>
      <Grid container gap="24px 0">
        <DetailsGridLabel label="Authorization Type" md={authTypeCols}>
          {authorizationType}
        </DetailsGridLabel>
        {gridItems}
      </Grid>
    </Stack>
  )
}
