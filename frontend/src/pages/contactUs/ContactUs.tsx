import { Stack } from '@mui/material'

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
            md: '80px 76px;',
          },
        }}
      >
        <LinkSection
          title="Organic matter"
          text="For questions about organic matter recycling regulation, biosolids, or compost."
        >
          <li>
            Email:{' '}
            <a href="mailto:ENV.OMRR.Reg.Reviews@gov.bc.ca">
              ENV.OMRR.Reg.Reviews@gov.bc.ca
            </a>
          </li>
        </LinkSection>
        <LinkSection
          title="Authorizations"
          text="For additional information on authorizations or for information not found on this site."
        >
          <li>
            Email:{' '}
            <a href="mailto:WasteDischargeApplicationInquiries@gov.bc.ca">
              WasteDischargeApplicationInquiries@gov.bc.ca
            </a>
          </li>
          <li>
            <a
              href="https://forms.gov.bc.ca/environment/wda-enquiry/"
              target="wda-enquiry"
            >
              Submit an online form
            </a>
          </li>
        </LinkSection>
        <LinkSection
          title="Report natural resource violations"
          text="If you see a violation, report it using the toll-free number or the online reporting service."
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
  )
}

export default ContactUs
