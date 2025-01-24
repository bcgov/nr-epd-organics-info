import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { Grid, Stack, Typography } from '@mui/material'

import { useFindByAuthorizationNumber } from '@/features/omrr/omrr-slice'
import { AuthorizationStatusChip } from '@/components/AuthorizationStatusChip'
import { DetailsBackButton } from './DetailsBackButton'
import { DetailsGridLabel } from './DetailsGridLabel'
import { ApplicationStatusSection } from './ApplicationStatusSection'
import { LocationSection } from './LocationSection'
import { DetailsSection } from './DetailsSection'
import { DocumentsSection } from './DocumentsSection'
import { ContactSection } from './ContactSection'

import './AuthorizationDetails.css'

export default function AuthorizationDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const item = useFindByAuthorizationNumber(parseInt(id ?? ''))

  console.log('item from authorization details', item)

  useEffect(() => {
    if (item) {
      window.scrollTo(0, 0)
    } else {
      navigate('/search')
    }
  }, [item])

  if (!item) {
    return null
  }

  const {
    'Authorization Number': number,
    'Authorization Status': status,
    'Regulated Party': name,
    'Effective/Issue Date': effectiveIssueDate,
    'Last Amendment Date': lastAmendmentDate,
  } = item

  return (
    <Stack
      direction="column"
      sx={{
        padding: {
          md: '40px 76px 80px',
          xs: '40px 24px 80px',
        },
      }}
      className="authorization-details"
    >
      <div>
        <DetailsBackButton />
      </div>
      <Grid container gap="24px 0">
        <Grid item xs={12}>
          <Typography fontWeight={700} color="#000" fontSize="36px">
            {name}
          </Typography>
        </Grid>
        <DetailsGridLabel label="Authorization Status" xs={6}>
          <AuthorizationStatusChip status={status} size="small" />
        </DetailsGridLabel>
        <DetailsGridLabel label="Authorization Number" xs={6}>
          {number}
        </DetailsGridLabel>
        <DetailsGridLabel label="Effective/Issue Date" xs={6}>
          {effectiveIssueDate}
        </DetailsGridLabel>
        <DetailsGridLabel label="Last Amendment Date" xs={6}>
          {lastAmendmentDate ?? ''}
        </DetailsGridLabel>
      </Grid>

      <ApplicationStatusSection item={item} />
      <LocationSection item={item} />
      <DetailsSection item={item} />
      <DocumentsSection item={item} />
      <ContactSection authNumber={number.toString()} />
    </Stack>
  )
}
