import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { Stack, Typography, Box } from '@mui/material'

import { useFindByAuthorizationNumber } from '@/features/omrr/omrr-slice'
import { AuthorizationStatusChip } from '@/components/AuthorizationStatusChip'
import { DetailsBackButton } from './DetailsBackButton'
import { DetailsGridLabel } from './DetailsGridLabel'
import { ApplicationStatusSection } from './ApplicationStatusSection'
import { LocationSection } from './LocationSection'
import { DetailsSection } from './DetailsSection'
import { DocumentsSection } from './DocumentsSection'
import { ContactSection } from './ContactSection'
import { ComplianceSection } from './ComplianceSection'

import './AuthorizationDetails.css'

export default function AuthorizationDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const item = useFindByAuthorizationNumber(parseInt(id ?? ''))

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
    'Authorization Type': authorizationType,
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Box>
          <Typography fontWeight={700} color="#000" fontSize="36px">
            {name}
          </Typography>
        </Box>
      </Box>

      <ApplicationStatusSection item={item} />

      <Stack
        direction={{
          xs: 'column',
          md: 'row',
        }}
        spacing={3}
        className="details-section"
        sx={{
          padding: {
            xs: '24px 16px',
            md: '40px',
          },
        }}
      >
        <Stack spacing={3} sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h5" component="span" fontWeight={700}>
                Authorization
              </Typography>
              <Typography variant="h5" component="span" fontWeight={500}>
                #: {number}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h5" component="span" fontWeight={400}>
                Status:
              </Typography>
              <AuthorizationStatusChip status={status} size="small" />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <DetailsGridLabel label="Effective/Issue Date">
                  {effectiveIssueDate}
                </DetailsGridLabel>
              </Box>
              <Box sx={{ flex: 1 }}>
                <DetailsGridLabel label="Last Amendment Date">
                  {lastAmendmentDate ?? ''}
                </DetailsGridLabel>
              </Box>
            </Box>
          </Box>

          <hr className="details-section-divider" />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Box sx={{ width: '100%' }}>
              <DetailsGridLabel label="Facility Location">
                <Box
                  sx={{
                    width: '100%',
                    wordBreak: 'break-word',
                    maxWidth: 'none',
                  }}
                >
                  {item['Facility Location']}
                </Box>
              </DetailsGridLabel>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <DetailsGridLabel label="Latitude">
                  {item.Latitude}
                </DetailsGridLabel>
              </Box>
              <Box sx={{ flex: 1 }}>
                <DetailsGridLabel label="Longitude">
                  {item.Longitude}
                </DetailsGridLabel>
              </Box>
            </Box>
          </Box>
        </Stack>

        <LocationSection item={item} />
      </Stack>

      <DetailsSection item={item} />
      <ComplianceSection item={item} />
      <DocumentsSection item={item} />
      <ContactSection authNumber={number.toString()} />
    </Stack>
  )
}
