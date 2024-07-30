import { Stack } from '@mui/material'

import { TopSection } from './TopSection'
import { InterpretSection } from './InterpretSection'
import { GuidanceInfo } from './GuidanceInfo'

import './GuidancePage.css'

export function GuidancePage() {
  return (
    <Stack direction="column" className="guidance-page">
      <TopSection />
      <InterpretSection />
      <GuidanceInfo />
    </Stack>
  )
}

export default GuidancePage
