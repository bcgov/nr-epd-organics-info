import { Stack, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import LinkIcon from '@mui/icons-material/Link'
import PhoneIcon from '@mui/icons-material/Phone'

import { TopSection } from './TopSection'
import { LinkSection } from './LinkSection'

import './ContactUs.css'

export function ContactUs() {
  return (
    <Stack direction="column" className="contact-us">
      <Stack
        direction="column"
        sx={{
          padding: {
            xs: '40px',
            md: '76px 126px',
          },
          paddingBottom: { xs: '12px', md: '20px' },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Stack sx={{ maxWidth: '1200px', width: '100%' }}>
          <Typography
            variant="h1"
            sx={{
              color: 'var(--typography-color-primary, #2D2D2D)',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '54px',
              mb: 1,
            }}
          >
            Contact us
          </Typography>
          <Typography
            sx={{
              color: 'var(--typography-color-primary, #2D2D2D)',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '27.008px',
            }}
          >
            If you have any questions or need assistance, see the contact
            options below:
          </Typography>
        </Stack>
      </Stack>

      <Stack
        direction="column"
        component="section"
        sx={{
          padding: {
            xs: '40px',
            md: '76px 126px',
          },
          paddingTop: { xs: '12px', md: '20px' },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Stack
          spacing="var(--layout-margin-large, 24px)"
          sx={{ maxWidth: '1200px', width: '100%' }}
        >
          <LinkSection
            title="Organic matter"
            text="For questions about Organic Matter Recycling Regulation, biosolids, or compost."
            className="link-section"
            headerClassName="link-section-header"
            contentClassName="link-section-content"
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
            className="link-section"
            headerClassName="link-section-header"
            contentClassName="link-section-content"
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
                    href="mailto:ENVCIA@gov.bc.ca"
                    style={{
                      color: 'var(--typography-color-link)',
                    }}
                  >
                    ENVCIA@gov.bc.ca
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
            className="link-section"
            headerClassName="link-section-header"
            contentClassName="link-section-content"
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
                  <PhoneIcon sx={{ color: 'white' }} />
                </div>
                <Stack direction="column">
                  <Typography fontWeight={700}>Toll-free</Typography>
                  <a
                    href="tel:18779527277"
                    style={{
                      color: 'var(--typography-color-link)',
                    }}
                  >
                    +1-877-952-7277
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
                    Report All Poachers and Polluters
                  </Typography>
                  <a
                    href="https://forms.gov.bc.ca/environment/rapp/"
                    target="rapp"
                    style={{
                      color: 'var(--typography-color-link)',
                    }}
                  >
                    https://forms.gov.bc.ca/environment/rapp/
                  </a>
                </Stack>
              </Stack>
            </Stack>
          </LinkSection>
        </Stack>
      </Stack>

      <Stack
        direction="column"
        sx={{
          padding: {
            xs: '40px',
            md: '76px 126px',
          },
          paddingTop: { xs: '12px', md: '20px' },
          backgroundColor: 'var(--surface-color-base)',
          mt: 2,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            maxWidth: '1200px',
            width: '100%',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -20,
              left: 0,
              width: '40px',
              height: '4px',
              backgroundColor: '#FCBA19',
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{ fontSize: '24px', fontWeight: 700, mb: 1 }}
          >
            Need general help?
          </Typography>
          <Typography>
            Services are available in a variety of different languages and
            channels through Service BC.{' '}
            <a
              href="https://www2.gov.bc.ca/gov/content/home/get-help-with-government-services"
              style={{ color: 'var(--typography-color-link)' }}
            >
              Get help with government services
            </a>
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ContactUs
