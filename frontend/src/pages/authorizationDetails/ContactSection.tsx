import { Stack, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'

interface Props {
  authNumber: string
}

export function ContactSection({ authNumber }: Readonly<Props>) {
  return (
    <Stack
      direction="column"
      className="details-section"
      sx={{ overflow: 'hidden' }}
    >
      <Typography
        fontWeight={700}
        fontSize="18px"
        sx={{
          background: 'var(--surface-color-primary-hover)',
          color: 'white',
          padding: {
            xs: '17px 16px',
            md: '17px 24px',
          },
        }}
      >
        Contact
      </Typography>
      <Stack
        direction="column"
        spacing={1}
        sx={{
          padding: {
            xs: '4px 24px 24px',
            md: '8px 32px 32px',
          },
        }}
      >
        <Typography>
          If you have questions regarding authorization #{authNumber}, contact
          the email below.
        </Typography>
        <Stack direction="row" spacing={1}>
          <div
            style={{
              backgroundColor: 'var(--surface-color-primary-hover)',
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <EmailIcon sx={{ color: 'white' }} />
          </div>
          <Stack direction="column">
            <Typography fontWeight={700}>Email</Typography>
            <a
              href="mailto:WasteDischargeApplicationInquiries@gov.bc.ca"
              style={{
                color: 'var(--typography-color-link)',
              }}
            >
              ENVCIA@gov.bc.ca
            </a>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
