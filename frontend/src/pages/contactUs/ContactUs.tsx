import { Stack, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LinkIcon from '@mui/icons-material/Link'

import { TopSection } from './TopSection'
import { LinkSection } from './LinkSection'

import './ContactUs.css'

export function ContactUs() {
  return (
    <Stack direction="column" className="contact-us">
      <TopSection />
      <Stack
        direction="column"
        component="section"
        sx={{
          padding: {
            xs: '40px 24px',
            md: '80px 76px',
          },
        }}
      >
        <Stack spacing={3}>
          <LinkSection
            title="Organic matter"
            text="For questions about organic matter recycling regulation, biosolids, or compost."
            sx={{
              overflow: 'hidden',
              backgroundColor: 'var(--surface-color-base)',
              border: '1px solid var(--border-color-base)',
              borderRadius: '4px',
            }}
            headerSx={{
              background: 'var(--surface-color-primary-hover)',
              color: 'white',
              padding: {
                xs: '17px 16px',
                md: '17px 24px',
              },
              fontWeight: 700,
              fontSize: '18px',
            }}
            contentSx={{
              padding: {
                xs: '4px 24px 24px',
                md: '8px 32px 32px',
              },
            }}
          >
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
                  href="mailto:ENV.OMRR.Reg.Reviews@gov.bc.ca"
                  style={{
                    color: 'var(--typography-color-link)',
                  }}
                >
                  ENV.OMRR.Reg.Reviews@gov.bc.ca
                </a>
              </Stack>
            </Stack>
          </LinkSection>
          <LinkSection
            title="Authorizations"
            text="For additional information on authorizations or for information not found on this site."
            sx={{
              overflow: 'hidden',
              backgroundColor: 'var(--surface-color-base)',
              border: '1px solid var(--border-color-base)',
              borderRadius: '4px',
            }}
            headerSx={{
              background: 'var(--surface-color-primary-hover)',
              color: 'white',
              padding: {
                xs: '17px 16px',
                md: '17px 24px',
              },
              fontWeight: 700,
              fontSize: '18px',
            }}
            contentSx={{
              padding: {
                xs: '4px 24px 24px',
                md: '8px 32px 32px',
              },
            }}
          >
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              sx={{ width: '100%' }}
            >
              <Stack direction="row" spacing={1} sx={{ flex: 1 }}>
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
                    WasteDischargeApplicationInquiries@gov.bc.ca
                  </a>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ flex: 1 }}>
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
                  <LinkIcon sx={{ color: 'white' }} />
                </div>
                <Stack direction="column">
                  <Typography fontWeight={700}>
                    Waste Discharge Application Enquiry
                  </Typography>
                  <a
                    href="https://forms.gov.bc.ca/environment/wda-enquiry/"
                    target="wda-enquiry"
                    style={{
                      color: 'var(--typography-color-link)',
                    }}
                  >
                    https://forms.gov.bc.ca/environment/wda-enquiry/
                  </a>
                </Stack>
              </Stack>
            </Stack>
          </LinkSection>
          <LinkSection
            title="Report natural resource violations"
            text="If you see a violation, report it using the toll-free number or the online reporting service."
            sx={{
              overflow: 'hidden',
              backgroundColor: 'var(--surface-color-base)',
              border: '1px solid var(--border-color-base)',
              borderRadius: '4px',
            }}
            headerSx={{
              background: 'var(--surface-color-primary-hover)',
              color: 'white',
              padding: {
                xs: '17px 16px',
                md: '17px 24px',
              },
              fontWeight: 700,
              fontSize: '18px',
            }}
            contentSx={{
              padding: {
                xs: '4px 24px 24px',
                md: '8px 32px 32px',
              },
            }}
          >
            <li>
              Toll-free: <a href="tel:18779527277">+1-877-952-7277</a>
            </li>
            <li>
              Online reporting service:{' '}
              <a href="https://forms.gov.bc.ca/environment/rapp/" target="rapp">
                Report All Poachers and Polluters (RAPP)
              </a>
            </li>
          </LinkSection>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ContactUs
